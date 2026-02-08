import { Box, Typography, Divider } from "@mui/material";
import { styled } from "@mui/material/styles";

/* ---------------- Styled ---------------- */

const Section = styled(Box)(({ theme }) => ({
  marginTop: theme.spacing(4),
}));

const Group = styled(Box)(({ theme }) => ({
  display: "grid",
  gap: theme.spacing(1.25),
}));

const MetaText = styled(Typography)(({ theme }) => ({
  fontSize: 14,
  color: theme.palette.text.secondary,
  lineHeight: 1.7,
}));

/* ---------------- Component ---------------- */

export default function ParentThoughtsSection({ thoughts }) {
  if (!thoughts) return null;

  const { foundOut, firstHeld, fears, wishes } = thoughts;

  const hasData = foundOut || firstHeld || fears || wishes;
  if (!hasData) return null;

  return (
    <Section>
      <Typography
        variant="subTitle"
        sx={{
          color: "text.header",
          fontFamily: (theme) => theme.typography.fontFamilyDisplay,
        }}
      >
        Parent Thoughts
      </Typography>

      <Divider sx={{ mb: 2, mt: 1.5 }} />

      <Group>
        {foundOut && (
          <MetaText>
            <strong>When we found out about you:</strong>
            <br />
            {foundOut}
          </MetaText>
        )}

        {firstHeld && (
          <MetaText>
            <strong>When we first held you:</strong>
            <br />
            {firstHeld}
          </MetaText>
        )}

        {fears && (
          <MetaText>
            <strong>What scares us:</strong>
            <br />
            {fears}
          </MetaText>
        )}

        {wishes && (
          <MetaText>
            <strong>Our biggest wish for you:</strong>
            <br />
            {wishes}
          </MetaText>
        )}
      </Group>
    </Section>
  );
}
