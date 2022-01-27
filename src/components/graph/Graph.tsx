// Absolute imports
import * as React from "react";
import { Button } from "../button/Button";
import { Dropdown } from "../dropdown/Dropdown";

// Components

// Types

// Utils

// Style
import "./style.css";
import { GRAPH, SUPPORTED_GRAPH_ALGORITMS, STATUS } from "./types";

export class Graph extends React.Component {
  state: Readonly<{
    searching: Boolean;
  }>;

  constructor(props) {
    super(props);
    this.state = { searching: false };
  }

  render() {
    return (
      <div className={GRAPH.GRAPH}>
        <div className={GRAPH.BUTTONS}>
          <p className={GRAPH.TITLE}>
            {this.state.searching ? STATUS.SEARCHING : STATUS.CHOSE_ALGORITHM}
          </p>
          <Dropdown
            classNames={GRAPH.DROPDOWN}
            onChange={() => {}}
            list={Object.values(SUPPORTED_GRAPH_ALGORITMS)}
          ></Dropdown>
          <Button classNames={GRAPH.BUTTON} onClick={() => {}}>
            Search
          </Button>
        </div>
        <div className={GRAPH.BOX}></div>
      </div>
    );
  }
}
