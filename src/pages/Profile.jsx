import { useState } from "react";
import {
  Box,
  Typography,
  Avatar,
  TextField,
  Button,
  Paper,
} from "@mui/material";
import { styled } from "@mui/material/styles";
import { updateUserProfile, uploadProfileImage } from "../api/authApi";
import Loader from "../components/common/Loader";

/* ---------------- styled components ---------------- */

const PageWrapper = styled(Box)(({ theme }) => ({
  marginTop: 64,
  backgroundColor: theme.palette.background.default,
  padding: theme.spacing(2),
  display: "flex",
  justifyContent: "center",
  alignItems: "flex-start",
}));

const ProfileCard = styled(Paper)(({ theme }) => ({
  width: "100%",
  maxWidth: 720,
  padding: theme.spacing(3),
  borderRadius: 12,
  backgroundColor: theme.palette.background.paper,
  boxShadow: "0 6px 20px rgba(0,0,0,0.08)",
}));

const Header = styled(Box)(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  justifyContent: "space-between",
  marginBottom: theme.spacing(3),
  flexWrap: "wrap",
  gap: theme.spacing(2),
}));

const UserInfo = styled(Box)(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  gap: theme.spacing(2),
}));

const FormGrid = styled(Box)(({ theme }) => ({
  display: "grid",
  gridTemplateColumns: "1fr 1fr",
  gap: theme.spacing(2),
  marginTop: theme.spacing(2),

  [theme.breakpoints.down("sm")]: {
    gridTemplateColumns: "1fr",
  },
}));

const Actions = styled(Box)(({ theme }) => ({
  display: "flex",
  justifyContent: "flex-end",
  gap: theme.spacing(2),
  marginTop: theme.spacing(3),
  flexWrap: "wrap",
}));

/* ---------------- helpers ---------------- */

const getUserFromLocalStorage = () => {
  try {
    return JSON.parse(localStorage.getItem("user")) || {};
  } catch {
    return {};
  }
};

const buildChangedPayload = (original, updated) => {
  const payload = {};

  Object.keys(updated).forEach((key) => {
    if (updated[key] !== original[key]) {
      payload[key] = updated[key];
    }
  });

  return payload;
};

/* ---------------- component ---------------- */

export default function Profile() {
  const [isLoading, setIsLoading] = useState(false);
  const [imageFile, setImageFile] = useState(null);

  const [isEditing, setIsEditing] = useState(false);

  const [profile, setProfile] = useState(() => {
    const user = getUserFromLocalStorage();
    return {
      firstName: user.firstName || "",
      lastName: user.lastName || "",
      publicName: user.publicName || "",
      profilePic: user.profilePic || "",
    };
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setProfile((prev) => ({ ...prev, [name]: value }));
  };

  /* -------- profile image upload -------- */

  const handleImageChange = (e) => {
    const file = e.target.files?.[0];
    if (!file || !file.type.startsWith("image/")) return;

    setImageFile(file); // 🔹 keep original file for upload

    const reader = new FileReader();
    reader.onloadend = () => {
      setProfile((prev) => ({
        ...prev,
        profilePic: reader.result, // preview only
      }));
    };
    reader.readAsDataURL(file);

    e.target.value = null;
  };

  const handleSave = async () => {
    try {
      const existingUser = getUserFromLocalStorage();
      const userId = existingUser?.id;

      if (!userId) {
        console.error("User ID missing");
        return;
      }

      setIsLoading(true);

      /* ---------------- TEXT FIELD PATCH ---------------- */

      const updatedProfile = {
        firstName: profile.firstName,
        lastName: profile.lastName,
        publicName: profile.publicName,
      };

      const patchPayload = buildChangedPayload(
        {
          firstName: existingUser.firstName || "",
          lastName: existingUser.lastName || "",
          publicName: existingUser.publicName || "",
        },
        updatedProfile
      );

      if (Object.keys(patchPayload).length > 0) {
        const res = await updateUserProfile(userId, patchPayload);
      }

      /* ---------------- IMAGE UPLOAD ---------------- */

      if (imageFile) {
        await uploadProfileImage(userId, imageFile);
      }

      /* ---------------- LOCAL STORAGE SYNC ---------------- */

      const updatedUser = {
        ...existingUser,
        ...patchPayload,
        profilePic: imageFile
          ? `${import.meta.env.VITE_BLOB_URL}profile-uploads/${userId}`
          : existingUser.profilePic,
      };

      localStorage.setItem("user", JSON.stringify(updatedUser));

      /* ---------------- RESET UI ---------------- */

      setProfile({
        firstName: updatedUser.firstName || "",
        lastName: updatedUser.lastName || "",
        publicName: updatedUser.publicName || "",
        profilePic: updatedUser.profilePic || "",
      });

      setImageFile(null);
      setIsEditing(false);
    } catch (err) {
      console.error("Error updating profile", err);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      {isLoading && <Loader />}

      <PageWrapper>
        <ProfileCard>
          <Header>
            <UserInfo>
              <Avatar
                src={profile.profilePic || undefined}
                sx={{
                  width: 72,
                  height: 72,
                  bgcolor: "primary.main",
                  fontSize: "1.5rem",
                }}
              >
                {profile.firstName?.charAt(0)?.toUpperCase()}
              </Avatar>

              <Box>
                <Typography variant="subTitle">
                  {profile.firstName} {profile.lastName}
                </Typography>
                <Typography color="text.secondary">
                  Public name: {profile.publicName}
                </Typography>

                {isEditing && (
                  <Button variant="contained" component="label" sx={{ mt: 1 }}>
                    Change photo
                    <input
                      hidden
                      type="file"
                      accept="image/*"
                      onChange={handleImageChange}
                    />
                  </Button>
                )}
              </Box>
            </UserInfo>

            {!isEditing && (
              <Button
                variant="contained"
                color="primary"
                onClick={() => setIsEditing(true)}
              >
                Edit Profile
              </Button>
            )}
          </Header>

          <Typography variant="sectionTitle">Profile Details</Typography>

          <FormGrid>
            <TextField
              label="First Name"
              name="firstName"
              value={profile.firstName}
              onChange={handleChange}
              disabled={!isEditing}
              fullWidth
            />

            <TextField
              label="Last Name"
              name="lastName"
              value={profile.lastName}
              onChange={handleChange}
              disabled={!isEditing}
              fullWidth
            />

            <TextField
              label="Public Name"
              name="publicName"
              value={profile.publicName}
              onChange={handleChange}
              disabled={!isEditing}
              fullWidth
            />
          </FormGrid>

          {isEditing && (
            <Actions>
              <Button
                variant="outlined"
                color="text.secondary"
                onClick={() => setIsEditing(false)}
                disabled={isLoading}
              >
                Cancel
              </Button>
              <Button
                variant="contained"
                color="success"
                onClick={handleSave}
                disabled={isLoading}
              >
                Save Changes
              </Button>
            </Actions>
          )}
        </ProfileCard>
      </PageWrapper>
    </>
  );
}
