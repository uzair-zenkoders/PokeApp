// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries
import { getFirestore } from "firebase/firestore";
import { getAuth, GoogleAuthProvider } from "firebase/auth";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyASv3z9hHIeJFbitRd_ckkmB9SV-CLsiJY",
  authDomain: "pokeapp-210a0.firebaseapp.com",
  projectId: "pokeapp-210a0",
  storageBucket: "pokeapp-210a0.appspot.com",
  messagingSenderId: "263622196031",
  appId: "1:263622196031:web:b6dd7b35991fae0393718a",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);
export const provider = new GoogleAuthProvider();
