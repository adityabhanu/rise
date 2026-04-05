import { Box, Typography, Button, IconButton } from "@mui/material";
import { styled } from "@mui/material/styles";
import { forwardRef, useImperativeHandle, useRef, useState } from "react";
import AddPhotoAlternateIcon from "@mui/icons-material/AddPhotoAlternate";
import ClearIcon from "@mui/icons-material/Clear";
import AudiotrackIcon from "@mui/icons-material/Audiotrack";
import VideoLibraryIcon from "@mui/icons-material/VideoLibrary";
import DescriptionIcon from "@mui/icons-material/Description";

const MediaCard = styled(Box)(({ theme }) => ({
  borderRadius: 10,
  padding: theme.spacing(2),
  display: "flex",
  alignItems: "center",
  justifyContent: "space-between",
  cursor: "pointer",
  border: `1px dashed ${theme.palette.divider}`,
  marginTop: theme.spacing(2),

  "&:hover": {
    background: theme.palette.background.default,
  },
}));

const PreviewGrid = styled(Box)({
  display: "flex",
  gap: 12,
  marginTop: 8,
  flexWrap: "wrap",
});

const PreviewItem = styled(Box)(({ theme }) => ({
  position: "relative",
  width: 80,
  height: 80,
  borderRadius: 8,
  overflow: "hidden",
  border: `1px solid ${theme.palette.divider}`,

  "& img, & video": {
    width: "100%",
    height: "100%",
    objectFit: "cover",
  },
}));

const DeleteBtn = styled(IconButton)(({ theme }) => ({
  position: "absolute",
  top: -8,
  right: -8,
  background: theme.palette.background.paper,
}));

/* ---------- reusable media group ---------- */
const MediaGroup = ({
  title,
  icon,
  accept,
  maxCount,
  maxSizeMB,
  files,
  setFiles,
  previewType = "image",
}) => {
  const inputRef = useRef(null);

  const validateFiles = (selected) => {
    const valid = [];

    for (const file of selected) {
      if (file.size > maxSizeMB * 1024 * 1024) {
        alert(`${file.name} exceeds ${maxSizeMB}MB`);
        continue;
      }

      if (files.length + valid.length >= maxCount) {
        alert(`Maximum ${maxCount} files allowed`);
        break;
      }

      valid.push({
        id: crypto.randomUUID(),
        file,
        preview: previewType === "audio" ? null : URL.createObjectURL(file),
      });
    }

    return valid;
  };

  const handleUpload = (e) => {
    const selected = Array.from(e.target.files);
    if (!selected.length) return;

    setFiles((prev) => [...prev, ...validateFiles(selected)]);
    e.target.value = "";
  };

  const removeFile = (id) => {
    setFiles((prev) => {
      const item = prev.find((i) => i.id === id);
      if (item?.preview) URL.revokeObjectURL(item.preview);
      return prev.filter((i) => i.id !== id);
    });
  };

  return (
    <>
      <input
        ref={inputRef}
        type="file"
        accept={accept}
        multiple={maxCount > 1}
        hidden
        onChange={handleUpload}
      />

      <MediaCard onClick={() => inputRef.current.click()}>
        <Box display="flex" alignItems="center" gap={1}>
          {icon}
          <Typography>
            {title} ({files.length}/{maxCount})
          </Typography>
        </Box>
        <Button size="small">Add</Button>
      </MediaCard>

      <PreviewGrid>
        {files.map((item) => (
          <PreviewItem key={item.id}>
            {previewType === "image" && <img src={item.preview} alt="" />}

            {previewType === "video" && <video src={item.preview} />}

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

            {previewType === "doc" && (
              <Box
                height="100%"
                display="flex"
                alignItems="center"
                justifyContent="center"
              >
                <DescriptionIcon />
              </Box>
            )}

            <DeleteBtn size="small" onClick={() => removeFile(item.id)}>
              <ClearIcon fontSize="small" />
            </DeleteBtn>
          </PreviewItem>
        ))}
      </PreviewGrid>
    </>
  );
};

const mapUrlsToFiles = (urls = []) =>
  urls.map((url) => ({
    id: crypto.randomUUID(),
    file: url, // IMPORTANT: keep URL here
    preview: url, // show image
    isExisting: true, // 🔥 critical flag
  }));

