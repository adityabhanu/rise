import { Box, Typography, Divider } from "@mui/material";
import { styled } from "@mui/material/styles";
import { useRef, useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";

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
import EarlyLifeSection from "./sections/EarlyLifeSection";
import CareerSection from "./sections/CareerSection";
import PersonalitySection from "./sections/PersonalitySection";
import LifeLessonsSection from "./sections/LifeLessonsSection";
import HobbiesSection from "./sections/HobbiesSection";
import FinalDaysSection from "./sections/FinalDaysSection";
import PassingDetailsSection from "./sections/PassingDetailsSection";
import NewbornIntroEffect from "./sections/NewbornIntroEffect";

import {
  createMemorial,
  getMemorialDetails,
  updateMemorial,
} from "../../api/memorialApi";
import { saveMemorialMedia } from "../../api/memorialMediaApi";
import Loader from "../common/Loader";
import StatusDialog from "../common/StatusDialog";
import { buildCreateMemorialPayload } from "../../utils/buildCreateMemorialPayload";
import {
  transformApiToForm,
  mapProfileTypeToUI,
} from "../../utils/transformApiToForm";
import { stripEmpty } from "../../utils/helpers";

const data = {
  newBorn: { title: "Start New Born Memory" },
  livingProfile: { title: "Living Profile" },
  memorial: { title: "Passed Memorial" },
};

const PageContainer = styled(Box)(({ theme }) => ({
  background: theme.palette.secondary.main,
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
  const earlyLifeRef = useRef();
  const careerRef = useRef();
  const personalityRef = useRef();
  const hobbiesRef = useRef();
  const lifeLessonsRef = useRef();
  const finalDaysRef = useRef();
  const passingDetailsRef = useRef();

  const { id } = useParams();
  const isEditMode = Boolean(id);

  const [journeyType, setJourneyType] = useState(type);
  const [isPrefillLoading, setIsPrefillLoading] = useState(isEditMode);
  const [apiData, setApiData] = useState(null);
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
    const rawPayload = {
      type: journeyType,
      privacy: privacyRef.current?.getData(),
      name: nameRef.current?.getData(),
      birth: birthRef.current?.getData(),
      aboutAtBirth: aboutRef.current?.getData(),
      family: familyRef.current?.getData(),
      siblings: siblingsRef.current?.getData(),
      visitors: visitorsRef.current?.getData(),
      parentsThoughts: thoughtsRef.current?.getData(),
      letters: lettersRef.current?.getData(),
      earlyLife: earlyLifeRef.current?.getData(),
      career: careerRef.current?.getData(),
      personality: personalityRef.current?.getData(),
      hobbies: hobbiesRef.current?.getData(),
      lifeLessons: lifeLessonsRef.current?.getData(),
      finalDays: finalDaysRef.current?.getData(),
      passingDetails: passingDetailsRef.current?.getData(),
    };

    // 🔥 REMOVE null / empty BEFORE builder
    const cleanedInput = stripEmpty(rawPayload);

    const payload = buildCreateMemorialPayload(cleanedInput);

    setLoading(true);

    try {
      // 1️⃣ Create memorial (NO media yet)

      let memorialId;

      if (isEditMode) {
        await updateMemorial(id, payload);
        memorialId = id;
      } else {
        const res = await createMemorial(payload);

        if (!res || res.error) {
          throw new Error(res?.error || "Invalid API response");
        }

        memorialId = res?.Id || res?.id;

        if (!memorialId) {
          throw new Error("Memorial ID missing");
        }
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
        title: isEditMode ? "Journey Updated" : "Journey Created",
        message: isEditMode
          ? "Your changes have been saved successfully."
          : "Your journey has been created successfully.",
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

  useEffect(() => {
    if (!isEditMode) return;

    (async () => {
      try {
        setIsPrefillLoading(true);

        const res = await getMemorialDetails(id);
        if (!res) return;

        setApiData(res);

        const uiType = mapProfileTypeToUI(res?.ProfileType);
        setJourneyType(uiType);
      } catch (err) {
        console.error("Prefill fetch failed", err);
        setIsPrefillLoading(false);
      }
    })();
  }, [id, isEditMode]);

  useEffect(() => {
    if (!apiData) return;

    const parsed = transformApiToForm(apiData);

    const timer = setTimeout(() => {
      try {
        privacyRef.current?.setData(parsed?.privacy);
        nameRef.current?.setData(parsed?.name);
        birthRef.current?.setData(parsed?.birth);
        passingDetailsRef.current?.setData(parsed?.passingDetails);
        visitorsRef.current?.setData(parsed?.visitors);
        mediaRef.current?.setData(parsed?.media);
        familyRef.current?.setData(parsed?.family);
        siblingsRef.current?.setData(parsed?.siblings);
        aboutRef.current?.setData(parsed?.aboutAtBirth);
        thoughtsRef.current?.setData(parsed?.parentsThoughts);
        earlyLifeRef.current?.setData(parsed?.earlyLife);
        careerRef.current?.setData(parsed?.career);
        personalityRef.current?.setData(parsed?.personality);
        hobbiesRef.current?.setData(parsed?.hobbies);
        lifeLessonsRef.current?.setData(parsed?.lifeLessons);
        finalDaysRef.current?.setData(parsed?.finalDays);
        lettersRef.current?.setData(parsed?.letters);

        setIsPrefillLoading(false);
      } catch (err) {
        console.error("Prefill crash:", err);
        setIsPrefillLoading(false);
      }
    }, 0); // 🔥 IMPORTANT

    return () => clearTimeout(timer);
  }, [apiData, journeyType]);

  return (
    <PageContainer>
      {loading && <Loader />}
      {isPrefillLoading && <Loader />}
      {journeyType === "newBorn" && !isEditMode && <NewbornIntroEffect />}
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
          color="text.header"
        >
          {data[journeyType]?.title}
        </Typography>

        <PrivacySection ref={privacyRef} type={journeyType} />
        <Divider sx={{ my: 3 }} />

        <NameSection ref={nameRef} />
        <Divider sx={{ my: 3 }} />

        <BirthDetailsSection ref={birthRef} type={journeyType} />
        <Divider sx={{ my: 3 }} />

        {journeyType == "memorial" && (
          <>
            <PassingDetailsSection ref={passingDetailsRef} type={journeyType} />

            <Divider sx={{ my: 3 }} />
            <VisitorsSection ref={visitorsRef} type={journeyType} />
            <Divider sx={{ my: 3 }} />
          </>
        )}

        <MediaSection ref={mediaRef} type={journeyType} />
        <Divider sx={{ my: 3 }} />

        <FamilyInformationSection ref={familyRef} type={journeyType} />
        <Divider sx={{ my: 3 }} />

        {journeyType == "newBorn" && (
          <>
            <SiblingsSection ref={siblingsRef} />
            <Divider sx={{ my: 3 }} />
            <VisitorsSection ref={visitorsRef} type={journeyType} />
            <Divider sx={{ my: 3 }} />
          </>
        )}

        {journeyType == "newBorn" && (
          <>
            <AboutAtBirthSection ref={aboutRef} />
            <Divider sx={{ my: 3 }} />

            <ParentsThoughtsSection ref={thoughtsRef} />
            <Divider sx={{ my: 3 }} />
          </>
        )}

        {journeyType != "newBorn" && (
          <>
            <EarlyLifeSection ref={earlyLifeRef} type={journeyType} />
            <Divider sx={{ my: 3 }} />

            <CareerSection ref={careerRef} type={journeyType} />
            <Divider sx={{ my: 3 }} />

            <PersonalitySection ref={personalityRef} type={journeyType} />
            <Divider sx={{ my: 3 }} />

            <HobbiesSection ref={hobbiesRef} type={journeyType} />
            <Divider sx={{ my: 3 }} />

            <LifeLessonsSection ref={lifeLessonsRef} type={journeyType} />
            <Divider sx={{ my: 3 }} />
          </>
        )}

        {journeyType == "memorial" && (
          <>
            <FinalDaysSection ref={finalDaysRef} type={journeyType} />
            <Divider sx={{ my: 3 }} />
          </>
        )}

        <LettersSection ref={lettersRef} type={journeyType} />

        <SubmitSection onSubmit={handleSubmit} />
      </InnerContainer>
    </PageContainer>
  );
}
