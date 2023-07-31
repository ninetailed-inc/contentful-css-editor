import React, { useState, useEffect } from "react";
import { FieldAppSDK } from "@contentful/app-sdk";
import { useSDK } from "@contentful/react-apps-toolkit";
import Editor from "react-simple-code-editor";
import { highlight, languages } from "prismjs";
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

  return (
    <>
      <Editor
        value={css}
        onValueChange={(css) => {
          setCss(css);
          contentField.setValue(css);
        }}
        highlight={(css) => highlight(css, languages.css, "css")}
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
