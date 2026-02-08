import { Box, Typography, Divider } from "@mui/material";
import { styled } from "@mui/material/styles";

/* ---------------- Styled (MATCH Early Life & Family) ---------------- */

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

export default function CareerWorkSection({ career }) {
  if (!career) return null;

  const { mentors, familyRole } = career;

  // if everything is empty, don't render section
  if (!mentors && !familyRole) return null;

  return (
    <Section>
      <Typography
        variant="subTitle"
        sx={{
          color: "text.header",
          fontFamily: (theme) => theme.typography.fontFamilyDisplay,
        }}
      >
        Career & Work
      </Typography>

      <Divider sx={{ mb: 2, mt: 1.5 }} />

      {mentors && (
        <Group>
          <MetaText>
            Mentors and influences: {mentors}
          </MetaText>
        </Group>
      )}

      {familyRole && (
        <Group>
          <MetaText>
            Role in the family and work life: {familyRole}
          </MetaText>
        </Group>
      )}
    </Section>
  );
}
