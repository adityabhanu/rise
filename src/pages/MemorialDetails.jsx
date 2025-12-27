import { useState, useEffect } from "react";
import { Box, Typography, Paper, Button, Tabs, Tab } from "@mui/material";
import { styled } from "@mui/material/styles";
import { useParams } from "react-router-dom";
import Loader from "../components/common/Loader";
import { getMemorialDetails } from "../api/memorialApi";
import PhotoIcon from "@mui/icons-material/Photo";
import AddCircleIcon from "@mui/icons-material/AddCircle";
import MemorialDetailsSection from "../components/MemorialDetails/MemorialDetailsSection";

const PageWrapper = styled(Box)(({ theme }) => ({
  marginTop: 64,

  [theme.breakpoints.down("sm")]: {
    marginTop: 56,
  },
}));

const HeaderCard = styled(Paper)(({ theme }) => ({
  display: "flex",
  gap: theme.spacing(10),
  padding: theme.spacing(10),
  backgroundColor: theme.palette.background.gray,
  borderRadius: "0",

  [theme.breakpoints.down("sm")]: {
    flexDirection: "column",
    gap: theme.spacing(4),
    padding: theme.spacing(4),
  },
}));

const ProfileImage = styled(Box)(({ theme }) => ({
  width: 250,
  borderRadius: 4,
  display: "flex",
  alignItems: "flex-start",
  justifyContent: "center",

  [theme.breakpoints.down("sm")]: {
    width: "100%",
    justifyContent: "center",
  },
}));

const LabelTypography = styled(Typography)(({ theme }) => ({
  color: theme.palette.text.white,
  textTransform: "uppercase",
  fontWeight: 600,
  fontSize: "20px",
  lineHeight: 1.3,
}));

const ValueTypography = styled(Typography)(({ theme }) => ({
  color: theme.palette.text.white,
  textTransform: "capitalize",
  fontWeight: 400,
  fontSize: "16px",
  lineHeight: 1.4,
}));

const InfoRow = styled(Box)(({ theme }) => ({
  display: "grid",
  gridTemplateColumns: "160px 1fr",
  columnGap: theme.spacing(6),
  alignItems: "start",
  marginTop: theme.spacing(2),

  [theme.breakpoints.down("md")]: {
    gridTemplateColumns: "1fr",
    rowGap: theme.spacing(0.5),
  },
}));

const StyledButtons = styled(Button)(({ theme }) => ({
  gap: theme.spacing(0.5),
  backgroundColor: theme.palette.background.white,
}));

const ProfileButton = styled(Button)(({ theme }) => ({
  backgroundColor: "#3f3e3e46",
  color: theme.palette.text.white,
  lineHeight: 1.5,
  fontSize: "20px",
  width: "fit-content",
  padding: "6px 20px",
  "&:hover": {
    backgroundColor: "#534f4f46",
  },
}));

const StyledTabs = styled(Tabs)(({ theme }) => ({
  backgroundColor: "#ebefe7ff",

  "& .MuiTabs-flexContainer": {
    justifyContent: "center",
  },

  "& .MuiTabs-indicator": {
    height: 3,
    borderRadius: 2,
    backgroundColor: theme.palette.primary.main,
  },
}));

const formatDate = (date) =>
  date
    ? new Date(date).toLocaleDateString("en-GB", {
        day: "numeric",
        month: "short",
        year: "numeric",
      })
    : "-";

const calculateAge = (birthDate, deathDate) => {
  if (!birthDate || !deathDate) return null;

  const birth = new Date(birthDate);
  const death = new Date(deathDate);

  let age = death.getFullYear() - birth.getFullYear();

  const hasHadBirthday =
    death.getMonth() > birth.getMonth() ||
    (death.getMonth() === birth.getMonth() &&
      death.getDate() >= birth.getDate());

  if (!hasHadBirthday) {
    age -= 1;
  }

  return age;
};

