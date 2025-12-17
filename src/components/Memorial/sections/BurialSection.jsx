import { Box, Typography, Button } from "@mui/material";
import { styled } from "@mui/material/styles";
import { useState } from "react";
import {
  SectionContainer,
  DateRow,
  NameLabel,
  NameFields,
  NameRow,
  StyledTextField,
} from "./MemorialStyles";
import { useSearchParams } from "react-router-dom";
import RoomIcon from "@mui/icons-material/Room";
import ToggleButton from "../../common/ToggleButton";
import MapLocator from "../../common/MapLocator";

const StyledBox = styled(Box)(({ theme }) => ({
  display: "flex",
  gap: "10px",
}));

const PinButton = styled(Button)(({ theme }) => ({
  backgroundColor: "#5b5b5b",
  color: "#fff",
  textTransform: "uppercase",
  fontWeight: 600,
  fontSize: "13px",
  padding: "6px 14px",
  borderRadius: "6px",
  display: "flex",
  alignItems: "center",
  gap: "6px",
  boxShadow: "none",

  "&:hover": {
    backgroundColor: "#4a4a4a",
    boxShadow: "none",
  },

  "& .MuiSvgIcon-root": {
    fontSize: "18px",
  },
}));

export default function BurialSection() {
  const [searchParams] = useSearchParams();
  const cemeteryId = searchParams.get("cemeteryId");
  const cemetryName = searchParams.get("cemetryName");

  const [inscription, setInscription] = useState("");
  const [gravesiteDetails, setGravesiteDetails] = useState("");

  const [labelType, setLabelType] = useState(null);

  const [openMapLocator, setOpenMapLocator] = useState(false);

  return (
    <>
      <SectionContainer>
        <DateRow>
          <NameLabel>Burial information</NameLabel>
          <Typography
            sx={{ fontWeight: "600", alignItems: "center" }}
            id={cemeteryId}
          >
            {cemetryName}
          </Typography>
        </DateRow>
        <DateRow>
          <NameLabel>Cemetery Plot #</NameLabel>
          <StyledTextField label="Plot Number" size="small" />
        </DateRow>
        <DateRow>
          <NameLabel>Burial Coordinates</NameLabel>
          <PinButton
            onClick={() => {
              setOpenMapLocator(true);
            }}
            variant="contained"
          >
            <RoomIcon />
            Pin on map
          </PinButton>

          <StyledTextField label="Latitude" size="small" />
          <StyledTextField label="Longitude" size="small" />
        </DateRow>
        <NameRow>
          <NameLabel>Inscription</NameLabel>
          <StyledTextField
            label="Enter the inscription here. Only include what is on a grave marker. (optional)"
            multiline
            minRows={4}
            value={inscription}
            onChange={(e) => setInscription(e.target.value)}
          />
        </NameRow>
        <NameRow>
          <NameLabel>Gravesite Details</NameLabel>
          <StyledTextField
            label="Details specific to grave marker or site (i.e. description, condition, history)"
            multiline
            minRows={4}
            value={gravesiteDetails}
            onChange={(e) => setGravesiteDetails(e.target.value)}
          />
        </NameRow>
        <NameRow>
          <NameLabel>Other options</NameLabel>
          <NameFields>
            <ToggleButton
              label="Label as a cenotaph"
              checked={labelType === "cenotaph"}
              onChange={(e) =>
                setLabelType(e.target.checked ? "cenotaph" : null)
              }
            />
            <Typography sx={{ mb: 2, fontSize: "14px", pl: "58px" }}>
              A cenotaph is a marker within a cemetery placed in honor of a
              person whose remains are elsewhere. It may also be the original
              marker for someone who has since been reinterred elsewhere.
            </Typography>
            <ToggleButton
              label="Label as a monument"
              checked={labelType === "monument"}
              onChange={(e) =>
                setLabelType(e.target.checked ? "monument" : null)
              }
            />
            <Typography sx={{ fontSize: "14px", pl: "58px" }}>
              A Monument is a marker or structure erected in honor of a group of
              people with something in common whose remains lie elsewhere. These
              structures are generally within cemeteries.
            </Typography>
          </NameFields>
        </NameRow>
      </SectionContainer>

      <MapLocator
        open={openMapLocator}
        onClose={() => setOpenMapLocator(false)}
      />
    </>
  );
}
