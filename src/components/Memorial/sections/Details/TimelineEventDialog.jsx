import { useState, useRef, useEffect } from "react";
import { Box, TextField, Button, IconButton } from "@mui/material";
import BaseDialog from "../../../BaseDialog";
import AddPhotoAlternateIcon from "@mui/icons-material/AddPhotoAlternate";
import AudiotrackIcon from "@mui/icons-material/Audiotrack";
import VideoLibraryIcon from "@mui/icons-material/VideoLibrary";
import ClearIcon from "@mui/icons-material/Clear";

import Loader from "../../../common/Loader";
import StatusDialog from "../../../common/StatusDialog";
import {
  saveTimelineEvent,
  updateTimelineEvent,
  uploadTimelineMediaToBlob,
} from "../../../../api/timelineApi";

/* ---------- limits ---------- */
const PHOTO_MAX_MB = 5;
const VIDEO_MAX_MB = 10;
const AUDIO_MAX_MB = 5;

/* ---------- reusable picker with preview ---------- */
const MediaPicker = ({
  title,
  accept,
  icon,
  maxCount,
  maxSizeMB,
  files,
  setFiles,
  previewType = "image",
}) => {
  const inputRef = useRef(null);

  const validate = (file) => {
    if (file.size > maxSizeMB * 1024 * 1024) {
      alert(`${file.name} exceeds ${maxSizeMB} MB`);
      return false;
    }
    return true;
  };

  const handleSelect = (e) => {
    const selected = Array.from(e.target.files);

    const valid = [];
    for (const file of selected) {
      if (files.length + valid.length >= maxCount) break;
      if (!validate(file)) continue;

      valid.push({
        id: crypto.randomUUID(),
        file,
        preview:
          previewType === "image" || previewType === "video"
            ? URL.createObjectURL(file)
            : null,
      });
    }

    setFiles((prev) => [...prev, ...valid]);
    e.target.value = "";
  };

  const remove = (id) => {
    setFiles((prev) => {
      const item = prev.find((f) => f.id === id);
      if (item?.preview) URL.revokeObjectURL(item.preview);
      return prev.filter((f) => f.id !== id);
    });
  };

  return (
    <>
      <input
        ref={inputRef}
        type="file"
        accept={accept}
        hidden
        multiple={maxCount > 1}
        onChange={handleSelect}
      />

      <Button
        fullWidth
        variant="outlined"
        disabled={files.length >= maxCount}
        onClick={() => inputRef.current.click()}
        startIcon={icon}
        sx={{
          justifyContent: "flex-start",
          mt: 2,
          borderColor: "border.light",
          color: "text.primary",
          backgroundColor: "background.paper",
          "&.Mui-disabled": {
            borderColor: "divider",
            color: "text.disabled",
            backgroundColor: "secondary.main",
            cursor: "not-allowed",
          },
        }}
      >
        {title} ({files.length}/{maxCount})
      </Button>

      {files.length > 0 && (
        <Box sx={{ display: "flex", gap: 1.5, mt: 1.5, flexWrap: "wrap" }}>
          {files.map((item) => (
            <Box
              key={item.id}
              sx={{
                width: 80,
                height: 80,
                borderRadius: 2,
                position: "relative",
                overflow: "hidden",
                border: "1px solid",
                borderColor: "divider",
                backgroundColor: "background.paper",
              }}
            >
              {previewType === "image" && (
                <img
                  src={item.preview}
                  alt=""
                  style={{ width: "100%", height: "100%", objectFit: "cover" }}
                />
              )}

              {previewType === "video" && (
                <video
                  src={item.preview}
                  style={{ width: "100%", height: "100%", objectFit: "cover" }}
                />
              )}

              {previewType === "audio" && (
                <Box
                  height="100%"
                  display="flex"
                  alignItems="center"
                  justifyContent="center"
                >
                  <AudiotrackIcon />
                </Box>
              )}

              <IconButton
                size="small"
                onClick={() => remove(item.id)}
                sx={{
                  position: "absolute",
                  top: -8,
                  right: -8,
                  backgroundColor: "background.paper",
                }}
              >
                <ClearIcon fontSize="small" />
              </IconButton>
            </Box>
          ))}
        </Box>
      )}
    </>
  );
};

/* ===================== MAIN DIALOG ===================== */

