import { useState, useEffect } from "react";
import {
  Box,
  Typography,
  TextField,
  Button,
  Autocomplete,
  CircularProgress,
} from "@mui/material";
import { styled } from "@mui/material/styles";
import { useTheme } from "@emotion/react";
import BrowseLocations from "../common/BrowseLocations";
import AddCircleIcon from "@mui/icons-material/AddCircle";
import { useNavigate } from "react-router-dom";

const PageContainer = styled(Box)(({ theme }) => ({
  width: "100%",
  display: "flex",
  flexDirection: "column",
  justifyContent: "center",
  padding: "40px 0",
  background: theme.palette.background.default,
  marginTop: 64,
  [theme.breakpoints.down("sm")]: {
    padding: "0",
  },
}));

const FormCard = styled(Box)(({ theme }) => ({
  display: "flex",
  gap: theme.spacing(2),
  borderRadius: 8,
  padding: "20px 60px",
  border: "1px solid #ddd",

  [theme.breakpoints.down("sm")]: {
    flexDirection: "column",
    width: "100%",
    padding: "16px",
    gap: theme.spacing(2),
  },
}));

const BrowseLink = styled("span")(({ theme }) => ({
  color: theme.palette.background.secondary,
  cursor: "pointer",
  fontSize: 14,
  marginTop: 4,
  display: "inline-block",
  "&:hover": {
    color: theme.palette.background.primary,
  },
}));

const ButtonsGroup = styled(Box)(({ theme }) => ({
  padding: "20px 60px",
  display: "flex",
  alignItems: "center",
  flexDirection: "column",
  gap: theme.spacing(1),
  cursor: "pointer",
  color: theme.palette.text.secondary,
  "&:hover": {
    color: theme.palette.text.primary,
  },

  [theme.breakpoints.down("sm")]: {
    padding: "16px",
  },
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

export default function SearchCemetery() {
  const [cemeteryName, setCemeteryName] = useState("");
  const [locationQuery, setLocationQuery] = useState("");
  const [locationOptions, setLocationOptions] = useState([]);
  const [loading, setLoading] = useState(false);
  const [openBrowse, setOpenBrowse] = useState(false);
  const navigate = useNavigate();

  const theme = useTheme();

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

  const handleSearchCemetry = () => {
    console.log("search cemetry");
  };

  const handleLocationSelect = () => {
    setOpenBrowse(false);
  };
  return (
    <PageContainer>
      {/* Title */}
      <Typography
        variant="subTitle"
        sx={{
          fontSize: "32px",
          color: "#4F5E45",
          mb: 2,
          display: "flex",
          justifyContent: "center",
        }}
      >
        Search Cemeteries
      </Typography>

      <FormCard>
        {/* Cemetery Name */}
        <Box sx={{ flex: 1 }}>
          <TextField
            sx={{
              width: "100%",
              minWidth: "100px",
              backgroundColor: theme.palette.background.paper,
            }}
            label="Cemetery Name"
            size="medium"
            value={cemeteryName}
            onChange={(e) => setCemeteryName(e.target.value)}
          />
        </Box>

        {/* Cemetery Location Autocomplete */}
        <Box sx={{ display: "flex", flexDirection: "column", flexGrow: 2 }}>
          <Autocomplete
            options={locationOptions}
            loading={loading}
            onInputChange={(e, value) => setLocationQuery(value)}
            noOptionsText={
              locationQuery.length < 3
                ? "Please enter at least 3 characters"
                : "No options"
            }
            renderInput={(params) => (
              <TextField
                {...params}
                sx={{ backgroundColor: theme.palette.background.paper }}
                label="Cemetery Location (City, County, State, or Country)*"
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
          <Box
            sx={{
              display: "flex",
              justifyContent: "space-between",
            }}
          >
            <BrowseLink onClick={() => setOpenBrowse(true)}>Browse</BrowseLink>
            <Typography
              sx={{ fontSize: 13, mt: 0.5, color: "#6f6f6f", textAlign: "end" }}
            >
              *Only displays locations with cemeteries
            </Typography>
          </Box>
        </Box>

        {/* Search Button */}
        <Box sx={{ mt: 1 }}>
          <Button
            variant="contained"
            sx={{
              padding: "8px 26px",
              fontWeight: 600,
              fontSize: "20px",
              boxShadow: "none",
            }}
            onClick={handleSearchCemetry}
          >
            Search
          </Button>
        </Box>
      </FormCard>
      <Box sx={{ display: "flex" }}>
        <ButtonsGroup onClick={() => navigate(`/cemetery/create`)}>
          <AddCircleIcon
            sx={{
              width: "60px",
              height: "60px",
            }}
          />
          <Typography>Add a Cemetery</Typography>
        </ButtonsGroup>
      </Box>
      <BrowseLocations
        open={openBrowse}
        onClose={() => setOpenBrowse(false)}
        onSelect={handleLocationSelect}
      />
    </PageContainer>
  );
}
