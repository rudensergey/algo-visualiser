// Absolute imports
import React from "react";

// Components
import Graph from "@templates/Graph";
import Visualiser from "@templates/Visualiser";
import Menu from "@templates/Menu";

// Types
import { SECTIONS } from "./types";

// Style
import "./style.css";

const Main = () => {
  const [section, setSection] = React.useState(SECTIONS.GRAPHS);

  const mapSectionComponent: Record<SECTIONS, JSX.Element> = {
    [SECTIONS.GRAPHS]: <Graph></Graph>,
    [SECTIONS.SORTING]: <Visualiser></Visualiser>,
  };

  return (
    <div id="main" data-theme={section} className="main">
      <Menu defaultSection={SECTIONS.GRAPHS} menuSections={Object.values(SECTIONS)} setSection={setSection}></Menu>
      {mapSectionComponent[section] ?? <h1>No such a section</h1>}
    </div>
  );
};

export default Main;
