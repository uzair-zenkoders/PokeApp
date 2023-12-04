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

//cookie import
import Cookies from "universal-cookie";

//signinWithGoogle
export const signInWithGoogle = async () => {
  const cookies = new Cookies();
  const provider = new GoogleAuthProvider();
  try {
    const result = await signInWithPopup(auth, provider);
    // Handle signed-in user
    // Set the token as a cookie
    const { user } = result;

    // Extract necessary user information
    const { displayName, email } = user;
    const tokenId = await user.getIdToken();

    // Store user details in a cookie
    const userCookie = {
      displayName,
      email,
      tokenId,
    };

    // Set the user cookie
    cookies.set("userData", JSON.stringify(userCookie), { path: "/" });

    console.log("Signed in user:", user);
  } catch (error) {
    // Handle errors
    console.error("Google Sign-In Error:", error);
  }
};

//create a user withEmailandPassword
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

//signinWithEmailandPassword Function
export const signInWithEmailPassword = async (
  email: string,
  password: string
) => {
  const cookies = new Cookies();
  try {
    const userCredential = await signInWithEmailAndPassword(
      auth,
      email,
      password
    );
    const user = userCredential.user;
    // Handle successful sign-in
    console.log("User signed in:", user);
    const { displayName } = user;
    const tokenId = await user.getIdToken();

    // Store user details in a cookie
    const userCookie = {
      displayName,
      email,
      tokenId,
    };

    // Set the user cookie
    cookies.set("userData", JSON.stringify(userCookie), { path: "/" });
  } catch (error) {
    // Handle sign-in errors
    console.error("Sign-in error:", error);
  }
};

//funcion for signOut user
export const userSignOut = async () => {
  const cookies = new Cookies();
  try {
    await signOut(auth);
    cookies.remove("userData", { path: "/" });

    // Handle successful sign-out
    console.log("User signed out");
    // Redirect or perform actions after successful sign-out
  } catch (error) {
    // Handle sign-out errors
    console.error("Sign-out error:", error);
  }
};
