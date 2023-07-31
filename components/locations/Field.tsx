import React, { useState, useEffect } from "react";
import { Paragraph } from "@contentful/f36-components";
import { FieldAppSDK } from "@contentful/app-sdk";
import { /* useCMA, */ useSDK } from "@contentful/react-apps-toolkit";
import Editor from "react-simple-code-editor";
import { highlight, languages } from "prismjs/components/prism-core";
import "prismjs/components/prism-css";
import "prismjs/themes/prism.css";

const CONTENT_FIELD_ID = "css";

const Field = () => {
  const sdk = useSDK<FieldAppSDK>();

  const contentField = sdk.entry.fields[CONTENT_FIELD_ID];
  const [css, setCss] = useState(contentField.getValue());

  useEffect(() => {
    const detach = contentField.onValueChanged((value) => {
      setCss(value);
    });
    return () => detach();
  }, [contentField]);

  /*
     To use the cma, inject it as follows.
     If it is not needed, you can remove the next line.
  */
  // const cma = useCMA();
  // If you only want to extend Contentful's default editing experience
  // reuse Contentful's editor components
  // -> https://www.contentful.com/developers/docs/extensibility/field-editors/
  return (
    <>
      <Editor
        value={css}
        onValueChange={(css) => {
          setCss(css);
          contentField.setValue(css);
        }}
        highlight={(css) => highlight(css, languages.css)}
        padding={10}
        style={{
          fontFamily: '"Fira code", "Fira Mono", monospace',
          fontSize: 14,
        }}
      />
    </>
  );
};

export default Field;
