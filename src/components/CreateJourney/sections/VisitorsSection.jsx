import { Box, Typography, TextField, IconButton } from "@mui/material";
import { styled } from "@mui/material/styles";
import { forwardRef, useImperativeHandle, useState } from "react";
import AddIcon from "@mui/icons-material/Add";
import RemoveCircleIcon from "@mui/icons-material/RemoveCircle";

const VisitorCard = styled(Box)(({ theme }) => ({
  borderRadius: 10,
  padding: theme.spacing(2),
}));

const VisitorsSection = forwardRef(({ type }, ref) => {
  const [visitors, setVisitors] = useState([]);
  const [firstMoment, setFirstMoment] = useState("");
  const [favorites, setFavorites] = useState("");

  const isNewBorn = type === "newBorn";

  useImperativeHandle(ref, () => ({
    getData: () => ({
      visitors,
      firstMoment,
      favorites,
    }),
    setData: (incoming) => {
    if (!incoming) return;

    setVisitors(incoming.visitors || []);
    setFirstMoment(incoming.firstMoment || "");
    setFavorites(incoming.favorites || "");
  },
    
  }));

  const addVisitor = () => {
    setVisitors((prev) => [...prev, { name: "" }]);
  };

  const removeVisitor = (index) => {
    setVisitors((prev) => prev.filter((_, i) => i !== index));
  };

  const updateVisitorName = (index, value) => {
    setVisitors((prev) =>
      prev.map((v, i) => (i === index ? { ...v, name: value } : v)),
    );
  };

  return (
    <>
      {/* Header */}
      <Box display="flex" justifyContent="space-between" alignItems="center">
        <Typography fontWeight={600} color="text.secondary">
          Visitors {visitors.length > 0 && `(${visitors.length})`}
        </Typography>

        <IconButton onClick={addVisitor} color="primary">
          <AddIcon />
        </IconButton>
      </Box>

      {visitors.map((visitor, index) => (
        <VisitorCard key={index}>
          <Box display="flex" alignItems="center" gap={2}>
            {/* Visitor name field with dynamic label */}
            <TextField
              fullWidth
              label={`Visitor ${index + 1}`}
              value={visitor.name}
              onChange={(e) => updateVisitorName(index, e.target.value)}
            />

            {/* Remove icon */}
            <IconButton color="error" onClick={() => removeVisitor(index)}>
              <RemoveCircleIcon />
            </IconButton>
          </Box>
        </VisitorCard>
      ))}

      {isNewBorn && (
        <>
          <Box mt={3}>
            <TextField
              fullWidth
              multiline
              rows={2}
              label="The moment we first saw you…"
              value={firstMoment}
              onChange={(e) => setFirstMoment(e.target.value)}
            />
          </Box>

          <Box mt={2}>
            <TextField
              fullWidth
              multiline
              rows={2}
              label="Favorite toys, songs, foods…"
              value={favorites}
              onChange={(e) => setFavorites(e.target.value)}
            />
          </Box>
        </>
      )}
    </>
  );
});

export default VisitorsSection;
