import { useState, useCallback, useEffect, useRef } from "react";
import { Box, TextField, Typography } from "@mui/material";
import { GoogleMap, Marker, useJsApiLoader } from "@react-google-maps/api";
import BaseDialog from "../BaseDialog";
import { ActionButton } from "../Memorial/sections/MemorialStyles";
import RoomIcon from "@mui/icons-material/Room";

const containerStyle = {
  width: "100%",
  height: "250px",
};

const defaultCenter = {
  lat: 28.6139,
  lng: 77.209,
};

const COORD_REGEX = /^-?\d{0,3}(\.\d{0,6})?$/;

// validation helpers
const isValidLat = (lat) => lat >= -90 && lat <= 90;
const isValidLng = (lng) => lng >= -180 && lng <= 180;

export default function MapLocator({ open, onClose }) {
  // numeric state (source of truth for map)
  const [location, setLocation] = useState(defaultCenter);

  // string state (for smooth typing)
  const [latInput, setLatInput] = useState(defaultCenter.lat.toFixed(6));
  const [lngInput, setLngInput] = useState(defaultCenter.lng.toFixed(6));

  const [locationLoaded, setLocationLoaded] = useState(false);
  const mapRef = useRef(null);

  const { isLoaded } = useJsApiLoader({
    googleMapsApiKey: import.meta.env.VITE_GOOGLE_MAPS_KEY,
  });

  // helper to sync map + inputs together
  const updateLocation = useCallback((lat, lng) => {
    setLocation({ lat, lng });
    setLatInput(lat.toFixed(6));
    setLngInput(lng.toFixed(6));
  }, []);

  // Get user's current location ONCE when dialog opens
  useEffect(() => {
    if (!open || locationLoaded) return;

    if (!navigator.geolocation) {
      setLocationLoaded(true);
      return;
    }

    navigator.geolocation.getCurrentPosition(
      (pos) => {
        updateLocation(
          Number(pos.coords.latitude.toFixed(6)),
          Number(pos.coords.longitude.toFixed(6))
        );
        setLocationLoaded(true);
      },
      () => {
        setLocationLoaded(true);
      },
      {
        enableHighAccuracy: true,
        timeout: 20000,
        maximumAge: 0,
      }
    );
  }, [open, locationLoaded, updateLocation]);

  // Fix map resize when dialog opens
  useEffect(() => {
    if (open && mapRef.current) {
      window.google.maps.event.trigger(mapRef.current, "resize");
      mapRef.current.setCenter(location);
    }
  }, [open, location]);

  const handleMapClick = useCallback(
    (e) => {
      if (!e.latLng) return;

      updateLocation(
        Number(e.latLng.lat().toFixed(6)),
        Number(e.latLng.lng().toFixed(6))
      );
    },
    [updateLocation]
  );

  const handleLatChange = (e) => {
    const value = e.target.value;
    if (!COORD_REGEX.test(value)) return;

    setLatInput(value);

    const lat = Number(value);
    if (!Number.isNaN(lat) && isValidLat(lat)) {
      setLocation((prev) => ({ ...prev, lat }));
    }
  };

  const handleLngChange = (e) => {
    const value = e.target.value;

    if (!COORD_REGEX.test(value)) return;

    setLngInput(value);

    const lng = Number(value);
    if (!Number.isNaN(lng) && isValidLng(lng)) {
      setLocation((prev) => ({ ...prev, lng }));
    }
  };

  const handleSave = () => {
    console.log("Selected location:", location);
    onClose();
  };

  if (!isLoaded) return null;

  return (
    <BaseDialog
      open={open}
      onClose={onClose}
      maxWidth="sm"
      contentSx={{
        p: 1.25,
      }}
      actions={
        <ActionButton variant="contained" onClick={handleSave}>
          Save
        </ActionButton>
      }
    >
      <Box sx={{ borderRadius: 1, overflow: "hidden" }}>
        <GoogleMap
          mapContainerStyle={containerStyle}
          center={location}
          zoom={14}
          onLoad={(map) => (mapRef.current = map)}
          onClick={handleMapClick}
          options={{
            draggableCursor:
              "url(https://maps.gstatic.com/mapfiles/api-3/images/spotlight-poi2.png) 12 24, auto",
            draggingCursor: "grabbing",
          }}
        >
          <Marker position={location} />
        </GoogleMap>

        <Typography
          sx={{
            mt: 0.5,
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            gap: 0.5,
            textAlign: "center",
          }}
        >
          <RoomIcon fontSize="small" />
          Place the pin on the map or enter coordinates
        </Typography>

        <Box sx={{ display: "flex", gap: 1, mt: 1.25 }}>
          <TextField
            label="Latitude"
            size="small"
            fullWidth
            value={latInput}
            onChange={handleLatChange}
          />

          <TextField
            label="Longitude"
            size="small"
            fullWidth
            value={lngInput}
            onChange={handleLngChange}
          />
        </Box>
      </Box>
    </BaseDialog>
  );
}
