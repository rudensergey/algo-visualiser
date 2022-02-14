// Absolute imports
import React from "react";

// Types
import { VERTEX_STATUS } from "@templates/Graph/Graph.types";
import { IVertexProps, VERTEX } from "./types";

const Vertex: React.FC<IVertexProps> = ({
  statusModificator: modificator,
  pressedKey,
  row,
  column,
  changeStatus,
}) => {
  const classNames = React.useMemo(
    () => VERTEX.VERTEX + (modificator ? `--${modificator}` : ""),
    [modificator]
  );

  const onMouseOver = (event) => {
    event.preventDefault();

    if (!pressedKey) return;

    if (modificator === null) changeStatus(column, row, VERTEX_STATUS.BLOCKED);
    else changeStatus(column, row, null);
  };

  const onMouseDown = () => {
    if (modificator === null) changeStatus(column, row, VERTEX_STATUS.BLOCKED);
    else changeStatus(column, row, null);
  };

  return <div onMouseOver={onMouseOver} onMouseDown={onMouseDown} className={classNames}></div>;
};

export default Vertex;
