import type { NextPage } from "next";
import { withAuth } from "../../utils/withAuth";
import Layout from "../../layouts/Layout";
import React, { useState, useEffect } from "react";
import Image from "next/image";
import hover from "../../assets/images/readinghover.svg";
import Card from "../../components/Dashboard/Card";

const Dashboard: NextPage = () => {
  const [data, setData] = useState([1, 2, 4,2,43,3,3]);
  const [loading, setLoading] = useState(false);

  return (
    <Layout title="Dashboard">
      <section className="mt-24">
        <div>
          {data.length == 0 && !loading ? (
            <div className=" flex justify-center  w-full h-[100vh]">
              <div className="w-full h-[30%] w-[30%]">
                <Image src={hover} alt="power" className="" />
                <p className="text-center text-xl fount-bold">No classes yet</p>
              </div>
            </div>
          ) : (
            <div className="grid grid-cols-1 px-3 py-4 gap-y-10 sm:grid-cols-1 gap-x-6 lg:grid-cols-3 xl:grid-cols-4 xl:gap-x-8 w-full">
              {data.map((item) => (
                <Card data={item}/>
              ))}
            </div>
          )}
        </div>
      </section>
    </Layout>
  );
};

export default withAuth(Dashboard);
