import { Box, Button, Typography } from "@mui/material";
import { styled } from "@mui/material/styles";
import BaseDialog from "./BaseDialog";
import { useDispatch } from "react-redux";
import {
  closeLoginDialog,
  openLoginDialog,
  openRegisterDialog,
} from "../store/slices/appSlice";

const Container = styled(Box)(({ theme }) => ({
  padding: theme.spacing(2),
  textAlign: "center",
}));

const Message = styled(Typography)(({ theme }) => ({
  fontSize: "1rem",
  marginBottom: theme.spacing(2),
}));

const Grid = styled(Box)(({ theme }) => ({
  display: "flex",
  justifyContent: "space-between",
  gap: theme.spacing(4),
  textAlign: "center",
  [theme.breakpoints.down("sm")]: {
    flexDirection: "column",
  },
}));

const Column = styled(Box)(({ theme }) => ({
  flex: 1,
}));

const Title = styled(Typography)(({ theme }) => ({
  fontSize: "1.25rem",
  fontWeight: 600,
  marginBottom: theme.spacing(2),
}));

const ActionButton = styled(Button)(({ theme }) => ({
  background: theme.palette.primary.main,
  color: theme.palette.background.white,
  fontWeight: 600,
  padding: theme.spacing(1.2, 3),
  borderRadius: 6,
  textTransform: "none",
  "&:hover": {
    background: theme.palette.background.primary,
  },
}));

export default function SignInSignUpPrompt({ open, onClose }) {
  const dispatch = useDispatch();
  const handleSignIn = () => {
    onClose();
    dispatch(openLoginDialog());
  };

  const handleSignUp = () => {
    onClose();
    dispatch(openRegisterDialog());
  };
  return (
    <BaseDialog
      open={open}
      onClose={onClose}
      title="Sign in or Register"
      maxWidth="sm"
    >
      <Container>
        <Message>You need a RISE account to continue.</Message>

        <Grid>
          <Column>
            <Title>Already a member?</Title>
            <ActionButton onClick={handleSignIn}>Sign in</ActionButton>
          </Column>

          <Column>
            <Title>Need an account?</Title>
            <ActionButton variant="text" onClick={handleSignUp}>
              Create account
            </ActionButton>
          </Column>
        </Grid>
      </Container>
    </BaseDialog>
  );
}
