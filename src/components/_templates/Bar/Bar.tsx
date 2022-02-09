// Absolute imports
import React from "react";

// Types
import { TBar } from "./types";

// Style
import "./style.css";

const Bar: TBar = ({ value, selected }) => (
  <div style={{ height: value * 2 + "%" }} className={"bar" + (selected ? " bar--selected" : "")}></div>
);

export default Bar;
