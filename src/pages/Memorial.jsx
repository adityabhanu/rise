import React from "react";
import SearchSection from "../components/SearchMemorial";
import MemorialList from "../components/MemorialList";
import { styled } from "@mui/material/styles";
import { Typography, Container } from "@mui/material";
import Links from "../components/Links";
import cloudImage from "../assets/images/cloud-background.jpeg";

const MemorialContainer = styled("div")(({ theme }) => ({
  position: "relative",
  marginTop: "64px",
  padding: "32px",

  "&::before": {
    content: '""',
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,

    backgroundImage: `url(${cloudImage})`,
    backgroundRepeat: "repeat",
    backgroundSize: "contain",
    backgroundPosition: "top",
    opacity: 0.6,
    zIndex: 0,
    pointerEvents: "none",
  },

  "& > *": {
    position: "relative",
    zIndex: 1,
  },
}));

export default function Memorial() {
  return (
    <>
      <MemorialContainer>
        <Container maxWidth="md">
          <Typography
            variant="subTitle"
            gutterBottom
            sx={{
              color: "text.header",
              fontFamily: (theme) => theme.typography.fontFamilyDisplay,
              fontSize: "1.5rem",
              fontWeight: 600,
            }}
          >
            {" "}
            Memorials
          </Typography>
          {/* <SearchSection /> */}
          <MemorialList />
        </Container>
      </MemorialContainer>
      {/* <Links /> */}
    </>
  );
}
