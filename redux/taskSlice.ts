import { ISignupResponse } from '../interfaces/user.interface';
import { createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import Cookies from "js-cookie";

interface InitialState{
    loading: boolean,
    error: any,
    tasks: any
}

const initialState: InitialState = {
  loading: false,
  error: null,
  tasks: []
};
const TaskSlice = createSlice({
  name: "Task",
  initialState,
  reducers: {
    createTaskStart(state:InitialState) {
      state.loading = true;
      state.error = null;
    },
    createTaskSuccess(state:InitialState, action:any) {
      state.loading = false;
      state.error = null;
    },
    createTaskFailure(state:InitialState, action:any) {
      state.loading = false;
      state.error = action.payload.error;
    },
    fetchTaskStart(state:InitialState) {
      state.loading = true;
      state.error = null;
    },
    fetchTaskSuccess(state:InitialState, action:any) {
      state.loading = false;
      state.error = null;
      state.tasks = action.payload.task;

    },
    fetchTaskFailure(state:InitialState, action:any) {
      state.loading = false;
      state.error = action.payload.error;
    },
    joinTaskStart(state:InitialState) {
      state.loading = true;
      state.error = null;
    },
    joinTaskSuccess(state:InitialState, action:any) {
      state.loading = false;
      state.error = null;
      state.tasks = action.payload.task;

    },
    joinTaskFailure(state:InitialState, action:any) {
      state.loading = false;
      state.error = action.payload.error;
    }
  },
});
export const {
  createTaskStart,
  createTaskSuccess,
  createTaskFailure,
  fetchTaskStart,
  fetchTaskSuccess,
  fetchTaskFailure,
  joinTaskStart,
  joinTaskSuccess,
  joinTaskFailure,
} = TaskSlice.actions;
export const createTaskAction =
  (title: string, instruction: string, filename: any, duedate:any, classId:string, token:string, toast:any, router:any) => async (dispatch:any) => {
    try {
      dispatch(createTaskStart());
      const formData = new FormData();
      formData.append("title", title);
      formData.append("instruction", instruction);
      formData.append("duedate", duedate);
      formData.append("image", filename);
      formData.append("classId", classId);
      const response = await axios.post(
        `${process.env.NEXT_PUBLIC_BASE_URL}assignments/create`,
        formData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      console.log(response.data.data);
      dispatch(createTaskSuccess(response.data));
      toast.success("Successful")
    } catch (error: any) {
      console.log("ss")
      //   console.log(error instanceof Error);
      toast.error(error.response.data.message);
      dispatch(createTaskFailure( error ));
    }
  };

  export const fetchTaskAction =
  (id:string, token:string, toast:any) => async (dispatch:any) => {
    try {
      dispatch(fetchTaskStart());
      const response = await axios.get(
        `${process.env.NEXT_PUBLIC_BASE_URL}assignments/fetch/assignments/${id}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      console.log(response.data.data);
      dispatch(fetchTaskSuccess(response.data.data));
      return response.data.data;
    } catch (error: any) {
      console.log("ss")
      //   console.log(error instanceof Error);
      toast.error(error.response.data.message);
      dispatch(fetchTaskFailure( error ));
    }
  };  
  
  export const checkSubmissionAction =
  (id:string, token:string) => async (dispatch:any) => {
    try {
      dispatch(fetchTaskStart());
      const response = await axios.get(
        `${process.env.NEXT_PUBLIC_BASE_URL}assignments/check/${id}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      console.log(response.data.data);
      dispatch(fetchTaskSuccess(response.data.data));
      return response.data.data;
    } catch (error: any) {
      console.log("ss")
      //   console.log(error instanceof Error);
      dispatch(fetchTaskFailure( error ));
    }
  }; 

  export const submitTaskAction =
  ( filename: any, assignmentId:string, token:string, toast:any) => async (dispatch:any) => {
    try {
      dispatch(createTaskStart());
      const formData = new FormData();
      formData.append("file", filename);
      formData.append("assignmentId", assignmentId);
      const response = await axios.post(
        `${process.env.NEXT_PUBLIC_BASE_URL}assignments/submit`,
        formData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      console.log(response.data.data);
      dispatch(createTaskSuccess(response.data));
      toast.success("Successful")
    } catch (error: any) {
      console.log("ss")
      //   console.log(error instanceof Error);
      toast.error(error.response.data.message);
      dispatch(createTaskFailure( error ));
    }
  };

  
  export const fetchSubmissions =
  (id:string, token:string, toast:any) => async (dispatch:any) => {
    try {
      dispatch(fetchTaskStart());
      const response = await axios.get(
        `${process.env.NEXT_PUBLIC_BASE_URL}assignments/submissions/${id}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      console.log(response.data.data);
      dispatch(fetchTaskSuccess(response.data.data));
      return response.data.data;
    } catch (error: any) {
      console.log("ss")
      //   console.log(error instanceof Error);
      toast.error(error.response.data.message);
      dispatch(fetchTaskFailure( error ));
    }
  };  

  export const deleteTaskAction =
  (id:string, token:string, toast:any, router:any) => async (dispatch:any) => {
    try {
      dispatch(fetchTaskStart());
      const response = await axios.delete(
        `${process.env.NEXT_PUBLIC_BASE_URL}assignments/task/${id}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      console.log(response.data);
      toast.success(response.data.message)
      router.push("/dashboard")
    } catch (error: any) {
      console.log("ss")
      //   console.log(error instanceof Error);
      toast.error(error.response.data.message);
      dispatch(fetchTaskFailure( error ));
    }
  };  

  export const editTaskAction =
  ( title: any, instruction: any, duedate: any, assignmentId:string, token:string, toast:any) => async (dispatch:any) => {
    try {
      dispatch(createTaskStart());
      const payload = {
        title: title,
        instruction: instruction,
        assignmentId: assignmentId,
        duedate: duedate
      }
      const response = await axios.patch(
        `${process.env.NEXT_PUBLIC_BASE_URL}assignments/edit`,
        payload,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      console.log(response.data.data);
      dispatch(createTaskSuccess(response.data));
      toast.success("Successful")
    } catch (error: any) {
      console.log("ss")
      //   console.log(error instanceof Error);
      toast.error(error.response.data.message);
      dispatch(createTaskFailure( error ));
    }
  };

export default TaskSlice.reducer;