// sections/BurialSection.jsx
import { Box, Typography, TextField, Button } from "@mui/material";
import { styled } from "@mui/material/styles";

const Container = styled(Box)(({ theme }) => ({
  display: "flex",
  flexDirection: "column",
  gap: theme.spacing(2),
}));

const Row = styled(Box)(({ theme }) => ({
  display: "flex",
  gap: theme.spacing(2),
  flexWrap: "wrap",
}));

export default function BurialSection() {
  return (
    <Container>
      <Typography variant="sectionTitle">Burial Information</Typography>

      <TextField variant="filled" fullWidth label="Cemetery Plot #" />

      <Row>
        <Button variant="contained">📍 Pin on Map</Button>
        <TextField variant="filled" label="Latitude" />
        <TextField variant="filled" label="Longitude" />
      </Row>

      <TextField
        label="Inscription"
        variant="filled"
        multiline
        minRows={3}
        fullWidth
      />

      <TextField
        label="Gravesite Details"
        variant="filled"
        multiline
        minRows={3}
        fullWidth
      />
    </Container>
  );
}
