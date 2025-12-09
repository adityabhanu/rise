import { useTheme } from "@mui/material/styles";
import SearchSection from "../components/SearchMemorial";
import bannerImage from "../assets/images/fg-bg-winterA.jpeg";
import { Box, Typography } from "@mui/material";
import { styled } from "@mui/material/styles";

const Banner = styled(Box, {
  shouldForwardProp: (prop) => prop !== "bgImage",
})(({ bgImage }) => ({
  width: "100%",
  padding: "100px 0 80px 0",
  backgroundImage: `linear-gradient(rgba(226, 233, 200, 0.2), rgba(226, 233, 200, 0.2)), url(${bgImage})`,
  backgroundSize: "cover",
  backgroundPosition: "center",
  textAlign: "center",
  color: "white",
}));

export default function Home() {
  const theme = useTheme();
  return (
    <>
      {/* Banner Section */}
      <Banner bgImage={bannerImage}>
        <Typography
          variant="h3"
          fontWeight="bold"
          sx={{
            fontSize: "2rem",
            textShadow: `0 0 6px rgba(0,0,0,0.6),
  0 0 12px rgba(0,0,0,0.4),
  0 0 20px rgba(0,0,0,0.3)`,
          }}
        >
          World’s largest gravesite collection.
        </Typography>
        <Typography
          variant="h5"
          sx={{
            mt: 1,
            fontSize: "1.2rem",
            color: "#e2d264",
            fontWeight: "600",
            textShadow: `0 0 6px rgba(0,0,0,0.6),
  0 0 12px rgba(0,0,0,0.4),
  0 0 20px rgba(0,0,0,0.3)`,
          }}
        >
          Over 250 million memorials created by the community since 1995.
        </Typography>
        <SearchSection />
      </Banner>
    </>
  );
}
