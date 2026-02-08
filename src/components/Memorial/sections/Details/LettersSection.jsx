import { Box, Typography, Divider } from "@mui/material";
import { styled } from "@mui/material/styles";

/* ---------------- Styled (CONSISTENT WITH OTHER SECTIONS) ---------------- */

const Section = styled(Box)(({ theme }) => ({
  marginTop: theme.spacing(4),
}));

const Group = styled(Box)(({ theme }) => ({
  marginTop: theme.spacing(3),
}));

const Sender = styled(Typography)(({ theme }) => ({
  fontSize: 15,
  fontWeight: 500,
  color: theme.palette.text.primary,
  marginBottom: theme.spacing(1),
}));

const LetterBox = styled(Box)(({ theme }) => ({
  padding: theme.spacing(2),
  borderRadius: 12,
  backgroundColor: theme.palette.custom.babyBlue,
}));

const MetaText = styled(Typography)(({ theme }) => ({
  fontSize: 14,
  color: theme.palette.text.secondary,
  lineHeight: 1.7,
}));

/* ---------------- Helpers ---------------- */

const groupBySender = (letters) => {
  return letters.reduce((acc, letter) => {
    const key = letter.from || "Unknown";
    if (!acc[key]) acc[key] = [];
    acc[key].push(letter);
    return acc;
  }, {});
};

/* ---------------- Component ---------------- */

export default function LettersSection({ letters }) {
  if (!letters || !letters.length) return null;

  const groupedLetters = groupBySender(letters);

  return (
    <Section>
      <Typography
        variant="subTitle"
        sx={{
          color: "text.header",
          fontFamily: (theme) => theme.typography.fontFamilyDisplay,
        }}
      >
        Letters
      </Typography>

      <Divider sx={{ mb: 2, mt: 1.5 }} />

      {Object.entries(groupedLetters).map(
        ([sender, senderLetters]) => (
          <Group key={sender}>
            <Sender>{sender}</Sender>

            {senderLetters.map((letter, i) => (
              <LetterBox key={i} sx={{ mb: 2 }}>
                <MetaText>{letter.content}</MetaText>
              </LetterBox>
            ))}
          </Group>
        )
      )}
    </Section>
  );
}
