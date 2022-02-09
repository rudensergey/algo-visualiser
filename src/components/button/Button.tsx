// Absolute imports
import React from "react";

// Components

// Types
import { TButton } from "./types";

// Utils

// Style

export const Button: TButton = ({ classNames, onClick, children }) => (
  <button className={classNames} onClick={onClick}>
    {children}
  </button>
);
