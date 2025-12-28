// sections/SubmitSection.jsx
import { Box, Button } from "@mui/material";

export default function SubmitSection({ onSubmit }) {
  return (
    <Box textAlign="right">
      <Button
        sx={{fontWeight: 600}}
        variant="contained"
        color="primary"
        onClick={onSubmit}
      >
        Create Cemetery
      </Button>
    </Box>
  );
}
