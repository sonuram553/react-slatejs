import React, { useState, useMemo } from "react";
import { createEditor, Transforms, Editor } from "slate";
import { Slate, Editable, withReact } from "slate-react";
import { withHistory } from "slate-history";

import { CodeElement } from "./CodeELement";
import { DefaultElement } from "./DefaultElement";

const initialValue = [
  {
    type: "paragraph",
    children: [{ text: "This is first paragraph" }],
  },

  {
    type: "paragraph",
    children: [{ text: "This is second paragraph" }],
  },
];

export const SlateEditor = () => {
  const [value, setValue] = useState(initialValue);
  const editor = useMemo(() => withHistory(withReact(createEditor())), []);

  const renderElement = (props) => {
    switch (props.element.type) {
      case "code":
        return <CodeElement {...props} />;

      default:
        return <DefaultElement {...props} />;
    }
  };

  return (
    <Slate editor={editor} value={value} onChange={setValue}>
      <Editable
        placeholder="Enter some plain text ..."
        renderElement={renderElement}
        onKeyDown={(e) => {
          if (e.key === "`" && e.ctrlKey) {
            e.preventDefault();

            const [match] = Editor.nodes(editor, {
              match: (n) => n.type === "code",
            });

            Transforms.setNodes(
              editor,
              { type: match ? "paragraph" : "code" },
              { match: (n) => Editor.isBlock(editor, n) }
            );
          }
        }}
      />
    </Slate>
  );
};
