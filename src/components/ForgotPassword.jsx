import { useState, useEffect } from "react";
import { Box, Button, TextField, Typography } from "@mui/material";
import BaseDialog from "./BaseDialog";
import { useTheme } from "@mui/material";
import { useDispatch } from "react-redux";
import { openRegisterDialog, openLoginDialog } from "../store/slices/appSlice";
import { forgotPassword, resetPassword } from "../api/authApi";
import Loader from "../components/common/Loader";

export default function ForgotPassword({ open, onClose }) {
  const [email, setEmail] = useState("");
  const [otp, setOtp] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const [step, setStep] = useState(1); // 1=email, 2=reset
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const dispatch = useDispatch();
  const theme = useTheme();

  // 👉 Send OTP
  const handleSendOtp = async () => {
    setLoading(true);
    setError("");

    try {
      const res = await forgotPassword(email);
      if (!res?.success) {
        setError(res?.message || "Failed to send OTP");
        return;
      }
      setStep(2);
    } catch (err) {
      setError("Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  // 👉 Reset Password
  const handleResetPassword = async () => {
    if (newPassword !== confirmPassword) {
      setError("Passwords do not match");
      return;
    }

    setLoading(true);
    setError("");

    try {
      const res = await resetPassword({
        email,
        otp,
        newPassword,
      });

      if (!res?.success) {
        setError(res?.message || "Reset failed");
        return;
      }

      // ✅ Close & reopen login
      onClose();
      // reset state manually (extra safety)
      setStep(1);
      setEmail("");
      setOtp("");
      setNewPassword("");
      setConfirmPassword("");
      setError("");

      dispatch(openLoginDialog());
    } catch (err) {
      setError("Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (open) {
      // Reset everything when dialog opens
      setStep(1);
      setEmail("");
      setOtp("");
      setNewPassword("");
      setConfirmPassword("");
      setError("");
    }
  }, [open]);

  return (
    <>
      {loading && <Loader />}

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
              gap: 0.5,
            }}
          >
            <Typography>
              <strong>New to RISE?</strong>
            </Typography>

            <Button
              variant="text"
              size="small"
              onClick={() => {
                onClose();
                dispatch(openRegisterDialog());
              }}
              sx={{ p: 0 }}
            >
              Sign Up
            </Button>
          </Box>
        }
      >
        <Box sx={{ px: 6 }}>
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

          {step === 1 && (
            <>
              <Typography sx={{ mb: 2 }}>
                Enter your email to receive OTP
              </Typography>

              <TextField
                label="Email"
                fullWidth
                size="small"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                sx={{ mb: 3 }}
              />

              <Button
                fullWidth
                variant="contained"
                size="large"
                onClick={handleSendOtp}
              >
                Send OTP
              </Button>
            </>
          )}

          {step === 2 && (
            <>
              <TextField
                label="OTP"
                fullWidth
                size="small"
                value={otp}
                onChange={(e) => setOtp(e.target.value)}
                sx={{ mb: 2 }}
              />

              <TextField
                label="New Password"
                type="password"
                fullWidth
                size="small"
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
                sx={{ mb: 2 }}
              />

              <TextField
                label="Confirm Password"
                type="password"
                fullWidth
                size="small"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                sx={{ mb: 3 }}
              />

              <Button
                fullWidth
                variant="contained"
                size="large"
                onClick={handleResetPassword}
              >
                Reset Password
              </Button>
            </>
          )}

          {error && (
            <Typography color="error" sx={{ mt: 2 }}>
              {error}
            </Typography>
          )}
        </Box>
      </BaseDialog>
    </>
  );
}
