import { useEffect, useState } from "react";
import {
  Box,
  Chip,
  List,
  ListItem,
  Typography,
} from "@mui/material";
import { styled } from "@mui/material/styles";
import PersonOutlineIcon from "@mui/icons-material/PersonOutline";

import { getMemorialList } from "../api/memorialApi";
import Loader from "./common/Loader";
import { useNavigate } from "react-router-dom";

/* ---------------- Styled ---------------- */

const PageWrapper = styled(Box)(({ theme }) => ({
  minHeight: "100vh",
  padding: theme.spacing(6, 2),
}));

const ListPanel = styled(Box)(({ theme }) => ({
  maxWidth: 960,
  margin: "0 auto",
  padding: theme.spacing(3),
  backgroundColor: theme.palette.secondary.main, // Mist Blue panel
  borderRadius: 16,
}));

const MemorialRow = styled(ListItem)(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  gap: theme.spacing(3),
  padding: theme.spacing(2.5),
  borderRadius: 12,
  backgroundColor: theme.palette.background.paper,
  border: `1px solid ${theme.palette.border.light}`,
  transition: "transform 0.2s ease, box-shadow 0.2s ease",
  cursor: "pointer",

  "&:hover": {
    transform: "translateY(-2px)",
    boxShadow: theme.palette.shadow.cardHover,
  },
}));

const ImageWrapper = styled(Box)(({ theme }) => ({
  width: 72,
  height: 72,
  borderRadius: "50%",
  overflow: "hidden",
  backgroundColor: theme.palette.custom.babyBlue,
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  flexShrink: 0,
}));

const AvatarImg = styled("img")({
  width: "100%",
  height: "100%",
  objectFit: "cover",
});

const DefaultPersonIcon = styled(PersonOutlineIcon)(({ theme }) => ({
  fontSize: 40,
  color: theme.palette.text.headerLight,
}));

const Content = styled(Box)({
  flex: 1,
});

const MetaRow = styled(Box)(({ theme }) => ({
  display: "flex",
  flexDirection: "column",
  gap: theme.spacing(0.5),
  marginTop: theme.spacing(0.75),
}));

/* ---------------- Helpers ---------------- */

const safeParse = (value) => {
  try {
    return value ? JSON.parse(value) : null;
  } catch {
    return null;
  }
};

const formatDate = (date) =>
  date ? new Date(date).toLocaleDateString() : "-";

/* ---------------- Component ---------------- */

const MemorialList = () => {
  const [memorials, setMemorials] = useState([]);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchMemorials = async () => {
      setLoading(true);

      const res = await getMemorialList();

      if (res) {
        const normalized = res.map((item) => {
          const birth = safeParse(item.BirthDetails);
          const passing = safeParse(item.PassingDetails);
          const media = safeParse(item.Media);
          const photos = safeParse(media?.photos);

          return {
            id: item.Id,
            name: item.FullName,
            profileType: item.ProfileType,
            isPublic: item.IsPublic,
            birthDate: birth?.birthDate,
            deathDate: passing?.passingDate,
            imageUrl: Array.isArray(photos) ? photos[0] : null,
          };
        });

        setMemorials(normalized);
      }

      setLoading(false);
    };

    fetchMemorials();
  }, []);

  return (
    <PageWrapper>
      {loading && <Loader />}

      <ListPanel>
        <List disablePadding sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
          {memorials.map((memorial) => (
            <MemorialRow
              key={memorial.id}
              onClick={() => navigate(`/memorial/${memorial.id}`)}
            >
              <ImageWrapper>
                {memorial.imageUrl ? (
                  <AvatarImg
                    src={memorial.imageUrl}
                    alt={memorial.name}
                  />
                ) : (
                  <DefaultPersonIcon />
                )}
              </ImageWrapper>

              <Content>
                <Typography
                  variant="h6"
                  sx={{
                    fontWeight: 500,
                    color: "text.header",
                    textTransform: "capitalize",
                  }}
                >
                  {memorial.name}
                </Typography>

                <MetaRow>
                  <Typography variant="body2" color="text.secondary">
                    Born: {formatDate(memorial.birthDate)}
                  </Typography>

                  {memorial.profileType === "PASSED" &&
                    memorial.deathDate && (
                      <Typography variant="body2" color="text.secondary">
                        Passed: {formatDate(memorial.deathDate)}
                      </Typography>
                    )}

                  {memorial.isPublic && (
                    <Chip
                      label="Public"
                      size="small"
                      variant="outlined"
                      sx={{
                        alignSelf: "flex-start",
                        mt: 0.5,
                        borderColor: "primary.main",
                        color: "primary.main",
                        fontWeight: 500,
                      }}
                    />
                  )}
                </MetaRow>
              </Content>
            </MemorialRow>
          ))}
        </List>
      </ListPanel>
    </PageWrapper>
  );
};

export default MemorialList;
