import React from "react";
import "./index.css";

const Button = (props) => {
  let { text, onPress } = props;
  return (
    <div id="button" onClick={onPress}>
      <p id="text">{text}</p>
    </div>
  );
};

export default Button;
