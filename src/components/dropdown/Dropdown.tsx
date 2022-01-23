// Absolute imports
import * as React from "react";

// Components

// Types
import { TDropdown } from "./types";

// Utils
import { getUniqueId } from "../../utils/common";

// Style
import "./style.css";

export const Dropdown: TDropdown = ({ list, classNames, onChange }) => {
  const id = getUniqueId();

  const showList = () => {};

  const hideList = () => {};

  return (
    <div
      className={classNames}
      id={id}
      onMouseOver={showList}
      onMouseLeave={hideList}
    >
      {list[0]}
    </div>
  );
};
