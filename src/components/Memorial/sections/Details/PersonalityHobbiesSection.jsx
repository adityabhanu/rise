import { Box, Typography, Divider } from "@mui/material";
import { styled } from "@mui/material/styles";

/* ---------------- Styled (MATCH Early Life & Career) ---------------- */

const Section = styled(Box)(({ theme }) => ({
  marginTop: theme.spacing(4),
}));

const Group = styled(Box)(({ theme }) => ({
  marginTop: theme.spacing(2),
}));

const MetaText = styled(Typography)(({ theme }) => ({
  fontSize: 14,
  color: theme.palette.text.secondary,
  lineHeight: 1.6,
}));

/* ---------------- Component ---------------- */

export default function PersonalityHobbiesSection({
  personality,
  hobbies,
}) {
  if (!personality && !hobbies) return null;

  const { appearance, identifiers, fear, wishes } = personality || {};
  const { petAnimals, familyTraditions, lifeLessons } = hobbies || {};

  return (
    <Section>
      <Typography
        variant="subTitle"
        sx={{
          color: "text.header",
          fontFamily: (theme) => theme.typography.fontFamilyDisplay,
        }}
      >
        Personality, Hobbies & Interests
      </Typography>

      <Divider sx={{ mb: 2, mt: 1.5 }} />

      {/* Personality */}
      {(appearance || identifiers || fear || wishes) && (
        <Group>
          {appearance && (
            <MetaText>
              Known for their appearance and presence: {appearance}
            </MetaText>
          )}

          {identifiers && (
            <MetaText sx={{ mt: 1 }}>
              Often remembered by: {identifiers}
            </MetaText>
          )}

          {fear && (
            <MetaText sx={{ mt: 1 }}>
              A quiet fear they carried: {fear}
            </MetaText>
          )}

          {wishes && (
            <MetaText sx={{ mt: 1 }}>
              Wishes and dreams: {wishes}
            </MetaText>
          )}
        </Group>
      )}

      {/* Hobbies & Interests */}
      {(petAnimals || familyTraditions || lifeLessons) && (
        <Group>
          {petAnimals && (
            <MetaText>
              Loved animals and companions: {petAnimals}
            </MetaText>
          )}

          {familyTraditions && (
            <MetaText sx={{ mt: 1 }}>
              Family traditions they cherished: {familyTraditions}
            </MetaText>
          )}

          {lifeLessons && (
            <MetaText sx={{ mt: 1 }}>
              Life lessons they shared: {lifeLessons}
            </MetaText>
          )}
        </Group>
      )}
    </Section>
  );
}
