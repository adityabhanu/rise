import {
  Box,
  FormControlLabel,
  Typography,
  Rating,
  Checkbox,
} from "@mui/material";
import { styled } from "@mui/material/styles";
import { useState, useEffect } from "react";
import {
  SectionContainer,
  DateRow,
  NameLabel,
  NameFields,
  NameRow,
  StyledTextField,
} from "./MemorialStyles";
import ToggleButton from "../../common/ToggleButton";

const Grid = styled(Box)({
  display: "grid",
  gridTemplateColumns: "1fr 1fr",
  gap: "10px 24px",
});

const OptionCard = styled(Box)(({ theme, selected }) => ({
  border: `1px solid ${selected ? theme.palette.primary.main : "#ddd"}`,
  borderRadius: 6,
  padding: "10px 14px",
  fontSize: "14px",
  cursor: "pointer",
  color: selected ? theme.palette.text.primary : theme.palette.text.secondary,
  fontWeight: selected ? 600 : 400,
  display: "flex",
  alignItems: "center",
  justifyContent: "space-between",

  "&:hover": {
    borderColor: theme.palette.primary.main,
  },
}));

const SourceBox = styled(Box)(({ theme }) => ({
  marginLeft: "30px",
  marginTop: "8px",
  border: "1px solid #ddd",
  borderRadius: 4,
  padding: "12px",
  fontSize: "13px",
  background: theme.palette.background.white,
}));

const RELATIONSHIP_OPTIONS = [
  "Spouse/Partner",
  "Sibling",
  "Child",
  "Aunt/Uncle",
  "Parent",
  "Niece/Nephew",
  "Grandchild",
  "First cousin",
  "Grandparent",
];

export default function CloseRelativeSection() {
  const [isCloseRelative, setIsCloseRelative] = useState(false);
  const [selected, setSelected] = useState("");
  const [showInSource, setShowInSource] = useState(true);
  const [showRelationship, setShowRelationship] = useState(true);

  useEffect(() => {
    if (!isCloseRelative) {
      setSelected("");
      setShowInSource(true);
    }
  }, [isCloseRelative]);

  const selectRelation = (value) => {
    setSelected(value);
  };
  const primaryRelation = selected?.toUpperCase();
  return (
    <SectionContainer>
      <NameRow>
        <NameLabel>Are you a close relative?</NameLabel>
        <NameFields>
          <ToggleButton
            label="Mark as a close relative"
            checked={isCloseRelative}
            onChange={(e) => setIsCloseRelative(e.target.checked)}
          />

          {isCloseRelative && (
            <>
              <Typography sx={{ fontSize: "14px", fontWeight: "600" }}>
                I am their...
              </Typography>
              <Grid>
                {RELATIONSHIP_OPTIONS.map((option) => (
                  <OptionCard
                    key={option}
                    selected={selected === option}
                    onClick={() => selectRelation(option)}
                  >
                    {option}
                    {/* {option === "Grandchild" && selected === option && (
                      <Typography
                        sx={{ fontSize: "12px", color: "primary.main" }}
                      >
                        Options
                      </Typography>
                    )} */}
                  </OptionCard>
                ))}
              </Grid>
            </>
          )}

          {selected && showInSource && (
            <>
              <FormControlLabel
                key={""}
                control={
                  <Checkbox
                    size="small"
                    checked={showRelationship}
                    onChange={(e) => {
                      setShowRelationship(e.target.checked);
                    }}
                  />
                }
                label="Show relationship in source information"
              />
              <Typography sx={{ fontSize: "14px", pl: "30px" }}>
                Your relationship will be displayed in{" "}
                <strong>source information</strong> on the memorial as:
              </Typography>
              <SourceBox>
                <Typography fontSize="12px" align="center">
                  Created by: test user •{" "}
                  <Box
                    component="span"
                    sx={{ color: "green", fontWeight: 600 }}
                  >
                    RELATIVE: {primaryRelation}
                  </Box>
                </Typography>
              </SourceBox>
            </>
          )}
        </NameFields>
      </NameRow>
    </SectionContainer>
  );
}
