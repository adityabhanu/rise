import { Box, Typography } from "@mui/material";
import { styled } from "@mui/material/styles";

/* ---------------- Styled ---------------- */
const Section = styled(Box)(({ theme }) => ({
  marginTop: theme.spacing(4),
}));

const Grid = styled(Box)(({ theme, count }) => ({
  display: "grid",
  gap: theme.spacing(1.5),

  ...(count === 1 && {
    gridTemplateColumns: "1fr",
  }),

  ...(count === 2 && {
    gridTemplateColumns: "1fr 1fr",
  }),

  ...(count >= 3 && {
    gridTemplateColumns: "repeat(3, 1fr)",
  }),

  [theme.breakpoints.down("sm")]: {
    gridTemplateColumns: "1fr 1fr",
  },
}));

const ImageBox = styled(Box)(({ theme }) => ({
  position: "relative",
  width: "100%",
  aspectRatio: "4 / 3",
  overflow: "hidden",
  borderRadius: 12,
  backgroundColor: theme.palette.custom.tombstoneGray,
}));

const Img = styled("img")({
  width: "100%",
  height: "100%",
  objectFit: "cover",
  display: "block",
});

/* ---------------- Component ---------------- */
export default function MediaImageSection({ title, images = [] }) {
  const visibleImages = images.slice(0, 5);
  if (!visibleImages.length) return null;

  return (
    <Section>
      <Typography variant="subTitle" sx={{ mb: 2 }}>
        {title}
      </Typography>

      <Grid count={visibleImages.length}>
        {visibleImages.map((src, i) => (
          <ImageBox key={i}>
            <Img src={src} alt={`${title} ${i + 1}`} />
          </ImageBox>
        ))}
      </Grid>
    </Section>
  );
}
