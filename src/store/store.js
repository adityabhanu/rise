import { configureStore } from "@reduxjs/toolkit";
import appReducer from "./slices/appSlice";
import userReducer from "./slices/userSlice";

const store = configureStore({
  reducer: {
    app: appReducer,
    user: userReducer,
  },
});

export default store;
