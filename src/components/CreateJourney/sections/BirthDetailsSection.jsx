import {
  Box,
  TextField,
  Typography,
  InputAdornment,
  IconButton,
} from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import { forwardRef, useImperativeHandle, useState } from "react";
import MapLocator from "../../common/MapLocator";

const BirthDetailsSection = forwardRef(({ type }, ref) => {
  const isNewBorn = type === "newBorn";
  const [data, setData] = useState({
    birthDate: "",
    birthTime: "",
    birthWeight: "",
    birthLength: "",
    hospital: "",
    doctor: "",
    birthPlace: null,
  });

  const [mapOpen, setMapOpen] = useState(false);

  const update = (key, value) => setData((prev) => ({ ...prev, [key]: value }));

  useImperativeHandle(ref, () => ({
    getData: () => data,
  }));

  // Convert lat/lng → address
  const resolveAddress = async ({ latitude, longitude }) => {
    try {
      const res = await fetch(
        `https://maps.googleapis.com/maps/api/geocode/json?latlng=${latitude},${longitude}&key=${import.meta.env.VITE_GOOGLE_MAPS_KEY}`,
      );
      const json = await res.json();

      const result = json.results?.[0];

      if (!result) return;

      const birthPlace = {
        name: result.address_components?.[0]?.long_name || null,
        latitude,
        longitude,
        address: result.formatted_address || null,
      };

      setData((prev) => ({
        ...prev,
        hospital: birthPlace.address || "",
        birthPlace,
      }));
    } catch (e) {
      console.error("Failed to resolve address", e);
    }
  };

  return (
    <>
      {isNewBorn && (
        <Typography component="div" variant="sectionTitle" mb={2}>
          Birth Details
        </Typography>
      )}

      {/* === 3-per-row grid === */}
      <Box
        display="grid"
        width="100%"
        gap={2}
        gridTemplateColumns={{
          xs: "1fr",
          sm: isNewBorn ? "repeat(3, 1fr)" : "repeat(2, 1fr)",
        }}
      >
        <TextField
          label="Birth Date"
          type="date"
          fullWidth
          InputLabelProps={{ shrink: true }}
          value={data.birthDate}
          onChange={(e) => update("birthDate", e.target.value)}
        />

        {isNewBorn && (
          <TextField
            label="Birth Time"
            type="time"
            fullWidth
            InputLabelProps={{ shrink: true }}
            value={data.birthTime}
            onChange={(e) => update("birthTime", e.target.value)}
          />
        )}

        {isNewBorn && (
          <TextField
            label="Birth Weight (kg)"
            type="number"
            fullWidth
            inputProps={{ min: 0, step: 0.1 }}
            value={data.birthWeight}
            onChange={(e) => update("birthWeight", e.target.value)}
          />
        )}

        {isNewBorn && (
          <TextField
            label="Birth Length (cm)"
            type="number"
            fullWidth
            inputProps={{ min: 0, step: 0.1 }}
            value={data.birthLength}
            onChange={(e) => update("birthLength", e.target.value)}
          />
        )}

        {/* Hospital spans full row */}
        <Box gridColumn={{ sm: isNewBorn ? "span 3" : "span 1" }}>
          <TextField
            label={isNewBorn ? "Hospital of Birth" : "Place of Birth"}
            fullWidth
            value={data.hospital}
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton onClick={() => setMapOpen(true)}>
                    <SearchIcon />
                  </IconButton>
                </InputAdornment>
              ),
            }}
            onChange={(e) => update("hospital", e.target.value)}
          />
        </Box>

        {/* Doctor spans full row */}
        {isNewBorn && (
          <Box gridColumn={{ sm: "span 3" }}>
            <TextField
              label="Doctor Name"
              fullWidth
              value={data.doctor}
              onChange={(e) => update("doctor", e.target.value)}
            />
          </Box>
        )}
      </Box>

      {/* Map Dialog */}
      <MapLocator
        open={mapOpen}
        onClose={() => setMapOpen(false)}
        onSave={resolveAddress}
      />
    </>
  );
});

export default BirthDetailsSection;
