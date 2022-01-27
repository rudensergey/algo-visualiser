// Absolute imports
import * as React from "react";

// Components
import { Dropdown } from "../dropdown/Dropdown";

// Types
import { TMenu } from "../main/types";

// Utils

// Style
import "./style.css";

export const Menu: TMenu = ({ menuSections, setSection }) => {
  return (
    <div className="menu">
      <Dropdown
        classNames="menu__dropdown"
        list={menuSections}
        onChange={setSection}
      ></Dropdown>
    </div>
  );
};
