// @ts-nocheck
import type { NextPage } from "next";
import { withAuth } from "../../utils/withAuth";
import Layout from "../../layouts/Layout";
import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { updateUserAction } from "../../redux/authSlice";
import { toast } from "react-toastify";
import dynamic from "next/dynamic";
import { useRouter } from "next/router";
import Loader from "../../components/Utils/Loader";
import AppBuilder from '@appbuilder/react'

const Videocall: NextPage = () => {
  const [loading, setLoading] = useState(false);
  const [firstname, setFirstname] = useState("");
  const [fileName, setFileName] = useState(null);
  const [lastname, setLastname] = useState("");
  const [password, setPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");

  const { user } = useSelector((state: any) => state.auth);
  const router = useRouter();
  const dispatch = useDispatch();

  const hiddenFileInput = React.useRef(null);


  return (
    <Layout title="Settings">
{typeof window !== "undefined" &&
         <section className="max-w-4xl  lg:mt-20 p-6 mx-auto bg-white rounded-md shadow-md :bg-gray-800 my-20">
            <AppBuilder.View />
      </section>
      }
    </Layout>
  );
};

export default dynamic(() => Promise.resolve(Videocall), {
    ssr: false,
  });