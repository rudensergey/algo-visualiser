import * as React from "react";

export const Bar: React.FC<{ value: number; selected: boolean }> = ({
  value,
  selected,
}) => (
  <div
    style={{ height: value * 2 + "%" }}
    className={
      "visualizer__item " + (selected ? "visualizer__item--selected" : "")
    }
  ></div>
);
