import { useState } from "react";
import { Box, Button, Typography, Divider } from "@mui/material";
import AddCircleIcon from "@mui/icons-material/AddCircle";
import { useTheme } from "@emotion/react";
import ContactInfoSection from "./ContactInfoSection";
import CemeteryStatusSection from "./CemeteryStatusSection";
import AdditionalInformationSection from "./AdditionalInformationSection";
import { SectionContainer } from "../CemeteryStyles";
const AdditionalDetails = ({
  contactInfoRef,
  cemeteryStatusRef,
  additionalInfoRef,
}) => {
  const [showDetails, setShowDetails] = useState(false);
  const theme = useTheme();
  return (
    <SectionContainer>
      {!showDetails && (
        <Box>
          <Typography sx={{ mb: 2, color: "text.gray" }}>
            Add contact info, public access, categories, settings and more.
          </Typography>

          <Button
            sx={{ border: `2px solid ${theme.palette.background.secondary}` }}
            variant="outlined"
            startIcon={<AddCircleIcon />}
            onClick={() => setShowDetails(true)}
          >
            Add More Details
          </Button>
        </Box>
      )}

      {showDetails && (
        <>
          <ContactInfoSection ref={contactInfoRef} />
          <Divider sx={{ my: 3 }} />

          <CemeteryStatusSection ref={cemeteryStatusRef} />
          <Divider sx={{ my: 3 }} />

          <AdditionalInformationSection ref={additionalInfoRef} />
        </>
      )}
    </SectionContainer>
  );
};

export default AdditionalDetails;