export default function TimelineEventDialog({
  open,
  onClose,
  memorialId,
  initialData,
  onSuccess,
}) {
  const isEditMode = !!initialData;

  const [title, setTitle] = useState("");
  const [date, setDate] = useState("");
  const [description, setDescription] = useState("");

  const [photos, setPhotos] = useState([]);
  const [video, setVideo] = useState([]);
  const [audio, setAudio] = useState([]);

  const [loading, setLoading] = useState(false);
  const [statusDialog, setStatusDialog] = useState({
    open: false,
    status: "success",
    title: "",
    message: "",
  });

  useEffect(() => {
    if (!initialData) return;

    setTitle(initialData?.Title || "");
    setDate(initialData?.Date?.split("T")[0] || "");
    setDescription(initialData?.Description || "");

    setPhotos(
      (initialData?.Media?.Photos || []).map((url) => ({
        id: crypto.randomUUID(),
        file: null,
        preview: url,
      })),
    );

    setVideo(
      (initialData?.Media?.Video || []).map((url) => ({
        id: crypto.randomUUID(),
        file: null,
        preview: url,
      })),
    );

    setAudio(
      (initialData?.Media?.Audio || []).map((url) => ({
        id: crypto.randomUUID(),
        file: null,
        preview: url,
      })),
    );
  }, [initialData]);

  const handleSave = async () => {
    if (!memorialId) return;

    setLoading(true);

    try {
      let res;

      const formattedDate = new Date(date).toISOString();

      if (isEditMode) {
        // ✅ 1. Separate new vs existing
        const newPhotos = photos.filter((p) => p.file);
        const existingPhotos = photos
          .filter((p) => !p.file)
          .map((p) => p.preview);

        const newVideo = video.filter((v) => v.file);
        const existingVideo = video
          .filter((v) => !v.file)
          .map((v) => v.preview);

        const newAudio = audio.filter((a) => a.file);
        const existingAudio = audio
          .filter((a) => !a.file)
          .map((a) => a.preview);

        // ✅ 2. Upload ONLY new files
        let uploaded = { photos: [], video: [], audio: [] };

        if (newPhotos.length || newVideo.length || newAudio.length) {
          uploaded = await uploadTimelineMediaToBlob(memorialId, {
            photos: newPhotos.map((p) => p.file),
            video: newVideo.map((v) => v.file),
            audio: newAudio.map((a) => a.file),
          });
        }

        // ✅ 3. Merge existing + uploaded
        const finalMedia = {
          photos: [...existingPhotos, ...uploaded.photos],
          video: [...existingVideo, ...uploaded.video],
          audio: [...existingAudio, ...uploaded.audio],
        };

        // ✅ 4. Call API
        res = await updateTimelineEvent(initialData.Id, {
          memorialId,
          title,
          date: formattedDate,
          description,
          media: finalMedia,
        });

        // ✅ 5. Update UI
        const updatedItem = {
          ...initialData,
          Title: title,
          Date: formattedDate,
          Description: description,
          Media: {
            Photos: finalMedia.photos,
            Video: finalMedia.video,
            Audio: finalMedia.audio,
          },
        };

        onSuccess?.(updatedItem);
      } else {
        res = await saveTimelineEvent(memorialId, {
          title,
          date: formattedDate,
          description,
          mediaFiles: {
            photos: photos.map((p) => p.file),
            video: video.map((v) => v.file),
            audio: audio.map((a) => a.file),
          },
        });
      }
      if (!res || res?.error) {
        throw new Error("Timeline save failed");
      }
      setStatusDialog({
        open: true,
        status: "success",
        title: isEditMode ? "Timeline Updated" : "Timeline Added",
        message: "The timeline event was saved successfully.",
      });
    } catch (err) {
      console.error(err);

      setStatusDialog({
        open: true,
        status: "error",
        title: "Something went wrong",
        message: "We couldn’t save the timeline event. Please try again.",
      });
    } finally {
      setLoading(false);
    }
  };

  const handleDialogPrimaryAction = () => {
    setStatusDialog((prev) => ({ ...prev, open: false }));

    if (statusDialog.status === "success") {
      onClose();
    }
  };

  return (
    <>
      {loading && <Loader />}

      <StatusDialog
        open={statusDialog.open}
        status={statusDialog.status}
        title={statusDialog.title}
        message={statusDialog.message}
        onClose={() => setStatusDialog({ ...statusDialog, open: false })}
        onPrimaryAction={handleDialogPrimaryAction}
      />

      <BaseDialog
        open={open}
        onClose={onClose}
        title="Add Timeline Event"
        actions={
          <Button variant="contained" color="success" onClick={handleSave}>
            Save Event
          </Button>
        }
      >
        <Box display="grid" gap={2}>
          <TextField
            label="Event Title"
            fullWidth
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />

          <TextField
            label="Event Date"
            type="date"
            fullWidth
            InputLabelProps={{ shrink: true }}
            value={date}
            onChange={(e) => setDate(e.target.value)}
          />

          <TextField
            label="Description"
            multiline
            rows={4}
            fullWidth
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />

          <MediaPicker
            title="Photos"
            icon={<AddPhotoAlternateIcon />}
            accept="image/*"
            maxCount={5}
            maxSizeMB={PHOTO_MAX_MB}
            files={photos}
            setFiles={setPhotos}
            previewType="image"
          />

          <MediaPicker
            title="Video"
            icon={<VideoLibraryIcon />}
            accept="video/*"
            maxCount={1}
            maxSizeMB={VIDEO_MAX_MB}
            files={video}
            setFiles={setVideo}
            previewType="video"
          />

          <MediaPicker
            title="Audio"
            icon={<AudiotrackIcon />}
            accept="audio/*"
            maxCount={1}
            maxSizeMB={AUDIO_MAX_MB}
            files={audio}
            setFiles={setAudio}
            previewType="audio"
          />
        </Box>
      </BaseDialog>
    </>
  );
}
