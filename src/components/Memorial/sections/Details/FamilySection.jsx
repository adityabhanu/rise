import { Box, Typography, Divider } from "@mui/material";
import { styled } from "@mui/material/styles";

/* ---------------- Styled ---------------- */

const Section = styled(Box)(({ theme }) => ({
  marginTop: theme.spacing(4),
}));

const Group = styled(Box)(({ theme }) => ({
  marginTop: theme.spacing(2.5),
}));

const GroupTitle = styled(Typography)(({ theme }) => ({
  fontSize: 13,
  fontWeight: 500,
  letterSpacing: "0.04em",
  textTransform: "uppercase",
  color: theme.palette.text.secondary,
  marginBottom: theme.spacing(1),
}));

const NameLine = styled(Typography)(({ theme }) => ({
  fontWeight: 500,
  fontSize: 15,
  color: theme.palette.text.primary,
}));

const MetaText = styled(Typography)(({ theme }) => ({
  fontSize: 14,
  color: theme.palette.text.secondary,
}));

const List = styled(Box)(({ theme }) => ({
  display: "grid",
  gap: theme.spacing(0.75),
}));

/* ---------------- Component ---------------- */

export default function FamilySection({ family }) {
  if (!family) return null;

  const {
    spouse,
    children,
    grandChildren,
    siblings,
    parents,
    grandParents,
    familyPets,
    familyTraditions,
  } = family;

  const renderList = (title, items = []) => {
    if (!Array.isArray(items) || !items.length) return null;

    return (
      <Group>
        <GroupTitle>{title}</GroupTitle>
        <List>
          {items.map((p, i) => (
            <MetaText key={i}>
              {p.name}
              {p.relationship && (
                <span style={{ opacity: 0.7 }}> — {p.relationship}</span>
              )}
            </MetaText>
          ))}
        </List>
      </Group>
    );
  };

  const hasAnyData =
    spouse?.name ||
    parents ||
    grandParents ||
    familyPets ||
    familyTraditions ||
    children?.length ||
    grandChildren?.length ||
    siblings?.length;

  if (!hasAnyData) return null;

  return (
    <Section>
      {/* Header */}
      <Typography
        variant="subTitle"
        sx={{
          color: "text.header",
          fontFamily: (theme) => theme.typography.fontFamilyDisplay,
        }}
      >
        Family
      </Typography>

      <Divider sx={{ mb: 2, mt: 1.5 }} />

      {/* Spouse (adult case) */}
      {spouse?.name && (
        <Group>
          <GroupTitle>Spouse</GroupTitle>
          <NameLine>{spouse.name}</NameLine>

          {spouse.story && (
            <MetaText sx={{ mt: 0.75, lineHeight: 1.6 }}>
              {spouse.story}
            </MetaText>
          )}
        </Group>
      )}

      {/* Parents (newborn case) */}
      {(parents?.mother || parents?.father) && (
        <Group>
          <GroupTitle>Parents</GroupTitle>
          {parents.mother && <MetaText>Mother — {parents.mother}</MetaText>}
          {parents.father && <MetaText>Father — {parents.father}</MetaText>}
        </Group>
      )}

      {/* Grandparents */}
      {(grandParents?.maternal || grandParents?.paternal) && (
        <Group>
          <GroupTitle>Grandparents</GroupTitle>
          {grandParents.maternal && (
            <MetaText>Maternal — {grandParents.maternal}</MetaText>
          )}
          {grandParents.paternal && (
            <MetaText>Paternal — {grandParents.paternal}</MetaText>
          )}
        </Group>
      )}

      {/* Pets */}
      {familyPets && (
        <Group>
          <GroupTitle>Family Pets</GroupTitle>
          <MetaText>{familyPets}</MetaText>
        </Group>
      )}

      {renderList("Children", children)}
      {renderList("Grandchildren", grandChildren)}
      {renderList("Siblings", siblings)}

      {/* Traditions */}
      {familyTraditions && (
        <Group>
          <GroupTitle>Family Traditions</GroupTitle>
          <MetaText sx={{ lineHeight: 1.6 }}>
            {familyTraditions}
          </MetaText>
        </Group>
      )}
    </Section>
  );
}
