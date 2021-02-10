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
  const [value, setValue] = useState(initialValue);
  const editor = useMemo(() => withHistory(withReact(createEditor())), []);

  return (
    <Slate editor={editor} value={value} onChange={setValue}>
      <Editable placeholder="Enter some plain text ..." />
    </Slate>
  );
};
