/* eslint-disable default-case */
import React, { useState, useMemo } from "react";
import { Slate, Editable, withReact } from "slate-react";
import { withHistory } from "slate-history";
import { createEditor } from "slate";

import { DefaultElement } from "./DefaultElement";
import { CustomEditor } from "./CustomEditor";
import { CodeElement } from "./CodeELement";
import { Leaf } from "./Leaf";

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

  const onKeyDown = (e) => {
    if (!e.ctrlKey) return null;

    switch (e.key) {
      case "`": {
        e.preventDefault();
        CustomEditor.toggleCodeBlock(editor);
        break;
      }

      case "b": {
        e.preventDefault();
        CustomEditor.toggleBoldMark(editor);
        break;
      }
    }
  };

  const renderLeaf = (props) => <Leaf {...props} />;

  return (
    <Slate editor={editor} value={value} onChange={setValue}>
      <div className="toolbar">
        <button onClick={() => CustomEditor.toggleBoldMark(editor)}>
          Bold
        </button>
        <button onClick={() => CustomEditor.toggleCodeBlock(editor)}>
          Code Block
        </button>
      </div>

      <Editable
        placeholder="Enter some plain text ..."
        renderElement={renderElement}
        renderLeaf={renderLeaf}
        onKeyDown={onKeyDown}
      />
    </Slate>
  );
};
