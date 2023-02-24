// @ts-ignore
import { MenuIcon } from "@heroicons/react/outline";
import Image from "next/image";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { BiMenu, BiMenuAltRight } from "react-icons/bi";
import Link from "next/link";
import dot from "../assets/images/navdot.png";
import shape1 from "../assets/images/shape1.png";
import { useStore } from "react-redux";
import avatarImg from "../public/login.svg";
import { Button } from "@material-tailwind/react";
import Sidebar from "./Sidebar";
import CreateDropdown from "../components/Utils/CreateDropdown";
// import { IUserProfile } from '../interfaces/UserProfile';

const Navbar = () => {
  const router = useRouter();
  const exclude = ["/auth/register", "/auth/login", "/"];
  const [isScrolled, setIsScrolled] = useState(false);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  // const store = useStore();
  // const { server } = store.getState();

  // const user: any = server.user;

  useEffect(() => {}, []);

  const shouldHide = exclude.includes(router.pathname);
  console.log(shouldHide);

  return (
    <>
      <div className="max-w-[1530px] mx-auto bg-black">
        <Sidebar
          isSidebarOpen={isSidebarOpen}
          setIsSidebarOpen={setIsSidebarOpen}
        />
        <div className="flex flex-row justify-between">
          <label
            htmlFor="my-drawer-2"
            className={`btn btn-ghost drawer-button lg:hidden !rounded-xl ${
              shouldHide ? "hidden" : ""
            }`}
          >
            <MenuIcon className="!w-6 !h-6" />
          </label>
          {!shouldHide && (
            <header
              className={`w-full h-[4rem] mt-4  flex  fixed top-0  transition-all  ${
                isScrolled && " "
              }`}
            >
              <div className="w-full xl:max-w-[60%] lg:max-w-[70%] z-[50] relative px-7  h-full items-center rounded-full bg-white/80 backdrop-blur-md drop-shadow-md border-gray-300 border flex justify-between mx-auto">
                <div
                  onClick={() => setIsSidebarOpen(!isSidebarOpen)}
                  className="w-[50px] h-[50px] mx-12 cursor-pointer flex justify-center items-center rounded-full bg-white/80 backdrop-blur-md drop-shadow-md "
                >
                  <BiMenu className="w-8 h-8" />
                </div>
                <div className="w-[20%] cursor-pointer">
                  <h1 className="text-2xl pl-12 font-bold">LMS</h1>
                </div>
                <div className="w-[58%]  h-full">
                </div>
                <div className=" ">
                  <CreateDropdown />
                </div>
              </div>
            </header>
          )}
        </div>
      </div>
      <div id="main-loader" className="w-full"></div>
    </>
  );
};

export default Navbar;
