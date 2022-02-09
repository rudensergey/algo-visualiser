// Absolute imports
import React from "react";

// Types
import { VERTEX_STATUS } from "@templates/Graph/types";

// Style
import "./style.css";

const Vertex: React.FC<{
  row: number;
  column: number;
  pressedKey: boolean;
  mainClass: string;
  statusModificator: VERTEX_STATUS;
  changeStatus: (c: number, r: number, status: VERTEX_STATUS) => void;
}> = ({ mainClass, statusModificator, pressedKey, row, column, changeStatus }) => {
  const onMouseOver = (event) => {
    event.preventDefault();

    if (!pressedKey) return;

    if (statusModificator === null) {
      changeStatus(column, row, VERTEX_STATUS.BLOCKED);
    } else changeStatus(column, row, null);
  };

  const onMouseDown = () => {
    if (statusModificator === null) {
      changeStatus(column, row, VERTEX_STATUS.BLOCKED);
    } else changeStatus(column, row, null);
  };

  return (
    <div
      onMouseOver={onMouseOver}
      onMouseDown={onMouseDown}
      className={mainClass + (statusModificator ? `--${statusModificator}` : "")}
    ></div>
  );
};

export default Vertex;