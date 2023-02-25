import React from "react";
import book from "../../assets/images/book.png";
import teamwork from "../../assets/images/teamwork.png";
import authorization from "../../assets/images/authorization.png";
import work from "../../assets/images/work-place.png";
import Image from "next/image"

const Whatwedo = () => {
  return (
    <div id="about">
      <h1 className="w-full max-w-[80rem]  mx-auto lg:text-left mt-14 text-[34px] font-bold text-center">
        <span>Our system is an </span>
        <span className="focus-text">easy-to-use</span>
        <span> and secure tool</span>
      </h1>
      <div className="w-full max-w-[80rem] px-5 pb-10 flex-wrap lg:text-black  flex justify-between mt-14 = mx-auto ">
        <div className="xl:w-[277px] lg:w-[230px] w-full   lg:border lg:border-gray-300 lg:drop-shadow-md py-5 px-3 rounded-xl flex flex-col items-center ">
          <Image src={work} alt="" className="w-[80px]" />
          <h4 className="text-[20px] mt-10">All-in-one Place</h4>
          <p className="text-center mt-3">
            Bring all your learning tools together and manage multiple classes
            in one central destination.
          </p>
        </div>
        <div className="xl:w-[277px] lg:w-[230px] w-full   lg:border lg:border-gray-300 lg:drop-shadow-md py-5 px-3 rounded-xl flex flex-col items-center ">
          <Image src={book} alt="" className="w-[80px]" />
          <h4 className="text-[20px] mt-10">Easy to use</h4>
          <p className="text-center mt-3">
            Anyone in your school community can get up and running with
            Classroom in minutes.
          </p>
        </div>
        <div className="xl:w-[277px] lg:w-[230px] w-full   lg:border lg:border-gray-300 lg:drop-shadow-md py-5 px-3 rounded-xl flex flex-col items-center ">
          <Image src={teamwork} alt="" className="w-[80px]" />
          <h4 className="text-[20px] mt-10">Built for collaboration</h4>
          <p className="text-center mt-3">
            Work simultaneously in the same document with the whole class or
            connect face-to-face with Google Meet.
          </p>
        </div>
        <div className="xl:w-[277px] lg:w-[230px] w-full   lg:border lg:border-gray-300 lg:drop-shadow-md py-5 px-3 rounded-xl flex flex-col items-center ">
          <Image src={authorization} alt="" className="w-[80px]" />
          <h4 className="text-[20px] mt-10">Accessible</h4>
          <p className="text-center mt-3">
            Empower teaching and learning from anywhere, on any device, and give
            your class more flexibility and mobility.
          </p>
        </div>
      </div>
    </div>
  );
};

export default Whatwedo;