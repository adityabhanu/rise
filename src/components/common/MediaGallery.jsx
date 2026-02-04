import {
  Box,
  Grid,
  Typography,
  IconButton,
} from "@mui/material";
import { styled } from "@mui/material/styles";
import PlayCircleOutlineIcon from "@mui/icons-material/PlayCircleOutline";
import AudiotrackIcon from "@mui/icons-material/Audiotrack";
import DescriptionIcon from "@mui/icons-material/Description";

// ---------------- Styled ----------------
const Section = styled(Box)(({ theme }) => ({
  backgroundColor: theme.palette.background.paper,
  borderRadius: 16,
  padding: theme.spacing(3),
}));

const MediaGrid = styled(Grid)(({ theme }) => ({
  marginTop: theme.spacing(2),
}));

const ImageItem = styled("img")(({ theme }) => ({
  width: "100%",
  height: 180,
  objectFit: "cover",
  borderRadius: 12,
  backgroundColor: theme.palette.custom.tombstoneGray,
}));

const MediaCard = styled(Box)(({ theme }) => ({
  height: 180,
  borderRadius: 12,
  backgroundColor: theme.palette.custom.warmStone,
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  flexDirection: "column",
  gap: theme.spacing(1),
}));

// ---------------- Helpers ----------------
const safeArray = (value) => (Array.isArray(value) ? value : []);

// ---------------- Component ----------------
export default function MediaGallery({ media }) {
  if (!media) return null;

  const photos = safeArray(media.photos);
  const footprints = safeArray(media.footprints);
  const familyPhotos = safeArray(media.familyPhotos);
  const weddingPhotos = safeArray(media.weddingPhotos);
  const videos = safeArray(media.videos);
  const voiceNotes = safeArray(media.voiceNotes);
  const handwrittenNotes = safeArray(media.handwrittenNotes);

  const hasMedia =
    photos.length ||
    footprints.length ||
    familyPhotos.length ||
    weddingPhotos.length ||
    videos.length ||
    voiceNotes.length ||
    handwrittenNotes.length;

  if (!hasMedia) return null;

  return (
    <Section>
      <Typography variant="sectionTitle">Media Gallery</Typography>

      {/* ---------- Photos ---------- */}
      {photos.length > 0 && (
        <>
          <Typography sx={{ mt: 2, fontWeight: 500 }}>
            Photos
          </Typography>
          <MediaGrid container spacing={2}>
            {photos.map((src, i) => (
              <Grid item xs={12} sm={6} md={4} key={i}>
                <ImageItem src={src} loading="lazy" />
              </Grid>
            ))}
          </MediaGrid>
        </>
      )}

      {/* ---------- Footprints ---------- */}
      {footprints.length > 0 && (
        <>
          <Typography sx={{ mt: 3, fontWeight: 500 }}>
            Footprints
          </Typography>
          <MediaGrid container spacing={2}>
            {footprints.map((src, i) => (
              <Grid item xs={12} sm={6} md={4} key={i}>
                <ImageItem src={src} loading="lazy" />
              </Grid>
            ))}
          </MediaGrid>
        </>
      )}

      {/* ---------- Family / Wedding ---------- */}
      {(familyPhotos.length || weddingPhotos.length) > 0 && (
        <>
          <Typography sx={{ mt: 3, fontWeight: 500 }}>
            Family & Wedding
          </Typography>
          <MediaGrid container spacing={2}>
            {[...familyPhotos, ...weddingPhotos].map((src, i) => (
              <Grid item xs={12} sm={6} md={4} key={i}>
                <ImageItem src={src} loading="lazy" />
              </Grid>
            ))}
          </MediaGrid>
        </>
      )}

      {/* ---------- Videos ---------- */}
      {videos.length > 0 && (
        <>
          <Typography sx={{ mt: 3, fontWeight: 500 }}>
            Videos
          </Typography>
          <MediaGrid container spacing={2}>
            {videos.map((src, i) => (
              <Grid item xs={12} sm={6} md={4} key={i}>
                <video
                  src={src}
                  controls
                  style={{
                    width: "100%",
                    height: 180,
                    borderRadius: 12,
                  }}
                />
              </Grid>
            ))}
          </MediaGrid>
        </>
      )}

      {/* ---------- Voice Notes ---------- */}
      {voiceNotes.length > 0 && (
        <>
          <Typography sx={{ mt: 3, fontWeight: 500 }}>
            Voice Notes
          </Typography>
          <Grid container spacing={2}>
            {voiceNotes.map((src, i) => (
              <Grid item xs={12} sm={6} md={4} key={i}>
                <MediaCard>
                  <AudiotrackIcon fontSize="large" />
                  <audio src={src} controls />
                </MediaCard>
              </Grid>
            ))}
          </Grid>
        </>
      )}

      {/* ---------- Handwritten Notes ---------- */}
      {handwrittenNotes.length > 0 && (
        <>
          <Typography sx={{ mt: 3, fontWeight: 500 }}>
            Handwritten Notes
          </Typography>
          <Grid container spacing={2}>
            {handwrittenNotes.map((src, i) => (
              <Grid item xs={12} sm={6} md={4} key={i}>
                {src.endsWith(".pdf") ? (
                  <MediaCard>
                    <DescriptionIcon fontSize="large" />
                    <Typography variant="body2">PDF Document</Typography>
                    <IconButton href={src} target="_blank">
                      Open
                    </IconButton>
                  </MediaCard>
                ) : (
                  <ImageItem src={src} loading="lazy" />
                )}
              </Grid>
            ))}
          </Grid>
        </>
      )}
    </Section>
  );
}
