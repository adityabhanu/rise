// StatusDialog.jsx
import { Box, Typography, Button } from "@mui/material";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import ErrorOutlineIcon from "@mui/icons-material/ErrorOutline";
import BaseDialog from "../BaseDialog";

export default function StatusDialog({
  open,
  onClose,
  status = "success",
  title,
  message,
  primaryActionLabel = "OK",
  onPrimaryAction,
}) {
  const isSuccess = status === "success";

  return (
    <BaseDialog
      open={open}
      onClose={onClose}
      title={title}
      maxWidth="xs"
      actions={
        <Button
          variant="contained"
          color={isSuccess ? "success" : "primary"}
          onClick={onPrimaryAction || onClose}
        >
          {primaryActionLabel}
        </Button>
      }
    >
      <Box
        display="flex"
        flexDirection="column"
        alignItems="center"
        textAlign="center"
        gap={2}
        py={2}
      >
        {isSuccess ? (
          <CheckCircleIcon color="success" sx={{ fontSize: 56 }} />
        ) : (
          <ErrorOutlineIcon color="error" sx={{ fontSize: 56 }} />
        )}

        <Typography variant="body1" fontWeight={500}>
          {message}
        </Typography>
      </Box>
    </BaseDialog>
  );
}
