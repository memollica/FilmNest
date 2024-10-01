<template>

    <div class="container carousel">
      <div class="col-md-12">
        <carousel v-bind="settings" :breakpoints="breakpoints" :items-to-show="8" :wrap-around="true" :transition="500" :mouse-drag="false">
          <slide v-for="movie in movies" :key="movie.id">
            <img :src="baseUrlPoster + movie.poster_path" alt="" @click="addToLibrary(movie)">
          </slide>
          <template #addons>
            <navigation />
            <pagination />
          </template>
        </carousel>
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
import { useToast } from 'vue-toastification';

export default {
  name: 'Movies',
  name: 'AddToLibrary',
  name: 'users',
  name: 'Home',
  name: 'MovieCarousel',
  name: 'Breakpoints',

  components: {
    Carousel,
    Slide,
    Pagination,
    Navigation
  },

  data: () => ({
    // carousel settings
    settings: {
      itemsToShow: 8,
      snapAlign: 'center',
    },
    // breakpoints are mobile first
    // any settings not specified will fallback to the carousel settings
    breakpoints: {
      // 300 and up
      300: {
        itemsToShow: 1,
        snapAlign: 'center',
      },
      // 700px and up
      700: {
        itemsToShow: 3,
        snapAlign: 'center',
      },
      // 1024 and up
      1024: {
        itemsToShow: 4,
        snapAlign: 'center',
      },
      1440: {
        itemsToShow: 5.5,
        snapAlign: 'center'
      }
    },
  }),


  setup() {

    const movies = ref([]);
    const user = ref(null);
    const baseUrlPoster = ref('https://image.tmdb.org/t/p/w500');
    // const page = ref(1);
    // console.log("page value: " +page.value)
    // const totalResults = ref(0);

    const options = {
      method: 'GET',
      headers: {
        accept: 'application/json',
        Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI1MTIxYzY5OTU5ZTJiNTk4MDcwY2VmMjEwZTI1MDljNSIsIm5iZiI6MTcyMTEzOTQxMC41MDczODIsInN1YiI6IjYyNWFkYzRmOTQwOGVjMDA5YTA1ZDBhZSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.IHvFGV3h5T-3IyutvkrJMXvW5BhO5T3rWLiY5fz171U'
      }
    };

    const fetchMovies = async () => {
      try {
        const response = await fetch(`https://api.themoviedb.org/3/discover/movie?include_adult=true&include_video=false&language=en-US&page=90&sort_by=popularity.desc&api_key=5121c69959e2b598070cef210e2509c5`, options);
        const data = await response.json();
        movies.value = data.results;
      } catch (error) {
        console.error('Error fetching movies:', error);
      }
  
  };

  const prevPage = () => {
    if (page.value > 1) {
      page.value--;
      fetchMovies();
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

          const docSnap = await getDoc (movieRef);
          
          if (docSnap.exists()) {
            const userData = docSnap.data().movies || [];
            if (!userData.includes(id.id)) {
              await updateDoc(movieRef, {
              movies: arrayUnion(id.id)
          });
          console.log("film başarıyla eklendi", id.id);
        } else {
          console.log("film zaten ekli", id.id);
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
    


    return {
      movies,
      baseUrlPoster,
      addToLibrary,
      prevPage,

    };
  }
};
</script>

<style>
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
}.carousel__slide {
padding: 5px;
}

.carousel__viewport {
perspective: 2000px;
}

.carousel__track {
transform-style: preserve-3d;
}

.carousel__slide--sliding {
transition: 0.5s;
}

.carousel__slide {
opacity: 0.3;
transform: rotateY(-20deg) scale(0.9);
}

.carousel__slide--active ~ .carousel__slide {
transform: rotateY(20deg) scale(0.9);
}

.carousel__slide--prev {
opacity: 1;
transform: rotateY(-10deg) scale(0.95);
color: #fff !important;
fill: #fff !important;
}

.carousel__slide--next {
opacity: 1;
transform: rotateY(10deg) scale(0.95);
color: #fff !important;
fill: #fff !important;
}

.carousel__slide--active {
opacity: 1;
transform: rotateY(0) scale(1.1);
}
.carousel {
margin-top: -150px;
margin-bottom: 50px;
width: 100%;
overflow: hidden;
z-index: 2;
}
.carousel li img {
width: 200px;
padding-top: 200px;
}
.carousel li img:hover {
  cursor: pointer;
}
.carousel__icon {
    color: #fff !important;
    background-color: black;
    border-radius: 30%;
    position: relative;
    margin-top: 150px;
    width: 40px;
}

@media (max-width: 1025px) {
  .col-md-2 {
    width:20% !important;
  }
}
</style>