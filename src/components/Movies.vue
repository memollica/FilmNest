<template>
  <div class="container">
    <div>
      <h2 class="moviesTitle">Latest Populer Movies</h2>
      <div class="container" v-if="movies.length">
        <div class="row">
            <div class="col-md-2 col-sm-2" v-for="movie in movies" :key="movie.id">
                <img :src="baseUrlPoster + movie.poster_path" alt=""@click="addToLibrary(movie)" >
                <p>{{ movie.title }}</p>              
            </div>

    <div class="pagination">
      <button class="btn btn-prev" @click="prevPage" :disabled="page === 1">Önceki</button>
      <span>Sayfa {{ page }}</span>
      <button class="btn btn-next"@click="nextPage" :disabled="page * 20 >= totalResults">Sonraki</button>
    </div>
        </div>
      </div>
      <div v-else>
        Loading...
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
  import { Carousel, Slide, Pagination, Navigation } from 'vue3-carousel'
  import 'vue3-carousel/dist/carousel.css'
  import MovieCarousel from './MovieCarousel.vue';
  import { useToast } from 'vue-toastification';


  export default {
    name: 'Movies',
    name: 'AddToLibrary',
    name: 'users',
    name: 'Home',

    components: {
      Carousel,
      Slide,
      Pagination,
      Navigation,
      MovieCarousel
    },

    setup() {
      const movies = ref([]);
      const user = ref(null);
      const baseUrlPoster = ref('https://image.tmdb.org/t/p/w500');
      const page = ref(1);
      console.log("page value: " +page.value)
      const totalResults = ref(0);
  
      const options = {
        method: 'GET',
        headers: {
          accept: 'application/json',
          Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI1MTIxYzY5OTU5ZTJiNTk4MDcwY2VmMjEwZTI1MDljNSIsIm5iZiI6MTcyMTEzOTQxMC41MDczODIsInN1YiI6IjYyNWFkYzRmOTQwOGVjMDA5YTA1ZDBhZSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.IHvFGV3h5T-3IyutvkrJMXvW5BhO5T3rWLiY5fz171U'
        }
      };
  
      const fetchMovies = async () => {
        try {
          const response = await fetch(`https://api.themoviedb.org/3/discover/movie?include_adult=true&include_video=false&language=en-US&page=${page.value}&sort_by=popularity.desc&api_key=5121c69959e2b598070cef210e2509c5`, options);
          const data = await response.json();
          movies.value = data.results;
          totalResults.value = data.total_results;
        } catch (error) {
          console.error('Error fetching movies:', error);
        }
      };

      onMounted(() => {
        fetchMovies();
        gettingAuth.onAuthStateChanged((currentUser) => {
          user.value = currentUser;
        });
      });

      const addToLibrary =  async (id) => {
        if (user.value) {
          const movieRef = doc(db, "users", user.value.uid);
          try {
            const toast = useToast();
            const success = true;

            if (success) {
                // İşlem başarılıysa bir başarı bildirimi göster
                toast.success("Movie added to library!", {
                  position: "top-right",
                  timeout: 2000,
                  closeOnClick: true,
                  pauseOnHover: true,
                });
              } else {
                // İşlem başarısız olursa bir hata bildirimi göster
                toast.error("Failed to add movie to library!", {
                  position: "top-right",
                  timeout: 2000,
                  closeOnClick: true,
                  pauseOnHover: true,
                });
              }

            const docSnap = await getDoc(movieRef); // dökümanı alıyoruz

            if (docSnap.exists()) {
              const userData = docSnap.data().movies || [];
              // eğer film yoksa ekliyoruz
              if (!userData.includes(id.id)) {
              await updateDoc(movieRef, {
                 movies: arrayUnion(id.id)
            });
              console.log("Film başarıyla eklendi: ", id.id);
              }
              else {
                console.log("Film zaten ekli: ", id.id);
              }
            }

            const storedUser = localStorage.getItem('user') || [];
              if (!storedUser.includes(id.id)) {
                const user = JSON.parse(storedUser);
                if (!user.movies) {
                  user.movies = [];
                }
                user.movies.push(id.id);
                localStorage.setItem('user', JSON.stringify(user));
                console.log("Movie added to localStorage:", id.id);
              }

          } catch (error) {
            console.error("Error adding movie to database:", error);
          }
        }
          else {
            console.log("User not logged in");
            alert("User not logged in");
          }
        }


      const prevPage = () => {
        if (page.value > 1) {
          page.value--;
          fetchMovies();
        }
      };

      const nextPage = () => {
        if (page.value < totalResults.value) {
          page.value++;
          fetchMovies();
        };
      };
      

  
      return {
        movies,
        baseUrlPoster,
        addToLibrary,
        page,
        totalResults,
        prevPage,
        nextPage
      };
    }
  };
  </script>
  
  <style scoped>
  /* CSS stiliniz buraya gelecek */
  .col-md-2 {
    color: #fff;
    position: relative;
  }
  .col-md-2 img {
    width: 100%;
    transition: 300ms all ease-in-out;
  }
  .col-md-2 img:hover {
    scale: 1.1;
    cursor: pointer;
  }
  .moviesTitle {
    color: #fff;
    padding-left: 10px;
    font-weight: 400;
    margin-top: 50px;
    margin-bottom: 30px;
  }
  .pagination {
    margin: auto;
    display: flex;
    justify-content: center;
    align-items: center;
  }
  .pagination span {
    color: #fff;
    padding: 10px;
  }
  .btn-prev, .btn-next {
    background-color: #ec995a;
    color: #fff;
    border: none;
  }
  @media (max-width: 500px) {
    .col-md-2 {
      width: 100% !important
    }
  }
  </style>