// sections/CemeteryNameSection.jsx
import { forwardRef, useImperativeHandle, useState } from "react";
import { SectionContainer, Row, Content, StyledTextField, SectionTitle } from "../CemeteryStyles";

const CemeteryNameSection = forwardRef((_, ref) => {
  const [name, setName] = useState("");

  useImperativeHandle(ref, () => ({
    getData: () => ({ name }),
  }));

  return (
    <SectionContainer>
      <SectionTitle variant="sectionTitle">Cemetery Name(s)</SectionTitle>

      <Row>
        <Content>
          <StyledTextField
            size="medium"
            fullWidth
            label="Cemetery Name (Required)"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </Content>
      </Row>
    </SectionContainer>
  );
});

export default CemeteryNameSection;
