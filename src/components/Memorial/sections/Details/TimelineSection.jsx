import { Box, Typography, Divider } from "@mui/material";
import { styled } from "@mui/material/styles";
import MemoryImageCarousel from "./MemoryImageCarousel";
import AudioTributeSection from "./AudioTributeSection";
import PlayArrowIcon from "@mui/icons-material/PlayArrow";
import { useState } from "react";

/* ---- Timeline Video Tile ---- */

const VideoTile = styled(Box)(({ theme }) => ({
  position: "relative",
  width: "100%",
  maxWidth: 420,
  aspectRatio: "16 / 9",
  overflow: "hidden",
  cursor: "pointer",
  boxShadow: "0px 6px 18px rgba(0,0,0,0.15)",

  [theme.breakpoints.down("sm")]: {
    maxWidth: "100%",
  },
}));

const VideoPoster = styled("video")({
  width: "100%",
  height: "100%",
  objectFit: "cover",
  pointerEvents: "none",
});

const VideoOverlay = styled(Box)({
  position: "absolute",
  inset: 0,
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  background: "rgba(0,0,0,0.4)",
});

const PlayCircle = styled(Box)({
  width: 72,
  height: 72,
  borderRadius: "50%",
  background: "rgba(0,0,0,0.65)",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
});

const PlayIcon = styled(PlayArrowIcon)({
  fontSize: 44,
  color: "#fff",
  marginLeft: 4,
});

const Section = styled(Box)(({ theme }) => ({
  marginTop: theme.spacing(4),
}));

const Item = styled(Box)(({ theme }) => ({
  display: "grid",
  gridTemplateColumns: "140px 1fr",
  gap: theme.spacing(3),
  padding: theme.spacing(2, 0),

  [theme.breakpoints.down("sm")]: {
    gridTemplateColumns: "1fr",
  },
}));

const DateText = styled(Typography)(({ theme }) => ({
  fontSize: 14,
  fontWeight: 500,
  color: theme.palette.text.headerLight,
}));

const Content = styled(Box)(({ theme }) => ({
  display: "grid",
  gap: theme.spacing(1),
}));

const Title = styled(Typography)(({ theme }) => ({
  fontWeight: 500,
  color: theme.palette.text.primary,
}));

const Description = styled(Typography)(({ theme }) => ({
  fontSize: 14,
  color: theme.palette.text.secondary,
  lineHeight: 1.6,
}));

const MediaRow = styled(Box)(({ theme }) => ({
  display: "flex",
  gap: theme.spacing(2),
  flexWrap: "wrap",
  marginTop: theme.spacing(1.5),
}));

const Video = styled("video")(({ theme }) => ({
  width: "100%",
  maxWidth: 420, // 👈 bigger, looks intentional
  height: "auto",
  borderRadius: 8,
  boxShadow: "0px 6px 18px rgba(0,0,0,0.15)",

  [theme.breakpoints.down("sm")]: {
    maxWidth: "100%", // 👈 full width on mobile
  },
}));

const Audio = styled("audio")({
  marginTop: 4,
});

const MediaContainer = styled(Box)({
  maxWidth: "100%",
  overflow: "hidden",
});

/* ---------------- Helpers ---------------- */

const safeParse = (v) => {
  try {
    return v ? JSON.parse(v) : null;
  } catch {
    return null;
  }
};

const formatDate = (d) =>
  d
    ? new Date(d).toLocaleDateString(undefined, {
        year: "numeric",
        month: "short",
        day: "numeric",
      })
    : "";

/* ---------------- Component ---------------- */

export default function TimelineSection({ timelines = [] }) {
  const [activeVideo, setActiveVideo] = useState(null);

  if (!Array.isArray(timelines) || !timelines.length) return null;

  return (
    <Section>
      <Typography
        variant="subTitle"
        sx={{
          color: "text.header",
          fontFamily: (theme) => theme.typography.fontFamilyDisplay,
        }}
      >
        Life Timeline
      </Typography>
      <Divider sx={{ mb: 2, mt: 1.5 }} />

      {timelines.map((item, index) => {
        /* ---------- Parse media ---------- */
        const mediaRaw = safeParse(item.Media) || {};

        const photos = safeParse(mediaRaw.photos) || [];
        const videos = safeParse(mediaRaw.videos) || [];
        const voiceNotes = safeParse(mediaRaw.voiceNotes) || [];

        return (
          <Box key={index}>
            <Item>
              <DateText>{formatDate(item.eventDate)}</DateText>

              <Content>
                <Title>{item.title}</Title>

                {item.description && (
                  <Description>{item.description}</Description>
                )}

                {/* Photos → reuse MemoryImageCarousel */}
                {photos.length > 0 && (
                  <MediaContainer>
                    <MemoryImageCarousel title="Memories" images={photos} />
                  </MediaContainer>
                )}

                {videos[0] && (
                  <MediaRow>
                    <VideoTile onClick={() => setActiveVideo(`${index}-video`)}>
                      {activeVideo === `${index}-video` ? (
                        <video
                          src={videos[0]}
                          controls
                          autoPlay
                          style={{
                            width: "100%",
                            height: "100%",
                            objectFit: "cover",
                          }}
                        />
                      ) : (
                        <>
                          <VideoPoster
                            src={videos[0]}
                            muted
                            preload="metadata"
                          />
                          <VideoOverlay>
                            <PlayCircle>
                              <PlayIcon />
                            </PlayCircle>
                          </VideoOverlay>
                        </>
                      )}
                    </VideoTile>
                  </MediaRow>
                )}

                {/* Single Audio */}
                {voiceNotes[0] && (
                  <MediaRow sx={{ width: "100%" }}>
                    <Box sx={{ width: "100%" }}>
                      <AudioTributeSection
                        voiceNotes={voiceNotes}
                        sectionTitle=""
                      />
                    </Box>
                  </MediaRow>
                )}
              </Content>
            </Item>

            {index < timelines.length - 1 && <Divider sx={{ opacity: 0.6 }} />}
          </Box>
        );
      })}
    </Section>
  );
}
