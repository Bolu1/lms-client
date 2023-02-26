import { configureStore } from "@reduxjs/toolkit";
import { createStore, applyMiddleware } from 'redux'; 

import authReducer from "./authSlice";
import classesReducer from "./classesSlice";
import userReducer from "./userSlice";
const store = configureStore({
  reducer: {
    auth: authReducer,
    classes: classesReducer,
    users: userReducer,
  },
});
export default store;

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch