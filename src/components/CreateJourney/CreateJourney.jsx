import { Box, Typography, Divider } from "@mui/material";
import { styled } from "@mui/material/styles";
import { useRef, useState } from "react";
import { useNavigate } from "react-router-dom";

import PrivacySection from "./sections/PrivacySection";
import NameSection from "./sections/NameSection";
import BirthDetailsSection from "./sections/BirthDetailsSection";
import MediaSection from "./sections/MediaSection";
import FamilyInformationSection from "./sections/FamilyInformationSection";
import SiblingsSection from "./sections/SiblingsSection";
import VisitorsSection from "./sections/VisitorsSection";
import AboutAtBirthSection from "./sections/AboutAtBirthSection";
import ParentsThoughtsSection from "./sections/ParentsThoughtsSection";
import LettersSection from "./sections/LettersSection";
import SubmitSection from "./sections/SubmitSection";

import { createMemorial } from "../../api/memorialApi";
import { saveMemorialMedia } from "../../api/memorialMediaApi";
import Loader from "../common/Loader";
import StatusDialog from "../common/StatusDialog";
import { buildCreateMemorialPayload } from "../../utils/buildCreateMemorialPayload";

const data = {
  newBorn: { title: "Start New Born Memory" },
  livingProfile: { title: "Living Profile" },
  memorial: { title: "Passed Memorial" },
};

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
}));

export default function CreateJourney({ type }) {
  const privacyRef = useRef();
  const nameRef = useRef();
  const birthRef = useRef();
  const mediaRef = useRef();
  const familyRef = useRef();
  const siblingsRef = useRef();
  const visitorsRef = useRef();
  const aboutRef = useRef();
  const thoughtsRef = useRef();
  const lettersRef = useRef();

  const [loading, setLoading] = useState(false);
  const [statusDialog, setStatusDialog] = useState({
    open: false,
    status: "success",
    title: "",
    message: "",
  });
  const [createdMemorialId, setCreatedMemorialId] = useState("");

  const navigate = useNavigate();

  const handleSubmit = async () => {
    const payload = buildCreateMemorialPayload({
      type,
      privacy: privacyRef.current?.getData(),
      name: nameRef.current?.getData(),
      birth: birthRef.current?.getData(),
      aboutAtBirth: aboutRef.current?.getData(),
      family: familyRef.current?.getData(),
      siblings: siblingsRef.current?.getData(),
      visitors: visitorsRef.current?.getData(),
      parentsThoughts: thoughtsRef.current?.getData(),
      letters: lettersRef.current?.getData(),
    });

    setLoading(true);

    try {
      // 1️⃣ Create memorial (NO media yet)
      const res = await createMemorial(payload);

      if (!res || res.error) {
        throw new Error(res?.error || "Invalid API response");
      }

      const memorialId = res?.Id || res?.id;
      if (!memorialId) {
        throw new Error("Memorial ID missing");
      }

      setCreatedMemorialId(memorialId);

      const mediaData = mediaRef.current?.getData();
      const aboutData = aboutRef.current?.getData();

      const finalMediaData = {
        ...mediaData,
        voiceNotes: [
          ...(mediaData?.voiceNotes || []),
          ...(aboutData?.voiceNotes || []),
        ],
      };

      if (finalMediaData) {
        await saveMemorialMedia(memorialId, finalMediaData);
      }

      // 3️⃣ Success
      setStatusDialog({
        open: true,
        status: "success",
        title: "Journey Created",
        message: "Your journey has been created successfully.",
      });
    } catch (err) {
      console.error("Create Journey failed:", err);

      setStatusDialog({
        open: true,
        status: "error",
        title: "Something went wrong",
        message:
          "We couldn’t create the journey. Please review your details and try again.",
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
        onClose={() => setStatusDialog((prev) => ({ ...prev, open: false }))}
        onPrimaryAction={handleDialogPrimaryAction}
      />

      <InnerContainer>
        <Typography
          component="div"
          variant="subTitle"
          textAlign="center"
          mb={3}
          fontWeight={600}
        >
          {data[type]?.title}
        </Typography>

        <PrivacySection ref={privacyRef} />
        <Divider sx={{ my: 3 }} />

        <NameSection ref={nameRef} />
        <Divider sx={{ my: 3 }} />

        <BirthDetailsSection ref={birthRef} />
        <Divider sx={{ my: 3 }} />

        <MediaSection ref={mediaRef} />
        <Divider sx={{ my: 3 }} />

        <FamilyInformationSection ref={familyRef} />
        <Divider sx={{ my: 3 }} />

        <SiblingsSection ref={siblingsRef} />
        <Divider sx={{ my: 3 }} />

        <VisitorsSection ref={visitorsRef} />
        <Divider sx={{ my: 3 }} />

        <AboutAtBirthSection ref={aboutRef} />
        <Divider sx={{ my: 3 }} />

        <ParentsThoughtsSection ref={thoughtsRef} />
        <Divider sx={{ my: 3 }} />

        <LettersSection ref={lettersRef} />

        <SubmitSection onSubmit={handleSubmit} />
      </InnerContainer>
    </PageContainer>
  );
}
