import { getFirestore } from "firebase/firestore";
// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAvCCqpxnkmN6AniGG6j4_XTSOFfnoe1z4",
  authDomain: "movie-auth-947c1.firebaseapp.com",
  projectId: "movie-auth-947c1",
  storageBucket: "movie-auth-947c1.appspot.com",
  messagingSenderId: "223689473885",
  appId: "1:223689473885:web:69f22d0c866a35accc72b4"
};

const app = initializeApp(firebaseConfig);
const gettingAuth = getAuth(app);
const db = getFirestore(app);

export { gettingAuth, db }