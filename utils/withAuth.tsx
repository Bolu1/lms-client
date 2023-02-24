/* eslint-disable react-hooks/exhaustive-deps */
import React, { useContext, useState, useEffect } from "react";
import Cookie from "js-cookie";
import { useRouter } from "next/router";
import { useDispatch, useSelector } from "react-redux";

export const withAuth = (Component: any) => {
  const AuthenticatedComponent = () => {
    const router = useRouter();
    const [data, setData] = useState();
    const state = useSelector((state: any) => state.auth);
    // console.log("a",state)
    useEffect(() => {
      const getUser = async () => {
        const token = Cookie.get('token')
                if (!token) {
                    router.push('/auth/login');
                } else {
                    setData(JSON.parse(token));
                }  
      };
      getUser();
    }, []);

    return !!data ? <Component data={data} /> : null; // Render whatever you want while the authentication occurs
  };

  return AuthenticatedComponent;
};