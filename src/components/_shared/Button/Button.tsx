// Absolute imports
import React from "react";

// Types
import { TButton } from "./types";

const Button: TButton = ({ classNames, onClick, children }) => (
  <button className={classNames} onClick={onClick}>
    {children}
  </button>
);

export default Button;
