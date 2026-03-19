import { useEffect, useState, useRef } from "react";
import { Box } from "@mui/material";
import { styled, keyframes } from "@mui/material/styles";
import babyImage from "../../../assets/images/baby-image.jpg";
import babyAudio from "../../../assets/audio/baby-music.mp3";

const IMAGE_DURATION = 3000;

const growIn = keyframes`
  0% {
    opacity: 0;
    transform: scale(0.85);
  }
  100% {
    opacity: 1;
    transform: scale(1);
  }
`;

const Overlay = styled(Box)(({ visible }) => ({
  position: "fixed",
  inset: 0,
  zIndex: 2000,
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  background: "rgba(88, 88, 88, 0.4)",
  opacity: visible ? 1 : 0,
  transition: "opacity 2000ms ease",
}));

const Card = styled(Box)(({ theme }) => ({
  width: 240,
  padding: "16px",
  borderRadius: 16,
  background: theme.palette.background.paper,
  boxShadow: theme.palette.shadow.card,
  display: "flex",
  justifyContent: "center",
  alignItems: "center",

  animation: `${growIn} 2000ms ease-out`,
}));

const Image = styled("img")({
  width: 140,
  height: 140,
  objectFit: "cover",
  borderRadius: "50%",
});

const fadeOutAudio = (audio, duration = 1000) => {
  if (!audio) return;

  const steps = 20;
  const stepTime = duration / steps;
  const volumeStep = audio.volume / steps;

  let currentStep = 0;

  const fade = setInterval(() => {
    if (currentStep >= steps) {
      clearInterval(fade);
      audio.pause();
      audio.currentTime = 0;
      return;
    }

    audio.volume = Math.max(0, audio.volume - volumeStep);
    currentStep++;
  }, stepTime);
};

export default function NewbornIntroEffect({ duration = 7000 }) {
  const [visible, setVisible] = useState(true);
  const [mounted, setMounted] = useState(true);
  const audioRef = useRef(null);

  useEffect(() => {
    const audio = new Audio(babyAudio);
    audio.volume = 0.4;
    audioRef.current = audio;

    audio.play().catch(() => {
      console.log("Autoplay blocked");
    });

    // 👶 fade out overlay after 3 sec
    const hideTimer = setTimeout(() => {
      setVisible(false);
    }, IMAGE_DURATION);

    // 👶 remove from DOM after fade completes
    const unmountTimer = setTimeout(() => {
      setMounted(false);
    }, IMAGE_DURATION + 500);

    const audioTimer = setTimeout(() => {
      fadeOutAudio(audio, 1000); // 👈 smooth fade out
    }, duration);

    return () => {
      clearTimeout(hideTimer);
      clearTimeout(unmountTimer);
      clearTimeout(audioTimer);
      audio.pause();
    };
  }, [duration]);

  if (!mounted) return null;

  return (
    <Overlay visible={visible}>
      <Card>
        <Image src={babyImage} alt="baby" />
      </Card>
    </Overlay>
  );
}
