import React from "react";
import SearchSection from "../components/SearchMemorial";
import { styled } from "@mui/material/styles";
import { Typography, Container } from "@mui/material";

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
    <MemorialContainer>
      <Container maxWidth="md">
        <Typography variant="subTitle">Memorial Search</Typography>
        <SearchSection />
      </Container>
    </MemorialContainer>
  );
}
