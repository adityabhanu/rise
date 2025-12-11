import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  // 👤 User
  user: null,
  loggedInStatus: false,

  // 🪟 Dialogs
  openLogin: false,
  openRegister: false,

  // ⏳ Loader
  loading: false,

  // 🔔 Snackbar
  snackbar: {
    open: false,
    message: "",
    severity: "info",
  },
};

const appSlice = createSlice({
  name: "app",
  initialState,
  reducers: {
    // =====================================================
    // USER & AUTH
    // =====================================================
    setUser: (state, action) => {
      state.user = action.payload;
      state.loggedInStatus = !!action.payload;
    },

    logoutUser: (state) => {
      state.user = null;
      state.loggedInStatus = false;
    },

    // =====================================================
    // LOGIN / REGISTER DIALOGS
    // =====================================================
    openLoginDialog: (state) => {
      state.openLogin = true;
    },
    closeLoginDialog: (state) => {
      state.openLogin = false;
    },

    openRegisterDialog: (state) => {
      state.openRegister = true;
    },
    closeRegisterDialog: (state) => {
      state.openRegister = false;
    },

    // =====================================================
    // LOADING
    // =====================================================
    setLoading: (state, action) => {
      state.loading = action.payload;
    },

    // =====================================================
    // SNACKBAR
    // =====================================================
    showSnackbar: (state, action) => {
      state.snackbar = {
        open: true,
        message: action.payload.message,
        severity: action.payload.severity || "info",
      };
    },

    hideSnackbar: (state) => {
      state.snackbar.open = false;
    },
  },
});

export const {
  setUser,
  logoutUser,

  openLoginDialog,
  closeLoginDialog,
  openRegisterDialog,
  closeRegisterDialog,

  setLoading,

  showSnackbar,
  hideSnackbar,
} = appSlice.actions;

export default appSlice.reducer;
