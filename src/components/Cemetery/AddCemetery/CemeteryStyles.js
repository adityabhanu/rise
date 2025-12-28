// CemeteryStyles.js
import { Box, TextField, Typography } from "@mui/material";
import { styled } from "@mui/material/styles";

export const SectionContainer = styled(Box)(({ theme }) => ({
  marginBottom: "24px",
}));

export const Row = styled(Box)(() => ({
  display: "flex",
  gap: "16px",
  alignItems: "center",
  marginTop: "12px",
}));

export const Label = styled(Box)(({ theme }) => ({
  minWidth: "180px",
  fontSize: "14px",
  color: theme.palette.text.secondary,
}));

export const Content = styled(Box)(() => ({
  flex: 1,
}));

export const StyledTextField = styled(TextField)(({ theme }) => ({
  background: theme.palette.background.white,
}));

export const SectionTitle = styled(Typography)(({theme}) => ({
  color: theme.palette.text.secondary
}))