import { useState } from "react";
import {
  TextField,
  Button,
  Checkbox,
  FormControlLabel,
  Typography,
  Box,
} from "@mui/material";
import { styled } from "@mui/material/styles";
import BaseDialog from "./BaseDialog";
import { useDispatch } from "react-redux";
import { closeRegisterDialog } from "../store/slices/appSlice";

const Section = styled(Box)(({ theme }) => ({
  marginTop: theme.spacing(2),
}));

export default function RegisterDialog({ open, onClose }) {
  const dispatch = useDispatch();
  const [showPassword, setShowPassword] = useState(false);

  return (
    <BaseDialog
      open={open}
      onClose={() => dispatch(closeRegisterDialog())}
      title="New Member Registration"
      actions={
        <Button
          variant="contained"
          color="primary"
          sx={{ py: 1.2, fontSize: "1rem" }}
          onClick={() => dispatch(closeRegisterDialog())}
        >
          Create Account
        </Button>
      }
    >
      <Typography variant="sectionTitle" sx={{ mb: 2 }}>
        Becoming a RISE member is fast, easy and FREE.
      </Typography>

      <Section sx={{ display: "flex", gap: 2 }}>
        <TextField label="First Name" fullWidth size="small" />
        <TextField label="Last Name" fullWidth size="small" />
      </Section>

      <Section>
        <TextField label="Email Address" type="email" fullWidth size="small" />
      </Section>

      <FormControlLabel
        control={<Checkbox />}
        label="Display my email on my public profile page."
      />

      <Section sx={{ display: "flex", alignItems: "center", gap: 2 }}>
        <TextField
          label="Password"
          type={showPassword ? "text" : "password"}
          fullWidth
          size="small"
        />
        <FormControlLabel
          control={
            <Checkbox
              checked={showPassword}
              onChange={() => setShowPassword(!showPassword)}
            />
          }
          label="Show password"
        />
      </Section>

      <Section>
        <TextField label="Public Name" fullWidth size="small" />
        <Typography variant="caption" sx={{ display: "block", mt: 0.5 }}>
          Must be 1–32 characters and contain only numbers, letters, spaces,
          hyphens, ampersands, or apostrophes.
        </Typography>

        <Typography
          variant="body2"
          sx={{ color: "primary.main", mt: 1, cursor: "pointer" }}
        >
          What is a Public Name?
        </Typography>
      </Section>

      <Section>
        <FormControlLabel
          control={<Checkbox />}
          label="Receive email notifications about memorials you manage."
        />

        <FormControlLabel
          control={<Checkbox />}
          label={
            <span>
              I would like to be a photo volunteer.{" "}
              <span style={{ color: "#4D6C3A", cursor: "pointer" }}>
                What is a Photo Volunteer?
              </span>
            </span>
          }
        />
      </Section>

      <Section
        sx={{
          border: "1px solid #ccc",
          borderRadius: 2,
          p: 2,
          bgcolor: "background.paper",
        }}
      >
        <FormControlLabel
          control={<Checkbox />}
          label="RISE may contact you via email about their products and services..."
        />

        <FormControlLabel
          control={<Checkbox />}
          label={
            <span>
              I have read and agree to the{" "}
              <span style={{ color: "#4D6C3A", cursor: "pointer" }}>
                Terms and Conditions
              </span>{" "}
              and{" "}
              <span style={{ color: "#4D6C3A", cursor: "pointer" }}>
                Privacy Statement
              </span>
            </span>
          }
        />
      </Section>
    </BaseDialog>
  );
}
