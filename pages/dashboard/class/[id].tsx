import type { NextPage } from "next";
import { withAuth } from "../../../utils/withAuth";
import Layout from "../../../layouts/Layout";
import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchOneClassAction, fetchPosts, fetchPeopleAction } from "../../../redux/classesSlice";
import { toast } from "react-toastify";
import Image from "next/image";
import { useRouter } from "next/router";
import Post from "../../../components/Class/Post";
import PostCard from "../../../components/Class/PostCard";
import People from "../../../components/Class/People";
import hover from "../../../assets/images/readinghover.svg";
import Loader from "../../../components/Utils/Loader";

const Class: NextPage = () => {
  const [data, setData] = useState<any>({});
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showMore, setShowMore] = useState(true);
  const [tab, setTab] = useState("class");
  const [slug, setSlug] = useState("");
  const [page, setPage] = useState(0);
  const [showMoreLoading, setShowMoreLoading] = useState(false);
  const [teachers, setTeachers] = useState([])
  const [students, setStudents] = useState([])

  const { user } = useSelector((state: any) => state.auth);
  const router = useRouter();
  const dispatch = useDispatch();

  const fetch = async (id: any = slug, page: number = 0) => {
    setLoading(true);
    console.log(id);
    // @ts-ignore
    const result = await dispatch(fetchOneClassAction(id, user.token, toast));
    // @ts-ignore
    const postResponse = await dispatch(
    // @ts-ignore
      fetchPosts(id, page, user.token, toast)
    );
    // @ts-ignore
    setPosts(postResponse);
    setData(result);

    setLoading(false);
  };

  const morePostHandler = async () => {
    setShowMoreLoading(true);
    setPage(page + 1);
    // @ts-ignore
    const postResponse = await dispatch(
    // @ts-ignore
      fetchPosts(slug, page + 1, user.token, toast)
    );
    console.log(postResponse.length);
    // @ts-ignore
    if (postResponse.length == 0) {
      setShowMore(false);
      setShowMoreLoading(false);
      console.log("here")
      return
    }
    // @ts-ignore
    const temp = posts.concat(postResponse);
    setPosts(temp);
    setShowMoreLoading(false);
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
    <Layout title={data?.class_name} tab={tab} setTab={setTab}>
      <div className="w-[100vw] ">
        {loading ? (
          <div className="mt-[20vh]">
            <Loader />
          </div>
        ) : (
          <>
          {tab == "class" &&
          <div className="px-5 w-[100vh] md:w-full lg:px-32">
            {/* header */}
            <div className="min-h-[16rem] overflow-hidden relative rounded-2xl bg-black/50 backdrop-blur-sm ">
              <div className="w-full h-full absolute">
                {data.banner ? (
                  <img
                    crossOrigin="anonymous"
                    src={process.env.NEXT_PUBLIC_IMAGE_URL + data.banner}
                    alt=""
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <div className="bg-black "></div>
                )}
              </div>
              <div className="absolute w-[90%]  h-32 bottom-0 left-4">
                <h1 className="text-3xl uppercase text-white font-extrabold">
                  {data.class_name}
                </h1>
                <div className="flex mt-2 space-x-4">
                  <p className="text-white font-bold">
                    {data.class_information}
                  </p>
                </div>
              </div>
            </div>
            <div className="mt-5">
              <Post classId={slug} action={fetch} />
            </div>
            <div className="mt-8">
              {posts?.length == 0 ? (
                <div className=" flex justify-center  w-full h-[100vh]">
                  <div className="w-full h-[30%] w-[30%]">
                    <Image src={hover} alt="power" className="" />
                    <p className="text-center text-xl fount-bold">
                      No Posts yet
                    </p>
                  </div>
                </div>
              ) : (
                <div className="space-y-6">
                  {posts && posts.map((item: any) => <PostCard data={item} />)}
                </div>
              )}
            </div>

            <div className="flex justify-center">
              {showMoreLoading ? (
                <div className="flex  justify-center py-8 space-x-2">
                  <div className="w-4 h-4 rounded-full animate-pulse bg-black"></div>
                  <div className="w-4 h-4 rounded-full animate-pulse bg-black"></div>
                  <div className="w-4 h-4 rounded-full animate-pulse bg-black"></div>
                </div>
              ) : (
                <>
              {showMore ? (

                <div className="flex justify-center py-8">
                  <div className="inline-flex items-center mx-auto rounded  bg-black  text-white ">
                    <button
                      type="button"
                      onClick={morePostHandler}
                      className="px-4 py-3"
                    >
                      More
                    </button>
                    <button
                      type="button"
                      title="Toggle dropdown"
                      className="p-3"
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                        className="w-5 h-5"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="2"
                          d="M19 9l-7 7-7-7"
                        ></path>
                      </svg>
                    </button>
                  </div>
                </div>
              ):
              (
            <p className="py-8 text-gray-500">No more posts</p>
              )
}
                </>
              )}
            </div>
          </div>
          }

          {tab == "people" &&
        // @ts-ignore
          <People tab={tab} slug={slug}/>
          }


          </>
        )}
      </div>
    </Layout>
  );
};

export default withAuth(Class);
