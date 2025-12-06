import { createTheme } from "@mui/material/styles";

const theme = createTheme({
  palette: {
    background: {
      default: '#e2e9c8',
      paper: '#F5F7F2',
      primary: '#2F402C',
      secondary: '#4F5E45',
      white: "#fff",
    },
    text: {
      primary: '#2F402C',
      secondary: '#4F5E45'
    },
    primary: {
      main: '#4D6C3A'
    },
    success: {
      main: '#5E714E'
    },
    // Custom brand colors (not part of default palette)
    custom: {
      darkForestGreen: "#3A4036",
      lightTan: "#D9D2C6",
      softTeal: "#A0A8A0",
      tombstoneGray: "#E6E6E6",
    },
  },

  components: {
    // Global button styling if needed
    MuiButton: {
      styleOverrides: {
        root: {
          borderRadius: 8,
          textTransform: "none",
          fontWeight: 500,
        },
      },
    },
  },

  typography: {
    fontFamily: "Inter, Arial, sans-serif",
  },
});

export default theme;
