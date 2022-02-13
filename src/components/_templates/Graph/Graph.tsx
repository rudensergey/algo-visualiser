// Absolute imports
import React from "react";
import { concatMap, delay, filter, from, map, of } from "rxjs";

// Components
import Button from "@shared/Button";
import Dropdown from "@shared/Dropdown";
import Vertex from "@shared/Vertex";

// Types
import { GRAPH, SUPPORTED_GRAPH_ALGORITMS, STATUS, IVertex, VERTEX_STATUS, IGraphState } from "./Graph.types";

// Utils
import { constructMatrix, wait } from "@utils/common";

// Mock
import mase from "./mase.json";
import Meta from "@shared/Meta/Meta";

class Graph extends React.Component<Record<string, never>, Readonly<IGraphState>> {
  constructor(props: Record<string, never>) {
    super(props);
    this.changeAlgorithm = this.changeAlgorithm.bind(this);
    this.search = this.search.bind(this);
    this.drawMase = this.drawMase.bind(this);
    this.clear = this.clear.bind(this);
    this.onMouseDown = this.onMouseDown.bind(this);
    this.onMouseUp = this.onMouseUp.bind(this);
    this.setVertexStatus = this.setVertexStatus.bind(this);

    const matrix = constructMatrix(50);

    this.state = {
      changed: false,
      pressedKey: false,
      searching: false,
      matrix: matrix,
      currentAlgorithm: SUPPORTED_GRAPH_ALGORITMS.BFS,
    };
  }

  changeAlgorithm(value: SUPPORTED_GRAPH_ALGORITMS) {
    this.setState({ currentAlgorithm: value });
  }

  clear() {
    if (this.state.searching) return;
    this.setState({ matrix: constructMatrix(50), changed: false });
  }

  async search() {
    if (this.state.searching) return;
    else this.setState({ searching: true });

    await this?.[this.state.currentAlgorithm as keyof Graph]?.();
    this.setState({ searching: false });
  }

  async bfs() {
    const self = this;
    const n = 50;

    const rowStack = [];
    const columnStack = [];
    const verticalVector = [0, 0, 1, -1];
    const horizontalVector = [-1, 1, 0, 0];

    let destination = null;

    rowStack.push(0);
    columnStack.push(0);

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
      await wait(5).then(() => {
        self.setVertexStatus(column, row, VERTEX_STATUS.PATH);
      });
    }

    async function exploreNeighbours(c: number, r: number) {
      for (let i = 0; i < 4; i++) {
        const row = r + verticalVector[i];
        const column = c + horizontalVector[i];

        if (column < 0 || column >= n) continue;
        if (row < 0 || row >= n) continue;
        if (self.checkStatus(column, row, [VERTEX_STATUS.BLOCKED, VERTEX_STATUS.VISITED, VERTEX_STATUS.START])) {
          continue;
        }

        if (self.checkStatus(column, row, VERTEX_STATUS.DESTINATION)) {
          destination = { row: r, column: c };
          return;
        }

        await wait(5).then(() => {
          rowStack.push(row);
          columnStack.push(column);
          self.setVertexStatus(column, row, VERTEX_STATUS.VISITED, {
            row: r,
            column: c,
          });
        });
      }
    }

    function getShortestPath(r: number, c: number) {
      const matrix = self.state.matrix;
      const predArr = [];

      let row = r;
      let column = c;

      while (matrix[row][column]?.predecessor) {
        const { row: predRow, column: predColumn } = matrix[row][column]?.predecessor;

        predArr.push({ row, column });
        column = predColumn;
        row = predRow;
      }

      return predArr;
    }
  }

  checkStatus(column: number, row: number, targetStatus: VERTEX_STATUS | VERTEX_STATUS[]) {
    if (column >= 50 || column < 0 || row >= 50 || row < 0) {
      return console.error("checkStatus: Missed index!");
    }

    const status = this.state.matrix[row][column].status;
    if (!(targetStatus instanceof Array)) return targetStatus === status;
    return targetStatus.some((s) => s === status);
  }

  setVertexStatus(c: number, r: number, status: VERTEX_STATUS, predecessor?: { column: number; row: number }) {
    const n = 50;

    if (c >= n || c < 0 || r >= n || r < 0) {
      return console.error("setVertexStatus: Missed index!");
    }

    this.setState({
      changed: true,
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
    if (this.state.searching) return;
    else this.setState({ searching: true, changed: true });

    from(Object.values(mase))
      .pipe(
        concatMap((row) => from(Object.values(row))),
        filter((x: IVertex) => x.status === VERTEX_STATUS.BLOCKED),
        map(({ column, row }) => [column, row]),
        concatMap((val) => of(val).pipe(delay(10)))
      )
      .subscribe({
        next: (c) => this.setVertexStatus(c[0], c[1], VERTEX_STATUS.BLOCKED),
        complete: () => this.setState({ searching: false }),
      });
  }

  onMouseDown() {
    if (this.state.searching) return;
    this.setState({ pressedKey: true });
  }

  onMouseUp() {
    if (this.state.searching) return;
    this.setState({ pressedKey: false });
  }

  render() {
    return (
      <div className={GRAPH.GRAPH} onMouseDown={this.onMouseDown} onMouseUp={this.onMouseUp}>
        <div className={GRAPH.BUTTONS}>
          <p className={GRAPH.TITLE}>{this.state.searching ? STATUS.SEARCHING : STATUS.CHOSE_ALGORITHM}</p>
          <Button className={GRAPH.BUTTON} onClick={this.state.changed ? this.clear : this.drawMase}>
            {this.state.changed ? "Clear Board" : "Draw Mase"}
          </Button>
          <Dropdown
            defaultValue={this.state.currentAlgorithm}
            classNames={GRAPH.DROPDOWN}
            onChange={this.changeAlgorithm}
            list={Object.values(SUPPORTED_GRAPH_ALGORITMS)}
          ></Dropdown>
          <Button className={GRAPH.BUTTON} onClick={this.search}>
            Search
          </Button>
        </div>
        <div className={GRAPH.BOX}>
          {Object.values(this.state.matrix).map((row, rowIndex) =>
            Object.values(row).map((vertex: IVertex, vertexIndex) => (
              <Vertex
                key={`${row}:${vertexIndex}`}
                changeStatus={this.setVertexStatus}
                row={rowIndex}
                column={vertexIndex}
                pressedKey={this.state.pressedKey}
                statusModificator={vertex.status}
                mainClass={GRAPH.VERTEX}
              ></Vertex>
            ))
          )}
        </div>
      </div>
    );
  }
}

export default Graph;
