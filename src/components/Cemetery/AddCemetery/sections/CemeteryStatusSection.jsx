// sections/CemeteryStatusSection.jsx
import { forwardRef, useImperativeHandle, useState } from "react";
import { RadioGroup, FormControlLabel, Radio, Tooltip } from "@mui/material";
import InfoOutlinedIcon from "@mui/icons-material/InfoOutlined";

import {
  SectionContainer,
  Row,
  Content,
  SectionTitle,
} from "../CemeteryStyles";

const CemeteryStatusSection = forwardRef((_, ref) => {
  const [status, setStatus] = useState("public");

  useImperativeHandle(ref, () => ({
    getData: () => {
      return { status: status };
    },
  }));

  return (
    <SectionContainer>
      <SectionTitle
        variant="sectionTitle"
        sx={{ display: "flex", alignItems: "center", gap: 1 }}
      >
        Cemetery Status
        <Tooltip title="Select “Private” if the cemetery is on private property and requires special permission to visit, or “No Longer Exists” if the cemetery has been moved, whether or not it still contains interments.">
          <InfoOutlinedIcon fontSize="small" color="action" />
        </Tooltip>
      </SectionTitle>

      <Row>
        <Content>
          <RadioGroup
            value={status}
            onChange={(e) => setStatus(e.target.value)}
          >
            <FormControlLabel
              value="public"
              control={<Radio />}
              label="Publicly Accessible"
            />
            <FormControlLabel
              value="private"
              control={<Radio />}
              label="Private"
            />
            <FormControlLabel
              value="removed"
              control={<Radio />}
              label="No Longer Exists or Has Been Removed"
            />
          </RadioGroup>
        </Content>
      </Row>
    </SectionContainer>
  );
});

export default CemeteryStatusSection;
