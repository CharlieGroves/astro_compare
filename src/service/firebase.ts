// Import the functions you need from the SDKs you need
import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import 'firebase/compat/firestore';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBhUWAd7X7MVPeAlxBQ057oDe_spCGUuls",
  authDomain: "astro-compare.firebaseapp.com",
  projectId: "astro-compare",
  storageBucket: "astro-compare.appspot.com",
  messagingSenderId: "244375867960",
  appId: "1:244375867960:web:a379810c09211d70b10ccd"
};

// Initialize Firebase
const app = firebase.initializeApp(firebaseConfig);

export default firebase;