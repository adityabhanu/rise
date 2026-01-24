import { Box, TextField, Typography } from "@mui/material";
import { forwardRef, useImperativeHandle, useState } from "react";

const FamilyInformationSection = forwardRef((_, ref) => {
  const [data, setData] = useState({});

  const update = (k, v) => setData((p) => ({ ...p, [k]: v }));

  useImperativeHandle(ref, () => ({
    getData: () => data,
  }));

  const fields = [
    "Mother's Name",
    "Father's Name",
    "Maternal Grandparents’ Names",
    "Paternal Grandparents’ Names",
    "Family Pet(s)",
  ];

  return (
    <>
      <Typography component="div" variant="sectionTitle" mb={2}>
        Family Information
      </Typography>

      {/* 2-column responsive grid */}
      <Box
        display="grid"
        gap={2}
        gridTemplateColumns={{
          xs: "1fr",
          sm: "repeat(2, 1fr)",
        }}
      >
        {fields.map((label) => (
          <TextField
            key={label}
            fullWidth
            label={label}
            value={data[label] || ""}
            onChange={(e) => update(label, e.target.value)}
          />
        ))}
      </Box>

      {/* Family Traditions – full width, bottom */}
      <TextField
        fullWidth
        multiline
        minRows={3}
        label="Family Traditions"
        sx={{ mt: 2 }}
        value={data.familyTraditions || ""}
        onChange={(e) =>
          update("familyTraditions", e.target.value)
        }
      />
    </>
  );
});

export default FamilyInformationSection;
