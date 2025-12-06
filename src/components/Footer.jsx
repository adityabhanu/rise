import { useState } from "react";
import {
  styled,
  Box,
  Container,
  Stack,
  Typography,
  Link,
  IconButton,
  Menu,
  MenuItem,
  Divider,
} from "@mui/material";

import FacebookIcon from "@mui/icons-material/Facebook";
import InstagramIcon from "@mui/icons-material/Instagram";
import XIcon from "@mui/icons-material/X";
import LanguageIcon from "@mui/icons-material/Language";
import PhoneIphoneIcon from "@mui/icons-material/PhoneIphone";
import { Link as RouterLink } from "react-router-dom";

const StyledIconButton = styled(IconButton)({
  padding: 0,
});

const StyledLink = styled(Link)(({ theme }) => ({
  color: theme.palette.text.secondary,
}));

const SocialLink = styled(Link)(({ theme }) => ({
  display: "inline-flex",
  alignItems: "center",
  gap: theme.spacing(0.5),
  color: theme.palette.text.secondary,
  textDecoration: "none",
  "&:hover": {
    textDecoration: "underline",
  },
  "& svg": {
    color: "currentColor",
  },
}));

export default function Footer() {
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);

  const handleLangClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleLangClose = () => {
    setAnchorEl(null);
  };

  return (
    <Box
      sx={{ backgroundColor: "#f7f5f0", borderTop: "1px solid #ddd" }}
    >
      <Container maxWidth="lg" sx={{ py: 3 }}>
        <Box sx={{ px: 5 }}>
          <Divider />
          <Stack
            sx={{
              display: "flex",
              "@media (max-width:768px)": {
                rowGap: "32px",
              },
            }}
          >
            {/* Top Navigation */}
            <Stack
              direction="row"
              justifyContent="center"
              spacing={4}
              sx={{ flexWrap: "wrap", py: 2, rowGap: "16px" }}
            >
              <StyledLink
                component={RouterLink}
                to="/memorial"
                underline="hover"
              >
                Memorials
              </StyledLink>
              <StyledLink
                component={RouterLink}
                to="/cemetery"
                underline="hover"
              >
                Cemeteries
              </StyledLink>{" "}
              <StyledLink href="#" underline="hover">
                Help
              </StyledLink>
              <StyledLink href="#" underline="hover">
                About
              </StyledLink>
              <StyledLink href="#" underline="hover">
                News
              </StyledLink>
              <StyledLink href="#" underline="hover">
                Forums
              </StyledLink>
              <StyledLink href="#" underline="hover">
                Store
              </StyledLink>
            </Stack>
            <Stack
              direction="row"
              justifyContent="center"
              spacing={2}
              sx={{ flexWrap: "wrap", pb: 2, rowGap: "16px" }}
            >
              <Box display="flex" gap={2}>
                <SocialLink href="https://facebook.com" target="_blank">
                  <FacebookIcon fontSize="small" />
                  <Typography variant="body2">Facebook</Typography>
                </SocialLink>
                <SocialLink href="https://twitter.com" target="_blank">
                  <XIcon fontSize="small" />
                  <Typography variant="body2">X (Twitter)</Typography>
                </SocialLink>
                <SocialLink href="https://instagram.com" target="_blank">
                  <InstagramIcon fontSize="small" />
                  <Typography variant="body2">Instagram</Typography>
                </SocialLink>
              </Box>
              <StyledLink href="#" underline="hover">
                Website Feedback
              </StyledLink>
            </Stack>
          </Stack>

          <Divider />

          {/* LANGUAGE + MOBILE */}
          <Stack
            direction="row"
            spacing={3}
            justifyContent="center"
            alignItems="center"
            sx={{ py: 2, flexWrap: "wrap" }}
          >
            {/* <Stack direction="row" spacing={1} alignItems="center">
            <LanguageIcon fontSize="small" />
            <Typography
              sx={{ cursor: "pointer", fontWeight: 600 }}
              onClick={handleLangClick}
            >
              Language: English
            </Typography>
          </Stack> */}

            <Stack direction="row" spacing={1} alignItems="center">
              <PhoneIphoneIcon fontSize="small" />
              <StyledLink href="/mobileapp" underline="hover" fontWeight={600}>
                Mobile Apps
              </StyledLink>
            </Stack>
          </Stack>

          {/* Language Menu */}
          {/* <Menu anchorEl={anchorEl} open={open} onClose={handleLangClose}>
          {[
            "English",
            "Deutsch",
            "Español",
            "Français",
            "Italiano",
            "Nederlands",
            "Português",
            "Svenska",
            "日本語"
          ].map((lang) => (
            <MenuItem key={lang} onClick={handleLangClose}>
              {lang}
            </MenuItem>
          ))}
        </Menu> */}

          {/* Bottom Legal Section */}
          <Stack
            direction="row"
            spacing={2}
            justifyContent="center"
            flexWrap="wrap"
            sx={{ py: 2, rowGap: "16px" }}
          >
            <Typography
              sx={{
                width: { xs: "100%", md: "auto" },
                textAlign: { xs: "center", md: "inherit" },
              }}
            >
              Copyright © {new Date().getFullYear()} Find a Grave®
            </Typography>

            <StyledLink href="#" underline="hover">
              Contact
            </StyledLink>
            <StyledLink
              href="https://www.ancestry.com/cs/legal/privacystatement"
              underline="hover"
            >
              Privacy Statement
            </StyledLink>
            <StyledLink
              href="https://www.ancestry.com/cs/legal/termsandconditions"
              underline="hover"
            >
              Terms and Conditions
            </StyledLink>
            <StyledLink
              href="https://www.ancestry.com/cs/legal/privacystatement#personal-info-categories"
              underline="hover"
            >
              CCPA Notice at Collection
            </StyledLink>
            <StyledLink href="#" underline="hover">
              Community Rules
            </StyledLink>
            <StyledLink href="#" underline="hover">
              Site Map
            </StyledLink>
          </Stack>
        </Box>
      </Container>
    </Box>
  );
}
