// Absolute imports
import * as React from "react";

// Components
import { Vertex } from "../vertex/Vertex";
import { Button } from "../button/Button";
import { Dropdown } from "../dropdown/Dropdown";

// Types
import { GRAPH, SUPPORTED_GRAPH_ALGORITMS, STATUS, TMatrix } from "./types";

// Utils
import { constructMatrix } from "../../utils/common";

// Style
import "./style.css";

export class Graph extends React.Component {
  state: Readonly<{
    searching: Boolean;
    matrix: TMatrix;
  }>;

  constructor(props) {
    super(props);

    const matrix = constructMatrix(25);

    this.state = {
      searching: false,
      matrix: matrix,
    };
  }

  render() {
    return (
      <div className={GRAPH.GRAPH}>
        <div className={GRAPH.BUTTONS}>
          <p className={GRAPH.TITLE}>
            {this.state.searching ? STATUS.SEARCHING : STATUS.CHOSE_ALGORITHM}
          </p>
          <Dropdown
            defaultValue={SUPPORTED_GRAPH_ALGORITMS.BFS}
            classNames={GRAPH.DROPDOWN}
            onChange={() => {}}
            list={Object.values(SUPPORTED_GRAPH_ALGORITMS)}
          ></Dropdown>
          <Button classNames={GRAPH.BUTTON} onClick={() => {}}>
            Search
          </Button>
        </div>
        <div className={GRAPH.BOX}>
          {this.state.matrix.map((row) =>
            row.map((vertex) => (
              <Vertex
                statusModificator={vertex.status}
                mainClass={GRAPH.VERTEX}
              ></Vertex>
            )),
          )}
        </div>
      </div>
    );
  }
}
