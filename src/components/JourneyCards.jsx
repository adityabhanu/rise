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
  position: "relative",
  height: 300,
  cursor: "pointer",
  backgroundColor: theme.palette.background.paper,
  border: `10px solid ${theme.palette.border.inner}`,
  boxShadow: theme.palette.shadow.card,
  overflow: "hidden",
  transition: "transform 0.25s ease, box-shadow 0.25s ease",

  "&::before": {
    content: '""',
    position: "absolute",
    inset: "8px",
    pointerEvents: "none",
    zIndex: 3,
  },

  "&:hover": {
    transform: "translateY(-4px)",
    boxShadow: theme.palette.shadow.cardHover,
  },
}));

/* Background image */
const CardImage = styled("div")(({ theme, image }) => ({
  position: "absolute",
  inset: "8px",
  backgroundImage: `url(${image})`,
  backgroundSize: "cover",
  backgroundPosition: "center",
  transform: "scale(1.5)",
  transformOrigin: "center",
  transition: "transform 0.3s ease",
  zIndex: 1,

  // Disable zoom on mobile / tablet
  [theme.breakpoints.down("md")]: {
    transform: "scale(1)",
  },
}));

/* Floating text on image (top) */
const CardContent = styled(Box)(({ theme }) => ({
  position: "absolute",
  top: theme.spacing(3),
  left: theme.spacing(3),
  right: theme.spacing(3),
  textAlign: "center",
  zIndex: 4,
}));

const JourneyCard = ({ image, title, subTitle, path }) => {
  const navigate = useNavigate();
  const theme = useTheme();

  return (
    <ImageCard onClick={() => navigate(path)}>
      <CardImage image={image} />

      <CardContent>
        <Typography
          variant="h1"
          sx={{
            fontWeight: 600,
            fontSize: "1.5rem",
            fontFamily: theme.typography.fontFamilyDisplay,
            color: "text.header",
          }}
        >
          {title}
        </Typography>

        <Typography
          variant="body2"
          sx={{
            mt: 1,
            color: "text.headerLight",
          }}
        >
          {subTitle}
        </Typography>
      </CardContent>
    </ImageCard>
  );
};

export default function JourneyCards() {
  return (
    <CardsGrid>
      <JourneyCard
        image="/rise/assets/images/newborn-card.jpeg"
        title="Create Life Story"
        subTitle="Capture memories, milestones, and meaningful moments"
        path="/add/new-born"
      />

      <JourneyCard
        image="/rise/assets/images/living-card.jpeg"
        title="Share Memories"
        subTitle="Preserve stories, photos, and shared experiences"
        path="/add/living-profile"
      />

      <JourneyCard
        image="/rise/assets/images/memory-card.jpeg"
        title="Build a Legacy"
        subTitle="For loved ones who have passed"
        path="/add/memorial"
      />
    </CardsGrid>
  );
}
