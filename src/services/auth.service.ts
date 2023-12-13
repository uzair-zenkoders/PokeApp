// local auth import
import { auth } from "./firebase-config";

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
  const result = await signInWithPopup(auth, provider);
  // Set the token as a cookie
  const { user } = result;
  // Extract necessary user information
  const { displayName, email, photoURL } = user;
  const tokenId = await user.getIdToken();
  // Store user details in a cookie
  const userData = {
    displayName,
    email,
    tokenId,
    photoURL,
  };

  // Set the user cookie
  cookies.set("userData", JSON.stringify(userData));
  // console.log("Signed in user:", user);
  //now we will get it in our UI
  return userData;
};

//create a user withEmailandPassword
export const normalSignup = async (email: string, password: string) => {
  const userCredential = await createUserWithEmailAndPassword(
    auth,
    email,
    password
  );
  const user = userCredential.user;
  // console.log("User signed up:", user);
};

//signinWithEmailandPassword Function
export const signInWithEmailPassword = async (
  email: string,
  password: string
) => {
  const cookies = new Cookies();
  const userCredential = await signInWithEmailAndPassword(
    auth,
    email,
    password
  );
  const user = userCredential.user;
  // Handle successful sign-in
  // console.log("User signed in:", user);
  const { displayName, photoURL } = user;
  const tokenId = await user.getIdToken();
  // Store user details in a cookie
  const userData = {
    displayName,
    email,
    tokenId,
    photoURL,
  };
  // Set the user cookie
  cookies.set("userData", JSON.stringify(userData));
  //returning so that it is accessible on FE pages
  return userData;
};

//funcion for signOut user
export const userSignOut = async () => {
  const cookies = new Cookies();
  // try {
  await signOut(auth);
  cookies.remove("userData");
  // console.log("User signed out");
};
