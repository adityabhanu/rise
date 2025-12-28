// sections/AdditionalInformationSection.jsx
import { forwardRef, useRef, useImperativeHandle } from "react";
import {
  SectionContainer,
  Row,
  Content,
  SectionTitle,
} from "../CemeteryStyles";
import RichTextEditor from "../../../common/RichTextEditor";

const AdditionalInformationSection = forwardRef((_, ref) => {
  const editorRef = useRef(null);

  useImperativeHandle(ref, () => ({
    getData: () => editorRef.current?.getData(),
  }));

  return (
    <SectionContainer>
      <SectionTitle variant="sectionTitle">Additional Information</SectionTitle>

      <Row>
        <Content sx={{ display: "flex", flex: 1 }}>
          <RichTextEditor ref={editorRef} customSX={{flex: 1}} />
        </Content>
      </Row>
    </SectionContainer>
  );
});

export default AdditionalInformationSection;
