// Absolute imports
import React from "react";

// Components
import Dropdown from "@shared/Dropdown";

// Types

// Style
import "./style.css";

const Menu = ({ menuSections, setSection, defaultSection }) => {
  return (
    <div className="menu">
      <p className="menu__section">Section:</p>
      <Dropdown defaultValue={defaultSection} list={menuSections} onChange={setSection}></Dropdown>
    </div>
  );
};

export default Menu;
