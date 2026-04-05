import { Box, Typography, Divider } from "@mui/material";
import { styled } from "@mui/material/styles";
import MemoryImageCarousel from "./MemoryImageCarousel";
import AudioTributeSection from "./AudioTributeSection";
import PlayArrowIcon from "@mui/icons-material/PlayArrow";
import { useState } from "react";
import IconButton from "@mui/material/IconButton";
import EditOutlinedIcon from "@mui/icons-material/EditOutlined";
import DeleteOutlinedIcon from "@mui/icons-material/DeleteOutlined";
import Loader from "../../../common/Loader";
import StatusDialog from "../../../common/StatusDialog";
import { deleteTimelineEvent } from "../../../../api/timelineApi";
import { DeleteTimelineDialog } from "./DeleteTimelineDialog";
import TimelineEventDialog from "./TimelineEventDialog";

/* ---- Timeline Video Tile ---- */

const VideoTile = styled(Box)(({ theme }) => ({
  position: "relative",
  width: "100%",
  maxWidth: 420,
  aspectRatio: "16 / 9",
  overflow: "hidden",
  cursor: "pointer",
  boxShadow: "0px 6px 18px rgba(0,0,0,0.15)",

  [theme.breakpoints.down("sm")]: {
    maxWidth: "100%",
  },
}));

const VideoPoster = styled("video")({
  width: "100%",
  height: "100%",
  objectFit: "cover",
  pointerEvents: "none",
});

const VideoOverlay = styled(Box)({
  position: "absolute",
  inset: 0,
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  background: "rgba(0,0,0,0.4)",
});

const PlayCircle = styled(Box)({
  width: 72,
  height: 72,
  borderRadius: "50%",
  background: "rgba(0,0,0,0.65)",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
});

const PlayIcon = styled(PlayArrowIcon)({
  fontSize: 44,
  color: "#fff",
  marginLeft: 4,
});

const Section = styled(Box)(({ theme }) => ({
  marginTop: theme.spacing(4),
}));

const Item = styled(Box)(({ theme }) => ({
  display: "grid",
  gridTemplateColumns: "140px 1fr",
  gap: theme.spacing(3),
  padding: theme.spacing(2, 0),

  [theme.breakpoints.down("sm")]: {
    gridTemplateColumns: "1fr",
  },
}));

const DateText = styled(Typography)(({ theme }) => ({
  fontSize: 14,
  fontWeight: 500,
  color: theme.palette.text.headerLight,
}));

const Content = styled(Box)(({ theme }) => ({
  display: "grid",
  gap: theme.spacing(1),
}));

const TitleRow = styled(Box)(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  justifyContent: "space-between",
  gap: theme.spacing(1),
}));

const Title = styled(Typography)(({ theme }) => ({
  fontWeight: 500,
  color: theme.palette.text.primary,
}));

const Description = styled(Typography)(({ theme }) => ({
  fontSize: 14,
  color: theme.palette.text.secondary,
  lineHeight: 1.6,
}));

const MediaRow = styled(Box)(({ theme }) => ({
  display: "flex",
  gap: theme.spacing(2),
  flexWrap: "wrap",
  marginTop: theme.spacing(1.5),
}));

const Video = styled("video")(({ theme }) => ({
  width: "100%",
  maxWidth: 420, // 👈 bigger, looks intentional
  height: "auto",
  borderRadius: 8,
  boxShadow: "0px 6px 18px rgba(0,0,0,0.15)",

  [theme.breakpoints.down("sm")]: {
    maxWidth: "100%", // 👈 full width on mobile
  },
}));

const Audio = styled("audio")({
  marginTop: 4,
});

const MediaContainer = styled(Box)({
  maxWidth: "100%",
  overflow: "hidden",
});

/* ---------------- Helpers ---------------- */

const safeParse = (v) => {
  try {
    return v ? JSON.parse(v) : null;
  } catch {
    return null;
  }
};

const formatDate = (d) =>
  d
    ? new Date(d).toLocaleDateString(undefined, {
        year: "numeric",
        month: "short",
        day: "numeric",
      })
    : "";

/* ---------------- Component ---------------- */

