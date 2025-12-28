// sections/LocationSection.jsx
import { forwardRef, useImperativeHandle, useState } from "react";
import { Button, Link, Box } from "@mui/material";
import {
  SectionContainer,
  Row,
  Content,
  StyledTextField,
  SectionTitle,
} from "../CemeteryStyles";
import { useTheme } from "@emotion/react";
import BrowseLocations from "../../../common/BrowseLocations";
import LocationPinIcon from "@mui/icons-material/LocationPin";
import MapLocator from "../../../common/MapLocator";

const LocationSection = forwardRef((_, ref) => {
  const [location, setLocation] = useState("");
  const [address, setAddress] = useState("");
  const [lat, setLat] = useState("");
  const [lng, setLng] = useState("");
  const [browseLocationsOpen, setBrowseLocationsOpen] = useState(false);
  const [openMapLocator, setOpenMapLocator] = useState(false);

  const theme = useTheme();

  useImperativeHandle(ref, () => ({
    getData: () => ({
      location,
      streetAddress: address,
      latitude: lat,
      longitude: lng,
    }),
  }));

  const handleBrowseLocations = (loc) => {
    setBrowseLocationsOpen(false);
    setLocation(loc);
  };

  const handleLocationSave = ({ latitude, longitude }) => {
    setLat(latitude);
    setLng(longitude);
  };

  return (
    <SectionContainer>
      <SectionTitle variant="sectionTitle">Location</SectionTitle>

      <Row>
        <Content>
          <Box sx={{ display: "flex", gap: "8px" }}>
            <StyledTextField
              sx={{ flex: 1 }}
              size="medium"
              label="Location for search (Required)"
              value={location}
              onChange={(e) => setLocation(e.target.value)}
            />

            <Link
              component="button"
              underline="none"
              sx={{
                ml: 1,
                fontSize: "14px",
                "&:hover": { color: theme.palette.text.primary },
              }}
              onClick={() => setBrowseLocationsOpen(true)}
            >
              Browse
            </Link>
          </Box>

          <Box sx={{ display: "flex", gap: theme.spacing(1) }}>
            <Button
              variant="contained"
              size="medium"
              sx={{ mt: 2, textTransform: "uppercase" }}
              onClick={() => setOpenMapLocator(true)}
            >
              <LocationPinIcon fontSize="small" /> Set GPS and address using map
            </Button>

            <StyledTextField
              fullWidth
              multiline
              rows={2}
              size="medium"
              sx={{ mt: 2 }}
              label="Street Address"
              value={address}
              onChange={(e) => setAddress(e.target.value)}
            />
          </Box>

          <Row sx={{ marginTop: "16px" }}>
            <StyledTextField
              sx={{ flex: 1 }}
              size="medium"
              label="Latitude"
              value={lat}
              onChange={(e) => setLat(e.target.value)}
            />
            <StyledTextField
              sx={{ flex: 1 }}
              size="medium"
              label="Longitude"
              value={lng}
              onChange={(e) => setLng(e.target.value)}
            />
          </Row>
        </Content>
      </Row>
      <BrowseLocations
        open={browseLocationsOpen}
        onClose={() => setBrowseLocationsOpen(false)}
        onSelect={handleBrowseLocations}
      />
      <MapLocator
        open={openMapLocator}
        onClose={() => setOpenMapLocator(false)}
        onSave={handleLocationSave}
      />
    </SectionContainer>
  );
});

export default LocationSection;
