// LoginDialog.jsx
import { Dialog, DialogTitle, DialogContent, Button } from "@mui/material";

export default function LoginDialog({ open, onClose }) {
  return (
    <Dialog open={open} onClose={onClose} maxWidth="xs" fullWidth>
      <DialogTitle>Sign In</DialogTitle>
      <DialogContent>
        <p>Login form goes here...</p>

        <Button onClick={onClose} variant="contained" sx={{ mt: 2 }}>
          Close
        </Button>
      </DialogContent>
    </Dialog>
  );
}
