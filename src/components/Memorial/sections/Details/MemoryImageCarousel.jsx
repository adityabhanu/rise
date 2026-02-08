import { useState } from "react";
import { Box, Typography, IconButton, Divider } from "@mui/material";
import { styled } from "@mui/material/styles";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";

/* ---------------- Styled ---------------- */

const Section = styled(Box)(({ theme }) => ({
  marginTop: theme.spacing(3),
}));

const Card = styled(Box)(({ theme }) => ({
  backgroundColor: theme.palette.background.paper,
  border: `1px solid ${theme.palette.border.light}`,
  padding: theme.spacing(2), // 🔽 reduced
  boxShadow: theme.palette.shadow.card,
}));

const CarouselRow = styled(Box)(({ theme }) => ({
  position: "relative",
  display: "flex",
  alignItems: "center",
  overflow: "hidden",
}));

const ImagesTrack = styled(Box)(({ offset }) => ({
  display: "flex",
  gap: 12,
  transform: `translateX(-${offset}px)`,
  transition: "transform 0.4s ease",
}));

const ImageFrame = styled(Box)(({ theme }) => ({
  width: 220,
  height: 150,
  overflow: "hidden",
  backgroundColor: theme.palette.background.default,
  boxShadow: "0px 4px 12px rgba(0,0,0,0.12)",
  flexShrink: 0,
}));

const Img = styled("img")({
  width: "100%",
  height: "100%",
  objectFit: "cover",
  display: "block",
});

/* 🔥 High-contrast chevrons */
const NavButton = styled(IconButton)(({ left }) => ({
  position: "absolute",
  top: "50%",
  transform: "translateY(-50%)",
  zIndex: 10,

  width: 42,
  height: 42,
  backgroundColor: "#000",
  color: "#fff",

  ...(left ? { left: 8 } : { right: 8 }),

  "&:hover": {
    backgroundColor: "#000",
  },

  "& svg": {
    fontSize: 28,
  },
}));

/* ---------------- Component ---------------- */

export default function MemoryImageCarousel({ title, images = [] }) {
  const VISIBLE = 3;
  const IMAGE_WIDTH = 232; // image + gap
  const [index, setIndex] = useState(0);

  if (!images.length) return null;

  const maxIndex = Math.max(images.length - VISIBLE, 0);

  return (
    <Section>
      <Typography
        variant="subTitle"
        sx={{
          color: "text.header",
          fontFamily: (theme) => theme.typography.fontFamilyDisplay,
        }}
      >
        {title}
      </Typography>
      <Divider sx={{mb: 2, mt: 1.5}}/>

      <Card>
        <CarouselRow>
          {index > 0 && (
            <NavButton left onClick={() => setIndex(index - 1)}>
              <ChevronLeftIcon />
            </NavButton>
          )}

          <ImagesTrack offset={index * IMAGE_WIDTH}>
            {images.map((src, i) => (
              <ImageFrame key={i}>
                <Img src={src} alt={`${title} ${i + 1}`} />
              </ImageFrame>
            ))}
          </ImagesTrack>

          {index < maxIndex && (
            <NavButton onClick={() => setIndex(index + 1)}>
              <ChevronRightIcon />
            </NavButton>
          )}
        </CarouselRow>
      </Card>
    </Section>
  );
}
