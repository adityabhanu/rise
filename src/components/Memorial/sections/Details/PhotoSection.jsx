import { Box, Grid, Typography } from "@mui/material";
import { styled } from "@mui/material/styles";

const Image = styled("img")(({ theme }) => ({
  width: "100%",
  height: 180,
  objectFit: "cover",
  borderRadius: 12,
  backgroundColor: theme.palette.custom.tombstoneGray,
}));

export default function PhotoSection({ title, photos }) {
  if (!photos?.length) return null;

  return (
    <Box sx={{ mt: 5 }}>
      <Typography variant="subTitle">{title}</Typography>
      <Grid container spacing={2} sx={{ mt: 1 }}>
        {photos.map((src, i) => (
          <Grid item xs={12} sm={6} md={4} key={i}>
            <Image src={src} loading="lazy" />
          </Grid>
        ))}
      </Grid>
    </Box>
  );
}
