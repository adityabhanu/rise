import { Box, TextField, Typography } from "@mui/material";
import { forwardRef, useImperativeHandle, useState } from "react";

const CareerSection = forwardRef(({ type }, ref) => {
  const isVisible = type === "livingProfile" || type === "memorial";

  const [data, setData] = useState({
    mentors: "",
    familyRole: "",
  });

  useImperativeHandle(ref, () => ({
    getData: () => data,
    setData: (incoming) => {
    if (!incoming) {
      setData({
        mentors: "",
        familyRole: "",
      });
      return;
    }

    setData({
      mentors: incoming?.mentors || "",
      familyRole: incoming?.familyRole || "",
    });
  },
  }));

  if (!isVisible) return null;

  return (
    <>
      <Typography component="div" variant="sectionTitle" mb={2}>
        Career & Work
      </Typography>

      <Box display="flex" flexDirection="column" gap={2}>
        <TextField
          fullWidth
          multiline
          rows={3}
          label="Mentors & Influences"
          value={data.mentors}
          onChange={(e) =>
            setData({ ...data, mentors: e.target.value })
          }
        />

        <TextField
          fullWidth
          multiline
          rows={3}
          label="Family Role / Responsibilities"
          value={data.familyRole}
          onChange={(e) =>
            setData({ ...data, familyRole: e.target.value })
          }
        />
      </Box>
    </>
  );
});

export default CareerSection;
