<template>
    <div v-if="isVisible" class="modal-overlay" @click.self="closeModal">
      <div class="modal-content">
        <h2>{{ movie.title }}</h2>
        <p><strong>Release Date:</strong> {{ movie.release_date }}</p>
        <div class="details">
            <img :src="baseUrlPoster + movie.poster_path" :alt="movie.title" />
            <p><strong>Overview:</strong>
               {{ movie.overview }}<br><br>
                <strong>Rating: </strong>{{ movie.vote_average }}<br>
                <strong>Rating: </strong>{{ movie.vote_count }}
                {{ movie.runtime }}
              </p>
            
        </div>
        <div class="buttons">
          <button @click="closeModal" class="btn btn-danger">Close</button>
          <button @click="addToLibrary(movie)" class="btn btnAddToLibrary">Add to Library</button>
        </div>
      </div>
    </div>
  </template>
  
  <script>
    import { ref, onMounted } from 'vue';
  import { gettingAuth, db } from '../firebase';
  import { doc, setDoc, updateDoc, arrayUnion, arrayRemove, getDoc } from "firebase/firestore"; 
  import users from '../views/Login.vue';
  import { getAuth } from "firebase/auth";
  export default {
    name: 'Movies',
    name: 'addToLibrary',
    name:'users',
    name: 'Home',
    
    props: {
      movie: Object, // Seçilen film objesi
      isVisible: Boolean, // Modal görünürlüğü
      baseUrlPoster: String // Poster URL'si
    },
    methods: {
      closeModal() {
        this.$emit('close'); // Modal kapatma fonksiyonunu çağırıyoruz
      },
      async addToLibrary(movie) {
        const auth = getAuth();
        const user = auth.currentUser;  // Kullanıcı bilgilerini alıyoruz
        if (user) {
          const movieRef = doc(db, "users", user.uid);
        const docSnap =  await getDoc(movieRef);

          if (docSnap.exists()) {
            const userData = docSnap.data().movies || [];


            if (!userData.includes(movie.id)) {
            updateDoc(movieRef, {
                movies: arrayUnion(movie.id)
              });
              console.log("Film başarıyla eklendi ", movie.id)
            } 
          else {
            console.log("film zaten ekli", movie.id)
          }
          }          
          const storedUser = localStorage.getItem('user') || [];
              if (!storedUser.includes(movie.id)) {
                const user = JSON.parse(storedUser);
                if (!user.movies) {
                  user.movies = [];
                }
                user.movies.push(movie.id);
                localStorage.setItem('user', JSON.stringify(user));
                console.log("Movie added to localStorage:", movie.id);
              }
        } else {
          console.log("User not logged in");
          alert("User not logged in");
        }
      }
    }
  };
  </script>
  
  <style scoped>
  .modal-overlay {
    position: fixed;
    top: 0;
    left: 0;
    width: 100vw;
    height: 100vh;
    background-color: rgba(0, 0, 0, 0.9);
    display: flex;
    justify-content: center;
    align-items: center;
    z-index: 9999;
  }
  
  .modal-content {
    background-color: #242832;
    padding: 20px;
    border-radius: 10px;
    max-width: 700px;
    height: 500px;
    text-align: center;
    overflow-y: scroll;
    color: #fff;

  }
  .modal-content::-webkit-scrollbar {
  width: 10px;
  }
  .modal-content::-webkit-scrollbar-track {
    background: #242832;
  }
  .modal-content::-webkit-scrollbar-thumb {
    background: orange;
  }
  .details {
    display: flex;
  }
  .details p {
    margin-top: 20px;
    text-align: left;
    margin-left: 20px;
  }
  img {
    width: 30%;
    height: auto;
    margin: 20px 0;
    object-fit: contain;
  }
  .buttons {
    display: flex;
    align-items: center;
    justify-content: center;
  }
  .buttons button {
    margin: 0 10px;
  }
  .btnAddToLibrary {
    background-color: orange;
    color: #242832;
  }
  
  </style>
  