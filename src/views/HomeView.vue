
<template>
    <router-view></router-view>
  <div class="container-fluid">
    <div class="container heading">
      <div class="row">
        <div class="jumbo" v-if="responseData">
          <h1>{{ responseData.title }}</h1>
          <div class="genres">
            <div class="genreNames" v-for="genre in responseData.genres">
              {{ genre.name }}
            </div>
          </div>

          <div class="features">
            <div class="feature">
              <div class="featureName">{{responseData.release_date}}</div>
            </div>
            <div class="feature">
              <div class="featureName">Point: {{ responseData.vote_average }}</div>
            </div>
            <div class="feature">
               <div class="featureName">{{ responseData.runtime }} minute</div> 
            </div>
          </div>
        </div>
        <div v-else>
          <p>Loading...</p>
        </div>
      </div>
    </div>
    <div class="gradient"></div> <!-- Gradient background   -->

    <div class="bgImage">
        <div v-if="responseData">
          <img :src="baseUrl + responseData.backdrop_path" alt="">
        </div>
        <div v-else>
          <p>Loading...</p>
        </div>
    </div>
  </div>

  <div class="container">
        <div class="col-md-12">
          <MovieCarousel />
        </div>
  </div>


<div class="container">
  <div class="col-md-12">
    <SearchMovie />
  </div>
</div>


  <!-- Movie componenti -->
  <Movies />

</template>
<script>

import TheWelcome from '../components/TheWelcome.vue'
import Movies from '../components/Movies.vue'
import axios from 'axios';
import { ref, onMounted} from 'vue';
import { collection, doc, getDocs } from "firebase/firestore"; 
import { gettingAuth, db } from '../firebase';
import SearchMovie from '../components/SearchMovie.vue';
import MovieCarousel from '@/components/MovieCarousel.vue';

export default {
  components: {
    Movies,
    SearchMovie,
    MovieCarousel
  },

  data() {
    return {
      responseData: null,
      baseUrl: 'https://image.tmdb.org/t/p/original/'
    };
  },
  async mounted() {
    try {
      let response = await axios.get('https://api.themoviedb.org/3/movie/519182?language=en-US&api_key=5121c69959e2b598070cef210e2509c5');
      this.responseData = response.data;
      console.log(this.responseData);
    } catch (error) {
      console.error('Error fetching data:', error);
    }

  },

// bu koddan aşağısı veritabanından localStorage e kayıt edilen ve sonra ekrana yazdıran kod

  setup() {
    const user = ref(null);
    onMounted(() => {
      const storedUser = localStorage.getItem('user');
      if (storedUser) {
        user.value = JSON.parse(storedUser);
      }  
    });

    return { user };
  }
}
</script>
<style>
  body {
    background-color: #242832;
  }
  .container-fluid {
    overflow: hidden;
    margin: 0;
    padding: 0;
    width: 100%;
    height: 700px;
    position: relative;
    margin-top: -150px;
  }
  .container-fluid img {
    width: 100%;
    object-fit: cover;
    opacity:15;
  }
  .gradient {
    background: rgb(36,40,50);
    background: linear-gradient(90deg, rgba(36,40,50,0.9) 20%, rgba(245,198,146,0) 100%);
    width: 100%;
    height: 700px;
    position: absolute;
    z-index: -1;
  }
  .heading {
    position: absolute;
    z-index: 2;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    width: 450px;
  }
  .jumbo {
    text-align: center;
  }
  .jumbo h1 {
    font-size: 60px;
    color: #fff;
    font-family: 'Lucida Sans', 'Lucida Sans Regular', 'Lucida Grande', 'Lucida Sans Unicode', Geneva, Verdana, sans-serif;
    text-transform: uppercase;
    font-weight: 600;
    width: 400px
  }
  .jumbo .genres {
    display: flex;
    color: #fff;
    width: 400px;
    justify-content:center;
    color: #ddd;
    font-style: italic;
  }
  .genres .genreNames {
    padding-right: 10px;
  }
  .features {
    width: 600px;
    display: flex;
    justify-content: center;
    color: #fff;
    margin-left: -80px;
  }
  .feature {
    border: 1px solid #fff;
    padding: 10px 20px;
    font-size: 18px;
    border-radius: 50px;
    margin-top:30px;
    margin-right: 20px;
  }
.bgImage {
  position: relative;
  z-index: -5 !important;
}
  /* @media (max-width: 991px) {
    .container-fluid {
    margin-top: -90px;
    }
  } */
  @media (max-width: 431px) {
    .heading {
      top: 20%;
    }
    .heading h1 {
      font-size: 40px ;
    }
    .heading .feature {
      font-size: 14px
    }
    .container-fluid {
      height: 400px !important;
    }
   }
   @media (max-width: 991px) {
    .heading {
      top: 30%;
  }
   }

   
</style>