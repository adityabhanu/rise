import { Box, Typography } from "@mui/material";
import { styled } from "@mui/material/styles";

/* ---------------- Styled (MATCH OTHER SECTIONS) ---------------- */

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

/* ---------------- Helpers ---------------- */
const formatDate = (d) => (d ? d.slice(0, 10) : "");

/* ---------------- Component ---------------- */

export default function PassingDetailsSection({ passing }) {
  if (!passing || Object.keys(passing).length === 0) return null;
  const { passingDate, passingPlace, cemetery, cause } = passing;

  if (!passingDate && !passingPlace && !cemetery && !cause) {
    return null;
  }
  return (
    <Section>
      <Typography variant="subTitle">Passing Details</Typography>

      {passingDate && (
        <Group>
          <MetaText>Passed on {formatDate(passingDate)}.</MetaText>
        </Group>
      )}

      {passingPlace?.address && (
        <Group>
          <MetaText>Place of passing: {passingPlace.address}</MetaText>
        </Group>
      )}

      {cemetery?.address && (
        <Group>
          <MetaText>Final resting place: {cemetery.address}</MetaText>
        </Group>
      )}

      {cause && (
        <Group>
          <MetaText>Cause: {cause}</MetaText>
        </Group>
      )}
    </Section>
  );
}
