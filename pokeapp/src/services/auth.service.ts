// db/auth import
import { db, auth } from "./firebase-config";

//firebase auth imports
import {
  GoogleAuthProvider,
  signInWithPopup,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
} from "firebase/auth";

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

export const normalSignup = async (email: string, password: string) => {
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

export const signInWithEmailPassword = async (
  email: string,
  password: string
) => {
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

export const userSignOut = async () => {
  try {
    await signOut(auth);
    // Handle successful sign-out
    console.log("User signed out");
    // Redirect or perform actions after successful sign-out
  } catch (error) {
    // Handle sign-out errors
    console.error("Sign-out error:", error);
  }
};
