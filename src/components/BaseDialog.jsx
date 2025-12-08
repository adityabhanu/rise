// BaseDialog.jsx
import { styled } from "@mui/material/styles";
import {
  Dialog,
  DialogContent,
  DialogActions,
  Box,
  Typography,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";

// Header
const Header = styled(Box)(({ theme }) => ({
  height: 56,
  display: "flex",
  alignItems: "center",
  justifyContent: "space-between",
  background: theme.palette.background.secondary,
  color: theme.palette.background.white,
}));

const HeaderTypography = styled(Typography)(({ theme }) => ({
  flexGrow: 1,
  padding: 16,
  fontWeight: 600,
  fontSize: "1.1rem",
  display: "flex",
  alignItems: "center",
}));

const CloseButton = styled(Box)(({ theme }) => ({
  background: theme.palette.background.primary,
  color: theme.palette.background.white,
  width: 56,
  height: "100%",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  cursor: "pointer",
}));

export default function BaseDialog({
  open,
  onClose,
  title,
  children,
  actions,
  maxWidth = "sm",
}) {
  return (
    <Dialog open={open} onClose={onClose} maxWidth={maxWidth} fullWidth disableScrollLock>
      <Header>
        <HeaderTypography>{title}</HeaderTypography>
        <CloseButton onClick={onClose}>
          <CloseIcon fontSize="small" />
        </CloseButton>
      </Header>

      <DialogContent>{children}</DialogContent>

      {actions && <DialogActions sx={{ p: 2 }}>{actions}</DialogActions>}
    </Dialog>
  );
}
