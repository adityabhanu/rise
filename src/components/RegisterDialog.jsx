import { useState } from "react";
import {
  TextField,
  Button,
  Checkbox,
  FormControlLabel,
  Typography,
  Box,
  Alert,
  Avatar,
} from "@mui/material";
import { styled } from "@mui/material/styles";
import BaseDialog from "./BaseDialog";
import { useDispatch } from "react-redux";
import { closeRegisterDialog, openLoginDialog } from "../store/slices/appSlice";
import { registerUser, uploadProfileImage } from "../api/authApi";

const Section = styled(Box)(({ theme }) => ({
  marginTop: theme.spacing(2),
}));

export default function RegisterDialog({ open, onClose }) {
  const dispatch = useDispatch();
  const [form, setForm] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    publicName: "",
    termsAndCondition: false,
  });

  const [profileImage, setProfileImage] = useState(null);
  const [imagePreview, setImagePreview] = useState("");
  const [imageWarning, setImageWarning] = useState("");

  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const handleChange = (field) => (e) => {
    const value =
      e.target.type === "checkbox" ? e.target.checked : e.target.value;

    setForm((prev) => ({ ...prev, [field]: value }));
  };

  const handleImageChange = (e) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (!file.type.startsWith("image/")) {
      setError("Please upload a valid image file");
      return;
    }

    if (file.size > 5 * 1024 * 1024) {
      setError("Image size must be less than 5MB");
      return;
    }

    setProfileImage(file);
    setImagePreview(URL.createObjectURL(file));
  };

  const handleRegister = async () => {
    if (!form.email || !form.password || !form.firstName || !form.lastName) {
      setError("Please fill all required fields");
      return;
    }

    if (!form.termsAndCondition) {
      setError("You must accept Terms and Conditions");
      return;
    }

    try {
      setLoading(true);
      setError("");
      setSuccess("");
      setImageWarning("");

      const response = await registerUser(form);

      if (!response.success) {
        if (response.errors?.length) {
          const validationMessages = response.errors
            .map((e) => `${e.field}: ${e.message}`)
            .join("\n");

          setError(`${response.message}\n${validationMessages}`);
        } else {
          setError(response.message || "Registration failed");
        }

        return;
      }

      const userId = response?.user?.id;

      if (profileImage && userId) {
        try {
          await uploadProfileImage(userId, profileImage);
        } catch (err) {
          setImageWarning(
            "Account created, but profile image upload failed. You can upload it later."
          );
        }
      }
      // ✅ SUCCESS FLOW
      setSuccess(response.message || "Registration successful");

      setTimeout(() => {
        dispatch(closeRegisterDialog());
        dispatch(openLoginDialog());
      }, 1200);
    } catch (err) {
      setError("Something went wrong. Please try again later.");
    } finally {
      setLoading(false);
    }
  };

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
          onClick={handleRegister}
          disabled={loading}
        >
          {loading ? "Creating account..." : "Create Account"}
        </Button>
      }
    >
      <Typography variant="sectionTitle" sx={{ mb: 2 }}>
        Becoming a RISE member is fast, easy and FREE.
      </Typography>

      <Section sx={{ display: "flex", gap: 2 }}>
        <TextField
          label="First Name"
          fullWidth
          size="small"
          value={form.firstName}
          onChange={handleChange("firstName")}
        />
        <TextField
          label="Last Name"
          fullWidth
          size="small"
          value={form.lastName}
          onChange={handleChange("lastName")}
        />
      </Section>

      <Section>
        <TextField
          label="Email Address"
          type="email"
          fullWidth
          size="small"
          value={form.email}
          onChange={handleChange("email")}
        />
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
          value={form.password}
          onChange={handleChange("password")}
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
        <TextField
          label="Public Name"
          fullWidth
          size="small"
          value={form.publicName}
          onChange={handleChange("publicName")}
        />
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

      {/* Profile Image */}
      <Section>
        <Typography variant="subtitle2" sx={{ mb: 1 }}>
          Profile Image
        </Typography>

        <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
          <Avatar src={imagePreview} sx={{ width: 50, height: 50 }} />

          <Button variant="outlined" component="label">
            Upload Image
            <input
              hidden
              type="file"
              accept="image/*"
              onChange={(e) => {
                handleImageChange(e);

                e.target.value = null;
              }}
            />
          </Button>

          {/* Remove Image button */}
          {imagePreview && (
            <Button
              variant="text"
              color="error"
              onClick={() => {
                setProfileImage(null);
                setImagePreview("");
              }}
            >
              Remove Image
            </Button>
          )}
        </Box>
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
          control={
            <Checkbox
              checked={form.termsAndCondition}
              onChange={handleChange("termsAndCondition")}
            />
          }
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
      {error && (
        <Alert severity="error" sx={{ my: 2, whiteSpace: "pre-line" }}>
          {error}
        </Alert>
      )}
    </BaseDialog>
  );
}
