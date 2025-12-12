import {
  Box,
  TextField,
  Typography,
  MenuItem,
  FormControlLabel,
  Radio,
} from "@mui/material";
import { styled } from "@mui/material/styles";

export const DateRow = styled(Box)(({ theme }) => ({
  display: "flex",
  gap: theme.spacing(2),
  flexWrap: "wrap",
  alignItems: "center",
}));

export const SectionContainer = styled(Box)(({ theme }) => ({
  display: "flex",
  flexDirection: "column",
  gap: theme.spacing(2),
}));

export const NameRow = styled(Box)(({ theme }) => ({
  display: "flex",
  gap: theme.spacing(2),
  flexWrap: "wrap",
}));
export const NameLabel = styled(Typography)(({ theme }) => ({
  fontWeight: 500,
  width: "16%",
  textAlign: "right",
}));

export const NameFields = styled(Box)(({ theme }) => ({
  flex: 1,
  display: "flex",
  flexDirection: "column",
  gap: "12px",
}));
