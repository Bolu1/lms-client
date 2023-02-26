import type { NextPage } from "next";
import { withAuth } from "../../../utils/withAuth";
import Layout from "../../../layouts/Layout";
import React, { useState, useEffect } from "react";
import Image from "next/image";
import hover from "../../../assets/images/readinghover.svg";
import Card from "../../../components/Dashboard/Card";
import { useDispatch, useSelector } from "react-redux";
import { fetchClassesAction } from "../../../redux/classesSlice";
import { toast } from "react-toastify";
import { useRouter } from "next/router";
import Loader from "../../../components/Utils/Loader";

const Settings: NextPage = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);

  const { user } = useSelector((state: any) => state.auth);
  const router = useRouter();
  const dispatch = useDispatch();

  

  return (
    <Layout title="Class">
  
    </Layout>
  );
};

export default withAuth(Settings);
