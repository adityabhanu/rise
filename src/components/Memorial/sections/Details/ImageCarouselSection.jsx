import { useState } from "react";
import { Box, Typography, IconButton } from "@mui/material";
import { styled } from "@mui/material/styles";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";

/* ---------------- Styled ---------------- */
const Section = styled(Box)(({ theme }) => ({
  marginTop: theme.spacing(4),
}));

const Frame = styled(Box)(({ theme }) => ({
  position: "relative",
  width: "100%",
  aspectRatio: "16 / 9",
  borderRadius: 16,
  overflow: "hidden",
  backgroundColor: theme.palette.custom.tombstoneGray,
}));

const Image = styled("img")({
  width: "100%",
  height: "100%",
  objectFit: "cover",
  display: "block",
});

const NavButton = styled(IconButton)(({ theme, left }) => ({
  position: "absolute",
  top: "50%",
  transform: "translateY(-50%)",
  zIndex: 2,
  backgroundColor: theme.palette.background.paper,
  boxShadow: `0 4px 12px ${theme.palette.custom.shadowGreen}`,

  ...(left ? { left: 12 } : { right: 12 }),

  "&:hover": {
    backgroundColor: theme.palette.background.paper,
  },
}));

/* ---------------- Component ---------------- */
export default function ImageCarouselSection({ title, images = [] }) {
  const items = images.slice(0, 5);
  const [index, setIndex] = useState(0);

  if (!items.length) return null;

  const next = () =>
    setIndex((i) => (i < items.length - 1 ? i + 1 : i));
  const prev = () =>
    setIndex((i) => (i > 0 ? i - 1 : i));

  return (
    <Section>
      <Typography variant="subTitle" sx={{ mb: 2 }}>
        {title}
      </Typography>

      <Frame>
        {index > 0 && (
          <NavButton left onClick={prev}>
            <ChevronLeftIcon />
          </NavButton>
        )}

        {index < items.length - 1 && (
          <NavButton onClick={next}>
            <ChevronRightIcon />
          </NavButton>
        )}

        <Image
          key={items[index]} // forces clean image swap
          src={items[index]}
          alt={`${title} ${index + 1}`}
        />
      </Frame>
    </Section>
  );
}
