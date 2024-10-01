import './assets/main.css'
import "bootstrap/dist/css/bootstrap.min.css"
import "bootstrap"
import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import { db } from './firebase'
import { collection, getDocs } from 'firebase/firestore'

import { library } from '@fortawesome/fontawesome-svg-core'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
import { faCoffee } from '@fortawesome/free-solid-svg-icons'
import { faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons'
import {faUser} from '@fortawesome/free-solid-svg-icons'
import {faGoogle } from '@fortawesome/free-brands-svg-icons'
import { faVuejs } from '@fortawesome/free-brands-svg-icons'
import Toast from "vue-toastification";
import "vue-toastification/dist/index.css";

library.add(faVuejs)
library.add(faGoogle)
library.add(faCoffee)
library.add(faMagnifyingGlass)
library.add(faUser)

import VueCarousel from 'vue-carousel';


const app = createApp(App)
// app.component("v-icon", OhVueIcon);
app.component("font-awesome-icon", FontAwesomeIcon);
app.component('VueCarousel', VueCarousel);
// app.component('Toast', Toast)
app.use(Toast)
app.use(router)

app.mount('#app')



