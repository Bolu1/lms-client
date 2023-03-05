import React from "react";
import hover from "../../assets/images/readinghover.svg";
import { useRouter } from "next/router";
import Image from "next/image";

function Card(props:any) {
  const router = useRouter();

  return (
      <div
        onClick={() => router.push(`/dashboard/class/${props.data.slug}`)}
        className="max-w-sm overflow-hidden cursor-pointer hover:shadow-2xl rounded-lg shadow-md "
      >
        <img  crossOrigin="anonymous"  className="object-cover w-full h-40" src={process.env.NEXT_PUBLIC_IMAGE_URL+props.data.banner} alt="Banner"  />

        <div className="p-6">
          <div>
            <a className=" mt-2 text-2xl font-medium  transition-colors duration-200  ">
              {props.data.class_name}
            </a>
            <p className="mt-2 text-sm  text-gray-400">
            {props.data.class_information}

            </p>
          </div>

          <div className="mt-4">
            <div className="">
              <div className="flex items-center">
                <div className=" h-[20%] w-[20%] rounded-full">
                  <img crossOrigin="anonymous" src={process.env.NEXT_PUBLIC_IMAGE_URL+props.data.photo}  alt="power" className="rounded-full w-12 h-12 object-cover" />
                </div>
                <a
                  href="#"
                  className="mx-2 text-gray-700  text-gray-200"
                >
                  {props.data.firstname} {props.data.lastname}
                </a>
              </div>
            </div>
          </div>
        </div>
    </div>
  );
}

export default Card;
