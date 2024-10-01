<template>
    <div class="searchBar">

        <!-- Search input -->
         <h3>Search Movie </h3>
        <input 
        type="text"
        v-model="query"
        @input="searchMovies"
        placeholder="Search for a movie..."
        />

        <div v-if="results.length" class="results">
            <ul>
                <li v-for="movie in results" :key="movie.id" @click="openModal(movie)">
                  {{ movie.title }}
                </li>
            </ul>
        </div>
    </div>

    <MovieModal 
      v-if="selectedMovie" 
      :movie="selectedMovie" 
      :isVisible="isModalVisible" 
      :baseUrlPoster="baseUrlPoster" 
      @close="closeModal" 
    />
</template>

<script>
import axios from 'axios';
import MovieModal from './MovieModal.vue';
export default {
    components: {
        MovieModal
    },

    data() {
        return {
            query: '',
            results: [],
            selectedMovie: null,
            isModalVisible: false,
            baseUrlPoster: 'https://image.tmdb.org/t/p/original/',
        };
    },

    methods: {
        async searchMovies() {
        if (this.query.length > 2) {
            axios.get(`https://api.themoviedb.org/3/search/movie?api_key=5121c69959e2b598070cef210e2509c5&query=${this.query}`)
            .then(response => {
                this.results = response.data.results;
            })
            .catch(error => {
                console.error('Error fetching data:', error);
            })
        } else {
            this.results = [];
        }
    },

    openModal(movie) {
      this.selectedMovie = movie; // Seçilen filmi kaydediyoruz
      this.isModalVisible = true; // Modalı görünür yapıyoruz
    },
    closeModal() {
      this.isModalVisible = false; // Modalı kapatıyoruz
      this.selectedMovie = null; // Seçilen filmi temizliyoruz
    }
}
};

</script>
<style>
.searchBar {
  padding: 0px;
  display: flex;
  position: relative;
}

.searchBar input {
  width: 80%;
  padding: 10px;
  font-size: 16px;
  background: none;
  border: none;
  border-bottom: 1px solid #ec995a;
  border-radius: 10px;
  color: #fff;
  position: relative;
}

.searchBar input:active,
.searchBar input:focus,
.searchBar input:focus-visible,
.searchBar input:target {
  border: 1px solid #ec995a !important;
}
.searchBar h3 {
  color: #ec995a;
  padding-right: 40px;
  position: relative;
}
.searchBar h3::before {
  content: '';
  position: absolute;
  left: -20px;
  top: 0;
  width: 10px;
  height: 40px;
  border-left: 10px solid #ec995a;
}
.results ul {
  list-style-type: none;
  padding: 0;
  position: absolute;
  left: 50%;
  transform: translateX(-50%);
  width: 40%;
  top: 80px;
  height: 400px;
  overflow-y: scroll;
  overflow-x: hidden;
  background-color: #242832;
  -webkit-box-shadow: 0px 5px 10px 0px rgba(0,0,0,0.75);
-moz-box-shadow: 0px 5px 10px 0px rgba(0,0,0,0.75);
box-shadow: 0px 5px 10px 0px rgba(0,0,0,0.75);
  z-index: 999;
  color: #fff;
}

.results ul::-webkit-scrollbar {
  width: 10px;
}
.results ul::-webkit-scrollbar-track {
  background: #242832;
}
.results ul::-webkit-scrollbar-thumb {
  background: orange;
}
.results li {
  padding: 5px 0;
  border-bottom: 1px solid #cccccc38;
  padding: 10px 20px;
}

</style>