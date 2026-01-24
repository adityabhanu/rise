import { styled } from "@mui/material/styles";
import { Box, Typography } from "@mui/material";
import { useNavigate } from "react-router-dom";

/* Grid wrapper */
const CardsGrid = styled(Box)(({ theme }) => ({
  display: "grid",
  gridTemplateColumns: "repeat(3, 1fr)",
  gap: theme.spacing(3),
  padding: theme.spacing(4),

  [theme.breakpoints.down("md")]: {
    gridTemplateColumns: "1fr",
  },
}));

/* Card */
const ImageCard = styled(Box)(({ theme }) => ({
  position: "relative",
  height: 280,
  borderRadius: 20,
  overflow: "hidden",
  cursor: "pointer",
  boxShadow: "0 10px 30px rgba(0,0,0,0.15)",
  transition: "transform 0.3s ease, box-shadow 0.3s ease",

  "&:hover": {
    transform: "translateY(-6px)",
    boxShadow: "0 18px 40px rgba(0,0,0,0.25)",
  },
}));

/* Background image */
const CardImage = styled("div")(({ image }) => ({
  position: "absolute",
  inset: 0,
  backgroundImage: `url(${image})`,
  backgroundSize: "cover",
  backgroundPosition: "center",
}));

/* Gradient overlay */
const CardOverlay = styled(Box)(({ theme }) => ({
  position: "absolute",
  inset: 0,
  background:
    "linear-gradient(to top, rgba(0,0,0,0.75), rgba(0,0,0,0.2), transparent)",
}));

/* Content */
const CardContent = styled(Box)(({ theme }) => ({
  position: "absolute",
  bottom: theme.spacing(3),
  left: theme.spacing(3),
  right: theme.spacing(3),
  color: theme.palette.text.white,
}));

const JourneyCard = ({ image, title, subTitle, path }) => {
  const navigate = useNavigate();
  return (
    <ImageCard onClick={() => navigate(path)}>
      <CardImage image={image} />
      <CardOverlay />
      <CardContent>
        <Typography variant="h5" fontWeight={600}>
          {title}
        </Typography>
        <Typography variant="body2" sx={{ opacity: 0.9, mt: 1 }}>
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
        image="/rise/assets/images/create-life.jpg"
        title="Create Life Story"
        subTitle="Capture memories, milestones, and meaningful moments"
        path="/add/new-born"
      />

      <JourneyCard
        image="/rise/assets/images/share-memories.jpg"
        title="Share Memories"
        subTitle="Preserve stories, photos, and shared experiences"
        path="/add/living-profile"
      />

      <JourneyCard
        image="/rise/assets/images/build-legacy.jpg"
        title="Build a Legacy"
        subTitle="For loved ones who have passed"
        path="/add/memorial"
      />
    </CardsGrid>
  );
}
