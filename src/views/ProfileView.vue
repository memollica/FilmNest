<template>
  <div class="container profileDescription">
    <div class="row">
      <h4>My Movies List</h4>
      <h5>This list shows yours favorite movies that you have watched or want to watch. You can add or remove movies from this list by just clicking on the movie.</h5>
    </div>
  </div>
  <div class="container" style="color:white;">
    <li v-for="movie in movies" :key="movie.id" @click="removeMovie(movie.id)">
      <img :src="baseUrlPoster + movie.poster_path"> <br>{{ movie.title }} 
     
    </li>
  </div>
  <div v-if="movies.length === 0">No movies found.</div>
</template>

<style>
@media (min-width: 1024px) {
  .about {
    min-height: 100vh;
    display: flex;
    align-items: center;
  }
}
</style>

<script>
import { ref, onMounted } from 'vue';
  import { gettingAuth, db } from '../firebase';
  import { doc, setDoc, updateDoc, arrayUnion, arrayRemove, getDoc } from "firebase/firestore"; 
  import users from '../views/Login.vue';
  import { getAuth } from "firebase/auth";
  import axios from 'axios';
  import { useToast } from 'vue-toastification';

export default {
  name: 'Movies',
  setup() {
    const baseUrlPoster = ref('https://image.tmdb.org/t/p/w500');
    const user = ref(null);
    const movies = ref([]); // Film verilerini tutacak reaktif değişken
    // https://api.themoviedb.org/3/movie/519182?language=en-US&api_key=5121c69959e2b598070cef210e2509c5
    // Film verilerini getiren asenkron fonksiyon
    const fetchMovies = async (movieIds) => {
      try {
        console.log('Fetching movies with ids:', movieIds);
        const promises = movieIds.map(id => axios.get(`https://api.themoviedb.org/3/movie/${id}?language=en-US&api_key=5121c69959e2b598070cef210e2509c5`));
        const responses = await Promise.all(promises);
        movies.value = responses.map(response => response.data);
        console.log('Fetched movies:', movies.value);
      } catch (error) {
        console.error('Error fetching movie data:', error);
      }
    };

    onMounted(() => {
      // Kullanıcı verilerini al
      gettingAuth.onAuthStateChanged((currentUser) => {
          user.value = currentUser;
        // console.log("kullanıcı bilgileri", user.value.uid)
        });
      // localStorage'den kullanıcı verisini al
      const storedUser = localStorage.getItem('user');
      if (storedUser) {
        const user = JSON.parse(storedUser);
        console.log('Parsed user:', user);
        if (user.movies && user.movies.length > 0) {
          fetchMovies(user.movies); // Film verilerini getirme fonksiyonunu çağır
        }
      }
    });

    // Bileşenin verilerini getiren fonksiyon
    const removeMovie = async (movieId) => {
      const index = movies.value.findIndex(movie => movie.id === movieId);
      if (index !== -1) {

        const toast = useToast();
            const success = true;

            if (success) {
                // İşlem başarılıysa bir başarı bildirimi göster
                toast.error("Movie Deleted!!", {
                  position: "top-right",
                  timeout: 2000,
                  closeOnClick: true,
                  pauseOnHover: true,
                });
              } else {
                // İşlem başarısız olursa bir hata bildirimi göster
                toast.error("Movie Could Not Be Deleted!", {
                  position: "top-right",
                  timeout: 2000,
                  closeOnClick: true,
                  pauseOnHover: true,
                });
              }
        movies.value.splice(index, 1);
        console.log("kullanıcı bilgileri", user.value.uid)
                
         const movieRef = doc(db, "users", user.value.uid);
          console.log(movieRef)
          await updateDoc(movieRef, {
           movies: arrayRemove(movieId)
           
        });
        console.log("Firestore'dan silindi: ", movieId)

        const storedUser = JSON.parse(localStorage.getItem('user')) || [];
        console.log("stored user is: ", storedUser)
        storedUser.movies = storedUser.movies.filter(id => id !== movieId);
        localStorage.setItem('user', JSON.stringify(storedUser));
        console.log("Movie removed from localStorage:", movieId);
      }
    };

        // Bileşen yüklendiğinde çalışacak fonksiyon

    return { 
      movies,
      baseUrlPoster,
      removeMovie
     };
  }
};

</script>

<style scoped>
.container {
  display: flex;
  flex-wrap: wrap;
  margin-top: 20px;
}
.container li {
  list-style-type: none;
  padding: 10px;
  text-align: center;
  transition: 300ms all ease-in-out;
}
.container li:hover {
  cursor: pointer;
  scale: 1.1;
}
.container li img {
  width: 195px;
}
.profileDescription {
  margin-top: 100px;
  color: #fff;
}
.profileDescription h4 {
  font-weight: 400;
}
.profileDescription h5 {
  font-weight: 400;
  font-size: 16px;
  color: #ddd;
}
</style>