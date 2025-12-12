// sections/CloseRelativeSection.jsx
import { Box, Typography, TextField } from "@mui/material";
import ToggleButton from "../../common/ToggleButton";
import { styled } from "@mui/material/styles";
import { useState } from "react";

const Container = styled(Box)(({ theme }) => ({
  display: "flex",
  flexDirection: "column",
  gap: theme.spacing(2),
}));

const Row = styled(Box)(({ theme }) => ({
  display: "flex",
  gap: theme.spacing(2),
  flexWrap: "wrap",
}));

export default function CloseRelativeSection() {
  const [close, setClose] = useState(false);

  return (
    <Container>
      <Typography variant="sectionTitle">Are you a close relative?</Typography>

      <ToggleButton
        label="Mark as a close relative"
        checked={close}
        onChange={(e) => setClose(e.target.checked)}
      />

      {close && (
        <>
          <Row>
            <TextField fullWidth variant="filled" label="Your relationship" />
            <TextField fullWidth variant="filled" label="Other relationship" />
          </Row>

          <ToggleButton
            label="Show relationship in source information"
            checked={true}
            onChange={() => {}}
          />

          <Box
            sx={{
              border: "1px solid #ddd",
              padding: "12px",
              borderRadius: 2,
              background: "#fff",
            }}
          >
            <Typography fontSize={14}>
              Created by: <strong>test user</strong> • RELATIVE - SPOUSE/PARTNER
            </Typography>
          </Box>
        </>
      )}
    </Container>
  );
}
