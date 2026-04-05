import { Box, TextField, Typography } from "@mui/material";
import { forwardRef, useImperativeHandle, useState } from "react";

const PersonalitySection = forwardRef(({ type }, ref) => {
  const isVisible = type === "livingProfile" || type === "memorial";

  const [data, setData] = useState({
    appearance: "",
    identifiers: "",
    fear: "",
    wishes: "",
  });

  useImperativeHandle(ref, () => ({
    getData: () => data,
    setData: (incoming) => {
    if (!incoming) {
      setData({
        appearance: "",
        identifiers: "",
        fear: "",
        wishes: "",
      });
      return;
    }

    setData({
      appearance: incoming?.appearance || "",
      identifiers: incoming?.identifiers || "",
      fear: incoming?.fear || "",
      wishes: incoming?.wishes || "",
    });
  },
  }));

  if (!isVisible) return null;

  return (
    <>
      <Typography component="div" variant="sectionTitle" mb={2}>
        Personality
      </Typography>

      <Box display="flex" flexDirection="column" gap={2}>
        <TextField
          fullWidth
          multiline
          rows={3}
          label="Look-alike / Appearance"
          value={data.appearance}
          onChange={(e) =>
            setData({ ...data, appearance: e.target.value })
          }
        />

        <TextField
          fullWidth
          multiline
          rows={3}
          label="Birthmarks / Identifiers"
          value={data.identifiers}
          onChange={(e) =>
            setData({ ...data, identifiers: e.target.value })
          }
        />

        <TextField
          fullWidth
          multiline
          rows={3}
          label="Fears & Anxieties"
          value={data.fear}
          onChange={(e) =>
            setData({ ...data, fear: e.target.value })
          }
        />

        <TextField
          fullWidth
          multiline
          rows={3}
          label="Life Wishes / Goals"
          value={data.wishes}
          onChange={(e) =>
            setData({ ...data, wishes: e.target.value })
          }
        />
      </Box>
    </>
  );
});

export default PersonalitySection;
