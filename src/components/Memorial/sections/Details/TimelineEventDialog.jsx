import { useState, useRef } from "react";
import { Box, TextField, Button, IconButton, Typography } from "@mui/material";
import BaseDialog from "../../../BaseDialog";
import AddPhotoAlternateIcon from "@mui/icons-material/AddPhotoAlternate";
import AudiotrackIcon from "@mui/icons-material/Audiotrack";
import VideoLibraryIcon from "@mui/icons-material/VideoLibrary";
import ClearIcon from "@mui/icons-material/Clear";

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
              {/* preview */}
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

              {/* remove */}
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

export default function TimelineEventDialog({ open, onClose }) {
  const [title, setTitle] = useState("");
  const [date, setDate] = useState("");
  const [description, setDescription] = useState("");

  const [photos, setPhotos] = useState([]);
  const [video, setVideo] = useState([]);
  const [audio, setAudio] = useState([]);

  const handleSave = () => {
    const payload = {
      title,
      date,
      description,
      photos: photos.map((p) => p.file),
      video: video[0]?.file || null,
      audio: audio[0]?.file || null,
    };

    console.log("Timeline Event Payload", payload);
    onClose();
  };

  return (
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
  );
}
