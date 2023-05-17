import type { NextPage } from "next";
import { withAuth } from "../../../utils/withAuth";
import Layout from "../../../layouts/Layout";
import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchSubmissions } from "../../../redux/taskSlice";
import { toast } from "react-toastify";
import { useRouter } from "next/router";
import hover from "../../../assets/images/readinghover.svg";
import Loader from "../../../components/Utils/Loader";
import Image from "next/image";
import { timeStampToDate } from "../../../utils/constants";
import SubmissionCard from "../../../components/Class/SubmissionCard";
import EditTask from "../../../components/Class/EditTask";
import DeleteTask from "../../../components/Class/DeleteTask";

const Class: NextPage = () => {
  const [data, setData] = useState<any>({});
  const [submissions, setSubmissions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showMore, setShowMore] = useState(true);
  const [tab, setTab] = useState("class");
  const [slug, setSlug] = useState("");

  const { user } = useSelector((state: any) => state.auth);
  const router = useRouter();
  const dispatch = useDispatch();

  const fetch = async (id: any = slug, page: number = 0) => {
    setLoading(true);
    console.log(id);
    // @ts-ignore
    const result = await dispatch(fetchSubmissions(id, user.token, toast));
    // @ts-ignore
    setData(result.data);
    setSubmissions(result.submission);

    setLoading(false);
  };

  // useeffect to change tabs
  // @ts-ignore

  // @ts-ignore
  useEffect(() => {
    if (router.isReady) {
      const { id } = router.query;
      console.log(router.query);
      if (!id) return null;
      try {
        // @ts-ignore
        setSlug(id);
        // @ts-ignore
        fetch(id).then((value) => {
          // @ts-ignore
          if (!value) return;
          // @ts-ignore
          fetch(id);
        });
      } catch (error) {
        console.log(error);
      }
    }
  }, [router.isReady]);

  return (
    <Layout
      title={data?.class_name}
      tab={tab}
      setTab={setTab}
      teacher={data.teacher_id}
    >
      <div className="w-full">
        {loading ? (
          <div className="mt-[20vh]">
            <Loader />
          </div>
        ) : (
          <>
            <div className="px-5 md:w-full lg:px-32 ">
              <div className="flex justify-center ">
                <div className="bg-white rounded-md h-full p-6 w-full lg:w-[40vw]">
                  {/* create button */}

                  <div>
                    <div className="w-full space-y-4 mb-4">
                      <div className="flex space-x-2">
                        <p className="text-xl">Title:</p>
                        <p className="text-xl font-medium">{data.title}</p>
                      </div>

                      <div className="flex space-x-2">
                        <p className="text-xl">Instruction:</p>
                        <p className="text-xl font-medium">
                          {data.instruction}
                        </p>
                      </div>

                      <div className="flex space-x-2">
                        <p className="text-xl">Due date:</p>
                        <p className="text-xl font-medium">
                          {timeStampToDate(data.duedate)}
                        </p>
                      </div>
                    </div>

                    <div className="my-8 flex space-x-4 items-center">
                      <EditTask data={data} action={fetch} />
                      <DeleteTask id={data.slug} />
                    </div>
                  </div>

                  <div className="flex w-full border-b border-black pb-4 justify-between items-center">
                    <p className="lg:text-4xl text-xl">Submissions</p>
                    <p className="text-xs">
                      {submissions?.length ? submissions?.length : 0}{" "}
                      submission(s)
                    </p>
                  </div>

                  <div className="mt-8">
                    {submissions?.length == 0 ? (
                      <div className=" flex justify-center  w-full h-[100vh]">
                        <div className="w-full h-[30%] w-[30%]">
                          <Image src={hover} alt="power" className="mx-auto" />
                          <p className="text-center text-xl fount-bold">
                            No submission yet
                          </p>
                        </div>
                      </div>
                    ) : (
                      <div>
                        <div className="space-y-6">
                          {submissions &&
                            submissions.map((item: any) => (
                              <SubmissionCard item={item} />
                            ))}
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </>
        )}
      </div>
    </Layout>
  );
};

export default withAuth(Class);
