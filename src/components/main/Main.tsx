// Absolute imports
import * as React from "react";

// Components
import { Graph } from "../graph/Graph";
import { Menu } from "../menu/Menu";
import { Visualiser } from "../visualiser/Visualiser";

// Types
import { SECTIONS } from "./types";

// Utils

// Style
import "./style.css";

export const Main = () => {
  const [section, setSection] = React.useState(SECTIONS.GRAPHS);

  const mapSectionComponent: Record<SECTIONS, JSX.Element> = {
    [SECTIONS.GRAPHS]: <Graph></Graph>,
    [SECTIONS.SORTING]: <Visualiser></Visualiser>,
  };

  return (
    <div id="main" data-theme={section} className="main">
      <Menu
        menuSections={Object.values(SECTIONS)}
        setSection={setSection}
      ></Menu>
      {mapSectionComponent[section] ?? <h1>No such a section</h1>}
    </div>
  );
};
