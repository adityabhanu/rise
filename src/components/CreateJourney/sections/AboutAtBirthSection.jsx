import { Box, Typography, TextField, Button, IconButton } from "@mui/material";
import { styled } from "@mui/material/styles";
import {
  forwardRef,
  useImperativeHandle,
  useState,
  useRef,
  useEffect,
} from "react";
import CheckIcon from "@mui/icons-material/Check";
import MicIcon from "@mui/icons-material/Mic";
import ClearIcon from "@mui/icons-material/Clear";
import PlayArrowIcon from "@mui/icons-material/PlayArrow";
import PauseIcon from "@mui/icons-material/Pause";

const MAX_VOICE_NOTE_SIZE = 5 * 1024 * 1024;

/* ---------------- Voice Note ---------------- */

const VoiceNoteContainer = styled(Box, {
  shouldForwardProp: (prop) => prop !== "selected",
})(({ theme, selected }) => ({
  marginTop: theme.spacing(2),
  padding: theme.spacing(1.5, 2),
  borderRadius: 10,
  display: "flex",
  alignItems: "center",
  gap: theme.spacing(1.5),
  cursor: "pointer",
  border: `1px solid ${
    selected ? theme.palette.primary.main : theme.palette.border.light
  }`,
  backgroundColor: selected
    ? theme.palette.secondary.main
    : theme.palette.background.paper,
  transition: "all 0.2s ease",

  "&:hover": {
    backgroundColor: theme.palette.secondary.main,
  },
}));

export function VoiceNoteRow({ value, onChange }) {
  const inputRef = useRef(null);
  const audioRef = useRef(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [previewUrl, setPreviewUrl] = useState(null);

  useEffect(() => {
    if (!value) {
      setPreviewUrl(null);
      setIsPlaying(false);
      return;
    }

    const url = URL.createObjectURL(value);
    setPreviewUrl(url);
    return () => URL.revokeObjectURL(url);
  }, [value]);

  const handleFileChange = (e) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (file.size > MAX_VOICE_NOTE_SIZE) {
      alert("Voice note must be less than 5 MB");
      e.target.value = "";
      return;
    }

    onChange?.(file);
    e.target.value = "";
  };

  const togglePlay = (e) => {
    e.stopPropagation();
    if (!audioRef.current) return;

    isPlaying ? audioRef.current.pause() : audioRef.current.play();
  };

  const clearFile = (e) => {
    e.stopPropagation();
    audioRef.current?.pause();
    setIsPlaying(false);
    onChange?.(null);
  };

  return (
    <>
      <input
        ref={inputRef}
        type="file"
        accept="audio/*"
        hidden
        onChange={handleFileChange}
      />

      <audio
        ref={audioRef}
        src={previewUrl || undefined}
        onPlay={() => setIsPlaying(true)}
        onPause={() => setIsPlaying(false)}
        onEnded={() => setIsPlaying(false)}
      />

      <VoiceNoteContainer
        selected={!!value}
        onClick={() => !value && inputRef.current?.click()}
      >
        <IconButton size="small" onClick={value ? togglePlay : undefined}>
          {value ? (isPlaying ? <PauseIcon /> : <PlayArrowIcon />) : <MicIcon />}
        </IconButton>

        <Typography
          flex={1}
          fontWeight={500}
          color={value ? "text.header" : "text.secondary"}
          noWrap
        >
          {value?.name || "Add Voice Note"}
        </Typography>

        {value && (
          <IconButton size="small" onClick={clearFile}>
            <ClearIcon fontSize="small" />
          </IconButton>
        )}
      </VoiceNoteContainer>
    </>
  );
}

/* ---------------- Section Layout ---------------- */

const SectionCard = styled(Box)(({ theme }) => ({
  padding: theme.spacing(3),
  backgroundColor: theme.palette.background.paper,
  borderRadius: 12,
}));

