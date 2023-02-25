import React from "react";
import shape1 from "../../assets/images/shape_1.png";
import shape2 from "../../assets/images/shape_2.png";
import shape3 from "../../assets/images/line_shape_2.png";
import Image from "next/image";
import { useRouter } from "next/router";


const About = () => {

  const router = useRouter()
  return (
    <div id="resources">
      <div className="w-full h-full md:px-10 px-4 pb-6 mt-14">
        <div className="w-full h-[30rem] max-w-[80rem] lg:flex hidden justify-center overflow-hidden items-center mx-auto bg-[#f0f3ff] relative px-10">
          <div className="absolute top-20 left-10">
            <Image src={shape1} alt="" />
          </div>
          <div className="absolute top-40 right-10">
            <Image src={shape2} alt="" />
          </div>
          <div className="absolute -top-14 right-60">
            <Image src={shape3} alt="" />
          </div>
          <div className="w-[70%]  h-[15rem] flex justify-center items-center flex-col space-y-10">
            <h1 className="text-[42px] leading-[1.1] font-bold text-center">
              Explore different classrooms and gain first class knowledge
            </h1>{" "}
            <a
              onClick={()=>{router.push("/auth/register")}}
              className="relative inline-flex items-center cursor-pointer justify-start py-3 pl-4 pr-12 overflow-hidden font-semibold text-[#000000] transition-all duration-150 ease-in-out rounded hover:pl-10 hover:pr-6 bg-gray-50 group"
            >
              <span className="absolute bottom-0 left-0 w-full h-1 transition-all duration-150 ease-in-out bg-[#000000] group-hover:h-full"></span>
              <span className="absolute right-0 pr-4 duration-200 ease-out group-hover:translate-x-12">
                <svg
                  className="w-5 h-5 text-green-400"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M14 5l7 7m0 0l-7 7m7-7H3"
                  ></path>
                </svg>
              </span>
              <span className="absolute left-0 pl-2.5 -translate-x-12 group-hover:translate-x-0 ease-out duration-200">
                <svg
                  className="w-5 h-5 text-green-400"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M14 5l7 7m0 0l-7 7m7-7H3"
                  ></path>
                </svg>
              </span>
              <span className="relative w-full text-left transition-colors duration-200 ease-in-out group-hover:text-white">
                Explore Now
              </span>
            </a>
          </div>
        </div>
        <div className="w-full md:h-[30rem]  h-[21rem] relative overflow-hidden  lg:hidden flex justify-center items-center mx-auto bg-[#f0f3ff] px-">
          <div className="absolute w-[16%]  top-60 left-6">
            <Image src={shape1} alt="" />
          </div>
          <div className="absolute top-40 w-[16%]  right-5">
            <Image src={shape2} alt="" />
          </div>
          <div className="absolute w-[20%] -top-14 right-20">
            <Image src={shape3} alt="" />
          </div>
          <div className="w-full h-[15rem] flex justify-center items-center flex-col space-y-10">
            <h1 className="md:text-[42px] text-[26px] leading-[1.1] font-bold text-center">
              Explore different classrooms and gain first class knowledge
            </h1>{" "}
            <a
              onClick={()=>{router.push("/auth/register")}}
              className="relative inline-flex items-center cursor-pointer justify-start py-3 pl-4 pr-12 overflow-hidden font-semibold text-[#000000] transition-all duration-150 ease-in-out rounded hover:pl-10 hover:pr-6 bg-gray-50 group"
            >
              <span className="absolute bottom-0 left-0 w-full h-1 transition-all duration-150 ease-in-out bg-[#000000] group-hover:h-full"></span>
              <span className="absolute right-0 pr-4 duration-200 ease-out group-hover:translate-x-12">
                <svg
                  className="w-5 h-5 text-green-400"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M14 5l7 7m0 0l-7 7m7-7H3"
                  ></path>
                </svg>
              </span>
              <span className="absolute left-0 pl-2.5 -translate-x-12 group-hover:translate-x-0 ease-out duration-200">
                <svg
                  className="w-5 h-5 text-green-400"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M14 5l7 7m0 0l-7 7m7-7H3"
                  ></path>
                </svg>
              </span>
              <span className="relative w-full text-left transition-colors duration-200 ease-in-out group-hover:text-white">
                Explore Now
              </span>
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default About;
