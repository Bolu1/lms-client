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
import TaskCard from "./TaskCard";

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
                            <TaskCard item={item} teacherId={props.data.teacher_id}/>

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
