//react import(s)
import React, { Fragment, useState, useCallback } from 'react'

//next import(s)
import { useRouter } from 'next/router'

//yup validation schema import
import { registerSchema } from '@/schemas/registerSchema'

//local components import
import Input from "../../components/Input"
import Spinner from "../../components/Spinner"

//formik import
import { useFormik } from 'formik'

//importing login service from firebase
import { normalSignup } from '@/services/auth.service'

//react-hot-toast import
import toast, { Toaster } from 'react-hot-toast'

//GoogleSignInView import
import GoogleSignInView from '../GoogleLogin'

interface RegisterProps {
}

/////////////////////////////////////////////////////
const RegisterView: React.FC<RegisterProps> = () => {
  const router = useRouter()

  //button Loading
  const [isLoading, setIsLoading] = useState(false);

  //route to /Login page
  const handleLoginClick = () => {
    router.push("/login")
  }

  //formik initial values
  const initialValues = {
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
  };

  const onSubmit = async () => {
    console.log("submittted: ", values)
    await register()
    resetForm()
  }

  //formik
  const { values, errors, touched, isSubmitting, resetForm, handleChange, handleBlur, handleSubmit } = useFormik({
    initialValues,
    validationSchema: registerSchema,
    onSubmit,
  });

  //register-button-function
  const register = useCallback(async () => {
    try {
      setIsLoading(true);
      await normalSignup(values.email, values.password);
      setIsLoading(false);
      toast.success("Registration sucessful");
      //togle Varient
    } catch (error) {
      setIsLoading(false);
      toast.error("Registration not successful");
    }
  }, [
    values.email,
    values.password,
  ]);


  return (
    <Fragment>
      <div className='flex justify-center py-20 sm:pl-0 sm:pr-0 pl-3 pr-3'>
        <div className="bg-black bg-opacity-70 px-16 py-16 self-center mt-2 lg:w-2/5 lg:max-w-md rounded-md w-full">
          <h2 className="text-white text-4xl mb-8 font-semibold">
            Register
          </h2>
          
          <form onSubmit={handleSubmit} autoComplete="off">
          <div className="flex flex-col gap-4">
            <Input
              id="username"
              type="text"
              label="Username"
              value={values.username}
              onChange={handleChange}
              onBlur={handleBlur}
              error={!!(touched.username && errors.username)}
            />{!!(touched.username && errors.username) && <p className='text-sm text-red-600'>{errors.username}</p>}
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
            <Input
              id="confirmPassword"
              type="password"
              label="Confirm Password"
              value={values.confirmPassword}
              onChange={handleChange}
              onBlur={handleBlur}
              error={!!(touched.confirmPassword && errors.confirmPassword)}
            />{!!(touched.confirmPassword && errors.confirmPassword) && <p className='text-sm text-red-600'>{errors.confirmPassword}</p>}
            </div>
            <button
              type="submit"
              // disabled={isLoading}
              disabled={isSubmitting}
              className={` ${isLoading
                ? "bg-white"
                : "bg-red-600  hover:bg-red-700 transition"
                } py-3 text-white rounded-md w-full mt-10 `}
            >
              {isLoading ? <Spinner/> : "Register"}
            </button>
              <GoogleSignInView/>
            <p className="text-neutral-500 mt-12">
              {"Already have an account?"}
              <span
                onClick={handleLoginClick}
                className="text-white ml-1 hover:underline cursor-pointer"
              >
                {"Login here"}
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