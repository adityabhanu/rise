// AddCemeteryPage.jsx
import { Box, Typography, Divider } from "@mui/material";
import { styled } from "@mui/material/styles";
import { useState, useRef } from "react";
import { useNavigate } from "react-router-dom";

import CemeteryNameSection from "./sections/CemeteryNameSection";
import LocationSection from "./sections/LocationSection";
import DescriptionSection from "./sections/DescriptionSection";
import SubmitSection from "./sections/SubmitSection";
import AdditionalDetails from "./sections/AdditionalDetails";

import { createCemetery } from "../../../api/cemeteryApi";
import Loader from "../../common/Loader";
import StatusDialog from "../../common/StatusDialog";

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
  const contactInfoRef = useRef();
  const cemeteryStatusRef = useRef();
  const additionalInfoRef = useRef();

  const [loading, setLoading] = useState(false);
  const [statusDialog, setStatusDialog] = useState({
    open: false,
    status: "success",
    title: "",
    message: "",
  });
  const [createdCemeteryId, setCreatedCemeteryId] = useState("");

  const navigate = useNavigate();

  const handleSubmit = async () => {
    const payload = {
      ...nameRef?.current?.getData(),
      ...locationRef?.current?.getData(),
      description: descriptionRef?.current?.getData(),
      ...contactInfoRef?.current?.getData(),
      ...cemeteryStatusRef?.current?.getData(),
      additionalInfo: additionalInfoRef?.current?.getData(),
    };

    setLoading(true);

    try {
      const res = await createCemetery(payload);

      if (res?.error) {
        throw new Error(res.error);
      }

      const cemeteryId = res?.Id;
      if (!cemeteryId) {
        throw new Error("Invalid API response");
      }

      setCreatedCemeteryId(cemeteryId);

      setStatusDialog({
        open: true,
        status: "success",
        title: "Cemetery Created",
        message: "The cemetery has been created successfully.",
      });
    } catch (err) {
      console.error("Create cemetery failed:", err);

      setStatusDialog({
        open: true,
        status: "error",
        title: "Something went wrong",
        message:
          "We couldn’t create the cemetery. Please check your details and try again.",
      });
    } finally {
      setLoading(false);
    }
  };

  const handleDialogPrimaryAction = () => {
    setStatusDialog((prev) => ({ ...prev, open: false }));

    if (statusDialog.status === "success" && createdCemeteryId) {
      navigate(`/cemetery/${createdCemeteryId}`);
    }
  };

  return (
    <PageContainer>
      {loading && <Loader />}

      <StatusDialog
        open={statusDialog.open}
        status={statusDialog.status}
        title={statusDialog.title}
        message={statusDialog.message}
        onClose={() =>
          setStatusDialog((prev) => ({ ...prev, open: false }))
        }
        onPrimaryAction={handleDialogPrimaryAction}
      />

      <InnerContainer>
        {/* PAGE HEADER */}
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

          <AdditionalDetails
            contactInfoRef={contactInfoRef}
            cemeteryStatusRef={cemeteryStatusRef}
            additionalInfoRef={additionalInfoRef}
          />
          <Divider sx={{ my: 3 }} />

          <SubmitSection onSubmit={handleSubmit} />
        </Box>
      </InnerContainer>
    </PageContainer>
  );
}
