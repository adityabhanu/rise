// ToggleRadio.js
import React from "react";
import { styled, useTheme } from "@mui/material/styles";
import Switch from "@mui/material/Switch";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";

const StyledSwitch = styled(Switch)(({ theme }) => ({
  width: 50,
  height: 28,
  padding: 0,
  "& .MuiSwitch-switchBase": {
    padding: 2,
    "&.Mui-checked": {
      transform: "translateX(22px)",
      color: theme.palette.background.white,
      "& + .MuiSwitch-track": {
        backgroundColor: theme.palette.primary.main,
        opacity: 1,
      },
    },
  },
  "& .MuiSwitch-thumb": {
    width: 24,
    height: 24,
    boxShadow: "none",
  },
  "& .MuiSwitch-track": {
    borderRadius: 28 / 2,
    backgroundColor: theme.palette.custom.tombstoneGray,
    opacity: 1,
  },
}));

const ToggleButton = ({ label, checked, onChange, sx }) => {
  const theme = useTheme();

  return (
    <Box display="flex" alignItems="center" gap={1} sx={sx}>
      <StyledSwitch checked={checked} onChange={onChange} />
      <Typography sx={{ color: theme.palette.text.primary }}>
        {label}
      </Typography>
    </Box>
  );
};

export default ToggleButton;
