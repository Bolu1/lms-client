import { ISignupResponse } from '../interfaces/user.interface';
import { createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import Cookies from "js-cookie";

interface InitialState{
    loading: boolean,
    error: any,
    classes: any
}

const initialState: InitialState = {
  loading: false,
  error: null,
  classes: []
};
const classesSlice = createSlice({
  name: "classes",
  initialState,
  reducers: {
    createClassStart(state:InitialState) {
      state.loading = true;
      state.error = null;
    },
    createClassSuccess(state:InitialState, action:any) {
      state.loading = false;
      state.error = null;
    },
    createClassFailure(state:InitialState, action:any) {
      state.loading = false;
      state.error = action.payload.error;
    },
    fetchClassesStart(state:InitialState) {
      state.loading = true;
      state.error = null;
    },
    fetchClassesSuccess(state:InitialState, action:any) {
      state.loading = false;
      state.error = null;
      state.classes = action.payload.classes;

    },
    fetchClassesFailure(state:InitialState, action:any) {
      state.loading = false;
      state.error = action.payload.error;
    },
    joinClassStart(state:InitialState) {
      state.loading = true;
      state.error = null;
    },
    joinClassSuccess(state:InitialState, action:any) {
      state.loading = false;
      state.error = null;
      state.classes = action.payload.classes;

    },
    joinClassFailure(state:InitialState, action:any) {
      state.loading = false;
      state.error = action.payload.error;
    }
  },
});
export const {
  createClassStart,
  createClassSuccess,
  createClassFailure,
  fetchClassesStart,
  fetchClassesSuccess,
  fetchClassesFailure,
  joinClassStart,
  joinClassSuccess,
  joinClassFailure,
} = classesSlice.actions;
export const createClassAction =
  (className: string, classInformation: string, filename: string, token:string, toast:any, router:any) => async (dispatch:any) => {
    try {
      dispatch(createClassStart());
      const formData = new FormData();
      formData.append("className", className);
      formData.append("classInformation", classInformation);
      formData.append("image", filename);
      const response = await axios.post(
        `${process.env.NEXT_PUBLIC_BASE_URL}classes/create`,
        formData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      console.log(response.data.data);
      dispatch(createClassSuccess(response.data));
      toast.success("Successful")
      router.push(`/dashboard/class/${response.data.data}`)
    } catch (error: any) {
      console.log("ss")
      //   console.log(error instanceof Error);
      toast.error(error.response.data.message);
      dispatch(createClassFailure( error ));
    }
  };

  export const fetchClassesAction =
  (token:string, toast:any) => async (dispatch:any) => {
    try {
      dispatch(fetchClassesStart());
      const response = await axios.get(
        `${process.env.NEXT_PUBLIC_BASE_URL}classes/fetch`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      console.log(response.data.data);
      dispatch(fetchClassesSuccess(response.data.data));
      return response.data.data;
    } catch (error: any) {
      console.log("ss")
      //   console.log(error instanceof Error);
      toast.error(error.response.data.message);
      dispatch(fetchClassesFailure( error ));
    }
  };  

  export const joinClassAction =
  (classCode:string ,token:string, toast:any, router:any) => async (dispatch:any) => {
    try {
      dispatch(joinClassStart());
      const response = await axios.post(
        `${process.env.NEXT_PUBLIC_BASE_URL}classes/join`,
        {classCode:classCode},
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      console.log(response.data.data);
      dispatch(joinClassSuccess(response.data.data));
      toast.success("Successful")
      router.push(`/dashboard/class/${response.data.data}`)
    } catch (error: any) {
      console.log("ss")
      //   console.log(error instanceof Error);
      toast.error(error.response.data.message);
      dispatch(joinClassFailure( error ));
    }
  };


  export const fetchOneClassAction =
  (id:string ,token:string, toast:any) => async (dispatch:any) => {
    try {
      dispatch(joinClassStart());
      const response = await axios.get(
        `${process.env.NEXT_PUBLIC_BASE_URL}classes/fetch/class/${id}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      console.log(response.data.data);
      dispatch(joinClassSuccess(response.data.data));
      return response.data.data
    } catch (error: any) {
      console.log("ss")
      //   console.log(error instanceof Error);
      toast.error(error.response.data.message);
      dispatch(joinClassFailure( error ));
    }
  };

  export const createNewPost =
  (content: string, classId: string, filename: any, token:string, toast:any) => async (dispatch:any) => {
    try {
      dispatch(createClassStart());
      const formData = new FormData();
      formData.append("classId", classId);
      formData.append("content", content);
      formData.append("file", filename);
      const response = await axios.post(
        `${process.env.NEXT_PUBLIC_BASE_URL}classes/post/new`,
        formData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      console.log(response.data.data);
      dispatch(createClassSuccess(response.data));
      toast.success("Successful")
      return response.data.data
    } catch (error: any) {
      console.log("ss")
      //   console.log(error instanceof Error);
      toast.error(error.response.data.message);
      dispatch(createClassFailure( error ));
    }
  };

  export const fetchPosts =
  (id:string , page:string ,token:string, toast:any) => async (dispatch:any) => {
    try {
      dispatch(fetchClassesStart());
      const response = await axios.get(
        `${process.env.NEXT_PUBLIC_BASE_URL}classes/post/${id}?offset=${page}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      console.log(response.data.data);
      dispatch(fetchClassesSuccess(response.data.data));
      return response.data.data;
    } catch (error: any) {
      console.log("ss")
      //   console.log(error instanceof Error);
      toast.error(error.response.data.message);
      dispatch(fetchClassesFailure( error ));
    }
  };  

  export const fetchPeopleAction =
  (id:string, token:string, toast:any) => async (dispatch:any) => {
    try {
      dispatch(fetchClassesStart());
      const response = await axios.get(
        `${process.env.NEXT_PUBLIC_BASE_URL}classes/fetch/people/${id}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      console.log(response.data.data);
      dispatch(fetchClassesSuccess(response.data.data));
      return response.data.data;
    } catch (error: any) {
      console.log("ss")
      //   console.log(error instanceof Error);
      toast.error(error.response.data.message);
      dispatch(fetchClassesFailure( error ));
    }
  };  

  export const editClassAction =
  (className: string, classInformation: string, filename: string, classId:string, token:string, toast:any, router:any) => async (dispatch:any) => {
    try {
      dispatch(createClassStart());
      const formData = new FormData();
      formData.append("className", className);
      formData.append("classInformation", classInformation);
      formData.append("class_id", classId);
      formData.append("image", filename);
      const response = await axios.patch(
        `${process.env.NEXT_PUBLIC_BASE_URL}classes/edit`,
        formData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      console.log(response.data);
      dispatch(createClassSuccess(response.data));
      toast.success(response.data.message)
      // router.push(`/dashboard/class/${response.data.data}`)
    } catch (error: any) {
      console.log("ss")
      //   console.log(error instanceof Error);
      toast.error(error.response.data.message);
      dispatch(createClassFailure( error ));
    }
  };


export default classesSlice.reducer;