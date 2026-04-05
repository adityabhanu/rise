import { Button } from "@mui/material";
import BaseDialog from "../../../BaseDialog";

export const DeleteTimelineDialog = ({
  open,
  onClose,
  onConfirm,
  loading,
}) => {
  return (
    <BaseDialog
      open={open}
      onClose={onClose}
      title="Delete Timeline Event"
      actions={
        <>
          <Button onClick={onClose} disabled={loading}>
            Cancel
          </Button>
          <Button
            color="error"
            variant="contained"
            onClick={onConfirm}
            disabled={loading}
          >
            Delete
          </Button>
        </>
      }
    >
      Are you sure you want to delete this timeline event?
    </BaseDialog>
  );
};