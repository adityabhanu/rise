import { Box, Typography, TextField, Button, IconButton } from "@mui/material";
import { forwardRef, useImperativeHandle, useState } from "react";
import CloseIcon from "@mui/icons-material/Close";

const LETTER_ROLES = ["Mom", "Dad", "Grandparents"];

const LettersSection = forwardRef((_, ref) => {
  // null = not selected, string = selected value
  const [letters, setLetters] = useState({
    Mom: null,
    Dad: null,
    Grandparents: null,
  });

  useImperativeHandle(ref, () => ({
    getData: () =>
      Object.fromEntries(
        Object.entries(letters).filter(
          ([, value]) => value !== null && value.trim() !== ""
        )
      ),
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
        Letters to You
      </Typography>

      {/* Pills */}
      <Box display="flex" gap={1} flexWrap="wrap" mb={2}>
        {LETTER_ROLES.map((role) => (
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

      {/* Expanded letters */}
      {LETTER_ROLES.map(
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
                  Letter from {role}
                </Typography>
                <IconButton onClick={() => disableLetter(role)} color="error">
                  <CloseIcon />
                </IconButton>
              </Box>

              <TextField
                fullWidth
                multiline
                minRows={4}
                sx={{ mt: 1 }}
                value={letters[role]}
                onChange={(e) => updateLetter(role, e.target.value)}
              />
            </Box>
          )
      )}
    </>
  );
});

export default LettersSection;
