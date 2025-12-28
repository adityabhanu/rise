// sections/DescriptionSection.jsx
import { forwardRef, useImperativeHandle, useRef } from "react";
import {
  SectionContainer,
  Row,
  Label,
  Content,
  SectionTitle,
} from "../CemeteryStyles";
import RichTextEditor from "../../../common/RichTextEditor";

const DescriptionSection = forwardRef((_, ref) => {
  const editorRef = useRef(null);

  useImperativeHandle(ref, () => ({
    getData: () => editorRef.current?.getData(),
  }));

  return (
    <SectionContainer>
      <SectionTitle variant="sectionTitle">Description</SectionTitle>

      <Row>
        <Content sx={{ display: "flex", flex: 1 }}>
          <RichTextEditor
            customSX={{ flex: 1 }}
            ref={editorRef}
          />
        </Content>
      </Row>
    </SectionContainer>
  );
});

export default DescriptionSection;
