// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries
import { getFirestore, collection, addDoc } from "firebase/firestore";
import { getAuth } from "firebase/auth";

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
export const db = getFirestore(app);
export const auth = getAuth(app);

export const signInWithGoogle = async () => {
  const provider = new GoogleAuthProvider();
  try {
    const result = await signInWithPopup(auth, provider);
    const user = result.user;
    // Handle signed-in user
    console.log("Signed in user:", user);
  } catch (error) {
    // Handle errors
    console.error("Google Sign-In Error:", error);
  }
};

export const normalSignup = async (email, password) => {
  try {
    const userCredential = await createUserWithEmailAndPassword(
      auth,
      email,
      password
    );
    const user = userCredential.user;
    // Handle successful sign-up
    console.log("User signed up:", user);
  } catch (error) {
    // Handle sign-up errors
    console.error("Sign-up error:", error);
  }
};

export const signInWithEmailPassword = async (email, password) => {
  try {
    const userCredential = await signInWithEmailAndPassword(
      auth,
      email,
      password
    );
    const user = userCredential.user;
    // Handle successful sign-in
    console.log("User signed in:", user);
    // Redirect or perform actions after successful sign-in
  } catch (error) {
    // Handle sign-in errors
    console.error("Sign-in error:", error);
  }
};

// export const signInWithGoogle = () => {
//   signInWithPopup(auth, provider)
//     .then(async (result) => {
//       const name = result.user.displayName;
//       const email = result.user.email;
//       const profilePic = result.user.photoURL;
//       console.log(result);

//       // Store user data in Firestore collection 'user'
//       const userRef = collection(db, "user");
//       await addDoc(userRef, {
//         name,
//         email,
//         profilePic,
//       });

//       console.log("User data stored in Firestore successfully:", result);
//     })
//     .catch((error) => {
//       console.log(error);
//     });
// };
