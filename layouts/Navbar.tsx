// @ts-ignore
import { MenuIcon } from "@heroicons/react/outline";
import Image from "next/image";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { BiMenu, BiMenuAltRight } from "react-icons/bi";
import { useDispatch, useSelector } from "react-redux";

import Sidebar from "./Sidebar";
import CreateDropdown from "../components/Utils/CreateDropdown";
// import { IUserProfile } from '../interfaces/UserProfile';

const Navbar = (props: any) => {
  const router = useRouter();
  const exclude = ["/auth/register", "/auth/login", "/"];
  const showAddButton = ["/dashboard"];
  const showTabsOptions = ["/dashboard/class/**"];
  const [isScrolled, setIsScrolled] = useState(false);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  // const store = useStore();
  // const { server } = store.getState();

  // const user: any = server.user;

  useEffect(() => {}, []);
  const { user } = useSelector((state: any) => state.auth);

  const shouldHide = exclude.includes(router.pathname);
  const shouldNotHideAddBotton = showAddButton.includes(router.pathname);
  const shouldShowTabs = showTabsOptions.includes(router.pathname);

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
              className={`w-full h-[4rem] mt-4 flex fixed top-0 z-30 transition-all  ${
                isScrolled && " "
              }`}
            >
              <div className="w-full xl:max-w-[60%] lg:max-w-[70%] relative px-7  h-full items-center rounded-full bg-white/80 backdrop-blur-md drop-shadow-md border-gray-300 border flex sm:justify-between mx-auto">
                <div
                  onClick={() => setIsSidebarOpen(!isSidebarOpen)}
                  className="w-[50px] h-[50px] mx-12 cursor-pointer flex justify-center items-center rounded-full bg-white/80 backdrop-blur-md drop-shadow-md "
                >
                  <BiMenu className="w-8 h-8" />
                </div>
                <div
                  onClick={() => {
                    router.push("/dashboard");
                  }}
                  className="w-[20%] hidden lg:block cursor-pointer"
                >
                  <h1 className="text-2xl pl-12 font-bold">LMS</h1>
                </div>
                {/* class tabs */}

                <div className="navoption w-[58%]  h-full">
                  {props.tab && (
                    <ul className=" navoptionul  w-full h-full  flex items-center justify-center">
                      <li
                        onClick={() => props.setTab("class")}
                        className={`text-base cursor-pointer ${
                          props.tab == "class"
                            ? "font-semibold "
                            : "text-gray-500"
                        }`}
                      >
                        Class
                        {props.tab == "class" && (
                          <div
                            style={{ height: "3px" }}
                            className="bg-black   hidden lg:block  rounded-full"
                          ></div>
                        )}
                      </li>
                      <li
                        onClick={() => props.setTab("tasks")}
                        className={`text-base cursor-pointer ${
                          props.tab == "tasks"
                            ? "font-semibold "
                            : "text-gray-500"
                        } `}
                      >
                        Tasks
                        {props.tab == "tasks" && (
                          <div
                            style={{ height: "3px" }}
                            className="bg-black  hidden lg:block  rounded-full"
                          ></div>
                        )}
                      </li>
                      <li
                        onClick={() => props.setTab("people")}
                        className={`text-base cursor-pointer ${
                          props.tab == "people"
                            ? "font-semibold "
                            : "text-gray-500"
                        } `}
                      >
                        People
                        {props.tab == "people" && (
                          <div
                            style={{ height: "3px" }}
                            className="bg-black  rounded-full hidden lg:block  "
                          ></div>
                        )}
                      </li>
                      {user.id == props.teacher && (
                        <li
                          onClick={() => props.setTab("settings")}
                          className={`text-base cursor-pointer ${
                            props.tab == "settings"
                              ? "font-semibold "
                              : "text-gray-500"
                          } `}
                        >
                          Settings
                          {props.tab == "settings" && (
                            <div
                              style={{ height: "3px" }}
                              className="bg-black  rounded-full hidden lg:block  "
                            ></div>
                          )}
                        </li>
                      )}
                    </ul>
                  )}
                </div>
                <div className=" ">
                  {shouldNotHideAddBotton && <CreateDropdown />}
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
