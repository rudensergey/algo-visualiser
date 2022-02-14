// Absolute imports
import React from "react";

// Types
import { IVisualBoxProps, mapTypeToClasses, VISUAL_BOX } from "./VisualBox.types";

const VisualBox: React.FC<IVisualBoxProps> = ({ children, type }) => (
  <div className={type ? mapTypeToClasses[type] : VISUAL_BOX.WRAPPER}>{children}</div>
);

export default VisualBox;
