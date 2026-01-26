import { Box, TextField } from "@mui/material";
import { forwardRef, useImperativeHandle, useState } from "react";

const LifeLessonsSection = forwardRef(({ type }, ref) => {
  const isVisible = type === "livingProfile" || type === "memorial";

  const [lifeLessons, setLifeLessons] = useState("");

  useImperativeHandle(ref, () => ({
    getData: () => ({ lifeLessons }),
  }));

  if (!isVisible) return null;

  return (
    <>
      <Box>
        <TextField
          fullWidth
          multiline
          rows={4}
          label="Life Lessons / Gratitude Notes"
          value={lifeLessons}
          onChange={(e) => setLifeLessons(e.target.value)}
        />
      </Box>
    </>
  );
});

export default LifeLessonsSection;
