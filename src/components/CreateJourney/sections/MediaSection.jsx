import {
  Box,
  Typography,
  Button,
  IconButton,
} from "@mui/material";
import { styled } from "@mui/material/styles";
import { forwardRef, useImperativeHandle, useRef, useState } from "react";
import AddPhotoAlternateIcon from "@mui/icons-material/AddPhotoAlternate";
import ClearIcon from '@mui/icons-material/Clear';

const MAX_SIZE_MB = 5;
const MAX_FOOTPRINTS = 2;
const MAX_BABY_IMAGES = 5;

const MediaCard = styled(Box)(({ theme }) => ({
  borderRadius: 10,
  padding: theme.spacing(2),
  display: "flex",
  alignItems: "center",
  justifyContent: "space-between",
  cursor: "pointer",
  border: `1px dashed ${theme.palette.divider}`,

  "&:hover": {
    background: theme.palette.background.default,
  },
}));

const MediaInfo = styled(Box)({
  display: "flex",
  alignItems: "center",
  gap: 10,
});

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

  "& img": {
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

const MediaSection = forwardRef((_, ref) => {
  const [footprints, setFootprints] = useState([]);
  const [babyImages, setBabyImages] = useState([]);

  const footprintsInputRef = useRef(null);
  const babyImagesInputRef = useRef(null);

  useImperativeHandle(ref, () => ({
    getData: () => ({
      footprints: footprints.map((i) => i.file),
      photos: babyImages.map((i) => i.file),
    }),
  }));

  const validateFiles = (files, existingCount, maxCount) => {
    const valid = [];

    for (const file of files) {
      if (file.size > MAX_SIZE_MB * 1024 * 1024) {
        alert(`${file.name} exceeds 5MB`);
        continue;
      }

      if (existingCount + valid.length >= maxCount) {
        alert(`Maximum ${maxCount} images allowed`);
        break;
      }

      valid.push({
        file,
        preview: URL.createObjectURL(file),
        id: crypto.randomUUID(),
      });
    }

    return valid;
  };

  const handleUpload = (e, type) => {
    const files = Array.from(e.target.files);
    if (!files.length) return;

    if (type === "footprints") {
      setFootprints((prev) => [
        ...prev,
        ...validateFiles(files, prev.length, MAX_FOOTPRINTS),
      ]);
    } else {
      setBabyImages((prev) => [
        ...prev,
        ...validateFiles(files, prev.length, MAX_BABY_IMAGES),
      ]);
    }

    e.target.value = "";
  };

  const handleDelete = (type, id) => {
    const updater = type === "footprints" ? setFootprints : setBabyImages;

    updater((prev) => {
      const item = prev.find((i) => i.id === id);
      if (item) URL.revokeObjectURL(item.preview);
      return prev.filter((i) => i.id !== id);
    });
  };

  return (
    <>
      <Typography component="div" variant="sectionTitle" mb={2}>
        Media
      </Typography>

      {/* Hidden inputs */}
      <input
        ref={footprintsInputRef}
        type="file"
        accept="image/*"
        multiple
        hidden
        onChange={(e) => handleUpload(e, "footprints")}
      />
      <input
        ref={babyImagesInputRef}
        type="file"
        accept="image/*"
        multiple
        hidden
        onChange={(e) => handleUpload(e, "baby")}
      />

      {/* Footprints */}
      <MediaCard onClick={() => footprintsInputRef.current.click()}>
        <MediaInfo>
          <AddPhotoAlternateIcon />
          <Typography>
            Footprints ({footprints.length}/{MAX_FOOTPRINTS})
          </Typography>
        </MediaInfo>
        <Button size="small" disabled={footprints.length >= MAX_FOOTPRINTS}>
          Add
        </Button>
      </MediaCard>

      <PreviewGrid>
        {footprints.map((img) => (
          <PreviewItem key={img.id}>
            <img src={img.preview} alt="" />
            <DeleteBtn
              size="small"
              onClick={() => handleDelete("footprints", img.id)}
              disableRipple
              disableFocusRipple
            >
              <ClearIcon fontSize="small" />
            </DeleteBtn>
          </PreviewItem>
        ))}
      </PreviewGrid>

      <Box height={16} />

      {/* Baby Images */}
      <MediaCard onClick={() => babyImagesInputRef.current.click()}>
        <MediaInfo>
          <AddPhotoAlternateIcon />
          <Typography>
            Baby Images ({babyImages.length}/{MAX_BABY_IMAGES})
          </Typography>
        </MediaInfo>
        <Button size="small" disabled={babyImages.length >= MAX_BABY_IMAGES}>
          Add
        </Button>
      </MediaCard>

      <PreviewGrid>
        {babyImages.map((img) => (
          <PreviewItem key={img.id}>
            <img src={img.preview} alt="" />
            <DeleteBtn
              size="small"
              onClick={() => handleDelete("baby", img.id)}
              disableFocusRipple
              disableRipple
            >
              <ClearIcon fontSize="small" />
            </DeleteBtn>
          </PreviewItem>
        ))}
      </PreviewGrid>
    </>
  );
});

export default MediaSection;
