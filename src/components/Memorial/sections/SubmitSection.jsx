// sections/SubmitSection.jsx
import { Box, Button } from "@mui/material";
import { styled } from "@mui/material/styles";

const Container = styled(Box)(({ theme }) => ({
  marginTop: theme.spacing(4),
  textAlign: "center",
}));

export default function SubmitSection({ onSubmit }) {
  return (
    <Container>
      <Button
        size="large"
        variant="contained"
        color="success"
        onClick={onSubmit}
      >
        Add Memorial
      </Button>
    </Container>
  );
}
