import { styled } from "@mui/material/styles";
import { Box, Typography } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { useTheme } from "@emotion/react";

/* Grid wrapper */
const CardsGrid = styled(Box)(({ theme }) => ({
  display: "grid",
  gridTemplateColumns: "repeat(3, 1fr)",
  gap: theme.spacing(4),
  padding: theme.spacing(6, 2),
  maxWidth: 1200,
  margin: "0 auto",

  [theme.breakpoints.down("md")]: {
    gridTemplateColumns: "1fr",
  },
}));

/* Card container */
const ImageCard = styled(Box)(({ theme }) => ({
  background: theme.palette.background.paper,
  borderRadius: 16,
  overflow: "hidden",
  boxShadow: theme.palette.shadow.card,
  transition: "transform 0.25s ease, box-shadow 0.25s ease",
  cursor: "pointer",

  "&:hover": {
    transform: "translateY(-6px)",
    boxShadow: theme.palette.shadow.cardHover,
  },
}));

/* Image (top section) */
const CardImage = styled("img")({
  width: "100%",
  height: 180,
  objectFit: "cover",
  transform: "scale(1.25)",
});

/* Content (below image) */
const CardContent = styled(Box)(({ theme }) => ({
  padding: theme.spacing(3),
  textAlign: "left",
}));

/* Card Component */
const JourneyCard = ({ image, title, subTitle, path }) => {
  const navigate = useNavigate();
  const theme = useTheme();

  return (
    <ImageCard onClick={() => navigate(path)}>
      <CardImage src={image} alt={title} />

      <CardContent>
        <Typography
          sx={{
            fontSize: "1.4rem",
            fontWeight: 500,
            fontFamily: theme.typography.fontFamilyDisplay,
            color: "text.header",
          }}
        >
          {title}
        </Typography>

        <Typography
          sx={{
            mt: 1,
            fontSize: "0.95rem",
            color: "text.secondary",
          }}
        >
          {subTitle}
        </Typography>
      </CardContent>
    </ImageCard>
  );
};

/* Main Component */
export default function JourneyCards() {
  return (
    <CardsGrid>
      <JourneyCard
        image="/assets/images/newborn-card-1.jpeg"
        title="Create Life Story"
        subTitle="Capture memories, milestones, and meaningful moments throughout life."
        path="/add/new-born"
      />

      <JourneyCard
        image="/assets/images/living-card-1.jpeg"
        title="Share Memories"
        subTitle="Preserve stories, photos, and experiences your family will treasure forever."
        path="/add/living-profile"
      />

      <JourneyCard
        image="/assets/images/memory-card-1.jpeg"
        title="Honor Loved Ones"
        subTitle="Create lasting memorials and celebrate lives that shaped your story."
        path="/add/memorial"
      />
    </CardsGrid>
  );
}