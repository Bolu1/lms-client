import React from "react";
import { AiOutlineDownload } from "react-icons/ai";
import { BsFillFileEarmarkTextFill } from "react-icons/bs";
import { FaFileVideo } from "react-icons/fa";

function Loader(props: any) {
  return (
    <div>
      {props.fileType.includes("image") && (
        <div>
          <div className="h-[250px] w-[250px] lg:h-[400px] lg:w-[400px]">
            <img
              crossOrigin="anonymous"
              src={process.env.NEXT_PUBLIC_IMAGE_URL + props?.fileUrl}
              alt=""
              className="lg:h-full lg:w-full w-full h-full  object-cover"
            />
          </div>
          <a
            download="File"
            href={process.env.NEXT_PUBLIC_IMAGE_URL + props?.fileUrl}
            title={props?.fileName}
            target="blank"
          >
            <AiOutlineDownload className="h-8 w-8 my-2 cursor-pointer" />
          </a>
        </div>
      )}
      {props.fileType.includes("pdf") && (
        <div>
          <div className="flex items-center">
            <BsFillFileEarmarkTextFill className="h-16 w-16 my-2 " />
            <p>{props?.fileName}</p>
          </div>

          <a
            download="File"
            href={process.env.NEXT_PUBLIC_IMAGE_URL + props?.fileUrl}
            title=""
            className=""
            target="blank"
          >
            <AiOutlineDownload className="h-8 w-8 my-2 cursor-pointer ml-2" />
          </a>
        </div>
      )}
       {props.fileType.includes("video") && (
        <div>
          <div className="flex items-center">
            <FaFileVideo className="h-16 w-16 my-2 " />
            <p>{props?.fileName}</p>
          </div>

          <a
            download="File"
            href={process.env.NEXT_PUBLIC_IMAGE_URL + props?.fileUrl}
            title=""
            className=""
            target="blank"
          >
            <AiOutlineDownload className="h-8 w-8 my-2 cursor-pointer ml-2" />
          </a>
        </div>
      )}
    </div>
  );
}

export default Loader;
