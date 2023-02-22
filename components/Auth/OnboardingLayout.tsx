import React, {FC} from "react";
import hero1 from "../../assets/images/hero1.png";
import hero2 from "../../assets/images/fresh.png";
import hero3 from "../../assets/images/readinghover.svg";
import Image from "next/image";

const OnboardingLayout = ({ children }: {children:any}) => {
  return (
    <>
      <div className="h-full w-full relative lg:flex hidden items-center bg-[#00000] pr-10">
        <div className="w-full h-screen ">
          <a
            href="/"
            className=" font-bold absolute top-10 text-[30px] left-4"
          >
            LMS
          </a>
          {/* <Image
            src={hero2}
            alt=""
            className="w-full object-cover fixed bottom-0 "
          /> */}
        </div>
        <div className="z-20  fixed flex items-center justify-center ">
          <Image src={hero3} alt="" className=" object-cover w-[70%] " />
        </div>
        <div className=" w-full h-full relative">
          <div className="w-[400px] z-30 h-[86%] top-16 bg-[#F5F5F5]/70 rounded-[14px] absolute right-32"></div>

          {children}
        </div>
      </div>
      <div className="w-full h-[40rem] relative lg:hidden flex ">
        <div className="w-full relative h-full ">
          <div className="w-full relative op-0 h-[300px] bg-[#202329]">
            <a
              href="/"
              className="text-white font-bold fixed top-5 text-[25px] left-4"
            >
              clademy
            </a>
            {/* <img
              src={hero}
              alt=""
              className="w-full fixed object-cover top-0 "
            /> */}
          </div>
          {/* <div className=" w-full fixed gong top-32   flex justify-center ">
            <img src={backLogo} alt="" className="w-[70%]  object-cover " />
          </div> */}
          <div className="w-full h- absolute overflow-hidden  top-52 rounded-t-[15px] bg-[#00000]">
            {children}
          </div>  sZdL38
        </div>
      </div>
    </>
  );
};

export default OnboardingLayout;