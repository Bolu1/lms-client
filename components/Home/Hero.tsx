import React from "react";
import hero1 from "../../assets/images/hero1.png";
import hero2 from "../../assets/images/fresh.png";
import hero3 from "../../assets/images/graduate.png";
import Image from "next/image";
import {useRouter} from "next/router"

const Hero = () => {

  const router = useRouter()

  return (
    <div className="w-full pb-20 h-[100%]  pt-32 bg-[#FFF0e5]">
      <div className="w-full max-w-[80rem] h-full  px-5 flex justify-between items-center  flex-wrap mx-auto">
        <div className="lg:w-[40%] xl:w-[46%] xl:h-[612px] lg:h-full  ">
          <h1 className="xl:text-[72px] lg:text-[54px] text-[27px] xl:leading-[1.25] lg:leading-[1.1]  font-[600] spacey-4 ">
            <span>The Easiest way to </span>{" "}
            <span className="focus-text h-[93px]">Learn</span>
            <span> new things</span>
          </h1>
          <p className="text-[22px] mt-10 text-[#707070]">
            LMS is your all-in-one place for teaching and enriching learning
            experiences.
          </p>
          <a
            onClick={()=>{router.push("/auth/register")}}
            className="relative inline-flex mt-10 items-center px-12 py-3 overflow-hidden text-lg font-medium text-black border-2 border-black rounded-full hover:text-white group hover:bg-gray-50"
          >
            <span className="absolute left-0 block w-full h-0 transition-all bg-black opacity-100 group-hover:h-full top-1/2 group-hover:top-0 duration-400 ease"></span>
            <span className="absolute right-0 flex items-center justify-start w-10 h-10 duration-300 transform translate-x-full group-hover:translate-x-0 ease">
              <svg
                className="w-5 h-5"
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
            <span className="relative">Get Started</span>
          </a>
        </div>
        <div className="w-[48%] xl:h-[612px] lg:h-full h-full  relative ">
          <div className="absolute top-14 lg:w-[192px] lg:h-[192px] xl:w-[232px] xl:h-[232px] bg-[#faac3b] rounded-xl  left-0">
            <Image src={hero1} alt="" className="absolute -top-12" />
          </div>
          <div className="absolute bottom-0 lg:w-[192px] lg:h-[192px] xl:w-[232px] xl:h-[232px] bg-[#e78ffe] rounded-xl  left-0">
            <Image src={hero2} alt="" className="absolute bottom-0" />
          </div>
          <div className="absolute hero3 top-[50%] lg:w-[245px] lg:h-[322px] xl:w-[305px] xl:h-[392px] bg-[#66c3fd] rounded-xl  right-0">
            <Image src={hero3} alt="" className="absolute bottom-0" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Hero;
