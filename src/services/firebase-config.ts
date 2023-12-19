// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// firebase func import(s)
import { getFirestore } from "firebase/firestore";
import { getAuth, GoogleAuthProvider } from "firebase/auth";

//web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyASv3z9hHIeJFbitRd_ckkmB9SV-CLsiJY",
  authDomain: "pokeapp-210a0.firebaseapp.com",
  projectId: "pokeapp-210a0",
  storageBucket: "pokeapp-210a0.appspot.com",
  messagingSenderId: "263622196031",
  appId: "1:263622196031:web:b6dd7b35991fae0393718a",
};

// //web app's Firebase configuration
// const firebaseConfig = {
//   apiKey: process.env.FIREBASE_API_KEY,
//   authDomain: process.env.FIREBASE_AUTH_DOMAIN,
//   projectId: process.env.FIREBASE_PROJECT_ID,
//   storageBucket: process.env.FIREBASE_STORAGE_BUCKET,
//   messagingSenderId: process.env.FIREBASE_MESSAGING_SENDER_ID,
//   appId: process.env.FIREBASE_APP_ID
// };

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);
export const provider = new GoogleAuthProvider();
