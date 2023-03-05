import { useRouter } from "next/router";
import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import dynamic from 'next/dynamic';
const ReactQuill = dynamic(() => import("react-quill"), { ssr: false });
import "react-quill/dist/quill.snow.css";
import { createNewPost } from "../../redux/classesSlice";
import { toast } from "react-toastify";
import Loader from '../Utils/Loader'
import { AiOutlineFileAdd } from "react-icons/ai";

function Post(props:any) {
  const [show, setShow] = useState(false);
  const [loading, setLoading] = useState(false);
  const [content, setContent] = useState("")
  const router = useRouter();
  const [fileName, setFileName] = useState(null);
  const { user } = useSelector((state:any) => state.auth);
  const dispatch = useDispatch();

  const handleClick2 = (event:any) => {
    hiddenFileInput2?.current?.click();
  };

  const onChangeFile = (e: any) => {
    setFileName(e.target.files[0]);
  };

  const hiddenFileInput2:any = React.useRef(null);

  const postHandler = async(e: React.FormEvent<EventTarget>) =>{

    setLoading(true)
    e.preventDefault()
    // @ts-ignore
    await dispatch(createNewPost(content, props.classId, fileName, user.token, toast));
    props.action()
    setContent("")
    setFileName(null)
    setLoading(false)    
    setShow(false)

  }

  

  return (
    <div>
      <div className=" flex justify-center ">

        {!show ? (

<div className="flex space-x-4 bg-white rounded-md shadow-xl p-4 w-full lg:w-[70vw]">
<div className=" rounded-full">
  <img crossOrigin="anonymous" src={process.env.NEXT_PUBLIC_IMAGE_URL+user?.photo}  alt="power" className="rounded-full w-12 h-12 object-cover" />
</div>
<div className="flex justify-start items-center">
<p
onClick={()=>setShow(true)}
  className="underline cursor-pointer "
>
  Say something
</p>
</div>
</div>

        )
          :(
            <form
            onSubmit={(e)=>postHandler(e)}
             className="w-full h-full flex flex-col p-5 bg-white rounded-md shadow-xl">
            <div className=" flex w-full justify-between items-center">

              {/* <p>
          Dont have an account?{" "}
          <Link href="/register" className="text-[#32C74A]">
            Register
          </Link>{" "}
        </p> */}
            </div>

            <div className="w-full space-y-3 mt-5">


              <ReactQuill
                theme="snow"
                value={content}
                // name="content"
                className=""
                onChange={setContent}
              />

              {/* <textarea
                id=""
                name="content"
                onChange={(e) => setContent(e.target.value)}
                placeholder="What is happening ?"
                className="w-full  py-1 outline-none px-2 rounded-md"
                rows="15"
              ></textarea> */}
            </div>
            <div className="w-full flex items-center justify-between mt-3 space-x-4">
              <div>
                <div
                  className="bg-black flex  px-3 py-1 font-bold text-base cursor-pointer"
                  onClick={handleClick2}
                >
                  <div className="flex justify-center items-center w-full my-1">
                    <AiOutlineFileAdd className="text-center text-white" />
                  </div>
                  {/* <span className="text-center text-white text-base">
                    Upload Files
                  </span> */}
                </div>
                <input
                  className="hidden"
                  name="two"
                  type="file"
                  onChange={(e) => onChangeFile(e)}
                  ref={hiddenFileInput2}
                />
              </div>

<div className="flex space-x-4">
              <div 
                  onClick={()=>{setShow(false)}}
                  className="flex items-center cursor-pointer">
                      <p>cancel</p>
                  </div>

                  <div className="items-center flex ">
                    {!loading ? (
                      <button
                        type="submit"
                        className="w-full px-4 py-2 tracking-wide text-white font-medium transition-colors duration-200 transform bg-black rounded-md cursor-pointer "
                      >
                        Submit
                      </button>
                    ) : (
                      <Loader />
                    )}
                  </div>
                  </div>

            </div>
          </form>
          )
        }
      </div>
    </div>
  );
}

export default Post;
