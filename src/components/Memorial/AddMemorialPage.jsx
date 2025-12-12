// AddMemorialPage.jsx
import { Box, Typography, Divider } from "@mui/material";
import { styled } from "@mui/material/styles";

// Import your sections (you will create each one)
import NameSection from "./sections/NameSection";
import BioInformationSection from "./sections/BioInformationSection";
import BurialSection from "./sections/BurialSection";
import DesignationsSection from "./sections/DesignationsSection";
import CloseRelativeSection from "./sections/CloseRelativeSection";
import SubmitSection from "./sections/SubmitSection";

const PageContainer = styled(Box)(({ theme }) => ({
  background: theme.palette.background.default,
  marginTop: "64px",
  padding: "24px",
  display: "flex",
  justifyContent: "center",
}));

const InnerContainer = styled(Box)(({ theme }) => ({
  width: "100%",
  maxWidth: "1100px",
  background: theme.palette.background.paper,
  borderRadius: 12,
  padding: "32px",
  boxShadow: "0 1px 3px rgba(0,0,0,0.15)",
}));

export default function AddMemorialPage() {
  return (
    <PageContainer>
      <InnerContainer>
        {/* PAGE TITLE */}
        <Box textAlign="center" mb={2}>
          <Typography variant="subTitle" color="primary.main" fontWeight={600}>
            Add a Memorial
          </Typography>

          <Typography variant="body1" sx={{ mt: 1, color: "text.gray", fontSize: "12px" }}>
            Enter memorial details below.
          </Typography>
        </Box>

        {/* ALL SECTIONS */}
        <NameSection />

        <Divider sx={{ my: 3 }} />

        <BioInformationSection />

        <Divider sx={{ my: 3 }} />

        <BurialSection />

        <Divider sx={{ my: 3 }} />

        <DesignationsSection />

        <Divider sx={{ my: 3 }} />

        <CloseRelativeSection />

        <SubmitSection />
      </InnerContainer>
    </PageContainer>
  );
}
