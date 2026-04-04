import {
  Dialog,
  Slide,
  Box,
  Typography,
  IconButton,
  Avatar,
  Button,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import PersonIcon from "@mui/icons-material/Person";
import { useNavigate } from "react-router-dom";
import { useTheme } from "@mui/material/styles";

const Transition = (props) => <Slide direction="down" {...props} />;

export default function UpcomingEventsPopup({ open, data, onClose }) {
  const navigate = useNavigate();
  const theme = useTheme();

  const getImage = (item) => {
    try {
      const media = item?.Media ? JSON.parse(item.Media) : null;
      const photos = media?.photos ? JSON.parse(media.photos) : [];
      return photos?.[0] || null;
    } catch {
      return null;
    }
  };

  return (
    <Dialog
      open={open}
      onClose={onClose}
      maxWidth="md"
      fullWidth
      TransitionComponent={Transition}
      PaperProps={{
        sx: {
          mt: "0vh",
          maxHeight: "75vh",
          borderRadius: 3,
          overflow: "hidden",
          background: theme.palette.background.paper,
          boxShadow: theme.palette.shadow.cardHover,
        },
      }}
      BackdropProps={{
        sx: {
          backdropFilter: "blur(4px)",
          backgroundColor: "rgba(0,0,0,0.2)",
        },
      }}
    >
      <Box sx={{ display: "flex", flexDirection: "column", flex: 1, minHeight: 0 }}>
        {/* Header */}
        <Box
          sx={{
            px: 3,
            py: 2,
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            background: `linear-gradient(135deg, ${theme.palette.primary.main}, ${theme.palette.primary.button})`,
            color: theme.palette.text.white,
          }}
        >
          <Typography fontWeight={600}>
            Remember Them ❤️
          </Typography>

          <IconButton onClick={onClose} sx={{ color: "inherit" }}>
            <CloseIcon />
          </IconButton>
        </Box>

        {/* Body (scrollable) */}
        <Box
          sx={{
            p: 3,
            overflowY: "auto", // ✅ scrollbar
            flex: 1,
            minHeight: 0,
          }}
        >
          <Typography
            sx={{
              mb: 2,
              color: theme.palette.text.secondary,
              fontSize: 14,
            }}
          >
            Upcoming anniversaries in the next few days
          </Typography>

          {/* List */}
          {data?.map((item) => {
            const image = getImage(item);
            const isPassed = item.ProfileType === "PASSED";

            return (
              <Box
                key={item.Id}
                sx={{
                  display: "flex",
                  alignItems: "center",
                  gap: 2,
                  p: 2,
                  mb: 2,
                  borderRadius: 2,
                  backgroundColor: theme.palette.background.paper,
                  border: `1px solid ${theme.palette.border.light}`,
                  borderLeft: `4px solid ${
                    isPassed
                      ? theme.palette.custom?.orange
                      : theme.palette.primary.main
                  }`,
                  boxShadow: theme.palette.shadow.card,
                }}
              >
                {/* Avatar */}
                <Avatar
                  src={image || undefined}
                  sx={{
                    width: 56,
                    height: 56,
                    backgroundColor: theme.palette.secondary.main,
                  }}
                >
                  {!image && <PersonIcon />}
                </Avatar>

                {/* Info */}
                <Box sx={{ flex: 1 }}>
                  <Typography fontWeight={600}>
                    {item.FullName}
                  </Typography>

                  <Typography
                    fontSize={13}
                    color={theme.palette.text.secondary}
                  >
                    {item.Message}
                  </Typography>

                  <Typography
                    fontSize={12}
                    color={theme.palette.text.disabled}
                  >
                    {new Date(item.UpcomingEventDate).toDateString()}
                  </Typography>
                </Box>

                {/* CTA (right aligned) */}
                <Button
                  variant="contained"
                  size="small"
                  sx={{
                    minWidth: 90,
                    backgroundColor: theme.palette.primary.main,
                  }}
                  onClick={() => {
                    onClose?.();
                    navigate(`/memorial/${item.Id}`);
                  }}
                >
                  View
                </Button>
              </Box>
            );
          })}
        </Box>
      </Box>
    </Dialog>
  );
}