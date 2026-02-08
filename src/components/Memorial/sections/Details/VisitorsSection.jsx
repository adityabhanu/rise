import { Box, Typography, Chip, Divider } from "@mui/material";
import { styled } from "@mui/material/styles";

/* ---------------- Styled (MATCH OTHER SECTIONS) ---------------- */

const Section = styled(Box)(({ theme }) => ({
  marginTop: theme.spacing(4),
}));

const Container = styled(Box)(({ theme }) => ({
  marginTop: theme.spacing(2),
  padding: theme.spacing(2),
  borderRadius: 12,
  backgroundColor: theme.palette.custom.warmStone,
}));

const ChipGroup = styled(Box)(({ theme }) => ({
  display: "flex",
  flexWrap: "wrap",
  gap: theme.spacing(1),
}));

const MetaText = styled(Typography)(({ theme }) => ({
  fontSize: 14,
  color: theme.palette.text.secondary,
  marginBottom: theme.spacing(1.5),
}));

/* ---------------- Component ---------------- */

export default function VisitorsSection({ visitors }) {
  if (!visitors || !visitors.length) return null;

  return (
    <Section>
      <Typography
        variant="subTitle"
        sx={{
          color: "text.header",
          fontFamily: (theme) => theme.typography.fontFamilyDisplay,
        }}
      >
        Visitors
      </Typography>

      <Divider sx={{ mb: 2, mt: 1.5 }} />

      <Container>
        <ChipGroup>
          {visitors.map((name, i) => (
            <Chip
              key={i}
              label={name}
              variant="outlined"
              sx={{
                borderColor: "text.primary",
                color: "text.primary",
                fontWeight: 400,
                backgroundColor: "text.white",
                "&:hover": {
                  backgroundColor: "secondary.main",
                },
              }}
            />
          ))}
        </ChipGroup>
      </Container>
    </Section>
  );
}
