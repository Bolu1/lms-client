import type { NextPage } from "next";
import { withAuth } from "../../utils/withAuth";
import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useRouter } from "next/router";
import { fetchPeopleAction } from "../../redux/classesSlice";
import { toast } from "react-toastify";
import Loader from "../Utils/Loader"


const People = (props: any) => {

  const [loading, setLoading] = useState(true);
  const [teachers, setTeachers] = useState([])
  const [students, setStudents] = useState([])

  const { user } = useSelector((state: any) => state.auth);
  const router = useRouter();
  const dispatch = useDispatch();

  const fetchPeople = async() =>{
    setLoading(true);
    // @ts-ignore
    const result = await dispatch(fetchPeopleAction(props.slug, user.token, toast));
    // @ts-ignore
    setTeachers(result.teachers);
    setStudents(result.students);
    setLoading(false);


    }  

  useEffect(() => {

    if (props.tab == "people") {
      fetchPeople()
    }

  }, [props.tab]);

  return (
    <>
            {loading ? (
          <div className="mt-[20vh]">
            <Loader />
          </div>
        ) : (
    <div className="px-5 md:w-full lg:px-32">
      <div className="mt-8">
        <p className="lg:text-4xl text-xl border-b border-black pb-4">Teachers</p>
        <div className="my-4">
          {teachers && teachers.map((item:any)=>(
          <div className="flex items-center">
            <div className="rounded-full">
              <img
                crossOrigin="anonymous"
                src={process.env.NEXT_PUBLIC_IMAGE_URL+item?.photo} 
                alt="power"
                className="rounded-full w-12 h-12 object-cover"
              />
            </div>
            <a href="#" className="mx-2 text-gray-700 pl-4 text-gray-200">
              {item.firstname} {item.lastname}
            </a>
          </div>
          ))}
        </div>
      </div>

      <div className="mt-12 w-full ">
        <div className="flex w-full border-b border-black pb-4 justify-between items-center">
        <p className="lg:text-4xl text-xl">Students</p>
        <p className="text-xs">{students.length} student(s)</p>
        </div>
        <div className="my-4">
        {students && students.map((item:any)=>(
          <div className="flex items-center">
            <div className="rounded-full">
              <img
                crossOrigin="anonymous"
                src={process.env.NEXT_PUBLIC_IMAGE_URL+item?.photo} 
                alt="power"
                className="rounded-full w-12 h-12 object-cover"
              />
            </div>
            <a href="#" className="mx-2 text-gray-700 pl-4 text-gray-200">
              {item.firstname} {item.lastname}
            </a>
          </div>
          ))}
        </div>
      </div>
    </div>
        )}
    </>
  );
};

export default People;
