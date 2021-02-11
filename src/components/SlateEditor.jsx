import React, { useState, useMemo } from "react";
import { createEditor } from "slate";
import { Slate, Editable, withReact } from "slate-react";
import { withHistory } from "slate-history";

const initialValue = [
  {
    type: "paragraph",
    children: [{ text: "This is a paragraph" }],
  },
];

export const SlateEditor = () => {
  const [value, setValue] = useState(
    JSON.parse(localStorage.getItem("editor")) || initialValue
  );
  const editor = useMemo(() => withHistory(withReact(createEditor())), []);

  return (
    <Slate
      editor={editor}
      value={value}
      onChange={(value) => {
        setValue(value);
        localStorage.setItem("editor", JSON.stringify(value));
      }}
    >
      <Editable placeholder="Enter some plain text ..." />
    </Slate>
  );
};
