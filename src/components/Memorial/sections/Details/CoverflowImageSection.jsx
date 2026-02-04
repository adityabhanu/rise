import { useState } from "react";
import { Box, Typography, IconButton } from "@mui/material";
import { styled } from "@mui/material/styles";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";

/* ---------------- Styled ---------------- */

const Section = styled(Box)(({ theme }) => ({
  marginTop: theme.spacing(4),
}));

const Viewport = styled(Box)({
  position: "relative",
  width: "100%",
  height: 360,
  overflow: "hidden",
});

const Slide = styled(Box)(({ theme, offset }) => {
  const isCenter = offset === 0;

  return {
    position: "absolute",
    top: "50%",
    left: "50%",
    width: isCenter ? 320 : 220,
    height: isCenter ? 300 : 220,
    transform: `
      translate(-50%, -50%)
      translateX(${offset * 260}px)
      scale(${isCenter ? 1 : 0.9})
    `,
    transition: "all 0.45s ease",
    borderRadius: 16,
    overflow: "hidden",
    backgroundColor: theme.palette.custom.tombstoneGray,
    boxShadow: isCenter
      ? `0 24px 48px ${theme.palette.custom.shadowGreen}`
      : "none",
    opacity: isCenter ? 1 : 0.65,
    zIndex: isCenter ? 3 : 1,
  };
});

const Img = styled("img")({
  width: "100%",
  height: "100%",
  objectFit: "cover",
  display: "block",
});

const NavButton = styled(IconButton)(({ left }) => ({
  position: "absolute",
  top: "50%",
  transform: "translateY(-50%)",
  width: 56,
  height: 56,
  backgroundColor: "rgba(0,0,0,0.45)",
  color: "#fff",
  zIndex: 5,

  ...(left ? { left: 12 } : { right: 12 }),

  "& svg": {
    fontSize: 34,
  },

  "&:hover": {
    backgroundColor: "rgba(0,0,0,0.55)",
  },
}));



/* ---------------- Component ---------------- */

export default function CoverflowImageSection({ title, images = [] }) {
  const items = images.slice(0, 5);
  const [active, setActive] = useState(
  Math.floor(items.length / 2)
);

  if (!items.length) return null;

  const prev = () => setActive((i) => Math.max(i - 1, 0));
  const next = () =>
    setActive((i) => Math.min(i + 1, items.length - 1));

  return (
    <Section>
      <Typography variant="subTitle" sx={{ mb: 2 }}>
        {title}
      </Typography>

      <Viewport>
        {active > 0 && (
          <NavButton left onClick={prev}>
            <ChevronLeftIcon />
          </NavButton>
        )}

        {active < items.length - 1 && (
          <NavButton onClick={next}>
            <ChevronRightIcon />
          </NavButton>
        )}

        {items.map((src, i) => (
          <Slide key={i} offset={i - active}>
            <Img src={src} alt={`${title} ${i + 1}`} />
          </Slide>
        ))}
      </Viewport>
    </Section>
  );
}
