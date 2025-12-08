import { createTheme } from "@mui/material/styles";

const theme = createTheme({
  palette: {
    background: {
      default: "#e2e9c8",
      paper: "#F5F7F2",
      primary: "#2F402C",
      secondary: "#4F5E45",
      white: "#fff",
    },
    text: {
      primary: "#2F402C",
      secondary: "#4F5E45",
    },
    primary: {
      main: "#4D6C3A",
    },
    success: {
      main: "#5E714E",
    },
    custom: {
      darkForestGreen: "#3A4036",
      lightTan: "#D9D2C6",
      softTeal: "#A0A8A0",
      tombstoneGray: "#E6E6E6",
    },
  },

  typography: {
    fontFamily: "sans-serif",
    fontSize: 15,
    fontWeightRegular: 400,
    lineHeight: 1.5,

    allVariants: {
      fontFamily: "sans-serif",
      fontSize: 15,
      lineHeight: 1.5,
      fontWeight: 400,
    },
  },

  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          borderRadius: 8,
          textTransform: "none",
          fontWeight: 500,
        },
      },
    },
    MuiTypography: {
      variants: [
        {
          props: { variant: "sectionTitle" },
          style: {
            fontSize: "1.2rem",
            fontWeight: "300 !important",
            color: "#626262",
          },
        },
      ]
    },
    MuiCssBaseline: {
      styleOverrides: {
        body: {
          fontFamily: "sans-serif",
          fontSize: "0.9375rem",
          lineHeight: 1.5,
          fontWeight: 400,
        },
      },
    },
  },
});

export default theme;
