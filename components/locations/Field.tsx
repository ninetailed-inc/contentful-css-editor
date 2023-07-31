import React, { useState, useEffect } from "react";
import { FieldAppSDK } from "@contentful/app-sdk";
import { useSDK } from "@contentful/react-apps-toolkit";
import Editor from "@monaco-editor/react";

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
        height="100vh"
        defaultValue={css}
        defaultLanguage="css"
        onChange={(value, event) => {
          setCss(value);
          contentField.setValue(value);
        }}
      />
    </>
  );
};

export default Field;
