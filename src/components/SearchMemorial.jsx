import React, { useState } from "react";
import {
  Box,
  Button,
  Container,
  TextField,
  Menu,
  MenuItem,
  Typography,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
} from "@mui/material";
import { styled } from "@mui/material/styles";
import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";
import InfoIcon from "@mui/icons-material/Info";
import KeyboardArrowRightIcon from "@mui/icons-material/KeyboardArrowRight";
import bannerImage from "../assets/images/fg-bg-winterA.jpeg";

const ActionsRow = styled(Box)`
  display: flex;
  align-items: center;
  gap: 32px;
  color: white;
`;

const SearchTips = styled(Box)`
  display: flex;
  align-items: center;
  gap: 6px;
  cursor: pointer;
  font-size: 16px;
  font-weight: 600;

  &:hover {
    opacity: 0.85;
  }
`;

const Banner = styled(Box, {
  shouldForwardProp: (prop) => prop !== "bgImage",
})(({ bgImage }) => ({
  width: "100%",
  padding: "100px 0 80px 0",
  backgroundImage: `linear-gradient(rgba(226, 233, 200, 0.2), rgba(226, 233, 200, 0.2)), url(${bgImage})`,
  backgroundSize: "cover",
  backgroundPosition: "center",
  textAlign: "center",
  color: "white",
}));


const SearchBox = styled(Box)`
  padding: 32px;
  max-width: 1000px;
  margin: 0 auto 0 auto;
`;

const Row = styled(Box)`
  display: flex;
  gap: 12px;
  flex-wrap: wrap;
`;

const NameInput = styled(TextField)`
  flex: 1;
  min-width: 200px;

  .MuiInputBase-root {
    background: #fff;
    border-radius: 0;

    &:hover {
      background-color: #fff;
    }

    &.Mui-focused {
      background-color: #fff;
    }
  }

  &:first-of-type .MuiInputBase-root {
    border-top-left-radius: 12px;
    border-bottom-left-radius: 12px;
  }

  &:last-of-type .MuiInputBase-root {
    border-top-right-radius: 12px;
    border-bottom-right-radius: 12px;
  }

  &.firstName .MuiFilledInput-underline:before,
  &.firstName .MuiFilledInput-underline:after {
    left: 6px !important;
  }

  &.lastName .MuiFilledInput-underline:before,
  &.lastName .MuiFilledInput-underline:after {
    right: 6px !important;
  }

  &.middleName .MuiInputBase-root {
    border-left: 1px solid #d0d0d0;
    border-right: 1px solid #d0d0d0;
  }
`;

const YearContainer = styled(Box)`
  display: flex;
  flex: 1;
  min-width: 200px;
  border-radius: 12px;
  overflow: hidden;
  background: white;
  border: 1px solid #ccc;
`;

const YearInput = styled(TextField)`
  flex: 1;
  .MuiInputBase-root {
    border-radius: 0;
    background: white;
  }
`;

const DropdownButton = styled(Button)`
  width: 110px;
  border-left: 1px solid #ccc;
  border-radius: 0;
  background: #eee;

  &:hover {
    background: #ddd;
  }
`;

const LocationContainer = styled(Box)`
  display: flex;
  flex: 2;
  min-width: 300px;
  border-radius: 12px;
  overflow: hidden;
  border: 1px solid #ccc;
`;

const LocationInput = styled(TextField)`
  flex: 1;
  background: white;
  .MuiInputBase-root {
    border-radius: 0;
  }
`;

const BrowseButton = styled(Button)`
  border-radius: 0;
  width: 120px;
  background: #ddd;

  &:hover {
    background: #ccc;
  }
`;

const SearchButton = styled(Button)(({ theme }) => ({
  marginTop: 0,
  padding: "10px 20px",
  background: theme.palette.text.secondary,
  color: "white",
  fontSize: 16,
  fontWeight: 600,
  borderRadius: 12,
  boxShadow: "0px 4px 0px 0px rgba(0,0,0,0.3)",
  "&:hover": {
    background: theme.palette.text.primary,
  },
}));

const SearchTipsLink = styled(Button)`
  margin-left: 16px;
  text-transform: none;
  color: white;
`;

//
// Component
//

