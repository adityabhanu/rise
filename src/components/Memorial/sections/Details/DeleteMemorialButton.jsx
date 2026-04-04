import { styled } from "@mui/material/styles";
import { Box, Button } from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import { useState } from "react";
import DeleteMemorialDialog from "./DeleteMemorialDialog";

const Container = styled(Box)(({ theme }) => ({
  marginTop: theme.spacing(6),
  marginBottom: theme.spacing(6),
  display: "flex",
  justifyContent: "center",
}));

export default function DeleteMemorialButton({ memorialId, onDeleted }) {
  const [open, setOpen] = useState(false);

  return (
    <>
      <Container>
        <Button
          startIcon={<DeleteIcon />}
          variant="outlined"
          color="error"
          onClick={() => setOpen(true)}
        >
          Delete Memory
        </Button>
      </Container>

      <DeleteMemorialDialog
        open={open}
        onClose={() => setOpen(false)}
        memorialId={memorialId}
        onDeleted={() => {
          setOpen(false);
          onDeleted?.();
        }}
      />
    </>
  );
}
