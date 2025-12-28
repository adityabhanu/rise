// sections/ContactInfoSection.jsx
import { forwardRef, useImperativeHandle, useState } from "react";
import { Box } from "@mui/material";

import {
  SectionContainer,
  Row,
  Content,
  SectionTitle,
  StyledTextField
} from "../CemeteryStyles";

const ContactInfoSection = forwardRef((_, ref) => {
  const [data, setData] = useState({
    email: "",
    website: "",
    phone: "",
    address: "",
  });

  useImperativeHandle(ref, () => ({
    getData: () => data,
  }));

  const handleChange = (field) => (e) => {
    setData((prev) => ({ ...prev, [field]: e.target.value }));
  };

  return (
    <SectionContainer>
      <SectionTitle variant="sectionTitle">Contact Info</SectionTitle>
    <Box>
      {/* Email + Website */}
      <Row>
        <Content
          sx={{
            display: "grid",
            gridTemplateColumns: "1fr 1fr",
            gap: 2,
          }}
        >
          <StyledTextField
            fullWidth
            size="medium"
            label="Email"
            value={data.email}
            onChange={handleChange("email")}
          />

          <StyledTextField
            fullWidth
            size="medium"
            label="Website (https://www.example.com)"
            value={data.website}
            onChange={handleChange("website")}
          />
        </Content>
      </Row>

      {/* Phone */}
      <Row>
        <Content>
          <StyledTextField
            fullWidth
            size="medium"
            label="Phone"
            value={data.phone}
            onChange={handleChange("phone")}
          />
        </Content>
      </Row>

      {/* Office Address */}
      <Row>
        <Content>
          <StyledTextField
            fullWidth
            multiline
            minRows={3}
            size="medium"
            label="Office Address"
            value={data.address}
            onChange={handleChange("address")}
          />

        </Content>
      </Row>
      </Box>
    </SectionContainer>
  );
});

export default ContactInfoSection;
