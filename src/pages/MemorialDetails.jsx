import { Box, Typography } from "@mui/material";
import { useParams } from "react-router-dom";

export default function MemorialDetails() {
  const { id } = useParams();

  return (
    <Box sx={{ mt: "80px", px: 3 }}>
      <Typography variant="subTitle" fontWeight={600}>
        Memorial Details
      </Typography>

      <Typography sx={{ mt: 1, color: "text.gray" }}>
        Memorial ID: <strong>{id}</strong>
      </Typography>

    </Box>
  );
}
