import { useEffect, useState } from "react";
import { Box, Chip, Divider, List, ListItem, Typography } from "@mui/material";
import { styled } from "@mui/material/styles";
import PersonOutlineIcon from "@mui/icons-material/PersonOutline";

import { getMemorialList } from "../api/memorialApi";
import Loader from "./common/Loader";
import { useNavigate } from "react-router-dom";

// ---------------- Styled ----------------
const PageWrapper = styled(Box)(({ theme }) => ({
  padding: theme.spacing(4),
  backgroundColor: theme.palette.background.default,
  minHeight: "100vh",
}));

const MemorialRow = styled(ListItem)(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  gap: theme.spacing(3),
  padding: theme.spacing(2),
  borderRadius: 12,
  backgroundColor: theme.palette.background.paper,
  transition: "background-color 0.2s ease",
  "&:hover": {
    backgroundColor: theme.palette.custom.warmStone,
  },
}));

const ImageWrapper = styled(Box)(({ theme }) => ({
  width: 72,
  height: 72,
  borderRadius: "50%",
  overflow: "hidden",
  backgroundColor: theme.palette.custom.tombstoneGray,
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
  color: theme.palette.text.gray,
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

// ---------------- Helpers ----------------
const safeParse = (value) => {
  try {
    return value ? JSON.parse(value) : null;
  } catch {
    return null;
  }
};

const formatDate = (date) => (date ? new Date(date).toLocaleDateString() : "-");

// ---------------- Component ----------------
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
      <List disablePadding>
        {memorials.map((memorial, index) => (
          <Box key={memorial.id}>
            <MemorialRow
  button
  onClick={() => navigate(`/memorial/${memorial.id}`)}
  sx={{ cursor: "pointer" }}
>
              <ImageWrapper>
                {memorial.imageUrl ? (
                  <AvatarImg src={memorial.imageUrl} alt={memorial.name} />
                ) : (
                  <DefaultPersonIcon />
                )}
              </ImageWrapper>

              <Content>
                <Typography
                  variant="h6"
                  sx={{
                    fontWeight: 500,
                    textTransform: "capitalize",
                  }}
                  color="text.primary"
                >
                  {memorial.name}
                </Typography>

                <MetaRow>
                  <Typography variant="body2" color="text.secondary">
                    Born: {formatDate(memorial.birthDate)}
                  </Typography>

                  {memorial.profileType === "PASSED" && memorial.deathDate && (
                    <Typography variant="body2" color="text.secondary">
                      Passed: {formatDate(memorial.deathDate)}
                    </Typography>
                  )}

                  {memorial.isPublic && (
                    <Chip
                      label="Public"
                      size="small"
                      color="success"
                      variant="outlined"
                      sx={{ alignSelf: "flex-start", mt: 0.5 }}
                    />
                  )}
                </MetaRow>
              </Content>
            </MemorialRow>

            {index < memorials.length - 1 && (
              <Divider sx={{ my: 1, opacity: 0.6 }} />
            )}
          </Box>
        ))}
      </List>
    </PageWrapper>
  );
};

export default MemorialList;
