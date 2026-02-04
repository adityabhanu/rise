import { useRef, useState } from "react";
import { Box, Button, Typography } from "@mui/material";
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
      <Typography variant="subTitle">
        {sectionTitle}
      </Typography>

      <Box sx={{ mt: 1.5, display: "grid", gap: 1.5 }}>
        {voiceNotes.map((url, i) => (
          <Box key={i}>
            <Button
              fullWidth
              startIcon={
                playingIndex === i ? (
                  <PauseIcon />
                ) : (
                  <PlayArrowIcon />
                )
              }
              sx={{
                borderRadius: 999,
                py: 1.6,
                backgroundColor: "#1f2a25",
                color: "#fff",
                textTransform: "none",
                fontWeight: 500,

                "&:hover": {
                  backgroundColor: "#26352f",
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
