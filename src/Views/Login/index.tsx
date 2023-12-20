//react import(s)
import React, { Fragment, useState, useCallback } from 'react'

//next import(s)
import { useRouter } from 'next/router'

//Yup Validation schema import
import { loginSchema } from '@/schemas/loginSchema'

//Local Component import
import Input from "../../components/Input"
import Spinner from '@/components/Spinner'

//formik import
import { useFormik } from 'formik'

//redux imports
import { useDispatch } from 'react-redux'
import { logIn } from '@/redux/Slices/userSlice'

//react-hot-toast
import toast, { Toaster } from 'react-hot-toast'

//firebase service(S) import
import { signInWithEmailPassword } from '@/services/auth.service'
import GoogleSignInView from '../GoogleLogin'

//interface
interface RegisterProps {
}

/////////////////////////////////////////////////////
const RegisterView: React.FC<RegisterProps> = () => {
  //router
  const router = useRouter()

  //dispatch
  const dispatch = useDispatch()

  //button Loading
  const [isLoading, setIsLoading] = useState(false);

  //route to /Login page
  const handleRegisterClick = () => {
    router.push("/register")
  }

  //formik initial values
  const initialValues = {
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
  };

  //onSubmit
  const onSubmit =async () => {
    await login();
  }

  const { values, errors, touched, isSubmitting , handleChange, handleBlur, handleSubmit } = useFormik({
    initialValues,
    validationSchema: loginSchema,
    onSubmit,
  });

  //login Function
  const login = useCallback(async () => {
    try {
      setIsLoading(true);
      const signIn = await signInWithEmailPassword(
        values.email,
        values.password
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
  }, [values.email, values.password, router]);

  return (
    <Fragment>
      <div className='flex justify-center py-20 sm:pl-0 sm:pr-0 pl-3 pr-3'>
        <div className="bg-black bg-opacity-70 px-16 py-16 self-center mt-2 lg:w-2/5 lg:max-w-md rounded-md w-full">
          <h2 className="text-white text-4xl mb-8 font-semibold">
            Login
          </h2>

          <form onSubmit={handleSubmit} autoComplete="off">
            <Input
              id="email"
              type="text"
              label="Email"
              value={values.email}
              onChange={handleChange}
              onBlur={handleBlur}
              error={!!(touched.email && errors.email)}
            />{!!(touched.email && errors.email) && <p className='text-sm text-red-600'>{errors.email}</p>}
            <Input
              id="password"
              type="password"
              label="Password"
              value={values.password}
              onChange={handleChange}
              onBlur={handleBlur}
              error={!!(touched.password && errors.password)}
            />{!!(touched.password && errors.password) && <p className='text-sm text-red-600'>{errors.password}</p>}

            <button
              type="submit"
              disabled={isSubmitting}
              className={` ${isLoading
                ? "bg-white"
                : "bg-red-600  hover:bg-red-700 transition"
                } py-3 text-white rounded-md w-full mt-10 `}
            >
              {isLoading ?<Spinner/>:"Login"}
            </button>
              <GoogleSignInView/>
            <p className="text-neutral-500 mt-12">
              {"New to PokeApp? "}
              <span
                onClick={handleRegisterClick}
                className="text-white ml-1 hover:underline cursor-pointer"
              >
                {"Register"}
              </span>
            </p>
          </form>
        </div>
        <Toaster
          position="top-right"
          reverseOrder={false}
        />
      </div>
    </Fragment>
  )
}

export default RegisterView