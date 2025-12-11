import { useState, useEffect } from "react";
import {
  Box,
  Typography,
  TextField,
  Button,
  Checkbox,
  FormControlLabel,
  Autocomplete,
  CircularProgress,
} from "@mui/material";
import { styled } from "@mui/material/styles";

const PageContainer = styled(Box)(({ theme }) => ({
  width: "100%",
  display: "flex",
  justifyContent: "center",
  padding: "40px 0",
  background: theme.palette.background.default,
}));

const FormCard = styled(Box)(({ theme }) => ({
  background: theme.palette.background.paper,
  width: "60%",
  minWidth: 500,
  borderRadius: 8,
  padding: "40px 60px",
  border: "1px solid #ddd",
}));

const RequiredDot = styled("span")(({ theme }) => ({
  color: "red",
  marginLeft: 4,
}));

const BrowseLink = styled("span")(({ theme }) => ({
  color: theme.palette.background.secondary,
  cursor: "pointer",
  fontSize: 14,
  marginTop: 4,
  display: "inline-block",
  "&:hover": {
    color: theme.palette.background.primary,
  }
}));

// Dummy data for autocomplete
const DUMMY_LOCATIONS = [
  "New York, USA",
  "Los Angeles, USA",
  "Chicago, USA",
  "Toronto, Canada",
  "Vancouver, Canada",
  "London, UK",
  "Sydney, Australia",
  "Melbourne, Australia",
  "Berlin, Germany",
  "Paris, France",
];

export default function AddMemorialStep1() {
  const [cemeteryName, setCemeteryName] = useState("");
  const [locationQuery, setLocationQuery] = useState("");
  const [locationOptions, setLocationOptions] = useState([]);
  const [loading, setLoading] = useState(false);

  // Simulated API call on typing 3+ characters
  useEffect(() => {
    if (locationQuery.length < 3) {
      setLocationOptions([]);
      return;
    }

    setLoading(true);

    const timer = setTimeout(() => {
      const filtered = DUMMY_LOCATIONS.filter((loc) =>
        loc.toLowerCase().includes(locationQuery.toLowerCase())
      );
      setLocationOptions(filtered);
      setLoading(false);
    }, 600);

    return () => clearTimeout(timer);
  }, [locationQuery]);

  return (
    <PageContainer>
      <FormCard>
        {/* Title */}
        <Typography
          variant="subTitle"
          sx={{
            fontWeight: 600,
            color: "#4F5E45",
            mb: 2,
            display: "flex",
            justifyContent: "center",
          }}
        >
          Add a Memorial
        </Typography>

        <Typography align="center" sx={{ color: "#6f6f6f", mb: 2 }}>
          Step 1 of 2 — Memorial Location
        </Typography>

        <Typography
          align="center"
          sx={{
            color: "#6f6f6f",
            mb: 2,
            textAlign: "center",
            display: "flex",
            justifyContent: "center",
          }}
        >
          1. Choose a Cemetery
        </Typography>

        {/* Cemetery Name */}
        <Box sx={{ mb: 3 }}>
          <TextField
            label="Cemetery Name"
            fullWidth
            size="medium"
            value={cemeteryName}
            onChange={(e) => setCemeteryName(e.target.value)}
          />
        </Box>

        {/* Cemetery Location Autocomplete */}
        <Box sx={{ mb: 1 }}>
          <Typography sx={{ mb: 1 }}></Typography>

          <Autocomplete
            fullWidth
            options={locationOptions}
            loading={loading}
            onInputChange={(e, value) => setLocationQuery(value)}
            renderInput={(params) => (
              <TextField
                {...params}
                placeholder="Cemetery Location (City, County, State, or Country)*"
                InputProps={{
                  ...params.InputProps,
                  endAdornment: (
                    <>
                      {loading ? <CircularProgress size={20} /> : null}
                      {params.InputProps.endAdornment}
                    </>
                  ),
                }}
              />
            )}
          />
        </Box>
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
          }}
        >
          <BrowseLink>Browse</BrowseLink>
          <Typography sx={{ fontSize: 13, mt: 0.5, color: "#6f6f6f" }}>
            *Only displays locations with cemeteries
          </Typography>
        </Box>

        {/* Continue Button */}
        <Box sx={{ mt: 3 }}>
          <Button
            variant="contained"
            sx={{
              padding: "8px 26px",
              fontWeight: 600,
              boxShadow: "none",
            }}
          >
            Continue
          </Button>
        </Box>

        {/* Checkbox */}
        <FormControlLabel
          sx={{ mt: 2 }}
          control={<Checkbox />}
          label="Not buried in a cemetery?"
        />
      </FormCard>
    </PageContainer>
  );
}
