import { Box, Typography, Divider } from "@mui/material";
import { styled } from "@mui/material/styles";

/* ---------------- Styled (MATCH Family) ---------------- */

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

export default function EarlyLifeSection({ earlyLife }) {
  if (!earlyLife) return null;

  const {
    hometown,
    fatherName,
    motherName,
    education,
    background,
  } = earlyLife;

  return (
    <Section>
      <Typography
        variant="subTitle"
        sx={{
          color: "text.header",
          fontFamily: (theme) => theme.typography.fontFamilyDisplay,
        }}
      >
        Early Life
      </Typography>

      <Divider sx={{ mb: 2, mt: 1.5 }} />

      {hometown && (
        <Group>
          <MetaText>
            Born and raised in {hometown}.
          </MetaText>
        </Group>
      )}

      {(fatherName || motherName) && (
        <Group>
          <MetaText>
            {fatherName && <>Father: {fatherName}</>}
            {fatherName && motherName && <br />}
            {motherName && <>Mother: {motherName}</>}
          </MetaText>
        </Group>
      )}

      {education && (
        <Group>
          <MetaText>
            Education: {education}
          </MetaText>
        </Group>
      )}

      {background && (
        <Group>
          <MetaText>
            {background}
          </MetaText>
        </Group>
      )}
    </Section>
  );
}
