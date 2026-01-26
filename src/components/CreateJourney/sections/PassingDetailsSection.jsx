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

const PassingDetailsSection = forwardRef(({ type }, ref) => {
  const isVisible = type === "memorial";

  const [data, setData] = useState({
    passingDate: "",
    passingPlace: null,
    cemetery: null,
    cause: "",
  });

  const [mapOpenFor, setMapOpenFor] = useState(null);
  // "passing" | "cemetery" | null

  useImperativeHandle(ref, () => ({
    getData: () => data,
  }));

  if (!isVisible) return null;

  // Resolve lat/lng → address
  const resolveAddress = async ({ latitude, longitude }) => {
    try {
      const res = await fetch(
        `https://maps.googleapis.com/maps/api/geocode/json?latlng=${latitude},${longitude}&key=${import.meta.env.VITE_GOOGLE_MAPS_KEY}`
      );
      const json = await res.json();
      const result = json.results?.[0];
      if (!result) return;

      const baseLocation = {
        name:
          result.address_components?.[0]?.long_name || null,
        address: result.formatted_address || null,
      };

      if (mapOpenFor === "passing") {
        setData((prev) => ({
          ...prev,
          passingPlace: {
            ...baseLocation,
            lat: Number(latitude),
            lon: Number(longitude),
          },
        }));
      }

      if (mapOpenFor === "cemetery") {
        setData((prev) => ({
          ...prev,
          cemetery: {
            ...baseLocation,
            latitude: Number(latitude),
            longitude: Number(longitude),
          },
        }));
      }
    } catch (e) {
      console.error("Failed to resolve address", e);
    } finally {
      setMapOpenFor(null);
    }
  };

  return (
    <>
      <Typography component="div" variant="sectionTitle" mb={2}>
        Passing Details
      </Typography>

      <Box display="flex" flexDirection="column" gap={2}>
        {/* Passing Date */}
        <TextField
          label="Passing Date"
          type="date"
          fullWidth
          InputLabelProps={{ shrink: true }}
          value={data.passingDate}
          onChange={(e) =>
            setData({ ...data, passingDate: e.target.value })
          }
        />

        {/* Place of Passing */}
        <TextField
          label="Place of Passing"
          fullWidth
          value={data.passingPlace?.address || ""}
          InputProps={{
            endAdornment: (
              <InputAdornment position="end">
                <IconButton onClick={() => setMapOpenFor("passing")}>
                  <SearchIcon />
                </IconButton>
              </InputAdornment>
            ),
          }}
          onChange={() => {}}
        />

        {/* Cemetery */}
        <TextField
          label="Search Cemetery"
          fullWidth
          value={data.cemetery?.address || ""}
          InputProps={{
            endAdornment: (
              <InputAdornment position="end">
                <IconButton onClick={() => setMapOpenFor("cemetery")}>
                  <SearchIcon />
                </IconButton>
              </InputAdornment>
            ),
          }}
          onChange={() => {}}
        />

        {/* Cause */}
        <TextField
          label="Cause of Passing"
          fullWidth
          value={data.cause}
          onChange={(e) =>
            setData({ ...data, cause: e.target.value })
          }
        />
      </Box>

      {/* Shared Map Dialog */}
      <MapLocator
        open={Boolean(mapOpenFor)}
        onClose={() => setMapOpenFor(null)}
        onSave={resolveAddress}
      />
    </>
  );
});

export default PassingDetailsSection;