export default function TimelineSection({
  timelines = [],
  isOwner = false,
  memorialId,
}) {
  const [activeVideo, setActiveVideo] = useState(null);
  const [loading, setLoading] = useState(false);
  const [timelineList, setTimelineList] = useState(timelines);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [editingItem, setEditingItem] = useState(null);

  const [statusDialog, setStatusDialog] = useState({
    open: false,
    status: "success",
    title: "",
    message: "",
  });

  const [deleteDialog, setDeleteDialog] = useState({
    open: false,
    timelineId: null,
  });

  if (!Array.isArray(timelineList) || !timelineList.length) return null;

  const handleDeleteClick = (id) => {
    setDeleteDialog({
      open: true,
      timelineId: id,
    });
  };

  const handleConfirmDelete = async () => {
    if (!deleteDialog.timelineId) return;

    setLoading(true);

    try {
      const res = await deleteTimelineEvent(deleteDialog.timelineId);
      if (res?.error) {
        throw new Error("Delete failed");
      }

      setStatusDialog({
        open: true,
        status: "success",
        title: "Timeline Deleted",
        message: "The timeline event was deleted successfully.",
      });

      setTimelineList((prev) =>
        prev.filter((t) => t.Id !== deleteDialog.timelineId),
      );
    } catch (err) {
      setStatusDialog({
        open: true,
        status: "error",
        title: "Delete failed",
        message: "Unable to delete timeline event.",
      });
    } finally {
      setLoading(false);
      setDeleteDialog({ open: false, timelineId: null });
    }
  };

  const handleUpdateTimeline = (updatedItem) => {
    setTimelineList((prev) =>
      prev.map((t) => (t.Id === updatedItem.Id ? updatedItem : t)),
    );
  };

  return (
    <Section>
      <Typography
        variant="subTitle"
        sx={{
          color: "text.header",
          fontFamily: (theme) => theme.typography.fontFamilyDisplay,
        }}
      >
        Life Timeline
      </Typography>
      <Divider sx={{ mb: 2, mt: 1.5 }} />

      {timelineList.map((item, index) => {
        /* ---------- Parse media ---------- */
        const photos = item?.Media?.Photos || [];
        const videos = item?.Media?.Video || [];
        const voiceNotes = item?.Media?.Audio || [];

        return (
          <Box key={index}>
            <Item>
              <DateText>{formatDate(item?.Date)}</DateText>

              <Content>
                <TitleRow>
                  <Title>{item?.Title}</Title>

                  {isOwner && (
                    <Box sx={{ display: "flex", gap: 2 }}>
                      {/* Edit */}
                      <IconButton
                        size="small"
                        onClick={() => {
                          setEditingItem(item);
                          setDialogOpen(true);
                        }}
                        sx={(theme) => ({
                          width: 32,
                          height: 32,
                          borderRadius: "50%",
                          backgroundColor: theme.palette.secondary.main,
                          color: theme.palette.text.secondary,
                          "&:hover": {
                            backgroundColor: theme.palette.primary.main,
                            color: theme.palette.text.white,
                          },
                        })}
                      >
                        <EditOutlinedIcon fontSize="small" />
                      </IconButton>

                      {/* Delete */}
                      <IconButton
                        size="small"
                        onClick={() => handleDeleteClick(item?.Id)}
                        sx={(theme) => ({
                          width: 32,
                          height: 32,
                          borderRadius: "50%",
                          backgroundColor: theme.palette.secondary.main,
                          color: theme.palette.custom.red,
                          "&:hover": {
                            backgroundColor: theme.palette.custom.red,
                            color: theme.palette.text.white,
                          },
                        })}
                      >
                        <DeleteOutlinedIcon fontSize="small" />
                      </IconButton>
                    </Box>
                  )}
                </TitleRow>

                {item?.Description && (
                  <Description>{item?.Description}</Description>
                )}

                {/* Photos → reuse MemoryImageCarousel */}
                {photos.length > 0 && (
                  <MediaContainer>
                    <MemoryImageCarousel title="Memories" images={photos} />
                  </MediaContainer>
                )}

                {videos[0] && (
                  <MediaRow>
                    <VideoTile onClick={() => setActiveVideo(`${index}-video`)}>
                      {activeVideo === `${index}-video` ? (
                        <video
                          src={videos[0]}
                          controls
                          autoPlay
                          style={{
                            width: "100%",
                            height: "100%",
                            objectFit: "cover",
                          }}
                        />
                      ) : (
                        <>
                          <VideoPoster
                            src={videos[0]}
                            muted
                            preload="metadata"
                          />
                          <VideoOverlay>
                            <PlayCircle>
                              <PlayIcon />
                            </PlayCircle>
                          </VideoOverlay>
                        </>
                      )}
                    </VideoTile>
                  </MediaRow>
                )}

                {/* Single Audio */}
                {voiceNotes[0] && (
                  <MediaRow sx={{ width: "100%" }}>
                    <Box sx={{ width: "100%" }}>
                      <AudioTributeSection
                        voiceNotes={voiceNotes}
                        sectionTitle=""
                      />
                    </Box>
                  </MediaRow>
                )}
              </Content>
            </Item>

            {index < timelineList.length - 1 && (
              <Divider sx={{ opacity: 0.6 }} />
            )}
          </Box>
        );
      })}

      <>
        {loading && <Loader />}

        <StatusDialog
          open={statusDialog.open}
          status={statusDialog.status}
          title={statusDialog.title}
          message={statusDialog.message}
          onClose={() => setStatusDialog((prev) => ({ ...prev, open: false }))}
          onPrimaryAction={() =>
            setStatusDialog((prev) => ({ ...prev, open: false }))
          }
        />

        <DeleteTimelineDialog
          open={deleteDialog.open}
          onClose={() => setDeleteDialog({ open: false, timelineId: null })}
          onConfirm={handleConfirmDelete}
          loading={loading}
        />
      </>

      <TimelineEventDialog
        open={dialogOpen}
        onClose={() => {
          setDialogOpen(false);
          setEditingItem(null);
        }}
        memorialId={memorialId}
        initialData={editingItem}
        onSuccess={handleUpdateTimeline}
      />
    </Section>
  );
}
