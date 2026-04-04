import { useTheme } from "@mui/material/styles";
import JourneyCards from "../components/JourneyCards";
import cloudImage from "../assets/images/cloud-background-3.png";
import { Box, Typography, Button } from "@mui/material";
import { styled } from "@mui/material/styles";
import HomePageText from "../components/HomePageText";
import { useNavigate, useLocation } from "react-router-dom";
import { useEffect, useState } from "react";
import { getUpcomingEvents } from "../api/homeApi";
import UpcomingEventsPopup from "../components/home/UpcomingEventsPopup";
import ContributionPopup from "../components/home/ContributionPopup";
import { useSelector } from "react-redux";

const Banner = styled(Box)(({ theme }) => ({
  width: "100%",
  padding: "120px 0 80px 0",
  backgroundImage: `url(${cloudImage})`,
  backgroundSize: "cover",
  backgroundPosition: "center",
  transform: "scale(1)",
}));

// 👇 container to align content left
const BannerContent = styled(Box)(({ theme }) => ({
  maxWidth: 1200,
  margin: "0 auto",
  // padding: "0 24px",
  display: "flex",
  flexDirection: "column",
  alignItems: "flex-start",
}));

export default function Home() {
  const theme = useTheme();
  const navigate = useNavigate();
  const [events, setEvents] = useState([]);
  const [showEventsPopup, setShowEventsPopup] = useState(false);
  const [showContributionPopup, setShowContributionPopup] = useState(false);
  const [shouldShowContribution, setShouldShowContribution] = useState(false);
  const location = useLocation();

  const { loggedInStatus, user } = useSelector((state) => state.user);

  useEffect(() => {
    if (!loggedInStatus || !user?.id) return;

    if (location.pathname !== "/") return;

    const today = new Date().toISOString().split("T")[0];

    const EVENTS_KEY = `rise_events_popup_${user.id}`;
    const CONTRIBUTION_KEY = `rise_contribution_popup_${user.id}`;

    const eventsSeen = localStorage.getItem(EVENTS_KEY);
    const contributionSeen = localStorage.getItem(CONTRIBUTION_KEY);

    // 👉 Only fetch if needed
    if (eventsSeen === today && contributionSeen === today) return;

    (async () => {
      try {
        const res = await getUpcomingEvents();
        if (!res) return;

        const hasEvents = res.Memorials?.length > 0;

        setEvents(res.Memorials || []);

        // ✅ Priority 1: Anniversary popup
        if (hasEvents && eventsSeen !== today) {
          setShowEventsPopup(true);
        }

        // ✅ Store contribution intent ONLY
        if (!res.HasRecentContribution && contributionSeen !== today) {
          setShouldShowContribution(true);
        }

        // ✅ If no events → show contribution directly
        if (
          !hasEvents &&
          !res.HasRecentContribution &&
          contributionSeen !== today
        ) {
          setShowContributionPopup(true);
        }
      } catch (err) {
        console.error(err);
      }
    })();
  }, [location.pathname, loggedInStatus, user?.id]);

  return (
    <>
      {/* Banner Section */}
      <Banner>
        <BannerContent>
          <Box sx={{ padding: "0 24px", maxWidth: 500 }}>
            {/* Heading */}
            <Typography
              sx={{
                fontSize: "2.8rem",
                fontWeight: 600,
                fontFamily: theme.typography.fontFamilyDisplay,
                color: theme.palette.text.header,
                maxWidth: 500,
                lineHeight: 1.3,
              }}
            >
              Every Life Deserves to Be Remembered
            </Typography>

            {/* Sub text */}
            <Typography
              sx={{
                mt: 2,
                fontSize: "1.1rem",
                color: theme.palette.text.headerLight,
                maxWidth: 500,
                lineHeight: 1.6,
              }}
            >
              Capture memories, milestones, and stories — from birth to legacy.
            </Typography>

            {/* CTA */}
            <Box sx={{ mt: 3 }}>
              <Button
                variant="contained"
                color="success"
                sx={{
                  px: 3,
                  py: 1.2,
                  fontSize: "0.95rem",
                  backgroundColor: theme.palette.custom.homeBlue,
                }}
                onClick={() => navigate("/add/new-born")}
              >
                Begin Your Life Story
              </Button>

              {/* small text */}
              <Typography
                sx={{
                  mt: 1,
                  fontSize: "0.85rem",
                  color: theme.palette.text.secondary,
                }}
              >
                Preserving family memories for generations.
              </Typography>
            </Box>
          </Box>

          {/* Cards */}
          <Box sx={{ mt: 4, width: "100%" }}>
            <JourneyCards />
          </Box>
        </BannerContent>
      </Banner>

      <HomePageText />

      <UpcomingEventsPopup
        open={showEventsPopup}
        data={events}
        onClose={() => {
          setShowEventsPopup(false);

          const today = new Date().toISOString().split("T")[0];
          const EVENTS_KEY = `rise_events_popup_${user.id}`;

          localStorage.setItem(EVENTS_KEY, today);

          // 👉 show contribution AFTER closing events
          if (shouldShowContribution) {
            setTimeout(() => {
              setShowContributionPopup(true);
            }, 300);
          }
        }}
      />

      <ContributionPopup
        open={showContributionPopup}
        onClose={() => {
          setShowContributionPopup(false);

          const today = new Date().toISOString().split("T")[0];
          const CONTRIBUTION_KEY = `rise_contribution_popup_${user.id}`;

          localStorage.setItem(CONTRIBUTION_KEY, today);
        }}
      />
    </>
  );
}
