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
    this.drawMase = this.drawMase.bind(this);

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

    let destination = null;

    const { column, row } = this.state.matrix[0][0];
    rowStack.push(row);
    columnStack.push(column);

    await wait(10).then(() =>
      self.setVertexStatus(column, row, VERTEX_STATUS.VISITED),
    );

    while (rowStack.length) {
      const x = columnStack.shift();
      const y = rowStack.shift();

      if (destination) break;

      await exploreNeighbours(x, y);
    }

    if (!destination) return;

    const predArr = getShortestPath(destination.row, destination.column);

    for (let i = 0; i < predArr.length; i++) {
      const { row, column } = predArr[i];
      await wait(10).then(() => {
        self.setVertexStatus(column, row, VERTEX_STATUS.PATH);
      });
    }

    function getShortestPath(r: number, c: number) {
      const matrix = self.state.matrix;
      const predArr = [];

      let row = r;
      let column = c;

      console.log(row, column, matrix[row][column]);

      while (matrix[row][column]?.predecessor) {
        const { row: predRow, column: predColumn } =
          matrix[row][column]?.predecessor;

        predArr.push({ row, column });

        column = predColumn;
        row = predRow;
      }

      return predArr;
    }

    async function exploreNeighbours(c: number, r: number) {
      for (let i = 0; i < 4; i++) {
        const row = r + verticalVector[i];
        const column = c + horizontalVector[i];

        if (column < 0 || column >= n) continue;
        if (row < 0 || row >= n) continue;
        if (self.isVisitedOrBlocked(column, row)) continue;

        if (self.isDestination(column, row)) {
          destination = { row: r, column: c };
          return;
        }

        await wait(10).then(() => {
          rowStack.push(row);
          columnStack.push(column);
          self.setVertexStatus(column, row, VERTEX_STATUS.VISITED, {
            row: r,
            column: c,
          });
        });
      }
    }
  }

  isVisitedOrBlocked(column: number, row: number) {
    if (column >= 25 || column < 0 || row >= 25 || row < 0)
      return console.error("isVisited: Missed index!");
    return (
      this.state.matrix[row][column].status === VERTEX_STATUS.VISITED ||
      this.state.matrix[row][column].status === VERTEX_STATUS.BLOCKED
    );
  }

  isDestination(column: number, row: number) {
    if (column >= 25 || column < 0 || row >= 25 || row < 0)
      return console.error("isDestination: Missed index!");
    return this.state.matrix[row][column].status === VERTEX_STATUS.DESTINATION;
  }

  setVertexStatus(
    c: number,
    r: number,
    status: VERTEX_STATUS,
    predecessor?: { column: number; row: number },
  ) {
    const n = this.state.matrix.length;

    if (c >= n || c < 0 || r >= n || r < 0)
      return console.error("setVertexStatus: Missed index!");

    this.setState({
      matrix: {
        ...this.state.matrix,
        [r]: {
          ...this.state.matrix[r],
          [c]: {
            ...this.state.matrix[r][c],
            status,
            predecessor: predecessor ? { ...predecessor } : null,
          },
        },
      },
    });
  }

  async drawMase() {
    for (let i = 0; i < 23; i++) {
      await wait(10).then(() => {
        this.setVertexStatus(3, i, VERTEX_STATUS.BLOCKED);
      });
    }

    for (let i = 5; i < 25; i++) {
      await wait(10).then(() => {
        this.setVertexStatus(6, i, VERTEX_STATUS.BLOCKED);
      });
    }

    for (let i = 3; i < 22; i++) {
      await wait(10).then(() => {
        this.setVertexStatus(10, i, VERTEX_STATUS.BLOCKED);
      });
    }

    for (let i = 0; i < 22; i++) {
      await wait(10).then(() => {
        this.setVertexStatus(15, i, VERTEX_STATUS.BLOCKED);
      });
    }

    for (let i = 3; i < 25; i++) {
      await wait(10).then(() => {
        this.setVertexStatus(20, i, VERTEX_STATUS.BLOCKED);
      });
    }
  }

  render() {
    return (
      <div className={GRAPH.GRAPH}>
        <div className={GRAPH.BUTTONS}>
          <p className={GRAPH.TITLE}>
            {this.state.searching ? STATUS.SEARCHING : STATUS.CHOSE_ALGORITHM}
          </p>
          <Button classNames={GRAPH.BUTTON} onClick={this.drawMase}>
            Draw Mase
          </Button>
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
