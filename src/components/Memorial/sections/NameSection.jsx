// sections/NameSection.jsx
import { useState, forwardRef, useImperativeHandle } from "react";
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
import BirthDeathSection from "./BirthDeathSection";
import {
  SectionContainer,
  DateRow,
  NameLabel,
  NameFields,
  NameRow,
  StyledTextField,
} from "./MemorialStyles";

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

const NameSection = forwardRef(({ birthDeathRef }, ref) => {
  // UI Toggles
  const [showPrefixSuffix, setShowPrefixSuffix] = useState(false);
  
  // Local form state
  const [localData, setLocalData] = useState({
    firstName: "",
    middleName: "",
    lastName: "",
    prefix: "",
    suffix: "",
    nickName: "",
    maidenName: "",
    gender: "",
  });

  const updateField = (key, value) => {
    setLocalData((prev) => ({ ...prev, [key]: value }));
  };

  // Expose getData to parent via ref
  useImperativeHandle(ref, () => ({
    getData: () => localData,
  }));

  return (
    <SectionContainer>
      <NameRow>
        <NameLabel>Name</NameLabel>
        <NameFields>
          <Box sx={{ display: "flex", gap: "10px" }}>
            <StyledTextField
              label="First Name(s)"
              size="small"
              value={localData.firstName}
              onChange={(e) => updateField("firstName", e.target.value)}
            />
            <StyledTextField
              label="Middle Name(s)"
              size="small"
              value={localData.middleName}
              onChange={(e) => updateField("middleName", e.target.value)}
            />
            <StyledTextField
              label="Last Name(s)"
              size="small"
              value={localData.lastName}
              onChange={(e) => updateField("lastName", e.target.value)}
            />
          </Box>

          {/* Prefix / Suffix Toggle */}
          <ToggleButton
            sx={{ marginTop: "10px" }}
            label="Show prefix and suffix (Examples: Rev, Dr, Sr, Jr, III)"
            checked={showPrefixSuffix}
            onChange={(e) => setShowPrefixSuffix(e.target.checked)}
          />

          {showPrefixSuffix && (
            <NameRow sx={{ paddingLeft: "30px" }}>
              <StyledTextField
                select
                label="Prefix (type or choose)"
                value={localData.prefix}
                onChange={(e) => updateField("prefix", e.target.value)}
                size="small"
                SelectProps={{ MenuProps: { transitionDuration: 0 } }}
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
                value={localData.suffix}
                onChange={(e) => updateField("suffix", e.target.value)}
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
            <TextField
              label="Nickname"
              size="small"
              value={localData.nickname}
              onChange={(e) => updateField("nickname", e.target.value)}
            />
            <TextField
              label="Maiden Name"
              size="small"
              value={localData.maidenName}
              onChange={(e) => updateField("maidenName", e.target.value)}
            />
          </NameRow>
        </NameFields>
      </NameRow>

      {/* Gender */}
      <NameRow display="flex" alignItems="center" gap={2}>
        <NameLabel>Gender</NameLabel>
        <FormControl>
          <RadioGroup
            row
            name="gender"
            value={localData.gender}
            onChange={(e) => updateField("gender", e.target.value)}
          >
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

      <BirthDeathSection
        birthDate={localData.birthDate}
        deathDate={localData.deathDate}
        onChange={(key, value) => updateField(key, value)}
        ref={birthDeathRef}
      />
    </SectionContainer>
  );
});

export default NameSection;

