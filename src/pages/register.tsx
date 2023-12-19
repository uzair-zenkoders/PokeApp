//react import
import React, { Fragment, useState } from 'react'

//import Local component(s)
import Input from "../components/Input"
import Spinner from '@/components/Spinner';

//formik Import
import { useFormik } from 'formik';
import { useRouter } from 'next/router';

//yup-ValidationSchema
import {basicSchema} from "../schemas/registerSchema"

const Register = () => {
    //router
    const router = useRouter()

    //button Loading
    const [isLoading, setIsLoading] = useState(false);

    //route to /Login page
    const handleLoginClick = ()=>{
        // router.push("/login")
    }

    //formik initial values
    const initialValues = {
        username: "",
        email: "",
        password: "",
        confirmPassword: "",
    };

    const onSubmit = () => {
        console.log("submittted: ",values)
        resetForm()
    }

    const { values, errors, touched, isSubmitting, setSubmitting,resetForm, handleChange, handleBlur, handleSubmit } = useFormik({
        initialValues,
        validationSchema:basicSchema,
        onSubmit,
    });

    console.log("touched: ",touched,"values: ",values)

    return (
        <Fragment>
            <div className='flex justify-center py-20 sm:pl-0 sm:pr-0 pl-3 pr-3'>
                <div className="bg-black bg-opacity-70 px-16 py-16 self-center mt-2 lg:w-2/5 lg:max-w-md rounded-md w-full">
                <h2 className="text-white text-4xl mb-8 font-semibold">
              Register
            </h2>
                    <form onSubmit={handleSubmit} autoComplete="off">
                        <Input
                            id="username"
                            type="text"
                            label="Username"
                            value={values.username}
                            onChange={handleChange}
                            onBlur={handleBlur}  
                        />
                        <Input
                            id="email"
                            type="text"
                            label="Email"
                            value={values.email}
                            onChange={handleChange}
                            onBlur={handleBlur}  
                        />
                        <Input
                            id="password"
                            type="password"
                            label="Password"
                            value={values.password}
                            onChange={handleChange}
                            onBlur={handleBlur}  
                        />
                        <Input
                            id="confirmPassword"
                            type="password"
                            label="Confirm Password"
                            value={values.confirmPassword}
                            onChange={handleChange}
                            onBlur={handleBlur}  
                        />
                        {errors.confirmPassword && touched.confirmPassword && <p className='text-red-600'>{errors.confirmPassword}</p>}
                        
                        <button
                            // onClick={variant === "login" ? login : register}
                            type="submit"
                            // disabled={isLoading}
                            // disabled={isSubmitting}
                            className={` ${isLoading
                                ? "bg-white"
                                : "bg-red-600  hover:bg-red-700 transition"
                                } py-3 text-white rounded-md w-full mt-10 `}
                        >
                            {isLoading ? <Spinner /> : "Register"}
                        </button>
                        <p className="text-neutral-500 mt-12">
              {"Already have an account?"}
              <span
                onClick={handleLoginClick}
                className="text-white ml-1 hover:underline cursor-pointer"
              >
                {"login"}
              </span>
              .
            </p>
                    </form>
                </div>
            </div>
        </Fragment>

    )
}

export default Register