// AddMemorialPage.jsx
import { Box, Typography, Divider } from "@mui/material";
import { styled } from "@mui/material/styles";
import { useState, useRef } from "react";
// Import your sections (you will create each one)
import NameSection from "./sections/NameSection";
import BioInformationSection from "./sections/BioInformationSection";
import BurialSection from "./sections/BurialSection";
import DesignationsSection from "./sections/DesignationsSection";
import CloseRelativeSection from "./sections/CloseRelativeSection";
import SubmitSection from "./sections/SubmitSection";
import { createMemorial } from "../../api/memorialApi";
import Loader from "../common/Loader";
import StatusDialog from "../common/StatusDialog";
import { useNavigate } from "react-router-dom";

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
  const nameRef = useRef();
  const birthDeathRef = useRef();
  const bioRef = useRef();
  const burialRef = useRef();
  const designationsRef = useRef();
  const closeRelativeRef = useRef();

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [statusDialog, setStatusDialog] = useState({
    open: false,
    status: "success",
    title: "",
    message: "",
  });
  const [createdMemorialId, setCreatedMemorialId] = useState("");

  const navigate = useNavigate();

  const handleSubmit = async () => {
    const finalPayload = {
      ...nameRef.current.getData(),
      ...birthDeathRef.current.getData(),
      biography: bioRef.current.getData(),
      ...designationsRef.current.getData(),
      ...closeRelativeRef.current.getData(),
      ...burialRef.current.getData(),
    };

    setLoading(true);
    setError(null);
    try {
      const res = await createMemorial(finalPayload);

      if (res?.error) {
        throw new Error(res?.error);
      }

      const memorialId = res?.Id;
      if (!memorialId) {
        throw new Error("Invalid API response");
      }

      setCreatedMemorialId(memorialId);

      setStatusDialog({
        open: true,
        status: "success",
        title: "Memorial Created",
        message: "The memorial has been created successfully.",
      });
    } catch (err) {
      console.error("Create memorial failed:", err);
      setError("Failed to create memorial. Please try again.");
      setStatusDialog({
        open: true,
        status: "error",
        title: "Something went wrong",
        message:
          "We couldn’t create the memorial. Please check your details and try again.",
      });
    } finally {
      setLoading(false);
    }
  };

  const handleDialogPrimaryAction = () => {
    setStatusDialog((prev) => ({ ...prev, open: false }));

    if (statusDialog.status === "success" && createdMemorialId) {
      navigate(`/memorial/${createdMemorialId}`);
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
        onClose={() => setStatusDialog({ ...statusDialog, open: false })}
        onPrimaryAction={handleDialogPrimaryAction}
      />
      <InnerContainer>
        {/* PAGE TITLE */}
        <Box textAlign="center" mb={2}>
          <Typography variant="subTitle" color="primary.main" fontWeight={600}>
            Add a Memorial
          </Typography>

          <Typography
            variant="body1"
            sx={{ mt: 1, color: "text.gray", fontSize: "12px" }}
          >
            Enter memorial details below.
          </Typography>
        </Box>

        {/* ALL SECTIONS */}
        <NameSection ref={nameRef} birthDeathRef={birthDeathRef} />

        <Divider sx={{ my: 3 }} />

        <BioInformationSection ref={bioRef} />

        <Divider sx={{ my: 3 }} />

        <BurialSection ref={burialRef} />

        <Divider sx={{ my: 3 }} />

        <DesignationsSection ref={designationsRef} />

        <Divider sx={{ my: 3 }} />

        <CloseRelativeSection ref={closeRelativeRef} />

        <SubmitSection onSubmit={handleSubmit} />
      </InnerContainer>
    </PageContainer>
  );
}
