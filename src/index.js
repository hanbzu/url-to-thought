import React, { useState } from "react";
import ReactDOM from "react-dom";
import LZUTF8 from "lzutf8";
import "./index.css";

var parsedUrl = new URL(window.location.href);

console.log(parsedUrl.hash);

function Editor() {
  const [text, setText] = useState("");
  const updateText = text => {
    const compressed = LZUTF8.compress(text, { outputEncoding: "Base64" });
    window.location.hash = "#" + compressed;
    setText(text);
  };

  return (
    <>
      <div>{text.length}</div>
      <textarea value={text} onChange={e => updateText(e.target.value)} />
    </>
  );
}

ReactDOM.render(<Editor />, document.getElementById("root"));

window.location.hash = "#doing";
