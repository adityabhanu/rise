import { Box, Grid, Typography } from "@mui/material";

export default function VideoSection({ videos }) {
  if (!videos?.length) return null;

  return (
    <Box sx={{ mt: 5 }}>
      <Typography variant="subTitle">Videos</Typography>
      <Grid container spacing={2} sx={{ mt: 1 }}>
        {videos.map((src, i) => (
          <Grid item xs={12} md={6} key={i}>
            <video
              src={src}
              controls
              style={{ width: "100%", borderRadius: 12 }}
            />
          </Grid>
        ))}
      </Grid>
    </Box>
  );
}
