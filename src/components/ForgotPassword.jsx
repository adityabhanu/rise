import { useState } from "react";
import { Box, Button, TextField, Typography } from "@mui/material";
import BaseDialog from "./BaseDialog";
import { useTheme } from "@mui/material";

export default function ForgotPassword({ open, onClose, onSignUp }) {
  const [email, setEmail] = useState("");

  const theme = useTheme();

  return (
    <BaseDialog
      open={open}
      onClose={onClose}
      title="Password Reset"
      maxWidth="sm"
      actions={
        <Box
          sx={{
            width: "100%",
            py: 1,
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            gap: 0.5,
          }}
        >
          <Typography variant="body1" component="span">
            <strong>New to RISE?</strong>
          </Typography>

          <Button
            variant="text"
            size="small"
            onClick={() => {
              onClose();
              onSignUp();
            }}
            sx={{ p: 0, textTransform: "none" }}
          >
            Sign Up
          </Button>
        </Box>
      }
    >
      <Box sx={{ px: 6 }}>
        <Box sx={{ mb: 2 }}>
          <Typography
            sx={{
              color: theme.palette.text.secondary,
              textAlign: "center",
              fontSize: "24px",
              fontWeight: 600,
              mb: 1,
            }}
          >
            Password Reset
          </Typography>
          <Typography>
            Please enter your email address and we will send you an email with a
            reset password code.
          </Typography>
        </Box>
        <TextField
          label="Enter your email address"
          type="email"
          fullWidth
          size="small"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          sx={{
            mb: 3,
          }}
        />

        {/* Sign in button */}
        <Button
          fullWidth
          variant="contained"
          size="large"
          sx={{
            fontSize: 16,
            fontWeight: 600,
            py: 1.2,
            mb: 2,
          }}
        >
          Reset Password
        </Button>
      </Box>
    </BaseDialog>
  );
}