/* ===================== MAIN SECTION ===================== */
const MediaSection = forwardRef(({ type }, ref) => {
  const isNewBorn = type === "newBorn";

  /* ---------- newborn ---------- */
  const [footprints, setFootprints] = useState([]);
  const [babyImages, setBabyImages] = useState([]);

  /* ---------- living / memorial ---------- */
  const [photos, setPhotos] = useState([]);
  const [weddingPhotos, setWeddingPhotos] = useState([]);
  const [familyPhotos, setFamilyPhotos] = useState([]);
  const [videos, setVideos] = useState([]);
  const [voiceNotes, setVoiceNotes] = useState([]);
  const [handwrittenNotes, setHandwrittenNotes] = useState([]);

  useImperativeHandle(ref, () => ({
    getData: () =>
      isNewBorn
        ? {
            footprints: footprints.map((f) => f.file),
            photos: babyImages.map((f) => f.file),
          }
        : {
            photos: photos.map((f) => f.file),
            weddingPhotos: weddingPhotos.map((f) => f.file),
            familyPhotos: familyPhotos.map((f) => f.file),
            videos: videos.map((f) => f.file),
            voiceNotes: voiceNotes.map((f) => f.file),
            handwrittenNotes: handwrittenNotes.map((f) => f.file),
          },
    setData: (incoming) => {
      if (!incoming) return;

      if (isNewBorn) {
        setFootprints(mapUrlsToFiles(incoming.footprints));
        setBabyImages(mapUrlsToFiles(incoming.photos));
      } else {
        setPhotos(mapUrlsToFiles(incoming.photos));
        setWeddingPhotos(mapUrlsToFiles(incoming.weddingPhotos));
        setFamilyPhotos(mapUrlsToFiles(incoming.familyPhotos));
        setVideos(mapUrlsToFiles(incoming.videos));
        setVoiceNotes(mapUrlsToFiles(incoming.voiceNotes));
        setHandwrittenNotes(mapUrlsToFiles(incoming.handwrittenNotes));
      }
    },
  }));

  if (isNewBorn) {
    return (
      <>
        <Typography component="div" variant="sectionTitle" mb={2}>
          Media
        </Typography>

        <MediaGroup
          title="Footprints"
          icon={<AddPhotoAlternateIcon />}
          accept="image/*"
          maxCount={2}
          maxSizeMB={5}
          files={footprints}
          setFiles={setFootprints}
        />

        <MediaGroup
          title="Baby Images"
          icon={<AddPhotoAlternateIcon />}
          accept="image/*"
          maxCount={5}
          maxSizeMB={5}
          files={babyImages}
          setFiles={setBabyImages}
        />
      </>
    );
  }

  /* ---------- living profile / memorial ---------- */
  return (
    <>
      <Typography component="div" variant="sectionTitle" mb={2}>
        Media Uploads
      </Typography>

      <MediaGroup
        title="Photos"
        icon={<AddPhotoAlternateIcon />}
        accept="image/*"
        maxCount={5}
        maxSizeMB={5}
        files={photos}
        setFiles={setPhotos}
      />

      <MediaGroup
        title="Wedding Photos"
        icon={<AddPhotoAlternateIcon />}
        accept="image/*"
        maxCount={5}
        maxSizeMB={5}
        files={weddingPhotos}
        setFiles={setWeddingPhotos}
      />

      <MediaGroup
        title="Family Photos"
        icon={<AddPhotoAlternateIcon />}
        accept="image/*"
        maxCount={5}
        maxSizeMB={5}
        files={familyPhotos}
        setFiles={setFamilyPhotos}
      />

      <MediaGroup
        title="Videos"
        icon={<VideoLibraryIcon />}
        accept="video/*"
        maxCount={5}
        maxSizeMB={10}
        files={videos}
        setFiles={setVideos}
        previewType="video"
      />

      <MediaGroup
        title="Voice Notes"
        icon={<AudiotrackIcon />}
        accept="audio/*"
        maxCount={1}
        maxSizeMB={5}
        files={voiceNotes}
        setFiles={setVoiceNotes}
        previewType="audio"
      />

      <MediaGroup
        title="Handwritten Notes"
        icon={<DescriptionIcon />}
        accept="image/*,application/pdf"
        maxCount={1}
        maxSizeMB={5}
        files={handwrittenNotes}
        setFiles={setHandwrittenNotes}
        previewType="doc"
      />
    </>
  );
});

export default MediaSection;
