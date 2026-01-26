import { Box, TextField, Typography } from "@mui/material";
import { forwardRef, useImperativeHandle, useState } from "react";

const EarlyLifeSection = forwardRef(({ type }, ref) => {
  const isVisible = type === "livingProfile" || type === "memorial";

  const [data, setData] = useState({
    hometown: "",
    fatherName: "",
    motherName: "",
    background: "",
    education: "",
  });

  useImperativeHandle(ref, () => ({
    getData: () => data,
  }));

  if (!isVisible) return null;

  return (
    <>
      <Typography component="div" variant="sectionTitle" mb={2}>
        Early Life
      </Typography>

      {/* Top row: 3 fields on desktop */}
      <Box
        display="grid"
        gap={2}
        gridTemplateColumns={{
          xs: "1fr",
          sm: "repeat(3, 1fr)",
        }}
      >
        <TextField
          fullWidth
          label="Hometown"
          value={data.hometown}
          onChange={(e) => setData({ ...data, hometown: e.target.value })}
        />

        <TextField
          fullWidth
          label="Father Name"
          value={data.fatherName}
          onChange={(e) => setData({ ...data, fatherName: e.target.value })}
        />

        <TextField
          fullWidth
          label="Mother Name"
          value={data.motherName}
          onChange={(e) => setData({ ...data, motherName: e.target.value })}
        />
      </Box>

      {/* Full-width fields */}
      <Box mt={2} display="flex" flexDirection="column" gap={2}>
        <TextField
          fullWidth
          multiline
          rows={3}
          label="Family Background"
          value={data.background}
          onChange={(e) => setData({ ...data, background: e.target.value })}
        />

        <TextField
          fullWidth
          multiline
          rows={3}
          label="Schooling & Education"
          value={data.education}
          onChange={(e) => setData({ ...data, education: e.target.value })}
        />
      </Box>
    </>
  );
});

export default EarlyLifeSection;
