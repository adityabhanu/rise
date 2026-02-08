import { useRef, useState } from "react";
import { Box, Button, Typography, Divider } from "@mui/material";
import PlayArrowIcon from "@mui/icons-material/PlayArrow";
import PauseIcon from "@mui/icons-material/Pause";

export default function AudioTributeSection({ sectionTitle, voiceNotes = [] }) {
  const audioRefs = useRef([]);
  const [playingIndex, setPlayingIndex] = useState(null);

  if (!voiceNotes.length) return null;

  const togglePlay = (index) => {
    const current = audioRefs.current[index];

    // stop any other playing audio
    audioRefs.current.forEach((audio, i) => {
      if (audio && i !== index) {
        audio.pause();
      }
    });

    if (playingIndex === index) {
      current.pause();
      setPlayingIndex(null);
    } else {
      current.play();
      setPlayingIndex(index);
    }
  };

  return (
    <Box sx={{ mt: 4 }}>
      <Typography
        variant="subTitle"
        sx={{
          color: "text.header",
          fontFamily: (theme) => theme.typography.fontFamilyDisplay,
        }}
      >
        {sectionTitle}
      </Typography>

      <Divider sx={{ mb: 2, mt: 1.5 }} />

      <Box sx={{ display: "grid", gap: 1.5 }}>
        {voiceNotes.map((url, i) => (
          <Box key={i}>
            <Button
              fullWidth
              startIcon={
                playingIndex === i ? <PauseIcon /> : <PlayArrowIcon />
              }
              sx={{
                borderRadius: 8,
                py: 1.6,
                backgroundColor: "text.secondary",
                color: "text.white",
                textTransform: "none",
                fontWeight: 500,

                "&:hover": {
                  backgroundColor: "text.primary",
                },
              }}
              onClick={() => togglePlay(i)}
            >
              {playingIndex === i
                ? "Pause Audio Tribute"
                : "Play Audio Tribute"}
            </Button>

            {/* hidden native audio */}
            <audio
              ref={(el) => (audioRefs.current[i] = el)}
              src={url}
              preload="metadata"
              onEnded={() => setPlayingIndex(null)}
            />
          </Box>
        ))}
      </Box>
    </Box>
  );
}
