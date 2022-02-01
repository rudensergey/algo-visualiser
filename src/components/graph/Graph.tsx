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
    currentAlgorithm: SUPPORTED_GRAPH_ALGORITMS;
  }>;

  constructor(props: any) {
    super(props);
    this.changeAlgorithm = this.changeAlgorithm.bind(this);
    this.search = this.search.bind(this);

    const matrix = constructMatrix(25);

    this.state = {
      searching: false,
      matrix: matrix,
      currentAlgorithm: SUPPORTED_GRAPH_ALGORITMS.BFS,
    };
  }

  changeAlgorithm(value: SUPPORTED_GRAPH_ALGORITMS) {
    this.setState({ currentAlgorithm: value });
  }

  async search() {
    if (this.state.searching) return;
    else this.setState({ searching: true });

    await this?.[this.state.currentAlgorithm as keyof Graph]?.();
    this.setState({ searching: false });
  }

  async bfs() {}

  render() {
    return (
      <div className={GRAPH.GRAPH}>
        <div className={GRAPH.BUTTONS}>
          <p className={GRAPH.TITLE}>
            {this.state.searching ? STATUS.SEARCHING : STATUS.CHOSE_ALGORITHM}
          </p>
          <Dropdown
            defaultValue={this.state.currentAlgorithm}
            classNames={GRAPH.DROPDOWN}
            onChange={this.changeAlgorithm}
            list={Object.values(SUPPORTED_GRAPH_ALGORITMS)}
          ></Dropdown>
          <Button classNames={GRAPH.BUTTON} onClick={this.search}>
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
