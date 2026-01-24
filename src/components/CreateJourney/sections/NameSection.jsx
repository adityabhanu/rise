import { Box, TextField, Typography } from "@mui/material";
import { forwardRef, useImperativeHandle, useState } from "react";

const NameSection = forwardRef((_, ref) => {
  const [fullName, setFullName] = useState("");

  useImperativeHandle(ref, () => ({
    getData: () => ({ fullName }),
  }));

  return (
    <>
      <TextField
        fullWidth
        value={fullName}
        onChange={(e) => setFullName(e.target.value)}
        label="Full Name"
      />
    </>
  );
});

export default NameSection;
