// sections/DesignationsSection.jsx
import {
  Box,
  Typography,
  Grid,
  Checkbox,
  FormControlLabel,
} from "@mui/material";
import { styled } from "@mui/material/styles";
import ToggleButton from "../../common/ToggleButton";
import { useState } from "react";

const Container = styled(Box)(({ theme }) => ({
  display: "flex",
  flexDirection: "column",
  gap: theme.spacing(3),
}));

export default function DesignationsSection() {
  const [veteran, setVeteran] = useState(false);
  const [famous, setFamous] = useState(false);

  const categories = [
    "Actors",
    "Actresses",
    "Authors and Writers",
    "Educators",
    "Scientists and Inventors",
    "Politicians",
    "Sports Figures",
    "Musicians",
    "Business Magnates",
    "Explorers",
    "Magician",
    "Philanthropists",
    "Royalty",
    "US Presidents",
  ];

  return (
    <Container>
      <Typography variant="sectionTitle">Designations</Typography>

      <ToggleButton
        label="Designate this person as a veteran"
        checked={veteran}
        onChange={(e) => setVeteran(e.target.checked)}
      />

      <ToggleButton
        label="Label this person as Famous"
        checked={famous}
        onChange={(e) => setFamous(e.target.checked)}
      />

      <Typography fontWeight={600}>What was this person famous for?</Typography>

      <Grid container spacing={1}>
        {categories.map((c) => (
          <Grid item xs={12} sm={6} md={4} key={c}>
            <FormControlLabel control={<Checkbox />} label={c} />
          </Grid>
        ))}
      </Grid>
    </Container>
  );
}
