//importing axios
import axios from "axios";

//react imports
import { useCallback, useState } from "react";
import { getSession, signIn } from "next-auth/react";

//Next Imports
import { NextPageContext } from "next";
import { useRouter } from "next/router";

//icon(s) import
import { FcGoogle } from "react-icons/fc";

//local component import
import Input from "../components/Input";

//importing signinwithgoogle
import {
  signInWithGoogle,
  normalSignup,
  signInWithEmailPassword,
} from "../services/auth.service";

const Auth = () => {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const [variant, setVariant] = useState("login");

  //toggle function for login/signup
  const toggleVariant = useCallback(() => {
    setVariant((currentVariant) =>
      currentVariant === "login" ? "register" : "login"
    );
  }, []);

  //login button function
  const login = useCallback(async () => {
    try {
      await signInWithEmailPassword(email, password);
      router.push("/");
    } catch (error) {
      console.log(error);
    }
  }, [email, password, router]);

  //register button function
  const register = useCallback(async () => {
    try {
      await normalSignup(email, password);

      login();
    } catch (error) {
      console.log(error);
    }
  }, [email, name, password, login]);

  return (
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
                onChange={(e: any) => setName(e.target.value)}
              />
            )}
            <Input
              id="email"
              type="email"
              label="Email address"
              value={email}
              onChange={(e: any) => setEmail(e.target.value)}
            />
            <Input
              type="password"
              id="password"
              label="Password"
              value={password}
              onChange={(e: any) => setPassword(e.target.value)}
            />
          </div>
          <button
            onClick={variant === "login" ? login : register}
            className="bg-red-600 py-3 text-white rounded-md w-full mt-10 hover:bg-red-700 transition"
          >
            {variant === "login" ? "Login" : "Sign up"}
          </button>
          <div className="flex flex-row items-center gap-4 mt-8 justify-center">
            <div
              onClick={signInWithGoogle}
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
    </div>
  );
};

export default Auth;

export async function getServerSideProps(context: NextPageContext) {
  const session = await getSession(context);

  if (session) {
    return {
      redirect: {
        destination: "/",
        permanent: false,
      },
    };
  }

  return {
    props: {},
  };
}
