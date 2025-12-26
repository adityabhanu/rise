import { useState, useEffect } from "react";
import { Box, Typography, Paper, Divider } from "@mui/material";
import { styled } from "@mui/material/styles";
import { useParams } from "react-router-dom";
import Loader from "../components/common/Loader";
import { getMemorialDetails } from "../api/memorialApi";

/* ---------------- styled components ---------------- */

const PageWrapper = styled(Box)(({ theme }) => ({
  marginTop: 80,
  padding: theme.spacing(3),
  backgroundColor: theme.palette.background.default,
  minHeight: "100vh",
}));

const HeaderCard = styled(Paper)(({ theme }) => ({
  display: "flex",
  gap: theme.spacing(3),
  padding: theme.spacing(3),
  backgroundColor: theme.palette.background.paper,
}));

const ProfileImage = styled(Box)(({ theme }) => ({
  width: 180,
  height: 220,
  backgroundColor: theme.palette.custom.tombstoneGray,
  borderRadius: 4,
}));

const InfoRow = styled(Box)(({ theme }) => ({
  marginTop: theme.spacing(1),
  color: theme.palette.text.gray,
}));

const SectionCard = styled(Paper)(({ theme }) => ({
  marginTop: theme.spacing(3),
  padding: theme.spacing(3),
  backgroundColor: theme.palette.background.paper,
}));

const Label = styled("span")(({ theme }) => ({
  fontWeight: 600,
  color: theme.palette.text.primary,
}));

/* ---------------- helpers ---------------- */

const formatDate = (date) =>
  date ? new Date(date).toLocaleDateString() : "-";

/* ---------------- component ---------------- */

export default function MemorialDetails() {
  const { id } = useParams();
  const [loading, setLoading] = useState(false);
  const [memorial, setMemorial] = useState(null);

  useEffect(() => {
    const fetchMemorial = async () => {
      try {
        setLoading(true);
        const res = await getMemorialDetails(id);
        setMemorial(res);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchMemorial();
  }, [id]);

  if (loading) return <Loader />;
  if (!memorial) return null;

  const {
    Prefix,
    FirstName,
    MiddleName,
    LastName,
    Suffix,
    NickName,
    DateOfBirth,
    DateOfDeath,
    DateOfBirthLocation,
    DateOfDeathLocation,
    Biography,
    BurialInformation,
  } = memorial;

  const fullName = `${Prefix ? Prefix + " " : ""}${FirstName} ${
    MiddleName || ""
  } ${LastName}${Suffix ? ", " + Suffix : ""}`;

  return (
    <PageWrapper>
      {/* ---------- Header ---------- */}
      <HeaderCard elevation={0}>
        <ProfileImage />
        <Box>
          <Typography variant="subTitle">{fullName}</Typography>

          {NickName && (
            <Typography sx={{ mt: 0.5, color: "text.gray" }}>
              “{NickName}”
            </Typography>
          )}

          <InfoRow>
            <Label>Born:</Label> {formatDate(DateOfBirth)} —{" "}
            {DateOfBirthLocation}
          </InfoRow>

          <InfoRow>
            <Label>Died:</Label> {formatDate(DateOfDeath)} —{" "}
            {DateOfDeathLocation}
          </InfoRow>

          <InfoRow>
            <Label>Burial:</Label> {BurialInformation?.BurialType}
          </InfoRow>
        </Box>
      </HeaderCard>

      {/* ---------- Biography ---------- */}
      <SectionCard elevation={0}>
        <Typography variant="sectionTitle">Biography</Typography>
        <Divider sx={{ my: 2 }} />
        <Box
          dangerouslySetInnerHTML={{ __html: Biography }}
          sx={{ color: "text.secondary" }}
        />
      </SectionCard>

      {/* ---------- Inscription ---------- */}
      {BurialInformation?.Inscription && (
        <SectionCard elevation={0}>
          <Typography variant="sectionTitle">Inscription</Typography>
          <Divider sx={{ my: 2 }} />
          <Typography>{BurialInformation.Inscription}</Typography>
        </SectionCard>
      )}

      {/* ---------- Gravesite Details ---------- */}
      {BurialInformation?.Gravesite && (
        <SectionCard elevation={0}>
          <Typography variant="sectionTitle">Gravesite Details</Typography>
          <Divider sx={{ my: 2 }} />
          <Typography>{BurialInformation.Gravesite}</Typography>
        </SectionCard>
      )}

      {/* ---------- Burial Info ---------- */}
      <SectionCard elevation={0}>
        <Typography variant="sectionTitle">Burial Information</Typography>
        <Divider sx={{ my: 2 }} />

        <InfoRow>
          <Label>Plot Number:</Label> {BurialInformation?.PlotNumber}
        </InfoRow>

        <InfoRow>
          <Label>Monument:</Label>{" "}
          {BurialInformation?.Monument ? "Yes" : "No"}
        </InfoRow>

        <InfoRow>
          <Label>Cenotaph:</Label>{" "}
          {BurialInformation?.Cenotaph ? "Yes" : "No"}
        </InfoRow>
      </SectionCard>
    </PageWrapper>
  );
}
