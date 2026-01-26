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

const MAX_VOICE_NOTE_SIZE = 5 * 1024 * 1024; // 5 MB

const VoiceNoteContainer = styled(Box, {
  shouldForwardProp: (prop) => prop !== "selected",
})(({ theme, selected }) => ({
  marginTop: theme.spacing(3),
  padding: theme.spacing(2),
  borderRadius: 12,
  display: "flex",
  alignItems: "center",
  gap: theme.spacing(1.5),
  cursor: "pointer",
  border: `1px solid ${
    selected ? theme.palette.primary.main : theme.palette.divider
  }`,
  background: selected ? "rgba(77,108,58,0.12)" : "transparent",

  "&:hover": {
    background: selected
      ? "rgba(77,108,58,0.18)"
      : theme.palette.background.paper,
  },
}));

export function VoiceNoteRow({ value, onChange }) {
  const inputRef = useRef(null);
  const audioRef = useRef(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [previewUrl, setPreviewUrl] = useState(null);

  // create / cleanup audio URL
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

  const handleContainerClick = () => {
    if (!value) inputRef.current?.click();
  };

  const handleFileChange = (e) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (file.size > MAX_VOICE_NOTE_SIZE) {
      alert("Voice note must be less than 5 MB");
      e.target.value = "";
      return;
    }

    onChange?.(file);

    // allow selecting same file again
    e.target.value = "";
  };

  const togglePlay = (e) => {
    e.stopPropagation();
    if (!audioRef.current) return;

    if (isPlaying) {
      audioRef.current.pause();
    } else {
      audioRef.current.play();
    }
  };

  const clearFile = (e) => {
    e.stopPropagation();

    if (audioRef.current) {
      audioRef.current.pause();
      audioRef.current.currentTime = 0;
    }

    setIsPlaying(false);
    onChange?.(null);

    if (inputRef.current) {
      inputRef.current.value = "";
    }
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

      <VoiceNoteContainer selected={!!value} onClick={handleContainerClick}>
        {/* Play / Mic icon */}
        {value ? (
          <IconButton size="small" disableRipple onClick={togglePlay}>
            {isPlaying ? <PauseIcon /> : <PlayArrowIcon />}
          </IconButton>
        ) : (
          <MicIcon color="disabled" />
        )}

        {/* Filename / label */}
        <Typography
          fontWeight={600}
          color={value ? "primary.main" : "text.secondary"}
          flex={1}
          noWrap
        >
          {value?.name || "Add Voice Note"}
        </Typography>

        {/* Clear */}
        {value && (
          <IconButton size="small" disableRipple onClick={clearFile}>
            <ClearIcon fontSize="small" />
          </IconButton>
        )}
      </VoiceNoteContainer>
    </>
  );
}

const SectionCard = styled(Box)(({ theme }) => ({
  padding: theme.spacing(3),
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
  padding: "6px 16px",
  fontSize: "14px",
  textTransform: "none",
  border: `1px solid ${selected ? theme.palette.primary.main : "#555"}`,
  color: selected ? theme.palette.primary.main : theme.palette.text.secondary,
  background: selected ? "rgba(77,108,58,0.15)" : "transparent",

  "&:hover": {
    background: selected ? "rgba(77,108,58,0.25)" : "rgba(255,255,255,0.05)",
  },
}));

const EYE_COLORS = ["Black", "Brown", "Blue", "Green", "Hazel", "Grey"];

const SKIN_TONES = ["Very Fair", "Fair", "Medium", "Olive", "Brown", "Dark"];

const AboutAtBirthSection = forwardRef((_, ref) => {
  const [eyeColor, setEyeColor] = useState("");
  const [skinTone, setSkinTone] = useState("");
  const [lookAlike, setLookAlike] = useState("");
  const [birthmarks, setBirthmarks] = useState("");
  const [firstComment, setFirstComment] = useState("");
  const [voiceNotes, setVoiceNotes] = useState([]);
  const addInputRef = useRef(null);

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

  const handleAddVoiceNote = (e) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setVoiceNotes((prev) => [...prev, file]);
    e.target.value = ""; // reset input
  };

  return (
    <>
      <Typography component="div" variant="sectionTitle">
        About you at Birth
      </Typography>

      <SectionCard>
        {/* Eye Color */}
        <Typography fontWeight={600} mb={1} color="text.secondary">
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

        {/* Skin Tone */}
        <Typography fontWeight={600} mt={3} mb={1} color="text.secondary">
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

        {/* Look-alike */}
        <TextField
          fullWidth
          label="Look-alike (Mom / Dad / Grandparent)"
          value={lookAlike}
          sx={{ mt: 3 }}
          onChange={(e) => setLookAlike(e.target.value)}
        />

        {/* Birthmarks */}
        <TextField
          fullWidth
          multiline
          rows={2}
          label="Unique birthmarks or features"
          value={birthmarks}
          sx={{ mt: 2 }}
          onChange={(e) => setBirthmarks(e.target.value)}
        />

        {/* Doctor / Nurse comment */}
        <TextField
          fullWidth
          multiline
          rows={2}
          label="Doctor / Nurse’s first comment"
          value={firstComment}
          sx={{ mt: 2 }}
          onChange={(e) => setFirstComment(e.target.value)}
        />
        {/* Voice Notes */}
        {/* Voice Notes */}
        <Box mt={3}>
          {/* Existing voice notes */}
          {voiceNotes.map((note, index) => (
            <VoiceNoteRow
              key={index}
              value={note}
              onChange={(file) => {
                if (file === null) {
                  // remove
                  setVoiceNotes((prev) => prev.filter((_, i) => i !== index));
                } else {
                  // update
                  setVoiceNotes((prev) => {
                    const next = [...prev];
                    next[index] = file;
                    return next;
                  });
                }
              }}
            />
          ))}

          {/* Always-visible Add Voice Note row */}
          <VoiceNoteRow
            value={null}
            onChange={(file) => {
              if (!file) return;
              setVoiceNotes((prev) => [...prev, file]);
            }}
          />
        </Box>
      </SectionCard>
    </>
  );
});

export default AboutAtBirthSection;
