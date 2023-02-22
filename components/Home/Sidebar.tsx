import React, { useState } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { IoCloseCircle } from "react-icons/io5";
import { AiOutlineClose } from "react-icons/ai";
import { Button } from "@material-tailwind/react";
import Router, { useRouter } from "next/router";
import NProgress from "nprogress";
const Sidebar = ({
  setIsSidebarOpen,
  isSidebarOpen,
}: {
  setIsSidebarOpen: any;
  isSidebarOpen: any;
}) => {
   const router = useRouter();
  const location = router.pathname; 

  const sidebarVariant = {
    open: {
      x: 0,
      transition: {
        duration: 0.2,
      },
    },
    closed: {
      x: "100%",
      transition: {
        duration: 0.45,
      },
    },
  };

  const listvariants = {
    open: {
      transition: { staggerChildren: 0.1, delayChildren: 0.2 },
    },
    closed: {
      transition: { staggerChildren: 0.1, staggerDirection: -1 },
    },
  };
  const itemvariants = {
    open: {
      // x: 0,
      x: [0, 20, 0],
      opacity: 1,
      transition: {
        y: { stiffness: 1000, velocity: -100 },
      },
    },
    closed: {
      x: -50,
      opacity: 0,
      transition: {
        y: { stiffness: 1000 },
      },
    },
  };

  return (
    <div>
      {" "}
      {isSidebarOpen && (
        <motion.aside
          initial={"closed"}
          animate={"open"}
          variants={sidebarVariant}
          className={`fixed top-0 bottom-0 right-0 w-[70vw] h-[100vh] z-[60] max-w-[400px]  bg-white shadow-lg overflow-hidden md:hidden }`}
        >
          <div className="py-[2rem] flex flex-col items-center justify-center w-full h-full">
            <button
              onClick={() => {
                setIsSidebarOpen(!isSidebarOpen);
              }}
              className="flex top-10 absolute justify-end w-full mb-[4rem] pr-[2rem]"
            >
              <AiOutlineClose className="w-6 h-6 text-black" />
            </button>
            <motion.nav>
              <motion.ul className="" variants={listvariants}>
                <motion.li
                  onClick={() => {
                    setIsSidebarOpen(!isSidebarOpen);
                  }}
                  variants={itemvariants}
                  className={`relative w-full mb-[1.5rem] ${
                    location === "/about" ? "activeLink" : ""
                  }`}
                >
                  <Link href="">
                    <div className="text-[#000] text-[1.3rem] tracking-[2.7px] uppercase">
                      <span className="text-black  mr-[11px]">01</span> About us
                    </div>
                  </Link>
                </motion.li>

                <motion.li
                  onClick={() => {
                    setIsSidebarOpen(!isSidebarOpen);
                  }}
                  variants={itemvariants}
                  className={`relative w-full mb-[1.5rem] ${
                    location === "/about" ? "activeLink" : ""
                  }`}
                >
                  <Link href="">
                    <div className="text-[#000] text-[1.3rem] tracking-[2.7px] uppercase">
                      <span className="text-black  mr-[11px]">03</span> Contact
                      us
                    </div>
                  </Link>
                </motion.li>
                <motion.li
                  onClick={() => {
                    setIsSidebarOpen(!isSidebarOpen);
                  }}
                  variants={itemvariants}
                  className={`relative w-full mb-[1.5rem] ${
                    location === "/about" ? "activeLink" : ""
                  }`}
                >
                  <Link href="">
                    <div className="text-[#000] text-[1.3rem] tracking-[2.7px] uppercase">
                      <span className="text-black  mr-[11px]">04</span>{" "}
                      Resources
                    </div>
                  </Link>
                </motion.li>
                <motion.li
                  onClick={() => {
                    setIsSidebarOpen(!isSidebarOpen);
                  }}
                  variants={itemvariants}
                  className={`relative w-full flex justify-center mt-[5.5rem] ${
                    location === "/" ? "activeLink" : ""
                  }`}
                >
                  <Button
                    className="bg-black p-4 "
                    onClick={function () {
                      NProgress.start();
                      setTimeout(() => {
                        NProgress.done();
                        router.push("/register");
                      }, 3000);
                    }}
                    nonce={undefined}
                    onResize={undefined}
                    onResizeCapture={undefined}
                  >
                    Get Started
                  </Button>
                </motion.li>
              </motion.ul>
              <motion.div className="w-full  h-10 border-t border-t-gray-200"></motion.div>
            </motion.nav>
          </div>
        </motion.aside>
      )}
    </div>
  );
};

export default Sidebar;
