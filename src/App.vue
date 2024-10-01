<script setup>
import { RouterLink, RouterView } from 'vue-router'
import { onMounted, ref } from 'vue';
import './assets/main.css'
import { gettingAuth, db } from './firebase';
import { doc, getDoc } from "firebase/firestore";
import { getAuth, onAuthStateChanged, signOut } from "firebase/auth";
import router from './router';
import { useToast } from 'vue-toastification';




const isLoggedIn = ref(false)
let auth;

onMounted(() => {
  auth = getAuth();
  onAuthStateChanged(auth, (user) => {
    if (user) {
      isLoggedIn.value = true
    } else {
      isLoggedIn.value = false
    }
  });
});

const handleSignOut = () => {
  signOut(auth).then(() => {
    const toast = useToast();
    const success = true; // Kütüphaneye ekleme işleminin başarılı olup olmadığını varsayıyoruz
    
  if (success) {
    // İşlem başarılıysa bir başarı bildirimi göster
    toast.error("Successfully logged out!", {
      position: "top-right",
      timeout: 2000,
      closeOnClick: true,
      pauseOnHover: true,
    });
  } else {
    // İşlem başarısız olursa bir hata bildirimi göster
    toast.error("Failed to log out!", {
      position: "top-right",
      timeout: 2000,
      closeOnClick: true,
      pauseOnHover: true,
    });
  }
    localStorage.removeItem('user');
    router.push("/")
  });
};
</script>
<template>
<nav class="navbar navbar-expand-lg">
  <div class="container">
    <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarToggler" aria-controls="navbarToggler" aria-expanded="false" aria-label="Toggle navigation">
      <span class="navbar-toggler-icon"></span>
    </button>
    <router-link to="/" class="nav-link navbar-brand logo">Film<span>Nest</span></router-link>
    <div class="collapse navbar-collapse" id="navbarToggler">
      <ul class="navbar-nav me-auto mb-2 mb-lg-0 m-auto">
        <li class="nav-item">
          <router-link to="/" class="nav-link">Home</router-link>
        </li>
        <li class="nav-item">
          <router-link to="/about" class="nav-link">What is FilmNest?</router-link>
        </li>
      </ul>

      <div class="dropdown">
  <button class="btn dropdown-toggle" type="button" id="dropdownMenuButton1" data-bs-toggle="dropdown" aria-expanded="false">
    <font-awesome-icon icon="fa-solid fa-user" />
  </button>
  <ul class="dropdown-menu" aria-labelledby="dropdownMenuButton1">
    <li class="nav-item">
          <router-link to="/profile"  v-if="isLoggedIn" >Profile</router-link>
        </li>
        <li class="nav-item">
          <router-link to="/register" v-if="!isLoggedIn">Register</router-link>
        </li>
        <li class="nav-item">
          <router-link to="/login" v-if="!isLoggedIn">Login</router-link>
        </li>
        <li class="nav-item">
          <button @click="handleSignOut" v-if="isLoggedIn" class="btn"> Sign Out</button>
        </li>
  </ul>
</div>
    </div>
  </div>
</nav>   
 <homeView />
  <RouterView />
</template>


<style scoped>
  .container {
    justify-content: space-between;
    display: flex;
    position: relative;
    padding-top: 20px;
    z-index: 999;
  }
  .logo {
    font-size: 20px;
    font-weight: bold;
    color: #fff;
  }
  .logo span {
    color: red;
  }
  .nav-link {
    color: #fff !important;
  }
  .nav-link:hover {
    color: #ddd !important;
  }
  .settings svg {
    color: #fff;
  }
  nav.navbar.navbar-expand-lg {
    padding: 0px;
}
  .btn {
    color: #fff;
  }
  .dropdwon-toggle {
    position: relative;
  }
  .dropdown-menu.show {
      position: absolute;
      display: block;
      padding: 10px 20px;
      background-color: #242832;
      color: #fff;
      -webkit-box-shadow: 0px 5px 10px 0px rgba(0,0,0,0.75);
      -moz-box-shadow: 0px 5px 10px 0px rgba(0,0,0,0.75);
      box-shadow: 0px 5px 10px 0px rgba(0,0,0,0.75);
      z-index: 999;
      left:0;
  }
  .dropdown-menu.show li {
    padding-bottom: 5px;
    z-index: 999;
  }
  .dropdown-menu.show li a {
    color: #fff;
    text-decoration: none;
  }
  .dropdown-menu.show .btn {
    margin: 0px;
    padding: 0px
  }
  .navbar-toggler-icon {
    background-image:url("data:image/svg+xml,%3csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 30 30'%3e%3cpath stroke='white' stroke-linecap='round' stroke-miterlimit='10' stroke-width='2' d='M4 7h22M4 15h22M4 23h22'/%3e%3c/svg%3e");
}
.navbar-toggler-icon:focus,
.navbar-toggler-icon:active,
.navbar-toggler-icon:focus-visible,
.navbar-toggler-icon:target {
  outline: none;
  border: none;
  box-shadow: none;
}
/* #navbarToggler {
  height: auto;
  padding-bottom: 100px
} */

@media (max-width: 991px) {
  .navbar .container {
  padding-bottom: 150px;
  }
}

</style>
