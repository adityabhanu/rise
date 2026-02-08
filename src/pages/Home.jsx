import { useTheme } from "@mui/material/styles";
import JourneyCards from "../components/JourneyCards";
import bannerImage from "../assets/images/fg-bg-winterA.jpeg";
import cloudImage from "../assets/images/cloud-background.jpeg";
import { Box, Typography } from "@mui/material";
import { styled } from "@mui/material/styles";
import Links from "../components/Links";
import HomePageText from "../components/HomePageText";

const Banner = styled(Box)(({ theme }) => ({
  width: "100%",
  padding: "120px 0 0 0",
  backgroundImage: `url(${cloudImage})`,
  backgroundSize: "cover",
  backgroundPosition: "center",
  textAlign: "center",
  color: theme.palette.text.white,
}));

export default function Home() {
  const theme = useTheme();

  return (
    <>
      {/* Banner Section */}
      <Banner>
        <Typography
          variant="h3"
          sx={{
            fontSize: "2rem",
            fontWeight: 600,
            fontFamily: theme.typography.fontFamilyDisplay,
            letterSpacing: "0.5px",
            color: theme.palette.text.primary,
          }}
        >
          A place to keep the moments that matter.
        </Typography>

        <Typography
          variant="h5"
          sx={{
            mt: 2,
            fontSize: "1.2rem",
            fontWeight: 500,
            color: theme.palette.text.headerLight,
          }}
        >
          From the day you are born, through every chapter of life &mdash; and beyond.
        </Typography>

        <Box sx={{ mt: 6 }}>
          <JourneyCards />
        </Box>
      </Banner>
          <HomePageText />
      {/* <Links /> */}
    </>
  );
}
