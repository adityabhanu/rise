import {
  GoogleMap,
  Marker,
  MarkerClusterer,
  InfoWindow,
  useJsApiLoader,
} from "@react-google-maps/api";
import { Box, Typography } from "@mui/material";
import { useTheme } from "@emotion/react";
import { useState } from "react";

/* ------------------ CONFIG ------------------ */

const containerStyle = {
  width: "100%",
  height: "500px",
};

const center = { lat: 28.6139, lng: 77.209 };

const cemeteries = [
  {
    id: 1,
    name: "St. Mary's Cemetery",
    lat: 28.63,
    lng: 77.21,
    type: "cemetery",
  },
  {
    id: 2,
    name: "Green Valley Memorial",
    lat: 28.61,
    lng: 77.24,
    type: "open_requests",
  },
  {
    id: 3,
    name: "Old Town Burial Grounds",
    lat: 28.6,
    lng: 77.18,
    type: "estimated",
  },
  {
    id: 4,
    name: "Sacred Cross Cemeteries",
    lat: 28.62,
    lng: 77.2,
    type: "multiple",
    count: 8,
  },
];

const clusterOptions = {
  imagePath:
    "https://developers.google.com/maps/documentation/javascript/examples/markerclusterer/m",
};

/* ------------------ LEGEND ------------------ */

function MapLegend() {
  return (
    <Box sx={{ display: "flex", gap: 3, mt: 2, flexWrap: "wrap" }}>
      <LegendItem color="#D2691E" label="Cemetery" />
      <LegendItem color="#6AA84F" label="Cemetery with open requests" />
      <LegendItem color="#F6B26B" label="Estimated cemetery location" dotted />
      <LegendItem color="#E69138" label="More than one cemetery" count />
    </Box>
  );
}

function LegendItem({ color, label, dotted, count }) {
  return (
    <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
      <Box
        sx={{
          width: 18,
          height: 18,
          borderRadius: "50%",
          bgcolor: color,
          border: dotted ? "2px dashed #fff" : "none",
          color: "#fff",
          fontSize: 10,
          fontWeight: 600,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        {count ? "2+" : "?"}
      </Box>
      <Typography variant="body2">{label}</Typography>
    </Box>
  );
}

/* ------------------ MAIN MAP ------------------ */

export default function CemeteryMapView() {
  const theme = useTheme();
  const [selectedCemetery, setSelectedCemetery] = useState(null);

  const { isLoaded } = useJsApiLoader({
    googleMapsApiKey: import.meta.env.VITE_GOOGLE_MAPS_KEY,
  });

  if (!isLoaded) return null;

  const getMarkerIcon = (type) => {
    const colors = {
      cemetery: "#D2691E",
      open_requests: "#6AA84F",
      estimated: "#F6B26B",
      multiple: "#E69138",
    };

    return {
      path: window.google.maps.SymbolPath.CIRCLE,
      fillColor: colors[type],
      fillOpacity: 1,
      strokeWeight: 2,
      strokeColor: "#fff",
      scale: type === "multiple" ? 14 : 10,
    };
  };

  return (
    <Box
      sx={{
        px: { xs: 1, sm: 6 },
        py: 4,
        backgroundColor: theme.palette.background.paper,
      }}
    >
      <Typography
        variant="subTitle"
        sx={{
          fontSize: "32px",
          color: "#4F5E45",
          mb: 2,
          display: "flex",
        }}
      >
        Cemeteries – Map View
      </Typography>

      <GoogleMap mapContainerStyle={containerStyle} center={center} zoom={10}>
        <MarkerClusterer options={clusterOptions}>
          {(clusterer) =>
            cemeteries.map((c) => (
              <Marker
                key={c.id}
                position={{ lat: c.lat, lng: c.lng }}
                clusterer={clusterer}
                label={
                  c.type === "multiple"
                    ? { text: String(c.count), color: "#fff" }
                    : undefined
                }
                icon={getMarkerIcon(c.type)}
                onClick={() => setSelectedCemetery(c)}
              />
            ))
          }
        </MarkerClusterer>
        {selectedCemetery && (
          <InfoWindow
            position={{
              lat: selectedCemetery.lat,
              lng: selectedCemetery.lng,
            }}
            onCloseClick={() => setSelectedCemetery(null)}
          >
            <Typography fontWeight={600}>{selectedCemetery.name}</Typography>
          </InfoWindow>
        )}
      </GoogleMap>

      <MapLegend />
    </Box>
  );
}