export default function MemorialDetails() {
  const { id } = useParams();
  const [loading, setLoading] = useState(false);
  const [memorial, setMemorial] = useState(null);
  const [tabValue, setTabValue] = useState("memorial");

  useEffect(() => {
    const fetchMemorial = async () => {
      try {
        setLoading(true);
        const res = await getMemorialDetails(id);
        setMemorial(res);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchMemorial();
  }, [id]);

  if (loading) return <Loader />;
  if (!memorial) return null;

  const {
    Prefix,
    FirstName,
    MiddleName,
    LastName,
    Suffix,
    NickName,
    MaidenName,
    DateOfBirth,
    DateOfDeath,
    DateOfBirthLocation,
    DateOfDeathLocation,
    Biography,
    BurialInformation,
  } = memorial;

  const fullName = `${Prefix ? Prefix + " " : ""}${FirstName} ${
    MiddleName || ""
  } ${LastName}${Suffix ? ", " + Suffix : ""}`;

  return (
    <PageWrapper>
      {/* ---------- Header ---------- */}
      <HeaderCard elevation={0}>
        <Box>
          <ProfileImage>
            <PhotoIcon sx={{ height: "100%", width: "100%", color: "gray" }} />
          </ProfileImage>
          <Box sx={{ display: "flex", justifyContent: "center", gap: "5px" }}>
            <StyledButtons>
              {" "}
              <AddCircleIcon fontSize="small" /> Add Photos
            </StyledButtons>
          </Box>
        </Box>

        <Box>
          <LabelTypography sx={{ fontSize: "36px", mb: 2 }}>
            {[NickName, MaidenName].filter(Boolean).join(" ")}
          </LabelTypography>
          <InfoRow>
            <LabelTypography>Original Name</LabelTypography>
            <ValueTypography>{fullName}</ValueTypography>
          </InfoRow>

          <InfoRow>
            <LabelTypography>Birth</LabelTypography>
            <Box sx={{ display: "flex", flexDirection: "column" }}>
              <ValueTypography>{formatDate(DateOfBirth)}</ValueTypography>
              <ValueTypography>{DateOfBirthLocation}</ValueTypography>
            </Box>
          </InfoRow>

          <InfoRow>
            <LabelTypography>Death</LabelTypography>
            <Box sx={{ display: "flex", flexDirection: "column" }}>
              <ValueTypography>
                {formatDate(DateOfDeath) +
                  " (aged " +
                  calculateAge(DateOfBirth, DateOfDeath) +
                  ")"}
              </ValueTypography>
              <ValueTypography>{DateOfDeathLocation}</ValueTypography>
            </Box>
          </InfoRow>

          <InfoRow>
            <LabelTypography>Burial Memorial ID</LabelTypography>
            <Box>
              <ValueTypography>{BurialInformation?.Id}</ValueTypography>
              <ValueTypography
                sx={{
                  textDecorationLine: "underline",
                  textUnderlineOffset: "4px",
                  cursor: "pointer",
                  mt: 0.5,
                  "&:hover": { textDecoration: "none" },
                }}
              >
                View Source
              </ValueTypography>
            </Box>
          </InfoRow>
          <InfoRow>
            <Box sx={{ mt: 2 }}>
              <ProfileButton variant="small">EDIT</ProfileButton>
            </Box>
          </InfoRow>
        </Box>
      </HeaderCard>
      <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
        <StyledTabs
          value={tabValue}
          onChange={(_, newValue) => setTabValue(newValue)}
          textColor="primary"
          indicatorColor="primary"
        >
          <Tab
            sx={{ fontWeight: 600, fontSize: "20px" }}
            label="MEMORIAL"
            value="memorial"
          />
          <Tab
            sx={{ fontWeight: 600, fontSize: "20px" }}
            label="PHOTOS"
            value="photos"
          />
        </StyledTabs>
      </Box>
      <Box>
        {tabValue === "memorial" && (
          <MemorialDetailsSection memorial={memorial} />
        )}

        {tabValue === "photos" && (
          <Typography sx={{ color: "text.secondary" }}>
            Photos coming soon…
          </Typography>
        )}
      </Box>{" "}
    </PageWrapper>
  );
}
