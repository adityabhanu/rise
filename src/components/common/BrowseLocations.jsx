import React, { useState, useEffect } from "react";
import BaseDialog from "../BaseDialog";
import { Box, Typography, Button } from "@mui/material";
import { styled, alpha } from "@mui/material/styles";
import locationsData from "../../assets/countries_data/us_data.json";
import LocationPinIcon from "@mui/icons-material/LocationPin";
import { useTheme } from "@mui/material";

const GridContainer = styled(Box)(({ theme }) => ({
  display: "grid",
  gridTemplateColumns: "1fr 1fr 1fr",
  height: 400,
  border: `1px solid ${theme.palette.divider}`,
  backgroundColor: theme.palette.background.paper,
}));

const Column = styled(Box)(({ theme }) => ({
  overflowY: "auto",
  borderRight: `1px solid ${theme.palette.divider}`,
  position: "relative",

  "&:last-of-type": {
    borderRight: "none",
  },
}));

const ColumnHeader = styled(Typography)(({ theme }) => ({
  position: "sticky",
  top: 0,
  zIndex: 1,

  padding: theme.spacing(0.75, 1),
  fontWeight: 600,
  fontSize: theme.typography.caption.fontSize,

  backgroundColor: theme.palette.background.paper,
  color: theme.palette.text.secondary,
  borderBottom: `1px solid ${theme.palette.divider}`,
}));

const Item = styled(Box, {
  shouldForwardProp: (prop) => prop !== "active",
})(({ theme, active }) => ({
  padding: theme.spacing(0.75, 1),
  cursor: "pointer",
  fontSize: theme.typography.body2.fontSize,
  color: active ? theme.palette.primary.main : theme.palette.text.primary,
  backgroundColor: active
    ? alpha(theme.palette.primary.main, 0.12)
    : "transparent",

  "&:hover": {
    backgroundColor: alpha(theme.palette.primary.main, 0.08),
  },
}));

const EmptyText = styled(Typography)(({ theme }) => ({
  padding: theme.spacing(1),
  fontSize: theme.typography.body2.fontSize,
  color: theme.palette.text.secondary,
}));

const getName = (item) => item?.names?.[0]?.name ?? "";

const BrowseLocations = ({ open, onClose }) => {
  const [selectedRegionIndex, setSelectedRegionIndex] = useState(0);
  const [selectedCountryIndex, setSelectedCountryIndex] = useState(0);
  const [selectedStateIndex, setSelectedStateIndex] = useState(0);

  const regions = locationsData?.data?.browse?.[0]?.locations ?? [];
  const countries = regions[selectedRegionIndex]?.locations ?? [];
  const states = countries[selectedCountryIndex]?.locations ?? [];

  const theme = useTheme();

  useEffect(() => {
    setSelectedCountryIndex(0);
    setSelectedStateIndex(0);
  }, [selectedRegionIndex]);

  useEffect(() => {
    setSelectedStateIndex(0);
  }, [selectedCountryIndex]);

  const handleClear = () => {
    setSelectedRegionIndex(0);
    setSelectedCountryIndex(0);
    setSelectedStateIndex(0);
  };

  const handleUseSelectedLocation = () => {
    onClose();
  };

  return (
    <BaseDialog
      open={open}
      onClose={onClose}
      title="Browse"
      maxWidth="md"
      actions={
        <Box
          sx={{
            width: "100%",
            py: 1,
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            gap: 0.5,
          }}
        >
          <Typography
            variant="body1"
            component="span"
            sx={{ display: "flex", alignItems: "center" }}
          >
            <LocationPinIcon
              sx={{ color: `${theme.palette.background.secondary}` }}
            />
            {[
              getName(regions[selectedRegionIndex]),
              getName(countries[selectedCountryIndex]),
              getName(states[selectedStateIndex]),
            ]
              .filter(Boolean)
              .join(", ")}
          </Typography>

          <Box sx={{ display: "flex", gap: "10px" }}>
            <Button variant="outlined" onClick={handleClear}>
              Clear
            </Button>
            <Button variant="contained" onClick={handleUseSelectedLocation}>
              Use Selected Location
            </Button>
          </Box>
        </Box>
      }
    >
      <GridContainer>
        {/* REGION */}
        <Column>
          <ColumnHeader>REGION</ColumnHeader>
          {regions.map((region, index) => (
            <Item
              key={region.id}
              active={index === selectedRegionIndex}
              onClick={() => setSelectedRegionIndex(index)}
            >
              {getName(region)}
            </Item>
          ))}
        </Column>

        {/* COUNTRY */}
        {regions[selectedRegionIndex]?.locations.length > 1 ? (
          <Column>
            <ColumnHeader>COUNTRY</ColumnHeader>
            {countries.map((country, index) => (
              <Item
                key={country.id}
                active={index === selectedCountryIndex}
                onClick={() => setSelectedCountryIndex(index)}
              >
                {getName(country)}
              </Item>
            ))}
          </Column>
        ) : null}

        {/* STATE */}
        {countries[selectedCountryIndex] &&
        countries[selectedCountryIndex]?.locations?.length > 1 ? (
          <Column>
            <ColumnHeader>STATE</ColumnHeader>

            {states.length === 0 && <EmptyText>No states available</EmptyText>}

            {states.map((state, index) => (
              <Item
                key={index}
                active={index === selectedStateIndex}
                onClick={() => setSelectedStateIndex(index)}
              >
                {getName(state)}
              </Item>
            ))}
          </Column>
        ) : null}
      </GridContainer>
    </BaseDialog>
  );
};

export default BrowseLocations;
