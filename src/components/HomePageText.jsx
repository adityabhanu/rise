import { Box, Typography } from "@mui/material";
import { useTheme } from "@mui/material/styles";

export default function HomePageText() {
  const theme = useTheme();

  return (
    <Box
      sx={{
        textAlign: "center",
        py: { xs: 6, md: 9 },
        px: 2,
        backgroundColor: theme.palette.background.default,
      }}
    >
      {/* Heading */}
      <Typography
        sx={{
          fontFamily: theme.typography.fontFamilyDisplay,
          fontSize: { xs: "1.6rem", md: "2rem" }, // 👈 larger like image
          fontWeight: 600,
          color: "text.header",
          mb: 2,
        }}
      >
        More than storage. A living story
      </Typography>

      {/* First row */}
      <Typography
        sx={{
          fontSize: "0.95rem",            // 👈 smaller, refined
          fontWeight: 400,
          color: "text.headerLight",
          letterSpacing: "0.3px",
          mb: 1.2,
        }}
      >
        Life timelines &nbsp;·&nbsp; Photos and notes &nbsp;·&nbsp; Family memories
      </Typography>

      {/* Second row */}
      <Typography
        sx={{
          fontSize: "0.85rem",            // 👈 clearly secondary
          fontWeight: 400,
          color: "text.headerLight",
          letterSpacing: "0.3px",
        }}
      >
        Family memories &nbsp;·&nbsp; Private or shared stories &nbsp;·&nbsp; A story that grows with time
      </Typography>
    </Box>
  );
}