const OptionGrid = styled(Box)(({ theme }) => ({
  display: "flex",
  flexWrap: "wrap",
  gap: theme.spacing(1),
  marginTop: theme.spacing(1),
}));

const OptionButton = styled(Button, {
  shouldForwardProp: (prop) => prop !== "selected",
})(({ theme, selected }) => ({
  borderRadius: 20,
  padding: "6px 14px",
  fontSize: 14,
  textTransform: "none",
  border: `1px solid ${
    selected ? theme.palette.primary.main : theme.palette.border.light
  }`,
  backgroundColor: selected
    ? theme.palette.secondary.main
    : theme.palette.background.paper,
  color: selected ? theme.palette.text.header : theme.palette.text.secondary,

  "&:hover": {
    backgroundColor: theme.palette.secondary.main,
  },
}));

/* ---------------- Constants ---------------- */

const EYE_COLORS = ["Black", "Brown", "Blue", "Green", "Hazel", "Grey"];
const SKIN_TONES = ["Very Fair", "Fair", "Medium", "Olive", "Brown", "Dark"];

/* ---------------- Component ---------------- */

const AboutAtBirthSection = forwardRef((_, ref) => {
  const [eyeColor, setEyeColor] = useState("");
  const [skinTone, setSkinTone] = useState("");
  const [lookAlike, setLookAlike] = useState("");
  const [birthmarks, setBirthmarks] = useState("");
  const [firstComment, setFirstComment] = useState("");
  const [voiceNotes, setVoiceNotes] = useState([]);

  useImperativeHandle(ref, () => ({
    getData: () => ({
      eyeColor,
      skinTone,
      lookAlike,
      birthmarks,
      firstComment,
      voiceNotes,
    }),
  }));

  return (
    <>
      <Typography variant="sectionTitle">
        About you at Birth
      </Typography>

      <SectionCard>
        <Typography fontWeight={600} color="text.secondary">
          Eye color
        </Typography>

        <OptionGrid>
          {EYE_COLORS.map((color) => (
            <OptionButton
              key={color}
              selected={eyeColor === color}
              onClick={() => setEyeColor(color)}
              startIcon={eyeColor === color ? <CheckIcon /> : null}
            >
              {color}
            </OptionButton>
          ))}
        </OptionGrid>

        <Typography fontWeight={600} mt={3} color="text.secondary">
          Skin tone
        </Typography>

        <OptionGrid>
          {SKIN_TONES.map((tone) => (
            <OptionButton
              key={tone}
              selected={skinTone === tone}
              onClick={() => setSkinTone(tone)}
              startIcon={skinTone === tone ? <CheckIcon /> : null}
            >
              {tone}
            </OptionButton>
          ))}
        </OptionGrid>

        <TextField
          fullWidth
          label="Look-alike (Mom / Dad / Grandparent)"
          value={lookAlike}
          sx={{ mt: 3 }}
          onChange={(e) => setLookAlike(e.target.value)}
        />

        <TextField
          fullWidth
          multiline
          rows={2}
          label="Unique birthmarks or features"
          value={birthmarks}
          sx={{ mt: 2 }}
          onChange={(e) => setBirthmarks(e.target.value)}
        />

        <TextField
          fullWidth
          multiline
          rows={2}
          label="Doctor / Nurse’s first comment"
          value={firstComment}
          sx={{ mt: 2 }}
          onChange={(e) => setFirstComment(e.target.value)}
        />

        <Box mt={3}>
          {voiceNotes.map((note, index) => (
            <VoiceNoteRow
              key={index}
              value={note}
              onChange={(file) =>
                setVoiceNotes((prev) =>
                  file === null
                    ? prev.filter((_, i) => i !== index)
                    : prev.map((v, i) => (i === index ? file : v))
                )
              }
            />
          ))}

          <VoiceNoteRow
            value={null}
            onChange={(file) =>
              file && setVoiceNotes((prev) => [...prev, file])
            }
          />
        </Box>
      </SectionCard>
    </>
  );
});

export default AboutAtBirthSection;
