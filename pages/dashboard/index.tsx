import type { NextPage } from "next";
import { withAuth } from "../../utils/withAuth";
import Layout from "../../layouts/Layout";
import React, { useState, useEffect } from "react";
import Image from "next/image";
import hover from "../../assets/images/readinghover.svg";
import Card from "../../components/Dashboard/Card";
import { useDispatch, useSelector } from "react-redux";
import { fetchClassesAction } from "../../redux/classesSlice";
import { toast } from "react-toastify";
import { useRouter } from "next/router";
import Loader from "../../components/Utils/Loader";

const Dashboard: NextPage = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);

  const { user } = useSelector((state: any) => state.auth);
  const router = useRouter();
  const dispatch = useDispatch();

  useEffect(() => {
    const fetch = async () => {
      // @ts-ignore
      const result = await dispatch(fetchClassesAction(user.token, toast))
      // @ts-ignore
      setData(result)
    setLoading(false);
    };
    fetch();
  }, []);

  return (
    <Layout title="Dashboard">
      <section className="px-8 ">
        <div>
          {loading ? (
            <div className="mt-[20vh]">
              <Loader />
            </div>
          ) : (
            <>
              {data.length == 0 && !loading ? (
                <div className=" flex justify-center  w-full h-[100vh]">
                  <div className="w-full h-[30%] w-[30%]">
                    <Image src={hover} alt="power" className="" />
                    <p className="text-center text-xl fount-bold">
                      No classes yet
                    </p>
                  </div>
                </div>
              ) : (
                <div className="grid grid-cols-1 px-3 py-4 gap-y-10 sm:grid-cols-1 md:grid-cols-2 gap-x-6 lg:grid-cols-3 xl:grid-cols-4 xl:gap-x-8 w-full">
                  {data.map((item: any) => <Card data={item} />)}
                </div>
              )}
            </>
          )}
        </div>
      </section>
    </Layout>
  );
};

export default withAuth(Dashboard);
