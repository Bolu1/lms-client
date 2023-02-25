import type { NextPage } from "next";
import React, { useState } from "react";
import Layout from "../../layouts/Layout";
import { useRouter } from "next/router";
import Loader from '../../components/Utils/Loader';
import { toast } from 'react-toastify';
import Image from "next/image";
import { useDispatch, useSelector } from "react-redux";
import { loginAction } from "../../redux/authSlice";

const Login: NextPage = () => {
  const backUrl: string = "/lookwindow.svg";
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const router = useRouter();

  const dispatch = useDispatch()
  const { loading } = useSelector((state:any) => state.auth);


  const loginHandler = (e: React.FormEvent<EventTarget>) =>{
    e.preventDefault()

    // @ts-ignore
    dispatch(loginAction(email, password, toast, router));
  }

  return (
    <Layout title="">
      <div className="bg-white :bg-gray-900 min-h-[100vh] flex w-full justify-center items-center">
        <div className="flex justify-center items-center h-full md:px-12 my-6">
          <div
            className="hidden z-50 bg-cover lg:block w-[50%]"
            // style={{ backgroundImage: `url(${backUrl})` }}
          >
            {/* <div className="flex items-center h-full px-20 bg-opacity-40"></div> */}
            <Image src={backUrl} alt="power" width={1440} height={1440} />
          </div>

          <div className="flex items-center w-full md:mx-auto lg:w-2/6 ">
            <div className="flex-1">
              <div className="text-center">
                <h2 className="text-4xl font-bold text-center text-black">
                  Login
                </h2>
              </div>

              <div className="mt-8">
                <form onSubmit={(e)=>loginHandler(e)}>
                  <div>
                    <label className="block mb-2 text-sm text-black :text-gray-200">
                      Email
                    </label>
                    <div className="flex">
                      <input
                        required
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        name="email"
                        id="email"
                        placeholder="lafunlafun@gmail.com"
                        className="block w-full px-4 py-2 mt-2 text-gray-700 placeholder-gray-400  border border-gray-200 rounded-md :placeholder-black :bg-gray-900 :text-gray-300 :border-gray-700 focus:border-blue-400 :focus:border-blue-400 focus:ring-blue-400 focus:outline-none focus:ring focus:ring-opacity-40"
                      />
                    </div>
                  </div>

                  <div className="mt-6">
                    <div className="flex justify-between mb-2">
                      <label className="text-sm text-black :text-gray-200">
                        Password
                      </label>
                    </div>

                    <input
                      required
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      type="password"
                      name="password"
                      id="password"
                      placeholder="Your Password"
                      className="block w-full px-4 py-2 mt-2 text-gray-700 placeholder-gray-400 bg-white border border-gray-200 rounded-md :placeholder-black :bg-gray-900 :text-gray-300 :border-gray-700 focus:border-blue-400 :focus:border-blue-400 focus:ring-blue-400 focus:outline-none focus:ring focus:ring-opacity-40"
                    />
                  </div>

                  <div className="mt-6">
                    {!loading ? (
                      <button
                        type="submit"
                        className="w-full px-4 py-4 tracking-wide text-white font-medium text-xl transition-colors duration-200 transform bg-black rounded-xl cursor-pointer "
                      >
                        LOGIN
                      </button>
                    ) : (
                      <Loader />
                    )}
                  </div>
                </form>

                <p className="mt-6 text-sm text-center text-gray-400">
                  Have an account?{" "}
                  <a
                    onClick={() => router.push("/auth/register")}
                    className="text-black underline cursor-pointer focus:outline-none focus:underline hover:underline"
                  >
                    Register
                  </a>
                  .
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Login;
