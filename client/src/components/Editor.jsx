import React from "react";
import MDEditor from "@uiw/react-md-editor";
import style from "../css/editor.module.css";
const Editor = () => {
  const [value, setValue] = React.useState();

  console.log(value);
  return (
    <>
      <MDEditor
        height={380}
        className={style.editor}
        value={value}
        onChange={setValue}
      />
    </>
  );
};

export default Editor;
