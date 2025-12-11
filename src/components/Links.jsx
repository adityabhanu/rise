import AddIcon from "@mui/icons-material/Add";
import { Box } from "@mui/material";
import AddPhotoAlternateIcon from "@mui/icons-material/AddPhotoAlternate";
import { styled } from "@mui/material/styles";
import { useNavigate } from "react-router-dom";

const BoxContainer = styled(Box)(({ theme }) => ({
  display: "flex",
  justifyContent: "center",
  background: theme.palette.background.white,
  padding: "30px 0",
}));

const LinksContainer = styled(Box)(({ theme }) => ({
  display: "flex",
  justifyContent: "center",
  gap: "12px",
  color: theme.palette.background.secondary,
}));

const LinkItem = styled("span")(({ theme }) => ({
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  gap: "8px",
  cursor: "pointer",
  transition: "color 0.3s ease",

  "& svg": {
    transition: "color 0.3s ease",
  },
  "&:hover": {
    color: theme.palette.background.primary,
  },

  "&:hover svg": {
    color: theme.palette.background.primary,
  },
}));

const pageLinks = [
  {
    id: "addMemorial",
    icon: AddIcon,
    label: "Add a Memorial",
    link: "/memorial/create/search-cemetery",
  },
  {
    id: "uploadPhotos",
    icon: AddPhotoAlternateIcon,
    label: "Upload Photos",
    link: "/transcribe/create/search-cemetery?untranscribePhoto=true",
  },
];

const Links = () => {
  const navigate = useNavigate();

  return (
    <>
      <BoxContainer>
        <LinksContainer>
          {pageLinks.map((item, idx) => {
            return (
              <LinkItem key={item.id} onClick={() => navigate(item.link)}>
                <item.icon fontSize="large" />
                {item.label}
              </LinkItem>
            );
          })}
        </LinksContainer>
      </BoxContainer>
    </>
  );
};

export default Links;
