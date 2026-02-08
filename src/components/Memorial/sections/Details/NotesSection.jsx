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

export default function NotesSection({ notes }) {
  if (!notes) return null;

  const { birthNotes, favorites } = notes;
  const hasData = birthNotes || favorites;
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
        Notes
      </Typography>

      <Divider sx={{ mb: 2, mt: 1.5 }} />

      <Group>
        {birthNotes && (
          <MetaText>
            <strong>The moment we first saw you:</strong>
            <br />
            {birthNotes}
          </MetaText>
        )}

        {favorites && (
          <MetaText>
            <strong>Favorites:</strong>
            <br />
            {favorites}
          </MetaText>
        )}
      </Group>
    </Section>
  );
}
