import Header from "../components/Header";
import Footer from "../components/Footer";
import { Outlet } from "react-router-dom";
import { Box } from "@mui/material";

export default function PageLayout() {
  return (
    <>
      <Header />
      <Box
        component="main"
        sx={{
          backgroundColor: "secondary.main",
          minHeight: "100vh",
        }}
      >
        <Outlet />
      </Box>
      <Footer />
    </>
  );
}
