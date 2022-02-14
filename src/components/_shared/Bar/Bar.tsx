// Absolute imports
import React from "react";

// Types
import { BAR, IBarProps } from "./Bar.types";

const Bar: React.FC<IBarProps> = ({ value, selected }) => {
  const height = React.useMemo(() => value * 2 + "%", [value]);
  return <div style={{ height }} className={selected ? BAR.SELECTED : BAR.BAR}></div>;
};

export default Bar;
