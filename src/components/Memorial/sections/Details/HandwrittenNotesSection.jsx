import { Box, Typography } from "@mui/material";
import { styled } from "@mui/material/styles";

/* ---------------- Styled (CONSISTENT WITH OTHER SECTIONS) ---------------- */

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
  borderRadius: 14,
  backgroundColor: theme.palette.custom.warmStone,
}));

const NoteImage = styled("img")({
  width: "100%",
  borderRadius: 10,
  objectFit: "contain",
  display: "block",
});

/* ---------------- Component ---------------- */

export default function HandwrittenNotesSection({ notes = [] }) {
  if (!notes.length) return null;

  return (
    <Section>
      <Typography variant="subTitle">
        Handwritten Notes
      </Typography>

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
