import { ISignupResponse } from './../interfaces/user.interface';
import { createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import Cookies from "js-cookie";

interface InitialState{
    loading: boolean,
    error: any,
    user: any,
    token: string
}

const initialState: InitialState = {
  loading: false,
  error: null,
  user: Cookies.get("userdetails")
    ? JSON.parse(Cookies.get("userdetails")!)
    : null,
  token: Cookies.get("token") ? JSON.parse(Cookies.get("token")!) : null,
};
const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    registerStart(state:InitialState) {
      state.loading = true;
      state.error = null;
    },
    registerSuccess(state:InitialState, action:any) {
      state.loading = false;
      state.error = null;
      state.user = action.payload.user;
    },
    registerFailure(state:InitialState, action:any) {
      state.loading = false;
      state.error = action.payload.error;
      state.user = null;
    },
    loginStart(state:InitialState) {
      state.loading = true;
      state.error = null;
    },
    loginSuccess(state:InitialState, action:any) {
      state.loading = false;
      state.error = null;
      state.user = action.payload.user;
    },
    loginFailure(state:InitialState, action?:any) {
      state.loading = false;
      state.error = action.payload.error;
      state.user = null;
    },
  },
});
export const {
  registerStart,
  registerSuccess,
  registerFailure,
  loginStart,
  loginSuccess,
  loginFailure,
} = authSlice.actions;
export const registerAction =
  (email: string, firstname: string, lastname: string, password: string, toast:any, router:any) => async (dispatch:any) => {
    try {
      dispatch(registerStart());
      const response = await axios.post(
        `${process.env.NEXT_PUBLIC_BASE_URL}auth/register`,
        {
          email,
          password,
          firstname,
          lastname
        }
      );
      console.log(response.data.data);
      dispatch(loginSuccess(response.data));
      toast.success("Successful")
      router.push("/auth/login")
    } catch (error: any) {
    //   console.log(error instanceof Error);
      toast.error(error.response.data.message);
      dispatch(loginFailure( error ));
    }
  };

  export const loginAction =
  (email: string, password: string, toast:any, router:any) => async (dispatch:any) => {
    try {
      dispatch(registerStart());
      const response = await axios.post(
        `${process.env.NEXT_PUBLIC_BASE_URL}auth/login`,
        {
          email,
          password,
        }
      );
      dispatch(loginSuccess(response.data));
      Cookies.set("userdetails", JSON.stringify(response.data.data), {
        expires: 2,
      });
      Cookies.set("token", JSON.stringify(response.data.data.token), {
        expires: 2,
      });
      toast.success("Successful")
      router.push("/dashboard")
    } catch (error: any) {
    //   console.log(error instanceof Error);
      toast.error(error.response.data.message);
      dispatch(loginFailure( error ));
    }
  };

export default authSlice.reducer;