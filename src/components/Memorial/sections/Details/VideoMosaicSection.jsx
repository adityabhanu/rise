import { useState } from "react";
import { Box, Typography, Divider } from "@mui/material";
import { styled } from "@mui/material/styles";
import PlayArrowIcon from "@mui/icons-material/PlayArrow";

/* ---------------- Styled ---------------- */

const Section = styled(Box)(({ theme }) => ({
  marginTop: theme.spacing(4),
}));

const Grid = styled(Box)(({ count }) => ({
  display: "grid",
  gap: 12,
  width: "100%",
  margin: "0 auto",

  ...(count === 1 && {
    gridTemplateColumns: "1fr",
  }),

  ...(count === 2 && {
    gridTemplateColumns: "1fr 1fr",
  }),

  ...(count === 3 && {
    gridTemplateColumns: "2fr 1fr",
    gridAutoRows: "auto",
  }),

  ...(count === 4 && {
    gridTemplateColumns: "1fr 1fr",
  }),

  ...(count >= 5 && {
    gridTemplateColumns: "2fr 1fr 1fr",
  }),
}));


const Tile = styled(Box)(({ theme }) => ({
  position: "relative",
  width: "100%",
  aspectRatio: "16 / 9",
  overflow: "hidden",
  backgroundColor: theme.palette.custom.tombstoneGray,
  cursor: "pointer",
}));

const Poster = styled("video")({
  width: "100%",
  height: "100%",
  objectFit: "cover",
});


const Overlay = styled(Box)({
  position: "absolute",
  inset: 0,
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  background: "rgba(0,0,0,0.35)",
});

const PlayIcon = styled(PlayArrowIcon)({
  fontSize: 64,
  color: "#fff",
});

/* ---------------- Component ---------------- */

export default function VideoMosaicSection({ videos = [] }) {
  const items = videos.slice(0, 5);
  const [active, setActive] = useState(null);

  if (!items.length) return null;

  return (
    <Section>
      <Typography
        variant="subTitle"
        sx={{
          color: "text.header",
          fontFamily: (theme) => theme.typography.fontFamilyDisplay,
        }}
      >
        Videos
      </Typography>

      <Divider sx={{ mb: 2, mt: 1.5 }} />

      <Grid count={items.length} sx={{mt: 4}}>
        {items.map((src, i) => (
          <Tile key={i} onClick={() => setActive(i)}>
            {active === i ? (
              <video
                src={src}
                controls
                autoPlay
                style={{ width: "100%", height: "100%", objectFit: "cover" }}
              />
            ) : (
              <>
                {/* Using video tag to auto-grab first frame */}
                <Poster src={src} muted preload="metadata" />
                <Overlay>
                  <PlayIcon />
                </Overlay>
              </>
            )}
          </Tile>
        ))}
      </Grid>
    </Section>
  );
}
