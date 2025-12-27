import { Box, Typography, Paper, Divider, Button } from "@mui/material";
import { styled } from "@mui/material/styles";

const InfoRow = styled(Box)(({ theme }) => ({
  display: "grid",
  gridTemplateColumns: "160px 1fr",
  columnGap: theme.spacing(6),
  alignItems: "start",
  marginTop: theme.spacing(2),
}));

const SectionCard = styled(Paper)(({ theme }) => ({
  padding: theme.spacing(3),
  backgroundColor: theme.palette.background.paper,
}));

const Label = styled("span")(({ theme }) => ({
  fontWeight: 600,
  fontSize: "16px",
  color: theme.palette.text.gray,
}));

const SectionHeading = styled(Typography)(({ theme }) => ({
  textTransform: "capitalize",
  fontWeight: "600",
  color: theme.palette.background.secondary,
  fontSize: "24px",
}));

const DetailsTypography = styled(Typography)(({ theme }) => ({
  fontSize: "16px",
  color: theme.palette.text.gray,
}));

const WrapperBox = styled(Box)(({ theme }) => ({
  padding: "0 60px 0 60px",
  backgroundColor: theme.palette.background.paper,
}));

export default function MemorialDetailsSection({ memorial }) {
  const { Biography, BurialInformation } = memorial;

  return (
    <WrapperBox>
      <SectionCard elevation={0}>
        <SectionHeading>Biography</SectionHeading>
        <Box
          dangerouslySetInnerHTML={{ __html: Biography }}
          sx={{ color: "text.gray", fontSize: "16px" }}
        />
      </SectionCard>
      <Divider />

      {/* ---------- Inscription ---------- */}
      {BurialInformation?.Inscription && (
        <SectionCard elevation={0}>
          <SectionHeading>Inscription</SectionHeading>
          <DetailsTypography>{BurialInformation.Inscription}</DetailsTypography>
        </SectionCard>
      )}
      <Divider />

      {/* ---------- Gravesite Details ---------- */}
      {BurialInformation?.Gravesite && (
        <SectionCard elevation={0}>
          <SectionHeading>Gravesite Details</SectionHeading>
          <DetailsTypography>{BurialInformation.Gravesite}</DetailsTypography>
        </SectionCard>
      )}
      <Divider />

      {/* ---------- Burial Info ---------- */}
      <SectionCard elevation={0}>
        <SectionHeading>Burial Information</SectionHeading>

        <InfoRow>
          <Label>Plot Number:</Label>{" "}
          <DetailsTypography>{BurialInformation?.PlotNumber}</DetailsTypography>
        </InfoRow>

        <InfoRow>
          <Label>Monument:</Label>{" "}
          <DetailsTypography>
            {BurialInformation?.Monument ? "Yes" : "No"}
          </DetailsTypography>
        </InfoRow>

        <InfoRow>
          <Label>Cenotaph:</Label>{" "}
          <DetailsTypography>
            {BurialInformation?.Cenotaph ? "Yes" : "No"}
          </DetailsTypography>
        </InfoRow>
      </SectionCard>
    </WrapperBox>
  );
}
