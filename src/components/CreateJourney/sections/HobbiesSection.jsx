import { Box, TextField, Typography } from "@mui/material";
import { forwardRef, useImperativeHandle, useState } from "react";

const HobbiesSection = forwardRef(({ type }, ref) => {
  const isVisible = type === "livingProfile" || type === "memorial";

  const [data, setData] = useState({
    petAnimals: "",
    familyTraditions: "",
  });

  useImperativeHandle(ref, () => ({
    getData: () => data,

    setData: (incoming) => {
    if (!incoming) {
      setData({
        petAnimals: "",
        familyTraditions: "",
      });
      return;
    }

    setData({
      petAnimals: incoming?.petAnimals || "",
      familyTraditions: incoming?.familyTraditions || "",
    });
  },
  }));

  if (!isVisible) return null;

  return (
    <>
      <Typography component="div" variant="sectionTitle" mb={2}>
        Hobbies & Interests
      </Typography>

      <Box display="flex" flexDirection="column" gap={2}>
        <TextField
          fullWidth
          multiline
          rows={3}
          label="Pets & Animals"
          value={data.petAnimals}
          onChange={(e) =>
            setData({ ...data, petAnimals: e.target.value })
          }
        />

        <TextField
          fullWidth
          multiline
          rows={3}
          label="Family Traditions"
          value={data.familyTraditions}
          onChange={(e) =>
            setData({ ...data, familyTraditions: e.target.value })
          }
        />
      </Box>
    </>
  );
});

export default HobbiesSection;
