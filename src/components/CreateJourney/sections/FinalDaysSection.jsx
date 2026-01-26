import { Box, TextField, Typography } from "@mui/material";
import { forwardRef, useImperativeHandle, useState } from "react";

const FinalDaysSection = forwardRef(({ type }, ref) => {
  const isVisible = type === "memorial";

  const [data, setData] = useState({
    lastDaysStory: "",
    finalWords: "",
    funeralDetails: "",
    obituary: "",
    prayers: "",
  });

  useImperativeHandle(ref, () => ({
    getData: () => data,
  }));

  if (!isVisible) return null;

  return (
    <>
      <Typography component="div" variant="sectionTitle" mb={2}>
        Final Days & Memories
      </Typography>

      <Box display="flex" flexDirection="column" gap={2}>
        <TextField
          fullWidth
          multiline
          rows={4}
          label="Last Days Story"
          value={data.lastDaysStory}
          onChange={(e) =>
            setData({ ...data, lastDaysStory: e.target.value })
          }
        />

        <TextField
          fullWidth
          multiline
          rows={3}
          label="Final Words"
          value={data.finalWords}
          onChange={(e) =>
            setData({ ...data, finalWords: e.target.value })
          }
        />

        <TextField
          fullWidth
          multiline
          rows={3}
          label="Funeral Details"
          value={data.funeralDetails}
          onChange={(e) =>
            setData({ ...data, funeralDetails: e.target.value })
          }
        />

        <TextField
          fullWidth
          multiline
          rows={4}
          label="Obituary"
          value={data.obituary}
          onChange={(e) =>
            setData({ ...data, obituary: e.target.value })
          }
        />

        <TextField
          fullWidth
          multiline
          rows={3}
          label="Prayers / Rituals"
          value={data.prayers}
          onChange={(e) =>
            setData({ ...data, prayers: e.target.value })
          }
        />
      </Box>
    </>
  );
});

export default FinalDaysSection;
