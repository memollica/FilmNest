<template>

<div class="container">

<div class="col-md-6 profileLeft">
  <div class="profileText">
    Welcome to database project with Vue.js <font-awesome-icon icon="fa-brands fa-vuejs" />
  </div>
</div>

<div class="col-md-6 profileRight">
  <div class="signIn"> 
    <h4>Let's create an account</h4>
    <h6>Please enter your email and password.</h6>
    <div class="form">
      <p><input type="text" placeholder="Email" v-model="email"></p>
    <p><input type="password" placeholder="Password" v-model="password"></p>
    <p v-if="errMsg">{{ errMsg }}</p>
    <p><button @click="register">Register</button></p>
    <p><button class="btn btn-google" @click="signInWithGoogle">    <font-awesome-icon icon="fa-brands fa-google" /> &nbsp; Sign In With Google</button></p>
    </div>
  </div>
</div>

</div>


    <!-- <h2>This is a register page</h2>
    <p><input type="text" placeholder="Email" v-model="email"></p>
    <p><input type="password" placeholder="Password" v-model="password"></p>
    <p><button @click="register">Register </button></p>
    <p><button @click="signInWithGoogle">Sign In With Google</button></p> -->
    
</template>

<script setup>
    import { ref } from 'vue';
    import { getAuth, createUserWithEmailAndPassword, signInWithPopup, GoogleAuthProvider } from "firebase/auth";
    import { gettingAuth, db } from '../firebase';
    import { setDoc, doc } from "firebase/firestore";
    import { useRouter } from 'vue-router';
    import { decodeBase64 } from 'bcryptjs';


    const email = ref("")
    const password = ref("")
    const router = useRouter()

    const register = () => {
        createUserWithEmailAndPassword(getAuth(), email.value, password.value)
            .then((data) => {
                console.log("Successfully Registered", data);
                setDoc(doc(db, "users", data.user.uid), { 
                    email: email.value, 
                    password: password.value,
                    movies: [],
                    createdAt: new Date()
                  });
                  localStorage.setItem('user', JSON.stringify(data.user));
                  alert('User registered and Firestore document created');
                router.push('/')
            })
            .catch((error) => {
                console.log(error.code, error.message);
            });
    };

    const signInWithGoogle = () => {
        const provider = new GoogleAuthProvider();
        signInWithPopup(getAuth(), provider)
            .then((data) => {
                console.log("Successfully Signed In", data);
                router.push('/')
            })
            .catch((error) => {
                console.log(error.code, error.message);
            });
    }
</script>
<style scoped>

.container {
  z-index: 0 !important;
}

.profileLeft {
  background: rgb(50,28,12);
  background: linear-gradient(336deg, rgba(50,28,12,1) 0%, rgba(236,153,90,1) 100%);
  border-radius: 20px;
  position: relative;
}
.profileText {
  position: absolute;
  left: 50px;
  bottom: 20px;
  color: #fff;
  font-size: 50px;
  font-weight: 600;
  line-height: 60px;
  text-shadow: 0 2px 0 rgba(0,0,0,0.2);
}
.profileLeft,
.profileRight {
  height: 80vh;
}
.profileRight {
  border-radius: 0 0 20px 0;
  position: relative;
}
h6 {
  color: #ddd;
  font-weight: 300;
}
.signIn {
  color: #fff;
  text-align: left;
  position: absolute;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
  width: 400px;
}
input {
  width: 60%;
  border-radius: 50px;
  border: none;
  padding: 10px 20px;
  background-color: #4b4b4b5b;
  color: #fff;
  margin-top: 10px;
}
.form {
  margin-top:30px;
}
button {
  width: 60%;
  background-color: #ec995a;
  border-radius: 50px;
  border: none;
  padding: 10px 20px;
  color: #fff;
  margin-top: 10px;
  font-weight: 500;
  text-shadow: 0 2px 0 rgba(0,0,0,0.2);
  transition: 300ms all ease-in-out;
}
button.btn-google {
  background-color: transparent;
  color: #fff;
  font-weight: 500;
  text-shadow: none;
  transition: 300ms all ease-in-out;
  border: 1px solid #fff;
}
button.btn-google:hover {
  background-color: #fff;
  color: #ec995a;
  font-weight: 500;
  text-shadow: none;
}
button:hover {
  cursor: pointer;
  background-color: #9e6940;
}
button:active {
  scale: 2;
}
@media (max-width: 992px) {
  .profileRight {
    margin-left: 100px;
  }
}
@media (max-width: 768px) {
  .profileLeft {
   display: none;
 }
 .profileRight {
  margin: 0;
  margin: auto;
 }
}
@media (max-width: 500px) {
  .container {
    position: absolute;
    top: 50%;
    transform: translate(0, -50%);
  }
  .signIn {
    padding-left: 50px;
  }
}
</style>