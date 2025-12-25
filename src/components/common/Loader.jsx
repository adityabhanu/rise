import { Box } from "@mui/material";
import { styled, keyframes } from "@mui/material/styles";

const rotate = keyframes`
  from { transform: rotate(0deg); }
  to { transform: rotate(360deg); }
`;

const Overlay = styled(Box)(({ theme }) => ({
  position: "fixed",
  inset: 0,
  backgroundColor: "rgba(0,0,0,0.15)",
  backdropFilter: "blur(2px)",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  zIndex: 2000,
}));

const LoaderCard = styled(Box)(({ theme }) => ({
  backgroundColor: theme.palette.background.paper,
  padding: 32,
  borderRadius: 16,
  boxShadow: "0 8px 30px rgba(0,0,0,0.2)",
}));

const Spinner = styled(Box)(({ theme }) => ({
  width: 48,
  height: 48,
  position: "relative",

  "&::after": {
    content: '""',
    position: "absolute",
    inset: 0,
    borderRadius: "50%",
    border: "4px solid",
    borderColor: theme.palette.custom.lightTan,
    borderTopColor: theme.palette.primary.main,
    animation: `${rotate} 1s linear infinite`,
  },
}));

export default function Loader() {
  return (
    <Overlay>
      <LoaderCard>
        <Spinner />
      </LoaderCard>
    </Overlay>
  );
}
