// BurialDetailsSection.jsx
import { Box, Button, TextField, MenuItem, Alert } from "@mui/material";
import { styled } from "@mui/material/styles";

const SectionContainer = styled(Box)(({ theme }) => ({
  background: theme.palette.background.paper,
  borderRadius: 8,
  marginTop: 16,
}));

const StyledAlert = styled(Alert)(({ theme }) => ({
  backgroundColor: "#FFF8E1",
  color: "#6A571A",
  marginBottom: 16,
  padding: "12px 16px",
  borderRadius: 8,
  fontSize: 14,
}));

const burialTypeOptions = [
  { id: 1, label: "Buried or Lost at Sea", value: "buried_or_lost_at_sea" },
  { id: 2, label: "Cremated", value: "cremated" },
  { id: 3, label: "Donated to Medical Science", value: "donated_to_science" },
  { id: 4, label: "Lost at War", value: "lost_at_war" },
  { id: 5, label: "Animal/Pet", value: "animal_pet" },
  { id: 6, label: "Burial Details Unknown", value: "burial_details_unknown" },
  { id: 7, label: "Other…", value: "other" },
];

const otherBurialTypeOptions = [
  { id: 1, label: "Aquamation", value: "aquamation" },
  { id: 2, label: "Terramation", value: "terramation" },
  { id: 3, label: "Green burial", value: "green_burial" },
];

export default function BurialDetailsSection({
  burialType,
  setBurialType,
  otherBurialType,
  setOtherBurialType,
  burialDetails,
  setBurialDetails,
}) {
  return (
    <SectionContainer>
      {/* Yellow alert */}
      <StyledAlert icon={<span>⚠️</span>}>
        <strong>Know the burial location?</strong> If you're waiting for burial
        details, please wait to create the memorial until the location is known.
        If you know they aren't buried in a cemetery, choose a type below.
      </StyledAlert>

      <Box sx={{ display: "flex", gap: 2, mb: 2 }}>
        {/* Burial type dropdown */}
        <TextField
          select
          label="Burial Type"
          fullWidth
          value={burialType}
          onChange={(e) => setBurialType(e.target.value)}
          sx={{ mb: 2 }}
        >
          <MenuItem disabled value="">
            Choose…
          </MenuItem>
          {burialTypeOptions.map((item, idx) => {
            return <MenuItem value={item.value}>{item.label}</MenuItem>;
          })}
        </TextField>

        {/* ▼ Second dropdown when "Other" is selected */}
        {burialType === "other" && (
          <TextField
            select
            label="Other Burial Type"
            fullWidth
            value={otherBurialType}
            onChange={(e) => setOtherBurialType(e.target.value)}
            sx={{ mb: 2 }}
          >
            <MenuItem disabled value="">
              Choose…
            </MenuItem>

            {otherBurialTypeOptions.map((opt) => (
              <MenuItem key={opt.id} value={opt.value}>
                {opt.label}
              </MenuItem>
            ))}
          </TextField>
        )}
      </Box>

      {/* Additional details */}
      <TextField
        label="Add any other burial details (OPTIONAL)"
        fullWidth
        multiline
        minRows={4}
        value={burialDetails}
        onChange={(e) => setBurialDetails(e.target.value)}
      />

      {/* Continue Button */}
      <Box sx={{ mt: 3 }}>
        <Button
          variant="contained"
          sx={{
            padding: "8px 26px",
            fontWeight: 600,
            boxShadow: "none",
          }}
        >
          Continue
        </Button>
      </Box>
    </SectionContainer>
  );
}
