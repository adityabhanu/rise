import { createTheme } from "@mui/material/styles";

const theme = createTheme({
  palette: {
    background: {
      default: "#F7FAFD", // Soft Cloud
      paper: "#FFFFFF",
      footer: "#F7FAFD",
      white: "#FFFFFF",
      black: "#000000",
    },

    primary: {
      main: "#7FB3FF", // Sky Blue CTA
      button: "#5A86D6",
    },

    secondary: {
      main: "#E6F0FF", // Mist Blue
    },

    text: {
      primary: "#243447",
      header: "#244369",
      headerLight: "#204878",
      secondary: "#5F6F82",
      disabled: "#8A99AD",
      muted: "#8A99AD",
      white: "#FFFFFF",
    },

    divider: "#E6EEF6",

    border: {
      light: "#E6EEF6", // Card border
      inner: "#FFFFFF",
    },

    custom: {
      babyBlue: "#CFE6FF",
      mistBlue: "#E6F0FF",
      softLavender: "#E9E6FF",
      cardBorder: "#E6EEF6",
      cardShadow: "0px 12px 30px rgba(0,0,0,0.06)",
      homeBlue: "#486b9e",
      gradientPrimary: "linear-gradient(135deg, #7FB3FF, #5A86D6)",
      orange: "#FF8A80",
      red: "#D32F2F",
    },
    shadow: {
      card: "0px 12px 30px rgba(0,0,0,0.06)",
      cardHover: "0px 18px 40px rgba(0,0,0,0.08)",
    },
  },

  typography: {
    fontFamily: "sans-serif",
    fontFamilyDisplay: `"Playfair Display", serif`,
    fontSize: 15,
    fontWeightRegular: 400,
    lineHeight: 1.6,

    h3: {
      fontWeight: 600,
      letterSpacing: "1.2px",
      color: "#243447",
    },

    h5: {
      fontWeight: 600,
      color: "#5F6F82",
    },

    allVariants: {
      fontFamily: "sans-serif",
      fontSize: 15,
      lineHeight: 1.6,
      fontWeight: 400,
      color: "#243447",
    },
  },

  components: {
    MuiCssBaseline: {
      styleOverrides: {
        body: {
          backgroundColor: "#F7FAFD",
        },
      },
    },

    // IMPORTANT: keep buttons rectangular
    MuiButton: {
      styleOverrides: {
        root: {
          borderRadius: 8, // same as your current
          textTransform: "none",
          fontWeight: 500,
          boxShadow: "none",
        },
        contained: {
          boxShadow: "none",
        },
        containedSuccess: {
      backgroundColor: "#7FB3FF",
      color: "#FFFFFF",

      "&:hover": {
        backgroundColor: "#5A86D6",
      },
    },

    outlinedSuccess: {
      borderColor: "#7FB3FF",
      color: "#7FB3FF",

      "&:hover": {
        backgroundColor: "rgba(127,179,255,0.08)",
      },
    },
      },
    },

    // IMPORTANT: keep text fields rectangular
    MuiOutlinedInput: {
      styleOverrides: {
        root: {
          borderRadius: 8,
          backgroundColor: "#FFFFFF",
        },
      },
    },

    MuiCard: {
      styleOverrides: {
        root: {
          backgroundColor: "#FFFFFF",
          border: "1px solid #E6EEF6",
          boxShadow: "0px 12px 30px rgba(0,0,0,0.06)",
        },
      },
    },

    MuiDialog: {
      styleOverrides: {
        paper: {
          borderRadius: 12, // dialog only, not inputs/buttons
          backgroundColor: "#FFFFFF",
        },
      },
    },

    MuiTypography: {
      variants: [
        {
          props: { variant: "sectionTitle" },
          style: {
            fontSize: "1.2rem",
            fontWeight: 300,
            color: "#5F6F82",
          },
        },
        {
          props: { variant: "subTitle" },
          style: {
            fontSize: "22px",
            fontWeight: 400,
            color: "#243447",
          },
        },
      ],
    },
  },
});

export default theme;
