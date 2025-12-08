import { useState } from "react";
import {
  Box,
  Button,
  TextField,
  FormControlLabel,
  Checkbox,
  Typography,
  IconButton,
} from "@mui/material";
import BaseDialog from "./BaseDialog";
import ForgotPassword from "./ForgotPassword";

export default function LoginDialog({ open, onClose, onSignUp }) {
  const [showPass, setShowPass] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [openForgot, setOpenForgot] = useState(false);

  return (
    <>
      <BaseDialog
        open={open}
        onClose={onClose}
        title="Sign in to RISE"
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
        <Box sx={{ px: 2 }}>
          {/* ERROR block */}
          <Box sx={{ mb: 2 }}></Box>

          {/* Email */}
          <TextField
            label="Email address"
            type="email"
            fullWidth
            size="small"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            sx={{
              mb: 2,
            }}
          />

          {/* Password top-right toggle */}
          <Box sx={{ textAlign: "right", mb: 0.5 }}>
            <Button
              variant="text"
              size="small"
              onClick={() => setShowPass(!showPass)}
              sx={{ p: 0, minWidth: 0, textTransform: "none" }}
            >
              {showPass ? "Hide" : "Show"}
            </Button>
          </Box>

          {/* Password */}
          <TextField
            label="Password"
            type={showPass ? "text" : "password"}
            fullWidth
            size="small"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            sx={{
              mb: 1,
            }}
          />

          {/* Forgot password */}
          <Box sx={{ textAlign: "center", my: 1 }}>
            <Button
              variant="text"
              onClick={() => {
                onClose();
                setOpenForgot(true);
              }}
              sx={{
                textTransform: "none",
                fontSize: 14,
                p: 0,
              }}
            >
              Forgot password?
            </Button>
          </Box>

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
            Sign in with RISE
          </Button>

          {/* Keep me signed in */}
          <FormControlLabel
            control={<Checkbox defaultChecked />}
            label="Keep me signed in"
          />
        </Box>
      </BaseDialog>

      <ForgotPassword open={openForgot} onClose={() => setOpenForgot(false)} />
    </>
  );
}
