import * as React from "react";
import "./style.css";

export const Bar: React.FC<{ value: number; selected: boolean }> = ({
  value,
  selected,
}) => (
  <div
    style={{ height: value * 2 + "%" }}
    className={"bar" + (selected ? " bar--selected" : "")}
  ></div>
);
