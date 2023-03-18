import { useRouter } from "next/router";
import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Media from "./Media"
import dynamic from 'next/dynamic';
import { format } from "timeago.js";

function Post(props:any) {
  const [show, setShow] = useState(false);
  const [content, setContent] = useState("")
  const router = useRouter();
  const { user } = useSelector((state:any) => state.auth);
  const dispatch = useDispatch();


  return (
    <div className="flex justify-center ">
    <div className="bg-white rounded-md border h-full border-gray-300 p-4 w-full lg:w-[70vw]">
      <div className="">
      <div className="flex space-x-4 my-3">
                <div className=" rounded-full">
                  <img crossOrigin="anonymous" src={process.env.NEXT_PUBLIC_IMAGE_URL+props?.data?.photo}  alt="power" className="rounded-full w-12 h-12 object-cover" />
                </div>
                <div className=" items-center">
                <p
                  className="text-gray-700"
                >
                  {props?.data?.firstname} {props?.data?.lastname}
                </p>
                <p
                  className="text-gray-700 text-xs"
                >
                 {format(props.data.created_at)}
                </p>
                </div>
            </div>
      </div>

      <div className=" overflow-hidden">
      <p
                            dangerouslySetInnerHTML={{
                              __html: props?.data.content?.replace(/\n/g, "<br/>"),
                            }}
                  className="text-base"
                />
        </div>

        {
          props?.data?.file_url &&
          (
            <Media fileUrl={props?.data?.file_url} fileType={props?.data?.file_type} fileName={props?.data?.file_name}/>
          )
        }
    </div>
    </div>
  );
}

export default Post;
