import { Box, Switch, Typography } from "@mui/material";
import { styled } from "@mui/material/styles";
import LockIcon from "@mui/icons-material/Lock";
import PublicIcon from "@mui/icons-material/Public";
import { forwardRef, useImperativeHandle, useState } from "react";

const Container = styled(Box)(({ theme, isPrivate }) => ({
  border: `1px solid ${isPrivate ? theme.palette.error.main : "#555"}`,
  borderRadius: 12,
  padding: theme.spacing(2),
  display: "flex",
  alignItems: "center",
  justifyContent: "space-between",
  background: isPrivate
    ? "rgba(211, 47, 47, 0.08)"
    : theme.palette.background.default,
}));

const Left = styled(Box)({
  display: "flex",
  alignItems: "center",
  gap: "12px",
});

const PrivacySection = forwardRef((_, ref) => {
  const [isPrivate, setIsPrivate] = useState(true);

  useImperativeHandle(ref, () => ({
    getData: () => ({ isPrivate }),
  }));

  return (
    <Container isPrivate={isPrivate}>
      <Left>
        {isPrivate ? <LockIcon color="error" /> : <PublicIcon color="action" />}

        <Box>
          <Typography
            fontWeight={600}
            color={isPrivate ? "error.main" : "text.primary"}
          >
            {isPrivate ? "Private Memorial" : "Public Memorial"}
          </Typography>

          <Typography
            variant="body2"
            sx={{ color: isPrivate ? "error.main" : "text.secondary" }}
          >
            {isPrivate ? "Visible only to you" : "Visible to everyone"}
          </Typography>
        </Box>
      </Left>

      <Switch
        checked={isPrivate}
        onChange={(e) => setIsPrivate(e.target.checked)}
        color={isPrivate ? "error" : "default"}
      />
    </Container>
  );
});

export default PrivacySection;
