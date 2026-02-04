import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Box, Divider } from "@mui/material";
import { styled } from "@mui/material/styles";

import { getMemorialDetails } from "../api/memorialApi";
import Loader from "../components/common/Loader";
import MemorialHeader from "../components/Memorial/sections/Details/MemorialHeader";
import FamilySection from "../components/Memorial/sections/Details/FamilySection";
import CoverflowImageSection from "../components/Memorial/sections/Details/CoverflowImageSection";
import VideoMosaicSection from "../components/Memorial/sections/Details/VideoMosaicSection";
import AudioTributeSection from "../components/Memorial/sections/Details/AudioTributeSection";
import EarlyLifeSection from "../components/Memorial/sections/Details/EarlyLifeSection";
import CareerWorkSection from "../components/Memorial/sections/Details/CareerWorkSection";
import PersonalityHobbiesSection from "../components/Memorial/sections/Details/PersonalityHobbiesSection";
import FinalDaysSection from "../components/Memorial/sections/Details/FinalDaysSection";
import LettersSection from "../components/Memorial/sections/Details/LettersSection";
import VisitorsSection from "../components/Memorial/sections/Details/VisitorsSection";
import PassingDetailsSection from "../components/Memorial/sections/Details/PassingDetailsSection";
import HandwrittenNotesSection from "../components/Memorial/sections/Details/HandwrittenNotesSection";
import BirthSection from "../components/Memorial/sections/Details/BirthSection";
import AppearanceAtBirthSection from "../components/Memorial/sections/Details/AppearanceAtBirthSection";
import ParentThoughtsSection from "../components/Memorial/sections/Details/ParentThoughtsSection";
import NotesSection from "../components/Memorial/sections/Details/NotesSection";

/* ---------------- Helpers ---------------- */
const safeParse = (v) => {
  try {
    return v ? JSON.parse(v) : null;
  } catch {
    return null;
  }
};

/* ---------------- Styled ---------------- */
const Page = styled(Box)(({ theme }) => ({
  minHeight: "100vh",
  backgroundColor: theme.palette.background.default,
  padding: theme.spacing(4),
  marginTop: 64,

  [theme.breakpoints.down("sm")]: {
    marginTop: 56,
  },
}));

const SectionCard = styled(Box)(({ theme }) => ({
  maxWidth: "90vw",
  margin: "0 auto",
  padding: theme.spacing(4),
  backgroundColor: theme.palette.background.paper,
  borderRadius: 16,
  boxShadow: `0 8px 24px ${theme.palette.custom.shadowGreen}`,
  marginTop: 74,
  marginBottom: 10,

  [theme.breakpoints.down("sm")]: {
    marginTop: 66,
    marginBottom: 10,
  },
}));

