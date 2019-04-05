import React, { useState, useEffect } from "react";
import ReactDOM from "react-dom";
import TextareaAutosize from "react-textarea-autosize";
import LZUTF8 from "lzutf8";
import "./index.css";

function Editor() {
  const [text, setText] = useState("");
  const updateText = text => {
    const compressed = LZUTF8.compress(text, { outputEncoding: "Base64" });
    window.location.hash = "#" + compressed;
    document.title = `${text} ${text.length > 0 ? " ‒ " : ""}URL to thought`;
    setText(text);
  };

  useEffect(() => {
    const parsedUrl = new URL(window.location.href);
    const encoded = parsedUrl.hash.substring(1);
    const text = LZUTF8.decompress(encoded, { inputEncoding: "Base64" });
    setText(text);
    document.title = `${text} ${text.length > 0 ? " ‒ " : ""}URL to thought`;
  }, []);

  return (
    <>
      <TextareaAutosize
        autoFocus
        spellCheck={false}
        value={text}
        onChange={e => updateText(e.target.value)}
      />
      <div id="char-count">{text.length} characters</div>
    </>
  );
}

ReactDOM.render(<Editor />, document.getElementById("root"));
