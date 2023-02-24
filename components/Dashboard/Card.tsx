import React from "react";
import hover from "../../assets/images/readinghover.svg";
import { useRouter } from "next/router";
import Image from "next/image";

function Card(props) {
  const router = useRouter();

  return (
    <div>
      <div
        key="{d._id}"
        // onClick={() => router.push(`/class/`)}
        className="max-w-sm overflow-hidden cursor-pointer hover:shadow-2xl  rounded-lg shadow-md "
      >
        <Image className="object-cover w-full h-40" src={hover} alt="Article" />

        <div className="p-6">
          <div>
            <span className="text-xs font-medium  uppercase  text-blue-400">
              Class
            </span>
            <a className="block mt-2 text-2xl font-semibold  transition-colors duration-200 transform  text-white ">
              name
            </a>
            <p className="mt-2 text-sm  text-gray-400">info</p>
          </div>

          <div className="mt-4">
            <div className="">
              <div className="flex items-center">
                <div className=" h-[20%] w-[20%] rounded-full">
                  <Image src={hover} alt="power" className="" />
                </div>
                <a
                  href="#"
                  className="mx-2 font-semibold text-gray-700  text-gray-200"
                >
                  .teacher.name
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Card;
