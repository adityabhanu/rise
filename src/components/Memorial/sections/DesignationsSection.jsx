import React, { useState, forwardRef, useImperativeHandle } from "react";
import {
  Box,
  FormControlLabel,
  Typography,
  Rating,
  Checkbox,
} from "@mui/material";
import { styled } from "@mui/material/styles";
import {
  SectionContainer,
  DateRow,
  NameLabel,
  NameFields,
  NameRow,
  StyledTextField,
} from "./MemorialStyles";
import { useSearchParams } from "react-router-dom";
import RoomIcon from "@mui/icons-material/Room";
import ToggleButton from "../../common/ToggleButton";

const FamousContainer = styled(Box)(({ theme }) => ({
  marginLeft: "58px",
  marginTop: theme.spacing(2),
  padding: theme.spacing(2),
}));

const CategoriesGrid = styled(Box)(({ theme }) => ({
  display: "grid",
  gridTemplateColumns: "repeat(2, 1fr)",
  gap: theme.spacing(1),
  marginTop: theme.spacing(1),
}));

const FAMOUS_CATEGORIES = [
  "Actors",
  "Actresses",
  "Animals",
  "Artists and Architects",
  "Authors and Writers",
  "Business Magnates",
  "Crime Fighters and Lawyers",
  "Criminals, Eccentrics and Oddities",
  "Educators",
  "Entertainers",
  "Explorers and Adventurers",
  "Magician",
  "Medal of Honor Recipient",
  "Military Figures",
  "Miscellaneous",
  "Monuments",
  "Musicians and Composers",
  "Native Americans",
  "Organized Crime Figures",
  "Philanthropists",
  "Politicians",
  "Relatives Of Notable",
  "Religious Figures",
  "Royalty",
  "Scientists and Inventors",
  "Social Reformers",
  "Sports Figures",
  "Suffragists",
  "US First Ladies",
  "US Presidents and Vice Presidents",
  "US Supreme Court Justices",
  "Victims of crime and disaster",
];

const DesignationsSection = forwardRef((props, ref) => {
  const [isVeteran, setIsVeteran] = useState(false);
  const [isFamous, setIsFamous] = useState(false);
  const [fameRating, setFameRating] = useState(0);
  const [selectedCategories, setSelectedCategories] = useState([]);

  const toggleCategory = (category) => {
    setSelectedCategories((prev) =>
      prev.includes(category)
        ? prev.filter((c) => c !== category)
        : [...prev, category]
    );
  };

    useImperativeHandle(ref, () => ({
    getData: () => ({
      veteran: isVeteran,
      famous: isFamous,
      fameRating,
      selectedCategories,
    }),
  }));
  return (
    <SectionContainer>
      <NameRow>
        <NameLabel>Designations</NameLabel>
        <NameFields>
          <ToggleButton
            label="Designate this person as a veteran"
            checked={isVeteran}
            onChange={(e) => setIsVeteran(e.target.checked)}
          />
          <Typography sx={{ mb: 2, fontSize: "14px", pl: "58px" }}>
            A small icon V will be placed next to their name denoting their
            veteran status.
          </Typography>
          <ToggleButton
            label="Label this person as Famous"
            checked={isFamous}
            onChange={(e) => setIsFamous(e.target.checked)}
          />
          <Typography sx={{ fontSize: "14px", pl: "58px" }}>
            This person is well known outside their community. Memorials labeled
            as famous are reviewed and managed by RISE.
          </Typography>

          {/* ⭐ CONDITIONAL SECTION */}
          {isFamous && (
            <FamousContainer>
              {/* Fame Rating */}
              <Typography sx={{ fontWeight: 600, mb: 1 }}>
                How famous is this person?
              </Typography>

              <Rating
                value={fameRating}
                onChange={(e, newValue) => setFameRating(newValue)}
              />

              {/* Categories */}
              <Typography sx={{ fontWeight: 600, mt: 2 }}>
                What was this person famous for?
              </Typography>
              <Typography sx={{ fontSize: "13px", mb: 1 }}>
                (Check all that apply)
              </Typography>

              <CategoriesGrid>
                {FAMOUS_CATEGORIES.map((category) => (
                  <FormControlLabel
                    key={category}
                    control={
                      <Checkbox
                        size="small"
                        checked={selectedCategories.includes(category)}
                        onChange={() => toggleCategory(category)}
                      />
                    }
                    label={category}
                  />
                ))}
              </CategoriesGrid>
            </FamousContainer>
          )}
        </NameFields>
      </NameRow>
    </SectionContainer>
  );
});

export default DesignationsSection;
