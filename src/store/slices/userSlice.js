import { createSlice } from "@reduxjs/toolkit";

const persistedUser = localStorage.getItem("user")
  ? JSON.parse(localStorage.getItem("user"))
  : null;

const persistedToken = localStorage.getItem("accessToken");

const initialState = {
  user: persistedUser,
  token: persistedToken,
  loggedInStatus: !!persistedUser && !!persistedToken,
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setUser: (state, action) => {
      const { user, token } = action.payload;
      state.user = user;
      state.token = token;
      state.loggedInStatus = true;

      localStorage.setItem("user", JSON.stringify(user));
      localStorage.setItem("accessToken", token);
    },

    logoutUser: (state) => {
      state.user = null;
      state.token = null;
      state.loggedInStatus = false;

      localStorage.removeItem("user");
      localStorage.removeItem("accessToken");
    },
  },
});

export const { setUser, logoutUser } = userSlice.actions;

export default userSlice.reducer;
