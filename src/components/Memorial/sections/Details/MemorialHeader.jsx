import { Box, Typography } from "@mui/material";
import { styled } from "@mui/material/styles";
import cloudBg from "../../../../assets/images/cloud-background.jpeg";

/* ---------------- Styled ---------------- */

const HeaderWrapper = styled(Box)(({ theme }) => ({
  width: "100%",
  padding: theme.spacing(3, 2, 7),
  textAlign: "center",
  position: "relative",

  backgroundImage: `
    linear-gradient(
      to bottom,
      rgba(255,255,255,0.15),
      rgba(255,255,255,0.15)
    ),
    url(${cloudBg})
  `,
  backgroundSize: "100% 400%",
  backgroundPosition: "center",

  [theme.breakpoints.down("sm")]: {
    padding: theme.spacing(8, 2, 6),
  },
}));

const Subtitle = styled(Typography)(({ theme }) => ({
  fontFamily: theme.typography.fontFamilyDisplay,
  fontStyle: "italic",
  fontSize: "1.1rem",
  color: theme.palette.text.headerLight,
  marginBottom: theme.spacing(1),
}));

const Name = styled(Typography)(({ theme }) => ({
  fontFamily: theme.typography.fontFamilyDisplay,
  fontSize: "3rem",
  fontWeight: 600,
  color: theme.palette.text.header,
  marginBottom: theme.spacing(1.5),

  [theme.breakpoints.down("sm")]: {
    fontSize: "2.3rem",
  },
}));

const DatesRow = styled(Box)(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  gap: theme.spacing(2),
  color: theme.palette.text.headerLight,
  fontFamily: theme.typography.fontFamilyDisplay,
  fontSize: "1.1rem",
  letterSpacing: "0.08em",
}));

const Line = styled(Box)(({ theme }) => ({
  width: 60,
  height: 1,
  backgroundColor: theme.palette.text.headerLight,
}));

/* ---------------- Helpers ---------------- */

const year = (d) => (d ? new Date(d).getFullYear() : "");

/* ---------------- Component ---------------- */

export default function MemorialHeader({
  fullName,
  birthDate,
  passingDate,
  profileType,
}) {
  const isPassed = profileType?.toUpperCase() === "PASSED";
  const isNewBorn = profileType?.toUpperCase() === "NEWBORN";

  const subtitleText = isPassed
    ? "In Loving Memory of"
    : isNewBorn
      ? "Every story begins somewhere"
      : "A life still being written";

  const fullDate = (d) =>
    d
      ? new Date(d).toLocaleDateString(undefined, {
          day: "numeric",
          month: "long",
          year: "numeric",
        })
      : "";

  return (
    <HeaderWrapper>
      <Subtitle>{subtitleText}</Subtitle>

      <Name>{fullName}</Name>

      {birthDate && (
        <DatesRow>
          <Line />
          <span>
            {isPassed
              ? `${year(birthDate)} — ${year(passingDate)}`
              : `${fullDate(birthDate)}`}
          </span>
          <Line />
        </DatesRow>
      )}
    </HeaderWrapper>
  );
}
