// Absolute imports
import * as React from "react";

// Components

// Types
import { VERTEX_STATUS } from "../graph/types";

// Utils

// Style
import "./style.css";

export const Vertex: React.FC<{
  mainClass: string;
  statusModificator: VERTEX_STATUS;
}> = ({ mainClass, statusModificator }) => {
  return (
    <div
      className={
        mainClass + (statusModificator ? `--${statusModificator}` : "")
      }
    ></div>
  );
};
