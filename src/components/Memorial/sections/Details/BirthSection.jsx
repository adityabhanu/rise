import { Box, Typography } from "@mui/material";
import { styled } from "@mui/material/styles";

/* ---------------- Styled (reuse style language) ---------------- */

const Section = styled(Box)(({ theme }) => ({
  marginTop: theme.spacing(4),
}));

const SectionHeader = styled(Typography)(({ theme }) => ({
  marginBottom: theme.spacing(2),
}));

const Group = styled(Box)(({ theme }) => ({
  display: "grid",
  gap: theme.spacing(0.75),
}));

const MetaText = styled(Typography)(({ theme }) => ({
  fontSize: 14,
  color: theme.palette.text.secondary,
}));

/* ---------------- Helpers ---------------- */

const formatDate = (dateStr) =>
  dateStr
    ? new Date(dateStr).toLocaleDateString(undefined, {
        year: "numeric",
        month: "long",
        day: "numeric",
      })
    : null;

/* ---------------- Component ---------------- */

export default function BirthSection({ birthDetails }) {
  if (!birthDetails) return null;

  const {
    birthDate,
    birthTime,
    birthMetrics,
    birthPlace,
    doctorName,
  } = birthDetails;

  const hasData =
    birthDate ||
    birthTime ||
    birthMetrics?.weightKg ||
    birthMetrics?.lengthCm ||
    birthPlace?.address ||
    doctorName;

  if (!hasData) return null;

  return (
    <Section>
      <SectionHeader variant="subTitle">
        Birth Details
      </SectionHeader>

      <Group>
        {birthDate && (
          <MetaText>
            <strong>Date:</strong> {formatDate(birthDate)}
          </MetaText>
        )}

        {birthTime && (
          <MetaText>
            <strong>Time:</strong> {birthTime}
          </MetaText>
        )}

        {(birthMetrics?.weightKg || birthMetrics?.lengthCm) && (
          <MetaText>
            <strong>Measurements:</strong>{" "}
            {birthMetrics?.weightKg && `${birthMetrics.weightKg} kg`}
            {birthMetrics?.weightKg && birthMetrics?.lengthCm && " · "}
            {birthMetrics?.lengthCm && `${birthMetrics.lengthCm} cm`}
          </MetaText>
        )}

        {birthPlace?.address && (
          <MetaText>
            <strong>Place:</strong> {birthPlace.address}
          </MetaText>
        )}

        {doctorName && (
          <MetaText>
            <strong>Doctor:</strong> {doctorName}
          </MetaText>
        )}
      </Group>
    </Section>
  );
}
