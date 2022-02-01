// Absolute imports
import * as React from "react";

// Components
import { Vertex } from "../vertex/Vertex";
import { Button } from "../button/Button";
import { Dropdown } from "../dropdown/Dropdown";

// Types
import {
  GRAPH,
  SUPPORTED_GRAPH_ALGORITMS,
  STATUS,
  IVertex,
  VERTEX_STATUS,
} from "./types";

// Utils
import { constructMatrix, wait } from "../../utils/common";

// Style
import "./style.css";

export class Graph extends React.Component {
  state: Readonly<{
    searching: Boolean;
    matrix: any;
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

  async bfs() {
    const self = this;

    const n = 25;

    const rowStack = [];
    const columnStack = [];

    const verticalVector = [0, 0, 1, -1];
    const horizontalVector = [-1, 1, 0, 0];

    const { column, row } = this.state.matrix[0][0];

    rowStack.push(row);
    columnStack.push(column);

    await wait(10).then(() =>
      self.setVertexStatus(column, row, VERTEX_STATUS.VISITED),
    );

    while (rowStack.length) {
      const x = columnStack.shift();
      const y = rowStack.shift();

      await exploreNeighbours(x, y);
    }

    async function exploreNeighbours(c: number, r: number) {
      for (let i = 0; i < 4; i++) {
        const row = r + verticalVector[i];
        const column = c + horizontalVector[i];

        if (column < 0 || column >= n) continue;
        if (row < 0 || row >= n) continue;
        if (self.isVisited(column, row)) continue;

        await wait(10).then(() => {
          rowStack.push(row);
          columnStack.push(column);
          self.setVertexStatus(column, row, VERTEX_STATUS.VISITED);
        });
      }
    }
  }

  isVisited(c: number, r: number) {
    return this.state.matrix[r][c].status === VERTEX_STATUS.VISITED;
  }

  setVertexStatus(
    c: number,
    r: number,
    status: VERTEX_STATUS,
    pred: IVertex = null,
  ) {
    const n = this.state.matrix.length;

    if (c >= n || c < 0 || r >= n || r < 0) return;

    this.setState({
      matrix: {
        ...this.state.matrix,
        [r]: {
          ...this.state.matrix[r],
          [c]: {
            ...this.state.matrix[r][c],
            status,
            pred,
          },
        },
      },
    });
  }

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
          {Object.values(this.state.matrix).map((row) =>
            Object.values(row).map((vertex: IVertex) => (
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
