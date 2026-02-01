import React from "react";
import SearchSection from "../components/SearchMemorial";
import MemorialList from "../components/MemorialList";
import { styled } from "@mui/material/styles";
import { Typography, Container } from "@mui/material";
import Links from "../components/Links";

const MemorialContainer = styled("div")(({ theme }) => ({
  marginTop: "90px",
  padding: "32px",

  "& .search-container": {
    padding: 0,
    paddingTop: "1rem",
  },

  "& .search-tips-button": {
    color: theme.palette.text.secondary,
  },
}));

export default function Memorial() {
  return (
    <>
      <MemorialContainer>
        <Container maxWidth="md">
          <Typography variant="subTitle" gutterBottom>
            Memorials
          </Typography>
          {/* <SearchSection /> */}
          <MemorialList />
        </Container>
      </MemorialContainer>
      <Links />
    </>
  );
}
