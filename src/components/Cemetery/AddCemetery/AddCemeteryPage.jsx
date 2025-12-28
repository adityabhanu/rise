// AddCemeteryPage.jsx
import { Box, Typography, Divider } from "@mui/material";
import { styled } from "@mui/material/styles";
import { useRef } from "react";
import CemeteryNameSection from "./sections/CemeteryNameSection";
import LocationSection from "./sections/LocationSection";
import DescriptionSection from "./sections/DescriptionSection";
import SubmitSection from "./sections/SubmitSection";
import AdditionalDetails from "./sections/AdditionalDetails";

const PageContainer = styled(Box)(({ theme }) => ({
  background: theme.palette.background.default,
  marginTop: "64px",
  padding: "24px",
  display: "flex",
  justifyContent: "center",
}));

const InnerContainer = styled(Box)(({ theme }) => ({
  width: "100%",
  maxWidth: "900px",
  background: theme.palette.background.paper,
  borderRadius: 12,
  padding: "32px",
  boxShadow: "0 1px 3px rgba(0,0,0,0.15)",
}));

export default function AddCemeteryPage() {
  const nameRef = useRef();
  const locationRef = useRef();
  const descriptionRef = useRef();

  const handleSubmit = () => {
    const payload = {
      ...nameRef.current.getData(),
      ...locationRef.current.getData(),
      description: descriptionRef.current.getData(),
    };

    console.log("Create cemetery payload:", payload);
    // call createCemetery API here
  };

  return (
    <PageContainer>
      <InnerContainer>
        <Box textAlign="center" mb={2}>
          <Typography variant="subTitle" color="primary.main" fontWeight={600}>
            Add a New Cemetery
          </Typography>

          <Typography sx={{ mt: 1, fontSize: "12px", color: "text.gray" }}>
            Please provide details about this cemetery. If you are unsure about
            non-required fields, simply leave them blank.
          </Typography>
        </Box>
        <Divider sx={{ my: 3 }} />
        <Box sx={{ px: "40px" }}>
          <CemeteryNameSection ref={nameRef} />
          <Divider sx={{ my: 3 }} />

          <LocationSection ref={locationRef} />
          <Divider sx={{ my: 3 }} />

          <DescriptionSection ref={descriptionRef} />
          <Divider sx={{ my: 3 }} />

          <AdditionalDetails />
          <Divider sx={{ my: 3 }} />

          <SubmitSection onSubmit={handleSubmit} />
        </Box>
      </InnerContainer>
    </PageContainer>
  );
}
