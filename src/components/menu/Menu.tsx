// Absolute imports
import * as React from "react";

// Components
import { Dropdown } from "../dropdown/Dropdown";

// Types
import { SECTIONS, TMenu } from "../main/types";

// Utils

// Style
import "./style.css";

export const Menu: TMenu = ({ menuSections, setSection, defaultSection }) => {
  return (
    <div className="menu">
      <Dropdown
        classNames="menu__dropdown"
        defaultValue={defaultSection}
        list={menuSections}
        onChange={setSection}
      ></Dropdown>
    </div>
  );
};
