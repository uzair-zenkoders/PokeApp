//react imports
import { Fragment, useCallback, useState } from "react";
import { ChangeEvent } from "react";

//Next Imports
import { useRouter } from "next/router";

//icon(s) import
import { FcGoogle } from "react-icons/fc";

//local component import
import Input from "../components/Input";

//loader import
import Spinner from "../components/Spinner";

//formik Import
import { useFormik } from "formik";

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

//Formik(yup) Schema import
// import { basicSchema } from "@/schemas/registerSchema";

//reducer(s) import
import { logIn } from "../redux/Slices/userSlice";

import * as yup from "yup";

const Auth = () => {
  const router = useRouter();
  //--now formik handeling these--/
  // const [email, setEmail] = useState("");
  // const [name, setName] = useState("");
  // const [password, setPassword] = useState("");
  const [variant, setVariant] = useState("login");
  const [isLoading, setIsLoading] = useState(false);

  const initialValues = {
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
  };

  const onSubmit = async () => {
    if (variant === "login") {
      await login();
    } else {
      await register();
    }
  };


  //Validation Schema
  const vSchema = yup.object().shape({
    //USERNAME
    username:
      variant === "login"
        ? yup.string()
        : yup.string().min(4).required("Required"),
        //EMAIL
    email: variant === "login"
    ? yup.string().required("required").email("enter a valid email")
    :yup
      .string()
      .email("Please enter a valid email")
      .required("Required"),
      //PASSWORD
    password: variant==="login"?yup.string().required("Required"):yup
      .string()
      .min(5)
      .matches(/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{5,}$/, {
        message:
          "min 5 characters, 1 upper case letter, 1 lower case letter, 1 numeric digit  ",
      })
      .required("Required"),
      //CONFIRM PASSWORD  
    confirmPassword:
      variant === "login"
        ? yup.string()
        : yup
            .string()
            .nullable()
            .oneOf([yup.ref("password"), null], "Passwords must match")
            .required("Required"),
  });

  //formik
  const formik = useFormik({
    initialValues,
    validationSchema: vSchema,
    onSubmit,
  });

  console.log(formik.errors);

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

  // --(email-pass) login button function--
  const login = useCallback(async () => {
    try {
      setIsLoading(true);
      const signIn = await signInWithEmailPassword(
        formik.values.email,
        formik.values.password
      );
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
  }, [formik.values.email, formik.values.password, router]);

  // --register button function--
  const register = useCallback(async () => {
    try {
      setIsLoading(true);
      await normalSignup(formik.values.email, formik.values.password);
      setIsLoading(false);
      toast.success("Registration sucessful");
      //togle Varient
      toggleVariant();
    } catch (error) {
      // console.log(error);
      setIsLoading(false);
      toast.error("Registration not successful");
    }
  }, [
    formik.values.email,
    formik.values.username,
    formik.values.password,
    login,
    toggleVariant,
  ]);

  // console.log(
  //   "formik error values",
  //   formik.errors,
  //   formik.touched,
  //   formik.values
  // );

  return (
    <Fragment>
      <div>
        <div className="flex justify-center py-20 sm:pl-0 sm:pr-0 pl-3 pr-3">
          <div className="bg-black bg-opacity-70 px-16 py-16 self-center mt-2 lg:w-2/5 lg:max-w-md rounded-md w-full">
            <h2 className="text-white text-4xl mb-8 font-semibold">
              {variant === "login" ? "Sign in" : "Register"}
            </h2>
            <form onSubmit={formik.handleSubmit} autoComplete="off">
              <div className="flex flex-col gap-4">
                {variant === "register" && (
                  <Input
                    id="username"
                    type="text"
                    label="Username"
                    value={formik.values.username}
                    onChange={formik.handleChange} //
                    onBlur={formik.handleBlur}
                    error={
                      formik.errors.username && formik.touched.username
                        ? true
                        : false
                    }
                  />
                )}
                {variant === "register" &&
                  formik.errors.username &&
                  formik.touched.username && (
                    <p className="text-sm text-red-600">
                      {formik.errors.username}
                    </p>
                  )}

                <Input
                  id="email"
                  type="email"
                  label="Email address"
                  value={formik.values.email}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  error={
                    formik.errors.email && formik.touched.email ? true : false
                  }
                />
                {formik.errors.email && formik.touched.email && (
                  <p className="text-sm text-red-600">{formik.errors.email}</p>
                )}

                <Input
                  type="password"
                  id="password"
                  label="Password"
                  value={formik.values.password} // !!REQURED ==> true
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  error={
                    formik.errors.password &&
                    formik.touched.password 
                    // && variant !== "login"
                      ? true
                      : false
                  }
                />
                {/* {variant === "register" && */}
                {
                  formik.errors.password &&
                  formik.touched.password && (
                    <p className="text-sm text-red-600">
                      {formik.errors.password}
                    </p>
                  )}

                {variant === "register" && (
                  <Input
                    type="password"
                    id="confirmPassword"
                    label="Confirm Password"
                    value={formik.values.confirmPassword}
                    onChange={formik.handleChange} //
                    onBlur={formik.handleBlur}
                    error={
                      formik.errors.confirmPassword &&
                      formik.touched.confirmPassword
                        ? true
                        : false
                    }
                  />
                )}
                {variant === "register" &&
                formik.errors.confirmPassword &&
                formik.touched.confirmPassword ? (
                  <div className="text-sm text-red-600">
                    {formik.errors.confirmPassword}
                  </div>
                ) : null}
              </div>
              <button
                // onClick={variant === "login" ? login : register}
                type="submit"
                // disabled={isLoading}
                disabled={formik.isSubmitting}
                className={` ${
                  isLoading
                    ? "bg-white"
                    : "bg-red-600  hover:bg-red-700 transition"
                } py-3 text-white rounded-md w-full mt-10 `}
              >
                {isLoading ? <Spinner /> : variant}
              </button>
            </form>
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
                ? "First time using PokeApp?"
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
    </Fragment>
  );
};

export default Auth;
