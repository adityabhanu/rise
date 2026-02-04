import { Box, Typography } from "@mui/material";
import { styled } from "@mui/material/styles";

/* ---------------- Styled (MATCH ALL PREVIOUS SECTIONS) ---------------- */

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

export default function FinalDaysSection({ finalDays }) {
  if (!finalDays) return null;

  const {
    lastDaysStory,
    finalWords,
    funeralDetails,
    obituary,
    prayers,
  } = finalDays;

  // If everything is empty, don’t render the section
  if (
    !lastDaysStory &&
    !finalWords &&
    !funeralDetails &&
    !obituary &&
    !prayers
  ) {
    return null;
  }

  return (
    <Section>
      <Typography variant="subTitle">
        Final Days
      </Typography>

      {lastDaysStory && (
        <Group>
          <MetaText>
            {lastDaysStory}
          </MetaText>
        </Group>
      )}

      {finalWords && (
        <Group>
          <MetaText>
            Final words remembered: {finalWords}
          </MetaText>
        </Group>
      )}

      {funeralDetails && (
        <Group>
          <MetaText>
            Funeral details: {funeralDetails}
          </MetaText>
        </Group>
      )}

      {obituary && (
        <Group>
          <MetaText>
            {obituary}
          </MetaText>
        </Group>
      )}

      {prayers && (
        <Group>
          <MetaText>
            Prayers and remembrance: {prayers}
          </MetaText>
        </Group>
      )}
    </Section>
  );
}
