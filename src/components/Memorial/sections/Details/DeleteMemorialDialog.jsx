import { styled } from "@mui/material/styles";
import { Box, Typography, Button } from "@mui/material";
import { useState } from "react";
import { deleteMemorial } from "../../../../api/memorialApi";
import BaseDialog from "../../../BaseDialog";
import Loader from "../../../common/Loader";

const Content = styled(Box)(({ theme }) => ({
  padding: theme.spacing(2),
}));

const WarningText = styled(Typography)(({ theme }) => ({
  marginBottom: theme.spacing(2),
  color: theme.palette.text.secondary,
}));

export default function DeleteMemorialDialog({
  open,
  onClose,
  memorialId,
  onDeleted,
}) {
  const [loading, setLoading] = useState(false);

  const handleDelete = async () => {
    setLoading(true);

    const res = await deleteMemorial(memorialId);

    setLoading(false);

    if (res) {
      onDeleted?.();
    }
  };

  return (
    <>
      {loading && <Loader />}
      <BaseDialog
        open={open}
        onClose={onClose}
        title="Delete Memory"
        actions={
          <>
            <Button variant="outlined" onClick={onClose}>
              Cancel
            </Button>

            <Button
              variant="contained"
              color="error"
              onClick={handleDelete}
              disabled={loading}
            >
              Delete
            </Button>
          </>
        }
      >
        <Content>
          <WarningText>
            Are you sure you want to delete this memory?
          </WarningText>
        </Content>
      </BaseDialog>
    </>
  );
}
