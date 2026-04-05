import {
  Box,
  IconButton,
  TextField,
  Typography,
  MenuItem,
} from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import DeleteIcon from "@mui/icons-material/Delete";
import { forwardRef, useImperativeHandle, useState } from "react";

const RELATIONSHIP_OPTIONS = [
  "Brother",
  "Sister",
  "Step Brother",
  "Step Sister",
  "Half Brother",
  "Half Sister",
  "Other",
];

const SiblingsSection = forwardRef((_, ref) => {
  const [siblings, setSiblings] = useState([]);

  const updateSibling = (index, key, value) => {
    setSiblings((prev) =>
      prev.map((sib, i) =>
        i === index ? { ...sib, [key]: value } : sib
      )
    );
  };

  const addSibling = () =>
    setSiblings((prev) => [...prev, { name: "", relationship: "" }]);

  const removeSibling = (index) =>
    setSiblings((prev) => prev.filter((_, i) => i !== index));

  useImperativeHandle(ref, () => ({
    getData: () => siblings,
    setData: (data) => {
    if (!data || !Array.isArray(data)) {
      setSiblings([]);
      return;
    }

    const normalized = data.map((sib) => ({
      name: sib?.name || "",
      relationship: sib?.relationship || "",
    }));

    setSiblings(normalized);
  },
  }));

  const count = siblings.length;

  return (
    <>
      {/* Header with conditional count */}
      <Box display="flex" justifyContent="space-between" alignItems="center">
        <Typography fontWeight={600} color="text.secondary">
          Siblings{count > 0 && ` (${count})`}
        </Typography>

        <IconButton onClick={addSibling} sx={{ color: "primary.main" }}>
          <AddIcon />
        </IconButton>
      </Box>

      {/* Rows */}
      {siblings.map((sib, i) => (
        <Box key={i} display="flex" gap={2} mt={2} alignItems="center">
          {/* Name */}
          <TextField
            label="Name"
            fullWidth
            value={sib.name}
            onChange={(e) =>
              updateSibling(i, "name", e.target.value)
            }
          />

          {/* Relationship */}
          <TextField
            label="Relationship"
            select
            fullWidth
            value={sib.relationship}
            onChange={(e) =>
              updateSibling(i, "relationship", e.target.value)
            }
          >
            {RELATIONSHIP_OPTIONS.map((option) => (
              <MenuItem key={option} value={option}>
                {option}
              </MenuItem>
            ))}
          </TextField>

          {/* Delete */}
          <IconButton onClick={() => removeSibling(i)} color="error">
            <DeleteIcon />
          </IconButton>
        </Box>
      ))}
    </>
  );
});

export default SiblingsSection;
