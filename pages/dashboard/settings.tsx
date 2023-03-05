import type { NextPage } from "next";
import { withAuth } from "../../utils/withAuth";
import Layout from "../../layouts/Layout";
import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { updateUserAction } from "../../redux/authSlice";
import { toast } from "react-toastify";
import { BiImages } from "react-icons/bi";
import { useRouter } from "next/router";
import Loader from "../../components/Utils/Loader";

const Settings: NextPage = () => {
  const [loading, setLoading] = useState(false);
  const [firstname, setFirstname] = useState("");
  const [fileName, setFileName] = useState(null);
  const [lastname, setLastname] = useState("");
  const [password, setPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");

  const { user } = useSelector((state: any) => state.auth);
  const router = useRouter();
  const dispatch = useDispatch();

  const hiddenFileInput = React.useRef(null);

  const handleClick = () => {
    // @ts-ignore
    hiddenFileInput?.current?.click();
  };


  const onChangeFile = (e: any) => {
    setFileName(e.target.files[0]);
  };

  const editAccountHandler = async() =>{

    setLoading(true)
    // @ts-ignore
    await dispatch(updateUserAction(fileName, firstname, lastname, password, newPassword, user.token, toast, router));
    setLoading(false)
    
  }

  return (
    <Layout title="Settings">
         <section className="max-w-4xl  lg:mt-20 p-6 mx-auto bg-white rounded-md shadow-md :bg-gray-800 my-20">
        <h2 className="text-lg font-semibold text-gray-700 capitalize :text-white">
          Edit Account
        </h2>

        <div className="py-5 ">
          <div className="grid grid-cols-1 gap-6 mt-4 sm:grid-cols-2">
            <div>
              <label className="text-gray-700 :text-gray-200">First Name</label>
              <input
                value={firstname}
                onChange={(e) => setFirstname(e.target.value)}
                required
                id="username"
                type="text"
                className="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border border-gray-200 rounded-md :bg-gray-800 :text-gray-300 :border-gray-600 focus:border-blue-400 focus:ring-blue-300 focus:ring-opacity-40 :focus:border-blue-300 focus:outline-none focus:ring"
              />
            </div>

            <div>
              <label
                className="text-gray-700 :text-gray-200"
                htmlFor="emailAddress"
              >
                Last Name
              </label>
              <input
                value={lastname}
                onChange={(e) => setLastname(e.target.value)}
                required
                id="emailAddress"
                className="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border border-gray-200 rounded-md :bg-gray-800 :text-gray-300 :border-gray-600 focus:border-blue-400 focus:ring-blue-300 focus:ring-opacity-40 :focus:border-blue-300 focus:outline-none focus:ring"
              />
            </div>

            <div>
              <label
                className="text-gray-700 :text-gray-200"
                htmlFor="password"
              >
                Password
              </label>
              <input
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                type="password"
                id="password"
                className="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border border-gray-200 rounded-md :bg-gray-800 :text-gray-300 :border-gray-600 focus:border-blue-400 focus:ring-blue-300 focus:ring-opacity-40 :focus:border-blue-300 focus:outline-none focus:ring"
              />
            </div>

            <div>
              <label
                className="text-gray-700 :text-gray-200"
                htmlFor="password"
              >
                New Password
              </label>
              <input
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
                required
                type="password"
                id="newPassword"
                className="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border border-gray-200 rounded-md :bg-gray-800 :text-gray-300 :border-gray-600 focus:border-blue-400 focus:ring-blue-300 focus:ring-opacity-40 :focus:border-blue-300 focus:outline-none focus:ring"
              />
            </div>
          </div>

        <div className="mt-8">
          <label className="text-gray-700 :text-gray-200">Upload profile photo</label>
            <div
            className="bg-black px-4 py-4 text-base font-normal cursor-pointer "
            onClick={handleClick}
          >
            <div className="flex justify-center items-center w-full my-1 ">
              <BiImages className="text-center text-white" />
            </div>
            <span className="flex justify-center text-center text-white text-base">
              Upload Images
            </span>
          </div>
          </div>
          <input
            className="hidden "
            type="file"
            onChange={(e) => onChangeFile(e)}
            ref={hiddenFileInput}
          />

          <div className="flex justify-end mt-6">
            <div className="mt-6">
              {!loading ? (
                <button
                  onClick={editAccountHandler}
                  className="px-6 py-2 leading-5 text-white transition-colors duration-200 transform bg-black rounded-md "
                >
                  Update
                </button>
              ) : (
                <Loader />
              )}
            </div>
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default withAuth(Settings);