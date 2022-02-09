// Absolute imports
import React from "react";

// Components
import Dropdown from "@shared/Dropdown";

// Types
import { TMenu } from "../Main/types";

// Style
import "./style.css";

const Menu: TMenu = ({ menuSections, setSection, defaultSection }) => {
  return (
    <div className="menu">
      <p className="menu__section">Section:</p>
      <Dropdown
        classNames="menu__dropdown"
        defaultValue={defaultSection}
        list={menuSections}
        onChange={setSection}
      ></Dropdown>
    </div>
  );
};

export default Menu;
