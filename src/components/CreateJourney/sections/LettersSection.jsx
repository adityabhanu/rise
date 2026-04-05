import { Box, Typography, TextField, Button, IconButton } from "@mui/material";
import { forwardRef, useImperativeHandle, useState } from "react";
import CloseIcon from "@mui/icons-material/Close";

const NEWBORN_ROLES = ["Mom", "Dad", "Grandparents"];

const OTHER_ROLES = ["Spouse", "Children", "Grandchildren", "Unsaid Words"];

const LettersSection = forwardRef(({ type }, ref) => {
  const isNewBorn = type === "newBorn" || type === "newborn";

  const roles = isNewBorn ? NEWBORN_ROLES : OTHER_ROLES;

  // null = not enabled, string = content
  const [letters, setLetters] = useState(
    roles.reduce((acc, role) => {
      acc[role] = null;
      return acc;
    }, {}),
  );

  useImperativeHandle(ref, () => ({
    getData: () =>
      Object.fromEntries(
        Object.entries(letters).filter(
          ([, value]) => value !== null && value.trim() !== "",
        ),
      ),
    setData: (incoming) => {
    // reset all first
    const initial = roles.reduce((acc, role) => {
      acc[role] = null;
      return acc;
    }, {});

    if (!incoming) {
      setLetters(initial);
      return;
    }

    // map incoming → enable only those present
    const mapped = { ...initial };

    Object.entries(incoming).forEach(([role, content]) => {
      if (roles.includes(role)) {
        mapped[role] = content || "";
      }
    });

    setLetters(mapped);
  },
  }));

  const enableLetter = (role) => {
    setLetters((prev) => ({ ...prev, [role]: "" }));
  };

  const disableLetter = (role) => {
    setLetters((prev) => ({ ...prev, [role]: null }));
  };

  const updateLetter = (role, value) => {
    setLetters((prev) => ({ ...prev, [role]: value }));
  };

  return (
    <>
      <Typography component="div" variant="sectionTitle" mb={2}>
        {isNewBorn ? "Letters to You" : "Letters and Messages"}
      </Typography>

      {/* Pills */}
      <Box display="flex" gap={1} flexWrap="wrap" mb={2}>
        {roles.map((role) => (
          <Button
            key={role}
            variant="outlined"
            disabled={letters[role] !== null}
            onClick={() => enableLetter(role)}
            sx={{ borderRadius: 999, textTransform: "none" }}
          >
            + From {role}
          </Button>
        ))}
      </Box>

      {/* Expanded editors */}
      {roles.map(
        (role) =>
          letters[role] !== null && (
            <Box
              key={role}
              sx={{
                mb: 2,
                p: 2,
                borderRadius: 2,
                backgroundColor: "background.paper",
              }}
            >
              <Box
                display="flex"
                justifyContent="space-between"
                alignItems="center"
              >
                <Typography fontWeight={600} color="text.secondary">
                  {isNewBorn
                    ? `Letter from ${role}`
                    : role === "Unsaid Words"
                      ? "Unsaid Words"
                      : `Letter from ${role}`}
                </Typography>

                <IconButton onClick={() => disableLetter(role)} color="error">
                  <CloseIcon />
                </IconButton>
              </Box>

              <TextField
                fullWidth
                multiline
                rows={4}
                sx={{ mt: 1 }}
                value={letters[role]}
                onChange={(e) => updateLetter(role, e.target.value)}
              />
            </Box>
          ),
      )}
    </>
  );
});

export default LettersSection;
