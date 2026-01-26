import { Box, Typography, TextField } from "@mui/material";
import { styled } from "@mui/material/styles";
import { forwardRef, useImperativeHandle, useState } from "react";

const SectionCard = styled(Box)(({ theme }) => ({
  padding: theme.spacing(3),
}));

const ParentsThoughtsSection = forwardRef((_, ref) => {
  const [feltWhenFound, setFeltWhenFound] = useState("");
  const [firstHeld, setFirstHeld] = useState("");
  const [fears, setFears] = useState("");
  const [biggestWish, setBiggestWish] = useState("");

  useImperativeHandle(ref, () => ({
    getData: () => ({
      feltWhenFound,
      firstHeld,
      fears,
      biggestWish,
    }),
  }));

  return (
    <>
      <Typography component="div" variant="sectionTitle">
        Parents’ Thoughts & Feelings
      </Typography>

      <SectionCard>
        <TextField
          fullWidth
          multiline
          rows={4}
          label="What we felt when we found out about you"
          placeholder="Joy, fear, surprise, excitement..."
          value={feltWhenFound}
          onChange={(e) => setFeltWhenFound(e.target.value)}
        />

        <TextField
          fullWidth
          multiline
          rows={4}
          sx={{ mt: 2 }}
          label="What we felt when we first held you"
          placeholder="Describe the unforgettable moment..."
          value={firstHeld}
          onChange={(e) => setFirstHeld(e.target.value)}
        />

        <TextField
          fullWidth
          multiline
          rows={4}
          sx={{ mt: 2 }}
          label="What scares us"
          placeholder="Worries, uncertainties, hopes..."
          value={fears}
          onChange={(e) => setFears(e.target.value)}
        />

        <TextField
          fullWidth
          multiline
          rows={4}
          sx={{ mt: 2 }}
          label="Our biggest wish for you"
          placeholder="Health, happiness, courage, kindness..."
          value={biggestWish}
          onChange={(e) => setBiggestWish(e.target.value)}
        />
      </SectionCard>
    </>
  );
});

export default ParentsThoughtsSection;
