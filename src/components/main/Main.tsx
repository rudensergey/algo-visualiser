// Absolute imports
import * as React from "react";
import { Menu } from "../menu/Menu";
import { Visualiser } from "../visualiser/Visualiser";

// Components

// Types

// Utils

// Style
import "./style.css";
import { SECTIONS } from "./types";

export const Main = () => {
  const [section, setSection] = React.useState(SECTIONS.SORTING);

  return (
    <div className="main">
      <Menu
        menuSections={Object.values(SECTIONS)}
        setSection={setSection}
      ></Menu>
      {section === SECTIONS.SORTING ? (
        <Visualiser></Visualiser>
      ) : (
        <h1>Not ready yet</h1>
      )}
    </div>
  );
};
