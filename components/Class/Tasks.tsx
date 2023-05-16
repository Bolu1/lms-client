import type { NextPage } from "next";
import { withAuth } from "../../utils/withAuth";
import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useRouter } from "next/router";
import { fetchTaskAction } from "../../redux/taskSlice";
import Image from "next/image";
import hover from "../../assets/images/readinghover.svg";
import { format } from "timeago.js";
import { toast } from "react-toastify";
import Loader from "../Utils/Loader";
import CreateTask from "../Class/CreateTask";

const Tasks = (props: any) => {
  const [loading, setLoading] = useState(false);
  const [assignments, setAssignments] = useState([]);
  const [className, setClassName] = useState(props.data.class_name);
  const [classInformation, setClassInformation] = useState(
    props.data.class_information
  );
  const [fileName, setFileName] = useState(null);

  const { user } = useSelector((state: any) => state.auth);
  const dispatch = useDispatch();
  const router = useRouter();

  const fetchTask = async() =>{
    setLoading(true);
    // @ts-ignore
    const result = await dispatch(fetchTaskAction(props.data.slug, user.token, toast));
    // @ts-ignore
    setAssignments(result)
    setLoading(false);
    }  


  useEffect(() => {

    console.log(props.tab)
    if (props.tab == "tasks") {
      fetchTask()
    }

  }, [props.tab]);

  return (
    <>
      {loading ? (
        <div className="mt-[20vh]">
          <Loader />
        </div>
      ) : (
        <div className="px-5 md:w-full lg:px-32 ">
          <div className="flex justify-center ">
            <div className="bg-white rounded-md h-full p-6 w-full lg:w-[40vw] mt-12">
              {/* create button */}
              {user.id == props.data.teacher_id && (
                <CreateTask data={props.data} action={fetchTask}/>
              )}

              <div className="mt-8">
                {assignments?.length == 0 ? (
                  <div className=" flex justify-center  w-full h-[100vh]">
                    <div className="w-full h-[30%] w-[30%]">
                      <Image src={hover} alt="power" className="mx-auto" />
                      <p className="text-center text-xl fount-bold">
                        No Assignment yet
                      </p>
                    </div>
                  </div>
                ) : (
                  <div className="space-y-6">
                    {assignments &&
                      assignments.map((item: any) => (
                        <div className="bg-white rounded-md border-b cursor-pointer hover:shadow-lg h-full flex items-center justify-between border-gray-300 p-4 w-full ">
                          <div className="flex space-x-2 items-center">
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              viewBox="0 0 24 24"
                              fill="currentColor"
                              className="w-6 h-6"
                            >
                              <path
                                fillRule="evenodd"
                                d="M4.125 3C3.089 3 2.25 3.84 2.25 4.875V18a3 3 0 003 3h15a3 3 0 01-3-3V4.875C17.25 3.839 16.41 3 15.375 3H4.125zM12 9.75a.75.75 0 000 1.5h1.5a.75.75 0 000-1.5H12zm-.75-2.25a.75.75 0 01.75-.75h1.5a.75.75 0 010 1.5H12a.75.75 0 01-.75-.75zM6 12.75a.75.75 0 000 1.5h7.5a.75.75 0 000-1.5H6zm-.75 3.75a.75.75 0 01.75-.75h7.5a.75.75 0 010 1.5H6a.75.75 0 01-.75-.75zM6 6.75a.75.75 0 00-.75.75v3c0 .414.336.75.75.75h3a.75.75 0 00.75-.75v-3A.75.75 0 009 6.75H6z"
                                clipRule="evenodd"
                              />
                              <path d="M18.75 6.75h1.875c.621 0 1.125.504 1.125 1.125V18a1.5 1.5 0 01-3 0V6.75z" />
                            </svg>
                            <p>
                              {item.title}
                            </p>
                          </div>

                          <p className="text-sm text-gray-600">Posted {format(props.data.created_at)}
                          </p>
                        </div>
                      ))}
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Tasks;