export default function SearchSection() {
  const [anchorEl1, setAnchorEl1] = useState(null);
  const [anchorEl2, setAnchorEl2] = useState(null);

  const [tipsOpen, setTipsOpen] = useState(false);

  return (
    <>
      {/* Banner Section */}
      <Banner bgImage={bannerImage}>
        <Typography
          variant="h3"
          fontWeight="bold"
          sx={{
            fontSize: "2rem",
            textShadow: `0 0 6px rgba(0,0,0,0.6),
  0 0 12px rgba(0,0,0,0.4),
  0 0 20px rgba(0,0,0,0.3)`,
          }}
        >
          World’s largest gravesite collection.
        </Typography>
        <Typography
          variant="h5"
          sx={{
            mt: 1,
            fontSize: "1.2rem",
            color: "#e2d264",
            fontWeight: "600",
            textShadow: `0 0 6px rgba(0,0,0,0.6),
  0 0 12px rgba(0,0,0,0.4),
  0 0 20px rgba(0,0,0,0.3)`,
          }}
        >
          Over 250 million memorials created by the community since 1995.
        </Typography>

        {/* Search Card */}
        <SearchBox>
          {/* First Row */}
          <Row sx={{ gap: 0, mb: 2 }}>
            <NameInput
              label="First Name"
              className="firstName"
              variant="filled"
            />
            <NameInput
              label="Middle Name"
              className="middleName"
              variant="filled"
            />
            <NameInput
              label="Last Name(s)"
              className="lastName"
              variant="filled"
            />
          </Row>

          {/* Year Row */}
          <Row sx={{ mb: 2 }}>
            {/* Year Born */}
            <YearContainer>
              <YearInput label="Year Born" variant="filled" type="number" />
              <DropdownButton
                onClick={(e) => setAnchorEl1(e.currentTarget)}
                endIcon={<ArrowDropDownIcon />}
              >
                Exact
              </DropdownButton>

              <Menu
                anchorEl={anchorEl1}
                open={Boolean(anchorEl1)}
                onClose={() => setAnchorEl1(null)}
              >
                {[
                  "Exact",
                  "Before",
                  "After",
                  "+/- 1 year",
                  "+/- 3 years",
                  "+/- 5 years",
                  "+/- 10 years",
                  "+/- 25 years",
                  "Unknown",
                ].map((i) => (
                  <MenuItem key={i}>{i}</MenuItem>
                ))}
              </Menu>
            </YearContainer>

            {/* Year Died */}
            <YearContainer>
              <YearInput label="Year Died" variant="filled" type="number" />
              <DropdownButton
                onClick={(e) => setAnchorEl2(e.currentTarget)}
                endIcon={<ArrowDropDownIcon />}
              >
                Exact
              </DropdownButton>

              <Menu
                anchorEl={anchorEl2}
                open={Boolean(anchorEl2)}
                onClose={() => setAnchorEl2(null)}
              >
                {[
                  "Exact",
                  "Before",
                  "After",
                  "+/- 1 year",
                  "+/- 3 years",
                  "+/- 5 years",
                  "+/- 10 years",
                  "+/- 25 years",
                  "Unknown",
                ].map((i) => (
                  <MenuItem key={i}>{i}</MenuItem>
                ))}
              </Menu>
            </YearContainer>

            {/* Location */}
            <LocationContainer>
              <LocationInput label="Cemetery Location" variant="filled" />
              <BrowseButton>Browse</BrowseButton>
            </LocationContainer>
          </Row>

          {/* Search Button Row */}
          <ActionsRow>
            <SearchButton>SEARCH</SearchButton>

            <SearchTips onClick={() => setTipsOpen(true)}>
              <InfoIcon fontSize="small" />
              Search tips
              <KeyboardArrowRightIcon fontSize="small" />
            </SearchTips>
          </ActionsRow>
        </SearchBox>
      </Banner>

      {/* POPUP: Search Tips */}
      <Dialog open={tipsOpen} onClose={() => setTipsOpen(false)}>
        <DialogTitle>Search Tips</DialogTitle>
        <DialogContent>
          <Typography>
            Add your search tips content here. You can place guidelines,
            examples, etc.
          </Typography>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setTipsOpen(false)}>Close</Button>
        </DialogActions>
      </Dialog>
    </>
  );
}
