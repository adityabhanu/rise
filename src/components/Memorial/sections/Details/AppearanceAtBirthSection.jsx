import { Box, Typography, Divider } from "@mui/material";
import { styled } from "@mui/material/styles";

/* ---------------- Styled ---------------- */

const Section = styled(Box)(({ theme }) => ({
  marginTop: theme.spacing(4),
}));

const Group = styled(Box)(({ theme }) => ({
  display: "grid",
  gap: theme.spacing(0.75),
}));

const MetaText = styled(Typography)(({ theme }) => ({
  fontSize: 14,
  color: theme.palette.text.secondary,
}));

/* ---------------- Component ---------------- */

export default function AppearanceAtBirthSection({ appearance }) {
  if (!appearance) return null;

  const {
    eyeColor,
    skinTone,
    lookAlike,
    birthmarks,
    doctorComment,
  } = appearance;

  const hasData =
    eyeColor ||
    skinTone ||
    lookAlike ||
    birthmarks ||
    doctorComment;

  if (!hasData) return null;

  return (
    <Section>
      {/* Header */}
      <Typography
        variant="subTitle"
        sx={{
          color: "text.header",
          fontFamily: (theme) => theme.typography.fontFamilyDisplay,
        }}
      >
        Appearance at Birth
      </Typography>

      <Divider sx={{ mb: 2, mt: 1.5 }} />

      {/* Content */}
      <Group>
        {eyeColor && (
          <MetaText>
            <strong>Eye Color:</strong> {eyeColor}
          </MetaText>
        )}

        {skinTone && (
          <MetaText>
            <strong>Skin Tone:</strong> {skinTone}
          </MetaText>
        )}

        {lookAlike && (
          <MetaText>
            <strong>Looked Like:</strong> {lookAlike}
          </MetaText>
        )}

        {birthmarks && (
          <MetaText>
            <strong>Birthmarks:</strong> {birthmarks}
          </MetaText>
        )}

        {doctorComment && (
          <MetaText>
            <strong>Doctor’s Notes:</strong> {doctorComment}
          </MetaText>
        )}
      </Group>
    </Section>
  );
}
