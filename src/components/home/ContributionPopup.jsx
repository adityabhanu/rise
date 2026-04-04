import { Dialog, Box, Typography, Button, IconButton } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import { useNavigate } from "react-router-dom";

export default function ContributionPopup({ open, onClose }) {
  const navigate = useNavigate();

  return (
    <Dialog open={open} onClose={onClose}>
      <Box sx={{ p: 3, maxWidth: 350, position: "relative" }}>
        <IconButton
          onClick={onClose}
          sx={{
            position: "absolute",
            top: 8,
            right: 8,
          }}
        >
          <CloseIcon
            fontSize="small"
          />
        </IconButton>

        <Typography fontWeight={600} mb={1}>
          Keep the memories alive ❤️
        </Typography>

        <Typography fontSize={14}>
          You haven’t added anything in the last 7 days. Add a memory, photo or
          story today.
        </Typography>

        <Button
          fullWidth
          variant="contained"
          sx={{ mt: 2 }}
          onClick={() => {
            onClose?.();
            navigate("/memorial");
          }}
        >
          Add Now
        </Button>
      </Box>
    </Dialog>
  );
}
