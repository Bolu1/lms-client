import type { NextPage } from "next";
import { withAuth } from "../../utils/withAuth";
import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useRouter } from "next/router";
import { editClassAction } from "../../redux/classesSlice";
import { toast } from "react-toastify";
import Loader from "../Utils/Loader";
import { BiImages } from "react-icons/bi";
import { CopyToClipboard } from "react-copy-to-clipboard";

const Settings = (props: any) => {
  const [loading, setLoading] = useState(false);
  const [copied, setCopied] = useState(false);
  const [className, setClassName] = useState(props.data.class_name)
  const [classInformation, setClassInformation] = useState(props.data.class_information)
  const [fileName, setFileName] = useState(null);

  const { user } = useSelector((state: any) => state.auth);
  const router = useRouter();
  const dispatch = useDispatch();

  const hiddenFileInput = React.useRef(null);

  const handleClick = () => {
    // @ts-ignore
    hiddenFileInput?.current?.click();
  };

  const editClassHandler = async(e: React.FormEvent<EventTarget>) =>{
    setLoading(true)
    e.preventDefault()
    // @ts-ignore
    await dispatch(editClassAction(className, classInformation, fileName, props.slug, user.token, toast, router));
    await props.action(props.slug)
    setLoading(false)

  }

  const onChangeFile = (e: any) => {
    setFileName(e.target.files[0]);
  };

  useEffect(() => {}, [props.tab]);

  return (
    <>
      {loading ? (
        <div className="mt-[20vh]">
          <Loader />
        </div>
      ) : (
        <div className="px-5 md:w-full lg:px-32 ">
          <div className="flex justify-center ">
            <div className="bg-white rounded-md border h-full border-gray-300 p-6 w-full lg:w-[40vw] mt-12">
              <p className=" lg:text-4xl text-xl">Class Information</p>

              <div className="mt-12">
                {/* {copied ? <span style={{color: 'red'}}>Copied.</span> : null} */}

                <div className="flex justify-between">
                  <p className="text-lg font-medium">Invite Code</p>
                  <div className="flex item-center space-x-2">
                    <p className="text-lg font-medium">
                      {props.data.class_code}
                    </p>
                    <CopyToClipboard
                      text={props.data.class_code}
                      onCopy={() => {
                        setCopied(true);
                      }}
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        strokeWidth={1.5}
                        stroke="currentColor"
                        className="w-6 h-6 cursor-pointer"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M8.25 7.5V6.108c0-1.135.845-2.098 1.976-2.192.373-.03.748-.057 1.123-.08M15.75 18H18a2.25 2.25 0 002.25-2.25V6.108c0-1.135-.845-2.098-1.976-2.192a48.424 48.424 0 00-1.123-.08M15.75 18.75v-1.875a3.375 3.375 0 00-3.375-3.375h-1.5a1.125 1.125 0 01-1.125-1.125v-1.5A3.375 3.375 0 006.375 7.5H5.25m11.9-3.664A2.251 2.251 0 0015 2.25h-1.5a2.251 2.251 0 00-2.15 1.586m5.8 0c.065.21.1.433.1.664v.75h-6V4.5c0-.231.035-.454.1-.664M6.75 7.5H4.875c-.621 0-1.125.504-1.125 1.125v12c0 .621.504 1.125 1.125 1.125h9.75c.621 0 1.125-.504 1.125-1.125V16.5a9 9 0 00-9-9z"
                        />
                      </svg>
                    </CopyToClipboard>
                  </div>
                </div>

                                  
                <form onSubmit={(e)=>editClassHandler(e)}>
                  <div className="mt-12">
                    <label className="block mb-2 :text-gray-200 text-lg font-medium">
                      Class Name
                    </label>
                    <div className="flex">
                      <input
                        required
                        value={className}
                        onChange={(e) => setClassName(e.target.value)}
                        name="className"
                        id="className"
                        placeholder="Class Name"
                        className="block w-full px-4 py-2 mt-2 text-gray-700 placeholder-gray-400  border border-gray-200 rounded-md :placeholder-black :bg-gray-900 :text-gray-300 :border-gray-700 focus:border-blue-400 :focus:border-blue-400 focus:ring-blue-400 focus:outline-none focus:ring focus:ring-opacity-40"
                      />
                    </div>
                  </div>

                  <div className="mt-6">
                    <div className="flex justify-between mb-2">
                      <label className="text-lg font-medium text-black :text-gray-200">
                        Class Information
                      </label>
                    </div>

                    <textarea
                      required
                      value={classInformation}
                      onChange={(e) => setClassInformation(e.target.value)}
                      name="classInformation"
                      id="classInformation"
                      placeholder="Class Information"
                      className="block w-full h-[100px] px-4 py-2 mt-2 text-gray-700 placeholder-gray-400 bg-white border border-gray-200 rounded-md :placeholder-black :bg-gray-900 :text-gray-300 :border-gray-700 focus:border-blue-400 :focus:border-blue-400 focus:ring-blue-400 focus:outline-none focus:ring focus:ring-opacity-40"
                    />
                  </div>

                  <label className="block mb-2 text-lg font-medium :text-gray-200 mt-6">
                      Banner
                    </label>
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
          <input
            className="hidden "
            type="file"
            onChange={(e) => onChangeFile(e)}
            ref={hiddenFileInput}
          />

                  <div className="flex mt-6 justify-end items-center space-x-4">


                  <div className="items-center flex ">
                    {!loading ? (
                      <button
                        type="submit"
                        className="w-full px-4 py-4 tracking-wide text-white font-medium transition-colors duration-200 transform bg-black rounded-xl cursor-pointer "
                      >
                        Save
                      </button>
                    ) : (
                      <Loader />
                    )}
                  </div>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Settings;
