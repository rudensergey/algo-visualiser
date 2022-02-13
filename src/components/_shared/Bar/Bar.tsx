// Absolute imports
import React from "react";

// Types
import { BAR, IBarProps } from "./types";

const Bar: React.FC<IBarProps> = ({ value, selected }) => (
  <div style={{ height: value * 2 + "%" }} className={selected ? BAR.SELECTED : BAR.BAR}></div>
);

export default Bar;
