import { Button, Box } from "@mui/material";

export default function SubmitSection({ onSubmit }) {
  return (
    <Box mt={6} display="flex" justifyContent="center">
      <Button
        variant="contained"
        size="large"
        onClick={onSubmit}
        sx={{
          width: {
            xs: "100%",
            sm: "auto",
          },
          px: 6,
          py: 1.5,
        }}
      >
        Submit
      </Button>
    </Box>
  );
}
