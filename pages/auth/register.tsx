import type { NextPage } from 'next'
import React, { useState } from "react";
import Layout from '../../layouts/Layout';
import {useRouter} from "next/router"
import Image from 'next/image';
import { toast } from 'react-toastify';
import { useDispatch, useSelector } from "react-redux";
import { registerAction } from "../../redux/authSlice";
import * as Yup from "yup";
import { ErrorMessage, Field, Form, Formik } from "formik";
import Loader from '../../components/Utils/Loader';

const Register: NextPage = () => {

  const backUrl: string = "/worktogether.svg";
  const [email, setEmail] = useState("");
  const [fn, setFn] = useState("");
  const [ln, setLn] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [message, setMessage] = useState(null);

  const router = useRouter()

  const dispatch = useDispatch();
  const validationSchema = Yup.object().shape({
    email: Yup.string()
      .email("Invalid email address")
      .required("Email is required"),
      firstname: Yup.string()
      .required("First name is required"),
    lastname: Yup.string()
      .required("Last name is required"),
    password: Yup.string()
      .min(6, "Password must be at least 6 characters")
      .required("Password is required"),
    // @ts-ignore
    confirmpassword: Yup.string().oneOf([Yup.ref("password"), null], "Password must match").required("Confirm password is required"),
  });
  const { loading, error, user } = useSelector((state:any) => state.auth);
    


  return (
    <Layout title="" >
      
      <div className="bg-white :bg-gray-900">
        <div className="flex justify-center items-center h-full p-12 my-6">
          <div
            className="hidden z-50 bg-cover lg:block w-[50%]"
            // style={{ backgroundImage: `url(${backUrl})` }}
          >
            {/* <div className="flex items-center h-full px-20 bg-opacity-40"></div> */}
            <Image src={backUrl} alt='power' width={1440} height={1440}/>
          </div>

          <div className="flex  w-full mx-auto lg:w-2/6 ">
            <div className="flex-1">
              <div className="text-center">
                <h2 className="text-4xl font-bold text-center text-black">
                  Create Account
                </h2>
              </div>

              <div className="mt-8">
              <Formik
          initialValues={{
            email: "",
            firstname: "",
            lastname: "",
            password: "",
            confirmpassword: ""
          }}
          onSubmit={(values, { setSubmitting }) => {
            setSubmitting(true);
            // @ts-ignore
            dispatch(registerAction(values.email, values.firstname, values.lastname, values.password, toast, router));
            setSubmitting(false);
          }}
          validationSchema={validationSchema}
        >
          {({ handleChange, values, isSubmitting, handleSubmit }) => (
                <Form 
                action=''
                >
                  <div>
                    <label className="block mb-2 text-sm text-black :text-gray-200">
                      Email
                    </label>
                    <div className="">
                    <Field
                  type="email"
                  name="email"
                  onChange={handleChange}
                  values={values.email}
                  className=" w-full px-3 mx-auto py-2 border  rounded-lg"
                  placeholder="Email"
                />
                <ErrorMessage
                  className="text-red-400 text-sm "
                  name="email"
                  component="div"
                />
                    </div>
                  </div>

                  <div className="mt-6">
                    <div className="flex justify-between mb-2">
                      <label className="text-sm text-black :text-gray-200">
                        First Name
                      </label>
                    </div>

                    <div className="">
                    <Field
                  type="text"
                  name="firstname"
                  onChange={handleChange}
                  values={values.firstname}
                  className=" w-full px-3 mx-auto py-2 border  rounded-lg"
                  placeholder="First Name"
                />
                <ErrorMessage
                  className="text-red-400 text-sm "
                  name="firstname"
                  component="div"
                />
                    </div>
                  </div>

                  <div className="mt-6">
                    <div className="flex justify-between mb-2">
                      <label className="text-sm text-black :text-gray-200">
                        Last Name
                      </label>
                    </div>

                    <div className="">
                    <Field
                  type="text"
                  name="lastname"
                  onChange={handleChange}
                  values={values.lastname}
                  className=" w-full px-3 mx-auto py-2 border  rounded-lg"
                  placeholder="Last Name"
                />
                <ErrorMessage
                  className="text-red-400 text-sm "
                  name="lastname"
                  component="div"
                />
                    </div>
                  </div>

                  <div className="mt-6">
                    <div className="flex justify-between mb-2">
                      <label className="text-sm text-black :text-gray-200">
                        Password
                      </label>
                    </div>

                    <div className="">
                    <Field
                  type="password"
                  name="password"
                  onChange={handleChange}
                  values={values.password}
                  className=" w-full px-3 mx-auto py-2 border  rounded-lg"
                  placeholder="Password"
                />
                <ErrorMessage
                  className="text-red-400 text-sm "
                  name="password"
                  component="div"
                />
                    </div>
                  </div>

                  <div className="mt-6">
                    <div className="flex justify-between mb-2">
                      <label className="text-sm text-black :text-gray-200">
                        Confirm Password
                      </label>
                    </div>

                    <div className="">
                    <Field
                  type="password"
                  name="confirmpassword"
                  onChange={handleChange}
                  values={values.confirmpassword}
                  className=" w-full px-3 mx-auto py-2 border  rounded-lg"
                  placeholder="Confirm password"
                />
                <ErrorMessage
                  className="text-red-400 text-sm "
                  name="confirmpassword"
                  component="div"
                />
                    </div>
                  </div>

                  <div className="mt-6">
                    {!loading ? (
                      <button
                        type="submit"
                        className="w-full px-4 py-4 tracking-wide text-white font-medium text-xl transition-colors duration-200 transform bg-black rounded-xl cursor-pointer "
                      >
                        CREATE ACCOUNT
                      </button>
                    ) : (
                      <Loader />
                    )}
                  </div>
                </Form>
          )}
          </Formik>

                <p className="mt-6 text-sm text-center text-gray-400">
                  Have an account?{" "}
                  <a
                    onClick={() => router.push("/auth/login")}
                    className="text-black underline cursor-pointer focus:outline-none focus:underline hover:underline"
                  >
                    Login
                  </a>
                  .
                </p>
              </div>
            </div>
          </div>
        </div>
      </div> 

    </Layout>
  )
}

export default Register
