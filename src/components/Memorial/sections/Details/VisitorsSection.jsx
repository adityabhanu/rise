import { Box, Typography, Chip } from "@mui/material";
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
      <Typography variant="subTitle">
        Visitors
      </Typography>

      <Container>

        <ChipGroup>
          {visitors.map((name, i) => (
            <Chip
              key={i}
              label={name}
              sx={{
                backgroundColor: "background.paper",
                color: "text.primary",
                fontWeight: 400,
              }}
            />
          ))}
        </ChipGroup>
      </Container>
    </Section>
  );
}
