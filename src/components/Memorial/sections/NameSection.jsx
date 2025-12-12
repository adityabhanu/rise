// sections/NameSection.jsx
import {
  Box,
  TextField,
  Typography,
  MenuItem,
  FormControlLabel,
  RadioGroup,
  Radio,
  FormControl,
} from "@mui/material";
import { styled } from "@mui/material/styles";
import ToggleButton from "../../common/ToggleButton";
import { useState } from "react";
import BirthDeathSection from "./BirthDeathSection";
import {
  SectionContainer,
  DateRow,
  NameLabel,
  NameFields,
  NameRow,
} from "./MemorialStyles";

const StyledTextField = styled(TextField)(({theme}) => ({
    flex: 1,
}))
const PREFIX_OPTIONS = [
  "Mrs",
  "Dr",
  "Judge",
  "Deacon",
  "Elder",
  "Rabbi",
  "Rev",
  "Rev Fr",
  "Br",
  "Sr",
  "1LT",
  "1SGT",
  "2LT",
  "A1C",
  "AB",
  "ADM",
  "AMN",
  "BG",
  "CCM",
  "CDR",
  "CMSAF",
  "CMSGT",
  "COL",
  "CPL",
  "CPO",
  "CPT",
  "CSM",
  "CWO",
  "ENS",
  "FLT O",
  "GEN",
  "GYSGT",
  "LCDR",
  "LCPL",
  "LT",
  "LTC",
  "LTG",
  "LTJG",
  "MAJ",
  "MCPO",
  "MCPON",
  "MG",
  "MGYSGT",
  "MSGT",
  "PFC",
  "PO",
  "PVT",
  "RADM",
  "RDML",
  "SA",
  "SCPO",
  "SFC",
  "SGM",
  "SGT",
  "SGTMAJMC",
  "SMA",
  "SMSGT",
  "SN",
  "SPC",
  "SR",
  "SRA",
  "SSGT",
  "TSGT",
  "VADM",
  "WO",
];

const SUFFIX_OPTIONS = ["Jr", "Sr", "I", "II", "III", "IV", "V", "VI"];

export default function NameSection() {
  const [showPrefixSuffix, setShowPrefixSuffix] = useState(false);
  const [prefix, setPrefix] = useState("");
  const [suffix, setSuffix] = useState("");

  return (
    <SectionContainer>
      <NameRow>
        <NameLabel>Name</NameLabel>
        <NameFields>
          <Box sx={{ display: "flex", gap: "10px" }}>
            <StyledTextField label="First Name(s)" size="small" />
            <StyledTextField label="Middle Name(s)" size="small" />
            <StyledTextField label="Last Name(s)" size="small" />
          </Box>

          {/* Prefix / Suffix Toggle */}
          <ToggleButton sx={{marginTop: "10px"}}
            label="Show prefix and suffix (Examples: Rev, Dr, Sr, Jr, III)"
            checked={showPrefixSuffix}
            onChange={(e) => setShowPrefixSuffix(e.target.checked)}
          />

          {showPrefixSuffix && (
            <NameRow sx={{paddingLeft: "30px"}}>
              <StyledTextField
                select
                label="Prefix (type or choose)"
                value={prefix}
                onChange={(e) => setPrefix(e.target.value)}
                size="small"
                SelectProps={{
                  MenuProps: {
                    transitionDuration: 0,
                  },
                }}
              >
                {PREFIX_OPTIONS.map((p) => (
                  <MenuItem key={p} value={p}>
                    {p}
                  </MenuItem>
                ))}
              </StyledTextField>

              <StyledTextField
                select
                label="Suffix (type or choose)"
                value={suffix}
                onChange={(e) => setSuffix(e.target.value)}
                size="small"
              >
                {SUFFIX_OPTIONS.map((s) => (
                  <MenuItem key={s} value={s}>
                    {s}
                  </MenuItem>
                ))}
              </StyledTextField>
            </NameRow>
          )}

          <NameRow>
            <TextField label="Nickname" size="small" />
            <TextField label="Maiden Name" size="small" />
          </NameRow>
        </NameFields>
      </NameRow>
      {/* Gender */}
      <NameRow display="flex" alignItems="center" gap={2}>
        <NameLabel>Gender</NameLabel>

        <FormControl>
          <RadioGroup row name="gender">
            <FormControlLabel
              value="male"
              control={<Radio size="small" />}
              label="Male"
            />
            <FormControlLabel
              value="female"
              control={<Radio size="small" />}
              label="Female"
            />
          </RadioGroup>
        </FormControl>
      </NameRow>
      <BirthDeathSection />
    </SectionContainer>
  );
}
