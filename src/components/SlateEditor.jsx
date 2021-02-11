import React, { useState, useMemo } from "react";
import { createEditor, Node } from "slate";
import { Slate, Editable, withReact } from "slate-react";
import { withHistory } from "slate-history";

const initialValue = [
  {
    type: "paragraph",
    children: [{ text: "This is a paragraph" }],
  },
];

const serialize = (value) => {
  return value.map((n) => Node.string(n)).join("\n");
};

const deserialize = (string) =>
  string &&
  string.split("\n").map((line) => ({
    children: [{ text: line }],
  }));
  
export const SlateEditor = () => {
  const [value, setValue] = useState(
    deserialize(localStorage.getItem("editor")) || initialValue
  );
  const editor = useMemo(() => withHistory(withReact(createEditor())), []);

  return (
    <Slate
      editor={editor}
      value={value}
      onChange={(value) => {
        setValue(value);
        localStorage.setItem("editor", serialize(value));
      }}
    >
      <Editable placeholder="Enter some plain text ..." />
    </Slate>
  );
};
