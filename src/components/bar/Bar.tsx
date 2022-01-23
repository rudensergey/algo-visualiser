// Absolute imports
import * as React from "react";

// Components

// Types
import { TBar } from "./types";

// Utils

// Style
import "./style.css";

export const Bar: TBar = ({ value, selected }) => (
  <div
    style={{ height: value * 2 + "%" }}
    className={"bar" + (selected ? " bar--selected" : "")}
  ></div>
);
