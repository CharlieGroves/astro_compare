// Import the functions you need from the SDKs you need
import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import 'firebase/compat/firestore';
import { getFirestore } from 'firebase/firestore';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCtZQ5gSYSTW7H7F4FMdZmDMicntzPhvak",
  authDomain: "astro-compare-dev.firebaseapp.com",
  projectId: "astro-compare-dev",
  storageBucket: "astro-compare-dev.appspot.com",
  messagingSenderId: "460663490978",
  appId: "1:460663490978:web:5dd536a9b8c3adbe1a0afb"
};

// Initialize Firebase
const app = firebase.initializeApp(firebaseConfig);
export const db = getFirestore(app);

export default firebase;