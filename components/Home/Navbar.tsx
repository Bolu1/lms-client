import { Button } from "@material-tailwind/react";
import React, { useEffect, useState } from "react";
import { BiMenu, BiMenuAltRight } from "react-icons/bi";
import dot from "../../assets/images/navdot.png";
import shape1 from "../../assets/images/shape1.png";
import Image from "next/image";
import Link from "next/link";
import Sidebar from "./Sidebar";
import Router, { useRouter } from "next/router";
import axios from "axios";

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 0) {
        setIsScrolled(true);
      } else setIsScrolled(false);
    };
    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);
  const activeLink = "text-[#1a73e8] font-bold ";
  const normalLink = "   ";
  const router = useRouter();

  useEffect(() => {
    axios.get(`${process.env.NEXT_PUBLIC_BASE_URL}`);
  }, []);

  return (
    <div>
      <Sidebar
        isSidebarOpen={isSidebarOpen}
        setIsSidebarOpen={setIsSidebarOpen}
      />
      <header
        className={`w-full h-[4rem] mt-4  flex  fixed top-0 z-50 transition-all  ${
          isScrolled && " "
        }`}
      >
        <div className="flex items-center justify-between w-full px-4 lg:hidden">
          <h1 className="text-2xl font-bold cursor-pointer">LMS</h1>
          <div
            onClick={() => setIsSidebarOpen(!isSidebarOpen)}
            className="w-[50px] h-[50px] lg:hidden flex justify-center items-center rounded-full bg-white/80 backdrop-blur-md drop-shadow-md "
          >
            <BiMenu className="w-8 h-8" />
          </div>
        </div>
        <div className="w-full xl:max-w-[60%] lg:max-w-[70%] relative px-7 h-full overflow-hidden items-center rounded-full bg-white/80 backdrop-blur-md drop-shadow-md border-gray-300 border lg:flex hidden justify-between mx-auto">
          <div className="absolute w-[5%] -z-10 right-0 bottom-0">
            <Image src={dot} alt="" />
          </div>
          <div className="absolute w-[3%] -z-10 left-4 top-1">
            <Image src={shape1} alt="" />
          </div>
          <div className="w-[20%] cursor-pointer">
            <h1 className="text-2xl font-bold">LMS</h1>
          </div>
          <div className="w-[58%]  h-full">
            <ul className="flex items-center w-full h-full space-x-8">
              <li className="text-base font-semibold">
                <Link href="#about">About us</Link>
              </li>
              <li className="text-base font-semibold">
                <Link href="#resources">Resources</Link>
              </li>
              <li className="text-base font-semibold">
                <Link href="#faq">FAQ</Link>
              </li>
            </ul>
          </div>
          <div className="">
            <Button
              className="px-3 text-white bg-black rounded-lg"
              onClick={() => {
                router.push("/auth/register");
              }}
              nonce={undefined}
              onResize={undefined}
              onResizeCapture={undefined}
            >
              Get Started
            </Button>
          </div>
        </div>
      </header>
    </div>
  );
};

export default Navbar;
