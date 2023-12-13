//react imports
import { useCallback, useState } from "react";
import { ChangeEvent } from "react";

//Next Imports
import { useRouter } from "next/router";

//icon(s) import
import { FcGoogle } from "react-icons/fc";

//local component import
import Input from "../components/Input";

//loader import
import Spinner from "../components/Spinner";

//importing signinwithgoogle
import {
  signInWithGoogle,
  normalSignup,
  signInWithEmailPassword,
} from "../services/auth.service";

//react-hot-toast import
import toast, { Toaster } from "react-hot-toast";

// react-redux/redux-store imports
import { useDispatch } from "react-redux";
import { AppDispatch } from "@/redux/store";

//reducer(s) import
import { logIn } from "../redux/Slices/userSlice";

const Auth = () => {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const [variant, setVariant] = useState("login");
  const [isLoading, setIsLoading] = useState(false);

  //useDispatch
  const dispatch = useDispatch<AppDispatch>();

  //toggle function for login/signup
  const toggleVariant = useCallback(() => {
    setVariant((currentVariant) =>
      currentVariant === "login" ? "register" : "login"
    );
  }, []);

  //google button signin function
  const handleGoogleSignIn = async () => {
    try {
      setIsLoading(true);
      const gSignIn = await signInWithGoogle(); // Call the signInWithGoogle function from auth.service.ts
      // router.push("./");
      dispatch(
        // @ts-ignore
        logIn({
          tokenId: gSignIn.tokenId,
          displayName: gSignIn.displayName,
          email: gSignIn.email,
          photoURL: gSignIn.photoURL,
        })
      );
      toast.success("Signin Successful!");
      router.push("/"); // Redirect after successful sign-in
    } catch (error) {
      setIsLoading(false);
      console.error("Google Sign-In Error:", error);
      toast.error("Something went wrong, please try again!");
    }
  };

  //(email-pass) login button function
  const login = useCallback(async () => {
    try {
      setIsLoading(true);
      const signIn = await signInWithEmailPassword(email, password);
      //now state update in redux
      dispatch(
        // @ts-ignore
        logIn({
          tokenId: signIn.tokenId,
          displayName: signIn.displayName,
          email: signIn.email,
          photoURL: signIn.photoURL,
        })
      );
      router.push("/");
      setIsLoading(false);
      toast.success("Signin Successful");
    } catch (error) {
      // console.log(error);
      setIsLoading(false);
      toast.error("Error signing in, please Try again");
    }
  }, [email, password, router]);

  //register button function
  const register = useCallback(async () => {
    try {
      setIsLoading(true);
      await normalSignup(email, password);
      setIsLoading(false);
      toast.success("Registration sucessful");
      //togle Varient
      toggleVariant();
    } catch (error) {
      // console.log(error);
      setIsLoading(false);
      toast.error("Registration not successful");
    }
  }, [email, name, password, login]);

  return (
    <>
      <div>
        <div className="flex justify-center py-20 sm:pl-0 sm:pr-0 pl-3 pr-3">
          <div className="bg-black bg-opacity-70 px-16 py-16 self-center mt-2 lg:w-2/5 lg:max-w-md rounded-md w-full">
            <h2 className="text-white text-4xl mb-8 font-semibold">
              {variant === "login" ? "Sign in" : "Register"}
            </h2>
            <div className="flex flex-col gap-4">
              {variant === "register" && (
                <Input
                  id="name"
                  type="text"
                  label="Username"
                  value={name}
                  onChange={(e: ChangeEvent<HTMLInputElement>) =>
                    setName(e.target.value)
                  }
                />
              )}
              <Input
                id="email"
                type="email"
                label="Email address"
                value={email}
                onChange={(e: ChangeEvent<HTMLInputElement>) =>
                  setEmail(e.target.value)
                }
              />
              <Input
                type="password"
                id="password"
                label="Password"
                value={password}
                onChange={(e: ChangeEvent<HTMLInputElement>) =>
                  setPassword(e.target.value)
                }
              />
            </div>
            <button
              onClick={variant === "login" ? login : register}
              disabled={isLoading}
              className={` ${
                isLoading
                  ? "bg-white"
                  : "bg-red-600  hover:bg-red-700 transition"
              } py-3 text-white rounded-md w-full mt-10 `}
            >
              {isLoading ? <Spinner /> : variant}
            </button>
            <div className="flex flex-row items-center gap-4 mt-8 justify-center">
              <div
                onClick={handleGoogleSignIn}
                className="w-10 h-10 bg-white rounded-full flex items-center justify-center cursor-pointer hover:opacity-80 transition"
              >
                <FcGoogle size={32} />
              </div>
            </div>
            <p className="text-neutral-500 mt-12">
              {variant === "login"
                ? "First time using Netflix?"
                : "Already have an account?"}
              <span
                onClick={toggleVariant}
                className="text-white ml-1 hover:underline cursor-pointer"
              >
                {variant === "login" ? "Create an account" : "Login"}
              </span>
              .
            </p>
          </div>
        </div>
        <Toaster position="top-right" reverseOrder={true} />
      </div>
    </>
  );
};

export default Auth;
