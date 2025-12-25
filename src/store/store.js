import { configureStore } from "@reduxjs/toolkit";
import appReducer from "./slices/appSlice";
import userReducer from "./slices/userSlice";
import memorialReducer from "./slices/memorialSlice";

const store = configureStore({
  reducer: {
    app: appReducer,
    user: userReducer,
    memorial: memorialReducer,
  },
});

export default store;
