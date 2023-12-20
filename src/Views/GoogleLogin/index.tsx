//react-hot-toast import(S)
import toast from "react-hot-toast";

//importing signinwithgoogle firebase servive
import {
    signInWithGoogle,
} from "../../services/auth.service";

import React, { Fragment } from 'react'

//redux import(s)
import { useDispatch } from "react-redux";
import { logIn } from "@/redux/Slices/userSlice";

//next import(s)
import { useRouter } from "next/router";

//icon import(s)
import { FcGoogle } from "react-icons/fc";

////////////////////////////////
const GoogleSignInView = () => {
    //dispatch
    const dispatch = useDispatch()
    //router
    const router = useRouter()

    //google button signin function
    const handleGoogleSignIn = async () => {
        try {
            //   setIsLoading(true);
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
            //   setIsLoading(false);
            console.error("Google Sign-In Error:", error);
            toast.error("Something went wrong, please try again!");
        }
    };

    return (<Fragment>
        <div className="flex flex-row items-center gap-4 mt-8 justify-center">
              <div
                onClick={handleGoogleSignIn}
                className="w-10 h-10 bg-white rounded-full flex items-center justify-center cursor-pointer hover:opacity-80 transition"
              >
                <FcGoogle size={32} />
              </div>
            </div>
    </Fragment>
    )
}

export default GoogleSignInView