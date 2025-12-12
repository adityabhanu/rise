import {
  Box,
  TextField,
  Typography,
  MenuItem,
  FormControlLabel,
  Checkbox,
} from "@mui/material";
import { styled } from "@mui/material/styles";
import { useState } from "react";
import {
  SectionContainer,
  DateRow,
  NameLabel,
  NameFields,
  NameRow,
} from "./MemorialStyles";

const BrowseTypogrpahy = styled(Typography)(({ theme }) => ({
  color: theme.palette.text.secondary,
  cursor: "pointer",
  fontSize: "14px",
  whiteSpace: "nowrap",
  "&:hover": {
    color: theme.palette.text.primary,
  },
}));

export default function BirthDeathSection() {
  const [birth, setBirth] = useState({
    day: "",
    month: "",
    year: "",
    location: "",
  });
  const [death, setDeath] = useState({
    day: "",
    month: "",
    year: "",
    location: "",
  });

  const [showAgeAtDeath, setShowAgeAtDeath] = useState(false);
  const [ageAtDeath, setAgeAtDeath] = useState({
    years: "",
    months: "",
    days: "",
  });

  const MONTHS = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];

  return (
    <SectionContainer>
      {/* Birth Section */}
      <DateRow>
        <NameLabel>Birth</NameLabel>

        <NameFields>
          <DateRow>
            <TextField
              label="Day"
              size="small"
              sx={{ width: "80px" }}
              value={birth.day}
              onChange={(e) => setBirth({ ...birth, day: e.target.value })}
            />

            <TextField
              select
              label="Month"
              size="small"
              sx={{ width: "130px" }}
              value={birth.month}
              onChange={(e) => setBirth({ ...birth, month: e.target.value })}
            >
              <MenuItem value="" disabled>
                Select
              </MenuItem>
              {MONTHS.map((m) => (
                <MenuItem key={m} value={m}>
                  {m}
                </MenuItem>
              ))}
            </TextField>

            <TextField
              label="Year"
              size="small"
              sx={{ width: "100px" }}
              value={birth.year}
              onChange={(e) => setBirth({ ...birth, year: e.target.value })}
            />

            <TextField
              label="Location"
              size="small"
              value={birth.location}
              onChange={(e) => setBirth({ ...birth, location: e.target.value })}
            />

            <BrowseTypogrpahy>Browse</BrowseTypogrpahy>
          </DateRow>
        </NameFields>
      </DateRow>

      {/* Death Section */}
      <DateRow>
        <NameLabel>Death</NameLabel>

        <NameFields>
          <DateRow>
            <TextField
              label="Day"
              size="small"
              sx={{ width: "80px" }}
              value={death.day}
              onChange={(e) => setDeath({ ...death, day: e.target.value })}
            />

            <TextField
              select
              label="Month"
              size="small"
              sx={{ width: "130px" }}
              value={death.month}
              onChange={(e) => setDeath({ ...death, month: e.target.value })}
            >
              <MenuItem value="" disabled>
                Select
              </MenuItem>
              {MONTHS.map((m) => (
                <MenuItem key={m} value={m}>
                  {m}
                </MenuItem>
              ))}
            </TextField>

            <TextField
              label="Year"
              size="small"
              sx={{ width: "100px" }}
              value={death.year}
              onChange={(e) => setDeath({ ...death, year: e.target.value })}
            />

            <TextField
              label="Location"
              size="small"
              value={death.location}
              onChange={(e) => setDeath({ ...death, location: e.target.value })}
            />

            <BrowseTypogrpahy>Browse</BrowseTypogrpahy>
          </DateRow>
        </NameFields>
      </DateRow>
      {/* Age at Death */}
      <DateRow>
        <NameLabel></NameLabel>
        <FormControlLabel
          control={
            <Checkbox
              checked={showAgeAtDeath}
              onChange={(e) => setShowAgeAtDeath(e.target.checked)}
              sx={{ mr: 1, padding: 0 }}
            />
          }
          label="Grave marker includes age at death"
        />
      </DateRow>
      {showAgeAtDeath && (
        <>
          <DateRow>
            <NameLabel></NameLabel>
            <Box sx={{ display: "flex", flexDirection: "column", gap: "10px" }}>
              <DateRow>
                <TextField
                  label="Years"
                  size="small"
                  sx={{ width: "100px" }}
                  value={ageAtDeath.years}
                  onChange={(e) =>
                    setAgeAtDeath({ ...ageAtDeath, years: e.target.value })
                  }
                />

                <TextField
                  label="Months"
                  size="small"
                  sx={{ width: "100px" }}
                  value={ageAtDeath.months}
                  onChange={(e) =>
                    setAgeAtDeath({ ...ageAtDeath, months: e.target.value })
                  }
                />

                <TextField
                  label="Days"
                  size="small"
                  sx={{ width: "100px" }}
                  value={ageAtDeath.days}
                  onChange={(e) =>
                    setAgeAtDeath({ ...ageAtDeath, days: e.target.value })
                  }
                />
              </DateRow>
              <Typography
                sx={{ fontSize: "12px", color: "text.secondary", mt: "-5px" }}
              >
                Add only if noted on grave marker.
              </Typography>
            </Box>
          </DateRow>
        </>
      )}
    </SectionContainer>
  );
}
