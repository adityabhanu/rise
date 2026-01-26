import {
  Box,
  TextField,
  Typography,
  IconButton,
  MenuItem,
} from "@mui/material";
import { forwardRef, useImperativeHandle, useState } from "react";
import AddIcon from "@mui/icons-material/Add";
import DeleteIcon from "@mui/icons-material/Delete";

/* ---------- relationship options ---------- */
const CHILD_RELATIONSHIPS = [
  "Son",
  "Daughter",
  "Adopted Son",
  "Adopted Daughter",
  "Other",
];

const GRANDCHILD_RELATIONSHIPS = [
  "Grandson",
  "Granddaughter",
  "Adopted Grandchild",
  "Other",
];

const SIBLING_RELATIONSHIPS = [
  "Brother",
  "Sister",
  "Step Brother",
  "Step Sister",
  "Half Brother",
  "Half Sister",
  "Other",
];

/* ---------- reusable list ---------- */
const DynamicList = ({ title, items, setItems, relationshipOptions }) => {
  const addItem = () =>
    setItems((prev) => [...prev, { name: "", relationship: "" }]);

  const updateItem = (index, key, value) => {
    setItems((prev) =>
      prev.map((item, i) =>
        i === index ? { ...item, [key]: value } : item
      )
    );
  };

  const removeItem = (index) =>
    setItems((prev) => prev.filter((_, i) => i !== index));

  return (
    <Box mt={3}>
      <Box display="flex" justifyContent="space-between" alignItems="center">
        <Typography fontWeight={600} color="text.secondary">
          {title} {items.length > 0 && `(${items.length})`}
        </Typography>

        <IconButton onClick={addItem} color="primary">
          <AddIcon />
        </IconButton>
      </Box>

      {items.map((item, i) => (
        <Box key={i} display="flex" gap={2} mt={2} alignItems="center">
          <TextField
            label="Name"
            fullWidth
            value={item.name}
            onChange={(e) =>
              updateItem(i, "name", e.target.value)
            }
          />

          <TextField
            label="Relationship"
            select
            fullWidth
            value={item.relationship}
            onChange={(e) =>
              updateItem(i, "relationship", e.target.value)
            }
          >
            {relationshipOptions.map((opt) => (
              <MenuItem key={opt} value={opt}>
                {opt}
              </MenuItem>
            ))}
          </TextField>

          <IconButton onClick={() => removeItem(i)} color="error">
            <DeleteIcon />
          </IconButton>
        </Box>
      ))}
    </Box>
  );
};

const FamilyInformationSection = forwardRef(({ type }, ref) => {
  const isNewBorn = type === "newBorn";

  /* ---------- NEWBORN ---------- */
  const [newbornData, setNewbornData] = useState({});
  const updateNewborn = (k, v) =>
    setNewbornData((p) => ({ ...p, [k]: v }));

  /* ---------- LIVING / MEMORIAL ---------- */
  const [spouse, setSpouse] = useState({ name: "", story: "" });
  const [children, setChildren] = useState([]);
  const [grandChildren, setGrandChildren] = useState([]);
  const [siblings, setSiblings] = useState([]);

  useImperativeHandle(ref, () => ({
    getData: () => {
      if (isNewBorn) {
        return {
          parents: {
            mother: newbornData["Mother's Name"],
            father: newbornData["Father's Name"],
          },
          grandParents: {
            maternal: newbornData["Maternal Grandparents’ Names"],
            paternal: newbornData["Paternal Grandparents’ Names"],
          },
          familyPets: newbornData["Family Pet(s)"],
          familyTraditions: newbornData.familyTraditions,
        };
      }

      return {
        spouse,
        children,
        grandChildren,
        siblings,
      };
    },
  }));

  /* ================= NEWBORN UI ================= */
  if (isNewBorn) {
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
              value={newbornData[label] || ""}
              onChange={(e) =>
                updateNewborn(label, e.target.value)
              }
            />
          ))}
        </Box>

        <TextField
          fullWidth
          multiline
          rows={3}
          label="Family Traditions"
          sx={{ mt: 2 }}
          value={newbornData.familyTraditions || ""}
          onChange={(e) =>
            updateNewborn("familyTraditions", e.target.value)
          }
        />
      </>
    );
  }

  /* ================= LIVING / MEMORIAL UI ================= */
  return (
    <>
      <Typography component="div" variant="sectionTitle" mb={2}>
        Family & Relationships
      </Typography>

      <TextField
        fullWidth
        label="Spouse Name"
        value={spouse.name}
        onChange={(e) =>
          setSpouse({ ...spouse, name: e.target.value })
        }
      />

      <TextField
        fullWidth
        multiline
        rows={4}
        label="Spouse Story"
        sx={{ mt: 2 }}
        value={spouse.story}
        onChange={(e) =>
          setSpouse({ ...spouse, story: e.target.value })
        }
      />

      <DynamicList
        title="Children"
        items={children}
        setItems={setChildren}
        relationshipOptions={CHILD_RELATIONSHIPS}
      />

      <DynamicList
        title="Grandchildren"
        items={grandChildren}
        setItems={setGrandChildren}
        relationshipOptions={GRANDCHILD_RELATIONSHIPS}
      />

      <DynamicList
        title="Siblings"
        items={siblings}
        setItems={setSiblings}
        relationshipOptions={SIBLING_RELATIONSHIPS}
      />
    </>
  );
});

export default FamilyInformationSection;
