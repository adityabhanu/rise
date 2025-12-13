import { createSlice } from "@reduxjs/toolkit";

const persistedUser = localStorage.getItem("user")
  ? JSON.parse(localStorage.getItem("user"))
  : null;

const initialState = {
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
  openLoginDialog,
  closeLoginDialog,
  openRegisterDialog,
  closeRegisterDialog,

  setLoading,

  showSnackbar,
  hideSnackbar,
} = appSlice.actions;

export default appSlice.reducer;