/* ---------------- Component ---------------- */
export default function MemorialDetails() {
  const { id } = useParams();
  const [data, setData] = useState(null);

  useEffect(() => {
    (async () => {
      const res = await getMemorialDetails(id);
      setData(res);
    })();
  }, [id]);

  if (!data) return <Loader />;

  // hard rule: only PASSED memorials
  // if (data.ProfileType !== "PASSED") return null;
  const profileType = data?.ProfileType;
  const birth = safeParse(data?.BirthDetails || {});
  const passing = safeParse(data?.PassingDetails || {});
  const mediaRaw = safeParse(data?.Media);
  const media = {
    photos: safeParse(mediaRaw?.photos) || [],
    weddingPhotos: safeParse(mediaRaw?.weddingPhotos) || [],
    familyPhotos: safeParse(mediaRaw?.familyPhotos) || [],
    videos: safeParse(mediaRaw?.videos) || [],
    voiceNotes: safeParse(mediaRaw?.voiceNotes) || [],
    handwrittenNotes: safeParse(mediaRaw?.handwrittenNotes || []),
    footprints: safeParse(mediaRaw?.footprints || []),
  };

  const photos = safeParse(mediaRaw?.photos) || null;
  const family = safeParse(data.Family);
  const life = safeParse(data.LifeDetails);
  const earlyLife = life?.earlyLife;

  const career = life?.career;
  const personality = safeParse(data.Personalities);
  const hobbies = safeParse(data.Hobbies);
  const finalDays = life?.finalDays;
  const letters = safeParse(data.Letters);
  const visitors = safeParse(data.Visitors) || [];
  const appearanceObj = safeParse(data?.AppearanceAtBirth) || null;
  const parentThoughtsObj = safeParse(data?.ParentThoughts) || null;
  const notesObj = safeParse(data?.Notes) || null;

  const hasFamilyData = (family) => {
    if (!family || typeof family !== "object") return false;

    // spouse (adult case)
    if (
      family.spouse &&
      (family.spouse.name?.trim() || family.spouse.story?.trim())
    ) {
      return true;
    }

    // object-based sections (newborn)
    if (
      family.parents &&
      Object.values(family.parents).some(
        (v) => typeof v === "string" && v.trim() !== "",
      )
    ) {
      return true;
    }

    if (
      family.grandParents &&
      Object.values(family.grandParents).some(
        (v) => typeof v === "string" && v.trim() !== "",
      )
    ) {
      return true;
    }

    // string-based sections
    if (family.familyPets?.trim() || family.familyTraditions?.trim()) {
      return true;
    }

    // array-based sections
    return ["children", "grandChildren", "siblings"].some(
      (key) =>
        Array.isArray(family[key]) &&
        family[key].some((item) =>
          Object.values(item).some(
            (v) => typeof v === "string" && v.trim() !== "",
          ),
        ),
    );
  };

  return (
    <SectionCard>
      <MemorialHeader
        fullName={data.FullName}
        birthDate={birth?.birthDate}
        birthPlace={birth?.birthPlace?.address}
        passingDate={passing?.passingDate}
        isPublic={data.IsPublic}
        photo={photos?.[0]}
      />

      <Divider sx={{ my: 4 }} />

      {birth && (
        <>
          <BirthSection birthDetails={birth} />
          <Divider sx={{ my: 4 }} />
        </>
      )}
      {appearanceObj && (
        <>
          <AppearanceAtBirthSection appearance={appearanceObj} />
          <Divider sx={{ my: 4 }} />
        </>
      )}

      {hasFamilyData(family) && (
        <>
          <FamilySection family={family} />

          <Divider sx={{ my: 4 }} />
        </>
      )}

      {media?.photos?.length > 0 && (
        <>
          <CoverflowImageSection title="Photos" images={media.photos} />
          <Divider sx={{ my: 4 }} />
        </>
      )}
      {media?.footprints?.length > 0 && (
        <>
          <CoverflowImageSection title="Footprints" images={media.footprints} />
          <Divider sx={{ my: 4 }} />
        </>
      )}

      {media?.weddingPhotos?.length > 0 && (
        <>
          <CoverflowImageSection
            title="Wedding Photos"
            images={media.weddingPhotos}
          />
          <Divider sx={{ my: 4 }} />
        </>
      )}

      {media?.familyPhotos?.length > 0 && (
        <>
          <CoverflowImageSection
            title="Family Photos"
            images={media.familyPhotos}
          />

          <Divider sx={{ my: 4 }} />
        </>
      )}
      {media?.videos?.length > 0 && (
        <>
          <VideoMosaicSection videos={media.videos} />
          <Divider sx={{ my: 4 }} />
        </>
      )}

      {media?.voiceNotes?.length > 0 && (
        <>
          <AudioTributeSection
            voiceNotes={media.voiceNotes}
            sectionTitle={
              profileType?.toLowerCase() == "passed"
                ? "Audio Tribute"
                : "Voice Note"
            }
          />
          <Divider sx={{ my: 4 }} />
        </>
      )}

      {media?.handwrittenNotes?.length > 0 && (
        <>
          <HandwrittenNotesSection notes={media.handwrittenNotes} />
          <Divider sx={{ my: 4 }} />
        </>
      )}

      {parentThoughtsObj && (
        <>
          <ParentThoughtsSection thoughts={parentThoughtsObj} />
          <Divider sx={{ my: 4 }} />
        </>
      )}

      {notesObj && (
        <>
          <NotesSection notes={notesObj} />
          <Divider sx={{ my: 4 }} />
        </>
      )}

      {earlyLife && (
        <>
          <EarlyLifeSection earlyLife={earlyLife} />
          <Divider sx={{ my: 4 }} />
        </>
      )}

      {career && (
        <>
          <CareerWorkSection career={career} />

          <Divider sx={{ my: 4 }} />
        </>
      )}

      {((personality && Object.keys(personality).length > 0) ||
        (hobbies && Object.keys(hobbies).length > 0)) && (
        <>
          <PersonalityHobbiesSection
            personality={personality}
            hobbies={hobbies}
          />
          <Divider sx={{ my: 4 }} />
        </>
      )}

      {finalDays && (
        <>
          <FinalDaysSection finalDays={finalDays} />

          <Divider sx={{ my: 4 }} />
        </>
      )}

      {passing && Object.keys(passing).length > 0 && (
        <>
          <PassingDetailsSection passing={passing} />
          <Divider sx={{ my: 4 }} />
        </>
      )}

      {visitors?.length > 0 && (
        <>
          <VisitorsSection visitors={visitors} />
          <Divider sx={{ my: 4 }} />
        </>
      )}
      {letters?.length > 0 && <LettersSection letters={letters} />}
    </SectionCard>
  );
}
