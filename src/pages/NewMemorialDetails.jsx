import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Box, Divider, Button } from "@mui/material";
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
import MemoryImageCarousel from "../components/Memorial/sections/Details/MemoryImageCarousel";
import AddIcon from "@mui/icons-material/Add";
import TimelineEventDialog from "../components/Memorial/sections/Details/TimelineEventDialog";
import TimelineSection from "../components/Memorial/sections/Details/TimelineSection";

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
  marginTop: 64,

  [theme.breakpoints.down("sm")]: {
    marginTop: 56,
  },
}));

const SectionCard = styled(Box)(({ theme }) => ({
  margin: "0 0",
  boxShadow: `0 8px 24px ${theme.palette.custom.shadowGreen}`,
  marginTop: 64,
  marginBottom: 10,
  backgroundColor: theme.palette.background.default,

  [theme.breakpoints.down("sm")]: {
    marginTop: 66,
    marginBottom: 10,
  },
}));

/* ---------------- Component ---------------- */
export default function MemorialDetails() {
  const { id } = useParams();
  const [data, setData] = useState(null);
  const [timelineOpen, setTimelineOpen] = useState(false);

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
  const timelines = safeParse(data?.Timelines) || [];

  const dummyTimelinesString = JSON.stringify([
    {
      title: "First Job",
      eventDate: "2005-06-15",
      description:
        "Started first job as a junior engineer. A proud and memorable milestone.",
      Media: JSON.stringify({
        photos: JSON.stringify([
          "https://rgriseb80b.blob.core.windows.net/memorial-uploads/0a7f6ba5-6946-4d5c-ad52-75341cc26eda/photos/Gemini_Generated_Image_xmo7a8xmo7a8xmo7.png",
          "https://rgriseb80b.blob.core.windows.net/memorial-uploads/0a7f6ba5-6946-4d5c-ad52-75341cc26eda/photos/Gemini_Generated_Image_xmo7a8xmo7a8xmo7.png",
          "https://rgriseb80b.blob.core.windows.net/memorial-uploads/0a7f6ba5-6946-4d5c-ad52-75341cc26eda/photos/Gemini_Generated_Image_xmo7a8xmo7a8xmo7.png",
          "https://rgriseb80b.blob.core.windows.net/memorial-uploads/0a7f6ba5-6946-4d5c-ad52-75341cc26eda/photos/Gemini_Generated_Image_xmo7a8xmo7a8xmo7.png",
          "https://rgriseb80b.blob.core.windows.net/memorial-uploads/0a7f6ba5-6946-4d5c-ad52-75341cc26eda/photos/Gemini_Generated_Image_xmo7a8xmo7a8xmo7.png",
        ]),
        videos: JSON.stringify([
          "https://rgriseb80b.blob.core.windows.net/memorial-uploads/0a7f6ba5-6946-4d5c-ad52-75341cc26eda/videos/22.01.2026_10.46.55_REC.mp4",
        ]),
        voiceNotes: JSON.stringify([
          "https://rgriseb80b.blob.core.windows.net/memorial-uploads/0a7f6ba5-6946-4d5c-ad52-75341cc26eda/voicenotes/Shubha Chalo Jaane do.mp3",
        ]),
      }),
    },
    {
      title: "Wedding Day",
      eventDate: "2010-11-21",
      description:
        "A beautiful day surrounded by family, friends, and endless smiles.",
      Media: JSON.stringify({
        photos: JSON.stringify([
          "https://rgriseb80b.blob.core.windows.net/memorial-uploads/0a7f6ba5-6946-4d5c-ad52-75341cc26eda/photos/Gemini_Generated_Image_xmo7a8xmo7a8xmo7.png",
          "https://rgriseb80b.blob.core.windows.net/memorial-uploads/0a7f6ba5-6946-4d5c-ad52-75341cc26eda/photos/Gemini_Generated_Image_xmo7a8xmo7a8xmo7.png",
          "https://rgriseb80b.blob.core.windows.net/memorial-uploads/0a7f6ba5-6946-4d5c-ad52-75341cc26eda/photos/Gemini_Generated_Image_xmo7a8xmo7a8xmo7.png",
          "https://rgriseb80b.blob.core.windows.net/memorial-uploads/0a7f6ba5-6946-4d5c-ad52-75341cc26eda/photos/Gemini_Generated_Image_xmo7a8xmo7a8xmo7.png",
          "https://rgriseb80b.blob.core.windows.net/memorial-uploads/0a7f6ba5-6946-4d5c-ad52-75341cc26eda/photos/Gemini_Generated_Image_xmo7a8xmo7a8xmo7.png",
        ]),
        videos: JSON.stringify([
          "https://rgriseb80b.blob.core.windows.net/memorial-uploads/0a7f6ba5-6946-4d5c-ad52-75341cc26eda/videos/22.01.2026_10.46.55_REC.mp4",
        ]),
        voiceNotes: JSON.stringify([
          "https://rgriseb80b.blob.core.windows.net/memorial-uploads/0a7f6ba5-6946-4d5c-ad52-75341cc26eda/voicenotes/Shubha Chalo Jaane do.mp3",
        ]),
      }),
    },
  ]);

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
        fullName={data?.FullName}
        birthDate={birth?.birthDate}
        birthPlace={birth?.birthPlace?.address}
        passingDate={passing?.passingDate}
        isPublic={data.IsPublic}
        photo={photos?.[0]}
        profileType={profileType}
      />

      <Box sx={{ padding: "0 60px 0 60px" }}>
        {media?.photos?.length > 0 && (
          <>
            <MemoryImageCarousel
              title={`Photos of ${data?.FullName}`}
              images={media.photos}
            />
          </>
        )}
        {birth && (
          <>
            <BirthSection birthDetails={birth} />
          </>
        )}
        {appearanceObj && (
          <>
            <AppearanceAtBirthSection appearance={appearanceObj} />
          </>
        )}

        {hasFamilyData(family) && (
          <>
            <FamilySection family={family} />
          </>
        )}
        {media?.footprints?.length > 0 && (
          <>
            <MemoryImageCarousel
              title={`Footprints`}
              images={media.footprints}
            />
          </>
        )}

        {media?.familyPhotos?.length > 0 && (
          <>
            <MemoryImageCarousel
              title={`Cherished Moments with Family`}
              images={media.familyPhotos}
            />
          </>
        )}

        {media?.weddingPhotos?.length > 0 && (
          <>
            <MemoryImageCarousel
              title={`Wedding Photos`}
              images={media.weddingPhotos}
            />
          </>
        )}
        {media?.videos?.length > 0 && (
          <>
            <VideoMosaicSection videos={media.videos} />
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
          </>
        )}

        {/* {timelines?.length > 0 && (
          <TimelineSection timelines={safeParse(dummyTimelinesString)} />
        )} */}
        <TimelineSection timelines={safeParse(dummyTimelinesString)} />

        {media?.handwrittenNotes?.length > 0 && (
          <>
            <HandwrittenNotesSection notes={media.handwrittenNotes} />
          </>
        )}

        {parentThoughtsObj && (
          <>
            <ParentThoughtsSection thoughts={parentThoughtsObj} />
          </>
        )}

        {notesObj && (
          <>
            <NotesSection notes={notesObj} />
          </>
        )}

        {earlyLife && (
          <>
            <EarlyLifeSection earlyLife={earlyLife} />
          </>
        )}

        {career && (
          <>
            <CareerWorkSection career={career} />
          </>
        )}

        {((personality && Object.keys(personality).length > 0) ||
          (hobbies && Object.keys(hobbies).length > 0)) && (
          <>
            <PersonalityHobbiesSection
              personality={personality}
              hobbies={hobbies}
            />
          </>
        )}

        {finalDays && (
          <>
            <FinalDaysSection finalDays={finalDays} />
          </>
        )}

        {passing && Object.keys(passing).length > 0 && (
          <>
            <PassingDetailsSection passing={passing} />
          </>
        )}

        {visitors?.length > 0 && (
          <>
            <VisitorsSection visitors={visitors} />
          </>
        )}
        {letters?.length > 0 && <LettersSection letters={letters} />}
        <Box sx={{ mt: 6, mb: 4, textAlign: "center" }}>
          <Button
            startIcon={<AddIcon />}
            variant="contained"
            color="success"
            onClick={() => setTimelineOpen(true)}
          >
            Add Timeline Event
          </Button>
        </Box>

        <TimelineEventDialog
          open={timelineOpen}
          onClose={() => setTimelineOpen(false)}
        />
      </Box>
    </SectionCard>
  );
}
