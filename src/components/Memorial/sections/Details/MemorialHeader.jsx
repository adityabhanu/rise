import { Box, Typography, Chip } from "@mui/material";
import PersonIcon from "@mui/icons-material/Person";
import { styled } from "@mui/material/styles";

/* ---------------- Styled ---------------- */
const Wrapper = styled(Box)(({ theme }) => ({
  display: "grid",
  gridTemplateColumns: "260px 1fr",
  gap: theme.spacing(3),

  [theme.breakpoints.down("sm")]: {
    gridTemplateColumns: "1fr",
    textAlign: "center",
  },
}));

const MediaBox = styled(Box)(({ theme }) => ({
  aspectRatio: "3 / 4",
  borderRadius: 12,
  backgroundColor: theme.palette.custom.tombstoneGray,
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  overflow: "hidden",
}));

const ProfileImage = styled("img")({
  width: "100%",
  height: "100%",
  objectFit: "cover",
});

const InfoBox = styled(Box)(({ theme }) => ({
  display: "flex",
  flexDirection: "column",
  justifyContent: "center",
  gap: theme.spacing(1),
}));

const NameText = styled(Typography)(({ theme }) => ({
  fontSize: 28, // 👈 increased
  fontWeight: 600,
  letterSpacing: "0.02em",
  color: theme.palette.text.primary,

  [theme.breakpoints.down("sm")]: {
    fontSize: 24,
  },
}));

const MetaText = styled(Typography)(({ theme }) => ({
  fontSize: 14,
  color: theme.palette.text.secondary,
}));

/* ---------------- Helpers ---------------- */
const formatDate = (d) => (d ? d.slice(0, 10) : "");
const toCaps = (v) => (v ? v.toUpperCase() : "");

/* ---------------- Component ---------------- */
export default function MemorialHeader({
  fullName,
  birthDate,
  birthPlace,
  passingDate,
  isPublic,
  photo,
}) {
  return (
    <Wrapper>
      <MediaBox>
        {photo ? (
          <ProfileImage src={photo} alt={fullName} />
        ) : (
          <PersonIcon sx={{ fontSize: 120, color: "text.gray" }} />
        )}
      </MediaBox>

      <InfoBox>
        {isPublic && (
          <Chip
            label="Public Memorial"
            size="small"
            sx={{
              alignSelf: { xs: "center", sm: "flex-start" },
              backgroundColor: "custom.oliveMist",
            }}
          />
        )}

        <NameText>{toCaps(fullName)}</NameText>

        <MetaText>Born: {formatDate(birthDate)}</MetaText>

        {birthPlace && <MetaText>Birth Place: {birthPlace}</MetaText>}

        {passingDate && <MetaText>Passed: {formatDate(passingDate)}</MetaText>}
      </InfoBox>
    </Wrapper>
  );
}
