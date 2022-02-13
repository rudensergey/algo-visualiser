// Absolute imports
import React from "react";

// Types
import { VERTEX_STATUS } from "@templates/Graph/Graph.types";
import { IVertexProps, VERTEX } from "./types";

const Vertex: React.FC<IVertexProps> = ({ statusModificator, pressedKey, row, column, changeStatus }) => {
  const onMouseOver = (event) => {
    event.preventDefault();

    if (!pressedKey) return;

    if (statusModificator === null) changeStatus(column, row, VERTEX_STATUS.BLOCKED);
    else changeStatus(column, row, null);
  };

  const onMouseDown = () => {
    if (statusModificator === null) changeStatus(column, row, VERTEX_STATUS.BLOCKED);
    else changeStatus(column, row, null);
  };

  return (
    <div
      onMouseOver={onMouseOver}
      onMouseDown={onMouseDown}
      className={VERTEX.VERTEX + (statusModificator ? `--${statusModificator}` : "")}
    ></div>
  );
};

export default Vertex;
