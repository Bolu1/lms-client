import React, { useState } from "react";
import { motion } from "framer-motion";
import { useRouter } from "next/router";
import { useDispatch, useSelector } from "react-redux";
import { logoutAction } from "../redux/authSlice";
import { toast } from 'react-toastify';
import { MdClose } from "react-icons/md";

const Sidebar = ({
  setIsSidebarOpen,
  isSidebarOpen,
}: {
  setIsSidebarOpen: any;
  isSidebarOpen: any;
}) => {
  
  const router = useRouter()
  const dispatch = useDispatch()

  const { user } = useSelector((state:any) => state.auth);

  const variants = {
    open: { opacity: 1, x: "0", transition: { duration: 0.4 } },
    closed: { opacity: 0, x: "-100%", transition: { duration: 0.4 } },
  };

  const logoutHandler = () =>{
    setIsSidebarOpen(!isSidebarOpen);
    // @ts-ignore
    dispatch(logoutAction(toast, router));
  }

  return (
    <div>
      {" "}
      {isSidebarOpen && (
        <div className="bg-black/80 backdrop-blur-md drop-shadow-md transparent-background z-[60] fixed">
          <motion.div
            variants={variants}
            initial={"closed"}
            animate={"open"}
            className="fixed top-0 bottom-0 left-0 w-[70vw] h-[100vh] z-[60] max-w-[400px]  h-screen bg-black backdrop-blur-md fixed "
          >
            <div className="w-full mt-4 h-10 px-4 flex justify-end">
              <button
                onClick={() => {
                  setIsSidebarOpen(!isSidebarOpen);
                }}
                className=""
              >
                <MdClose className="w-8 h-8 text-white" />
              </button>
            </div>
            <div className="w-full px-4 flex flex-col justify-center items-center space-y-4 h-40">
              <div className=" flex mt-10 justify-center  text-center rounded-full">
                <div 
                      style={{ marginBottom: "30px", width: "170px", height: "170px" }}
                className="w-full mt-10">
                  <img 
                      style={{ marginBottom: "30px", width: "170px", height: "170px" }}
                  crossOrigin="anonymous" src={process.env.NEXT_PUBLIC_IMAGE_URL+user?.photo} alt="power" className="mt-10 mb-8 text-white rounded-full" />
                </div>
                
              </div>
              <div className="flex flex-col h-full ">
                <div className="space-x-2 w-[30px] mb-6"
                      style={{ marginBottom: "30px", marginTop: "10px" }}
                >
                  <p className="py-2 text-white text-xl text-center font-bold text-center bg-violet-700 uppercase">
                    {user?.firstname} {user?.lastname}
                  </p>
                </div>
                
                <div className="flex items-center space-x-2 w-[30px] cursor-pointer mb-6"
                      style={{ marginBottom: "30px" }}
                onClick={()=>{router.push("/dashboard")}}
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={1.5}
                    stroke="currentColor"
                    className="w-8 h-8 text-xl text-white"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M2.25 12l8.954-8.955c.44-.439 1.152-.439 1.591 0L21.75 12M4.5 9.75v10.125c0 .621.504 1.125 1.125 1.125H9.75v-4.875c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21h4.125c.621 0 1.125-.504 1.125-1.125V9.75M8.25 21h8.25"
                    />
                  </svg>

                  <p className="py-2 text-white text-xl font-bold text-center bg-violet-700 uppercase">
                    {"     "}Classes
                  </p>
                </div>

                <div className="flex items-center  space-x-2 w-[30px] cursor-pointer  mb-6"
                      style={{ marginBottom: "30px" }}
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={1.5}
                    stroke="currentColor"
                    className="w-8 h-8 text-white"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M6.75 3v2.25M17.25 3v2.25M3 18.75V7.5a2.25 2.25 0 012.25-2.25h13.5A2.25 2.25 0 0121 7.5v11.25m-18 0A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75m-18 0v-7.5A2.25 2.25 0 015.25 9h13.5A2.25 2.25 0 0121 11.25v7.5m-9-6h.008v.008H12v-.008zM12 15h.008v.008H12V15zm0 2.25h.008v.008H12v-.008zM9.75 15h.008v.008H9.75V15zm0 2.25h.008v.008H9.75v-.008zM7.5 15h.008v.008H7.5V15zm0 2.25h.008v.008H7.5v-.008zm6.75-4.5h.008v.008h-.008v-.008zm0 2.25h.008v.008h-.008V15zm0 2.25h.008v.008h-.008v-.008zm2.25-4.5h.008v.008H16.5v-.008zm0 2.25h.008v.008H16.5V15z"
                    />
                  </svg>

                  <p className="py-2 text-white text-xl font-bold text-center bg-violet-700 uppercase">
                    Calender
                  </p>
                </div>

                <div className="flex items-center  space-x-2 w-[30px] cursor-pointer  mb-6"
                      style={{ marginBottom: "30px" }}
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={1.5}
                    stroke="currentColor"
                    className="w-6 h-6 text-white"
                  >
                    <path
                      strokeLinecap="round"
                      d="M15.75 10.5l4.72-4.72a.75.75 0 011.28.53v11.38a.75.75 0 01-1.28.53l-4.72-4.72M4.5 18.75h9a2.25 2.25 0 002.25-2.25v-9a2.25 2.25 0 00-2.25-2.25h-9A2.25 2.25 0 002.25 7.5v9a2.25 2.25 0 002.25 2.25z"
                    />
                  </svg>

                  <p className="py-2 text-white text-xl font-bold text-center bg-violet-700 uppercase">
                    Video Call
                  </p>
                </div>
                <div className="flex items-center  space-x-2 w-[30px] cursor-pointer  mb-6"
                      style={{ marginBottom: "30px" }}
                onClick={()=>{router.push("/dashboard/settings")}}
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={1.5}
                    stroke="currentColor"
                    className="w-6 h-6 text-white"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M9.594 3.94c.09-.542.56-.94 1.11-.94h2.593c.55 0 1.02.398 1.11.94l.213 1.281c.063.374.313.686.645.87.074.04.147.083.22.127.324.196.72.257 1.075.124l1.217-.456a1.125 1.125 0 011.37.49l1.296 2.247a1.125 1.125 0 01-.26 1.431l-1.003.827c-.293.24-.438.613-.431.992a6.759 6.759 0 010 .255c-.007.378.138.75.43.99l1.005.828c.424.35.534.954.26 1.43l-1.298 2.247a1.125 1.125 0 01-1.369.491l-1.217-.456c-.355-.133-.75-.072-1.076.124a6.57 6.57 0 01-.22.128c-.331.183-.581.495-.644.869l-.213 1.28c-.09.543-.56.941-1.11.941h-2.594c-.55 0-1.02-.398-1.11-.94l-.213-1.281c-.062-.374-.312-.686-.644-.87a6.52 6.52 0 01-.22-.127c-.325-.196-.72-.257-1.076-.124l-1.217.456a1.125 1.125 0 01-1.369-.49l-1.297-2.247a1.125 1.125 0 01.26-1.431l1.004-.827c.292-.24.437-.613.43-.992a6.932 6.932 0 010-.255c.007-.378-.138-.75-.43-.99l-1.004-.828a1.125 1.125 0 01-.26-1.43l1.297-2.247a1.125 1.125 0 011.37-.491l1.216.456c.356.133.751.072 1.076-.124.072-.044.146-.087.22-.128.332-.183.582-.495.644-.869l.214-1.281z"
                    />
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                    />
                  </svg>
                  <p className="py-2 text-white text-xl font-bold text-center bg-violet-700 uppercase">
                    Settings
                  </p>
                </div>
                <div 
                onClick={()=>{logoutHandler()}}
                className="flex items-center space-x-2 w-[30px] cursor-pointer mb-6"
                      style={{ marginBottom: "30px" }}
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={1.5}
                    stroke="currentColor"
                    className="w-6 h-6 text-white"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M15.75 9V5.25A2.25 2.25 0 0013.5 3h-6a2.25 2.25 0 00-2.25 2.25v13.5A2.25 2.25 0 007.5 21h6a2.25 2.25 0 002.25-2.25V15M12 9l-3 3m0 0l3 3m-3-3h12.75"
                    />
                  </svg>

                  <p className="py-2 text-white text-xl font-bold text-center bg-violet-700 uppercase">
                    Logout
                  </p>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      )}
    </div>
  );
};

export default Sidebar;
