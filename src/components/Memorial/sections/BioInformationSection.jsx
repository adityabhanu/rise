import React, { forwardRef, useImperativeHandle, useRef } from "react";
import {
  NameLabel,
  NameFields,
  NameRow,
} from "./MemorialStyles";
import RichTextEditor from "../../common/RichTextEditor";

const BioInformationSection = forwardRef((props, ref) => {
  const editorRef = useRef(null);

  useImperativeHandle(ref, () => ({
    getData: () => editorRef.current?.getData(),
  }));

  return (
    <NameRow>
      <NameLabel>Bio information</NameLabel>
      <NameFields>
        <RichTextEditor ref={editorRef} minHeight={150} />
      </NameFields>
    </NameRow>
  );
});

export default BioInformationSection;
