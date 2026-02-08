import { Box, Typography, Divider } from "@mui/material";
import { styled } from "@mui/material/styles";

/* ---------------- Styled ---------------- */

const Section = styled(Box)(({ theme }) => ({
  marginTop: theme.spacing(4),
}));

const Grid = styled(Box)(({ theme }) => ({
  marginTop: theme.spacing(2),
  display: "grid",
  gridTemplateColumns: "repeat(auto-fill, minmax(220px, 1fr))",
  gap: theme.spacing(2),
}));

const NoteCard = styled(Box)(({ theme }) => ({
  padding: theme.spacing(1.5),
  borderRadius: 0,
  backgroundColor: theme.palette.background.white,

  boxShadow: `
    0 8px 20px rgba(0, 0, 0, 0.12),
    inset 0 0 0 1px rgba(0, 0, 0, 0.06)
  `,
}));

const NoteImage = styled("img")({
  width: "100%",
  objectFit: "contain",
  display: "block",
});

/* ---------------- Component ---------------- */

export default function HandwrittenNotesSection({ notes = [] }) {
  if (!notes.length) return null;

  return (
    <Section>
      <Typography
        variant="subTitle"
        sx={{
          color: "text.header",
          fontFamily: (theme) => theme.typography.fontFamilyDisplay,
        }}
      >
        Handwritten Notes
      </Typography>

      <Divider sx={{ mb: 2, mt: 1.5 }} />

      <Grid>
        {notes.map((src, i) => (
          <NoteCard key={i}>
            <NoteImage
              src={src}
              alt={`Handwritten note ${i + 1}`}
            />
          </NoteCard>
        ))}
      </Grid>
    </Section>
  );
}
