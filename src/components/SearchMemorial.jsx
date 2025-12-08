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
import BaseDialog from "./BaseDialog";

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
  const [yearBornOption, setYearBornOption] = useState("Exact");
  const [yearDiedOption, setYearDiedOption] = useState("Exact");

  const [tipsOpen, setTipsOpen] = useState(false);

  const options = [
    "Exact",
    "Before",
    "After",
    "+/- 1 year",
    "+/- 3 years",
    "+/- 5 years",
    "+/- 10 years",
    "+/- 25 years",
    "Unknown",
  ];

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
          <Row sx={{ gap: 0, mb: 2, flexWrap: "nowrap" }}>
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
                {yearBornOption}
              </DropdownButton>

              <Menu
                anchorEl={anchorEl1}
                open={Boolean(anchorEl1)}
                onClose={() => setAnchorEl1(null)}
              >
                {options.map((i) => (
                  <MenuItem
                    key={i}
                    onClick={() => {
                      setYearBornOption(i);
                      setAnchorEl1(null);
                    }}
                  >
                    {i}
                  </MenuItem>
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
                {yearDiedOption}
              </DropdownButton>

              <Menu
                anchorEl={anchorEl2}
                open={Boolean(anchorEl2)}
                onClose={() => setAnchorEl2(null)}
              >
                {options.map((i) => (
                  <MenuItem
                    key={i}
                    onClick={() => {
                      setYearDiedOption(i);
                      setAnchorEl2(null);
                    }}
                  >
                    {i}
                  </MenuItem>
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
      <BaseDialog
        open={tipsOpen}
        onClose={() => setTipsOpen(false)}
        title="Search Tips"
        maxWidth="sm"
        actions={
          <>
            <Button variant="contained" onClick={() => setTipsOpen(false)}>
              Close
            </Button>
          </>
        }
      >
        <Box sx={{ p: 1 }}>
          <ul style={{ paddingLeft: "20px", lineHeight: 1.6 }}>
            <li>
              When searching in a cemetery, use the{" "}
              <b>
                <code>?</code>
              </b>{" "}
              or{" "}
              <b>
                <code>*</code>
              </b>{" "}
              wildcards in name fields.{" "}
              <b>
                <code>?</code>
              </b>{" "}
              replaces one letter.{" "}
              <b>
                <code>*</code>
              </b>{" "}
              represents zero to many letters. <em>E.g. Sorens?n or Wil*</em>
            </li>

            <li>
              Search for an exact birth/death year or select a range, before or
              after.
            </li>

            <li>
              Select “More search options” to:
              <ul style={{ paddingLeft: "20px", marginTop: "8px" }}>
                <li>
                  Search for a memorial or contributor by <b>ID</b>.
                </li>
                <li>
                  Include the name of a <b>spouse, parent, child or sibling</b>{" "}
                  in your search.
                </li>
                <li>
                  Use partial name search or similar name spellings to catch
                  alternate spellings or broaden your search.
                </li>
                <li>
                  Narrow your results to famous, Non-Cemetery Burials, memorials
                  with or without grave photos and more.
                </li>
              </ul>
            </li>
          </ul>

          <Typography sx={{ mt: 2 }}>
            Get more help from our{" "}
            <a
              href="#"
              target="_blank"
              rel="noopener noreferrer"
            >
              Help Center
            </a>
            .
          </Typography>
        </Box>
      </BaseDialog>
    </>
  );
}
