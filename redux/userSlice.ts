import { ISignupResponse } from '../interfaces/user.interface';
import { createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import Cookies from "js-cookie";

interface InitialState{
    loading: boolean,
    error: any,
}

const initialState: InitialState = {
  loading: false,
  error: null,
};
const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    updateUserStart(state:InitialState) {
      state.loading = true;
      state.error = null;
    },
    updateUserSuccess(state:InitialState, action:any) {
      state.loading = false;
      state.error = null;
    },
    updateUserFailure(state:InitialState, action:any) {
      state.loading = false;
      state.error = action.payload.error;
    },
  },
});
export const {
  updateUserStart,
  updateUserSuccess,
  updateUserFailure,
} = userSlice.actions;
export const updateUserAction =
  (filename: any, firstname: string, lastname: string, password: string, newPassword: string, token: string, toast:any, router:any) => async (dispatch:any) => {
    try {
      dispatch(updateUserStart());
      const formData = new FormData();
      formData.append("firstname", firstname);
      formData.append("lastname", lastname);
      formData.append("password", password);
      formData.append("newPassword", newPassword);
      formData.append("image", filename);
      const response = await axios.patch(
        `${process.env.NEXT_PUBLIC_BASE_URL}users/update`,
        formData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      console.log(response.data.data);
      dispatch(updateUserSuccess(response.data));
      toast.success("Successful")
      router.push("/auth/login")
    } catch (error: any) {
    //   console.log(error instanceof Error);
      toast.error(error.response.data.message);
      dispatch(updateUserFailure( error ));
    }
  };


export default userSlice.reducer;