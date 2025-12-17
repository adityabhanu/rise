import {
  Box,
  TextField,
  Typography,
  MenuItem,
  FormControlLabel,
  Radio,
  Button,
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

export const StyledTextField = styled(TextField)(({ theme }) => ({
  flex: 1,
}));

export const ActionButton = styled(Button)(({ theme }) => ({
  background: theme.palette.primary.main,
  color: theme.palette.background.white,
  fontWeight: 600,
  padding: theme.spacing(1.2, 3),
  borderRadius: 6,
  textTransform: "none",
  "&:hover": {
    background: theme.palette.background.primary,
  },
}));
