import { useState } from "react";
import { Box, Typography, Dialog } from "@mui/material";
import { styled } from "@mui/material/styles";

/* ---------------- Styled ---------------- */

const Section = styled(Box)(({ theme }) => ({
  marginTop: theme.spacing(4),
}));

const Grid = styled(Box)(({ count }) => ({
  display: "grid",
  gap: 12,
  width: "100%",
  aspectRatio: "1 / 1",

  ...(count === 1 && {
    gridTemplateColumns: "1fr",
    gridTemplateRows: "1fr",
  }),

  ...(count === 2 && {
    gridTemplateColumns: "1fr 1fr",
    gridTemplateRows: "1fr",
  }),

  ...(count === 3 && {
    gridTemplateColumns: "2fr 1fr",
    gridTemplateRows: "1fr 1fr",
  }),

  ...(count === 4 && {
    gridTemplateColumns: "1fr 1fr",
    gridTemplateRows: "1fr 1fr",
  }),

  ...(count >= 5 && {
    gridTemplateColumns: "2fr 1fr 1fr",
    gridTemplateRows: "1fr 1fr",
  }),
}));

const Tile = styled(Box)(({ theme }) => ({
  position: "relative",
  width: "100%",
  height: "100%",
  borderRadius: 14,
  overflow: "hidden",
  backgroundColor: theme.palette.custom.tombstoneGray,
  cursor: "pointer",
}));

const Img = styled("img")({
  width: "100%",
  height: "100%",
  objectFit: "cover",
  display: "block",
});

/* ---------------- Component ---------------- */

export default function ImageMosaicSection({ title, images = [] }) {
  const items = images.slice(0, 5);
  const [active, setActive] = useState(null);

  if (!items.length) return null;

  return (
    <Section>
      <Typography variant="subTitle" sx={{ mb: 2 }}>
        {title}
      </Typography>

      <Grid count={items.length}>
        {items.map((src, i) => (
          <Tile key={i} onClick={() => setActive(i)}>
            <Img src={src} alt={`${title} ${i + 1}`} />
          </Tile>
        ))}
      </Grid>

      {/* Lightbox */}
      <Dialog
        open={active !== null}
        onClose={() => setActive(null)}
        maxWidth="lg"
      >
        {active !== null && (
          <img
            src={items[active]}
            alt="Preview"
            style={{
              maxWidth: "90vw",
              maxHeight: "90vh",
              display: "block",
            }}
          />
        )}
      </Dialog>
    </Section>
  );
}
