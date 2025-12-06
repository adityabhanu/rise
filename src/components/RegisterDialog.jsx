// RegisterDialog.jsx
import { Dialog, DialogTitle, DialogContent, Button } from "@mui/material";

export default function RegisterDialog({ open, onClose }) {
  return (
    <Dialog open={open} onClose={onClose} maxWidth="xs" fullWidth>
      <DialogTitle>Create an Account</DialogTitle>
      <DialogContent>
        <p>Registration form goes here...</p>

        <Button onClick={onClose} variant="contained" sx={{ mt: 2 }}>
          Close
        </Button>
      </DialogContent>
    </Dialog>
  );
}
