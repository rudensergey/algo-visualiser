// Absolute imports
import React from "react";

// Components
import Button from "@shared/Button";
import Dropdown from "@shared/Dropdown";
import Vertex from "@shared/Vertex";
import Menu from "@shared/Menu";
import VisualBox from "@shared/VisualBox";

import { NotificationContext } from "@shared/Notification/Notification";

// Types
import {
  GRAPH,
  SUPPORTED_GRAPH_ALGORITMS,
  STATUS,
  IVertex,
  VERTEX_STATUS,
  IGraphState,
  VECTOR,
} from "./Graph.types";
import { VISUAL_BOX_TYPES } from "@shared/VisualBox/VisualBox.types";
import { BUTTON_TYPE } from "@shared/Button/Button.types";
import { NOTIFICATION_TYPES, TShowNotification } from "@shared/Notification/Notification.types";

// Utils
import { constructMatrix, wait } from "@utils/common";

// Mock
import { mase } from "./mase";

class Graph extends React.Component<
  { showNotification: TShowNotification },
  Readonly<IGraphState>
> {
  constructor(props: { showNotification: TShowNotification }) {
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
    this.props.showNotification(`Algorithm was changed to ${value}`, NOTIFICATION_TYPES.APPROVE);
  }

  clear() {
    if (this.state.searching) return;
    this.setState({ matrix: constructMatrix(50), changed: false });
    this.props.showNotification("Cleared!");
  }

  async search() {
    if (this.state.searching) return;
    else this.setState({ searching: true });

    this.props.showNotification("Start searching");

    await this?.[this.state.currentAlgorithm as keyof Graph]?.();
    this.setState({ searching: false });

    this.props.showNotification("Finish", NOTIFICATION_TYPES.APPROVE);
  }

  async dfs() {
    const self = this;
    const size = 50;

    let destination = null;
    await exploreNeighbours(0, 0);
    if (!destination) return;

    const predArr = self.getShortestPath(destination.row, destination.column);
    self.drawShortestPath(predArr);

    async function exploreNeighbours(predColumn: number, predRow: number) {
      for (let i = 0; i < 4; i++) {
        if (destination) return;

        const row = predRow + VECTOR.VERTICAL[i];
        const column = predColumn + VECTOR.HORIZONTAL[i];

        if (!self.isValidVertex(row, column, size)) continue;
        if (self.checkStatus(column, row, VERTEX_STATUS.DESTINATION)) {
          destination = { row: predRow, column: predColumn };
          return;
        }

        await wait(5).then(async () => {
          self.setVertexStatus(column, row, VERTEX_STATUS.VISITED, {
            row: predRow,
            column: predColumn,
          });
          await exploreNeighbours(column, row);
        });
      }
    }
  }

  async bfs() {
    const self = this;
    const size = 50;

    const rowStack = [];
    const columnStack = [];

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

    const predArr = self.getShortestPath(destination.row, destination.column);
    self.drawShortestPath(predArr);

    async function exploreNeighbours(predColumn: number, predRow: number) {
      for (let i = 0; i < 4; i++) {
        const row = predRow + VECTOR.VERTICAL[i];
        const column = predColumn + VECTOR.HORIZONTAL[i];

        if (!self.isValidVertex(row, column, size)) continue;
        if (self.checkStatus(column, row, VERTEX_STATUS.DESTINATION)) {
          destination = { row: predRow, column: predColumn };
          return;
        }

        await wait(5).then(() => {
          rowStack.push(row);
          columnStack.push(column);
          self.setVertexStatus(column, row, VERTEX_STATUS.VISITED, {
            row: predRow,
            column: predColumn,
          });
        });
      }
    }
  }

  isValidVertex(row: number, column: number, size: number) {
    if (column < 0 || column >= size) return false;
    if (row < 0 || row >= size) return false;
    if (
      this.checkStatus(column, row, [
        VERTEX_STATUS.BLOCKED,
        VERTEX_STATUS.VISITED,
        VERTEX_STATUS.START,
      ])
    ) {
      return false;
    }

    return true;
  }

  async drawShortestPath(
    predArr: {
      row: number;
      column: number;
    }[]
  ) {
    for (let i = 0; i < predArr.length; i++) {
      const { row, column } = predArr[i];
      await wait(5).then(() => {
        this.setVertexStatus(column, row, VERTEX_STATUS.PATH);
      });
    }
  }

  getShortestPath(startRow: number, startColumn: number): { row: number; column: number }[] {
    const matrix = this.state.matrix;
    const predArr = [];

    let row = startRow;
    let column = startColumn;

    while (matrix[row][column]?.predecessor) {
      const { row: predRow, column: predColumn } = matrix[row][column]?.predecessor;

      predArr.push({ row, column });
      column = predColumn;
      row = predRow;
    }

    return predArr;
  }

  checkStatus(column: number, row: number, targetStatus: VERTEX_STATUS | VERTEX_STATUS[]) {
    if (column >= 50 || column < 0 || row >= 50 || row < 0) {
      return console.error("checkStatus: Missed index!");
    }

    const vartexStatus = this.state.matrix[row][column].status;
    if (!(targetStatus instanceof Array)) return targetStatus === vartexStatus;
    return targetStatus.some((target) => target === vartexStatus);
  }

  setVertexStatus(
    column: number,
    row: number,
    status: VERTEX_STATUS,
    predecessor?: { column: number; row: number }
  ) {
    const size = 50;

    if (column >= size || column < 0 || row >= size || row < 0) {
      return console.error("setVertexStatus: Missed index!");
    }

    this.setState({
      changed: true,
      matrix: {
        ...this.state.matrix,
        [row]: {
          ...this.state.matrix[row],
          [column]: {
            ...this.state.matrix[row][column],
            status,
            predecessor: predecessor ? { ...predecessor } : null,
          },
        },
      },
    });
  }

  async drawMase() {
    if (this.state.searching) return;
    else this.setState({ changed: true, matrix: mase });

    this.props.showNotification("Mase finished!");
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
        <Menu>
          <Button href="/" asHref="/" type={BUTTON_TYPE.GREEN}>
            &lt; Back
          </Button>
          <p className={GRAPH.TITLE}>
            {this.state.searching ? STATUS.SEARCHING : STATUS.CHOSE_ALGORITHM}
          </p>
          <Button onClick={this.state.changed ? this.clear : this.drawMase}>
            {this.state.changed ? "Clear Board" : "Draw Mase"}
          </Button>
          <Dropdown
            defaultValue={this.state.currentAlgorithm}
            onChange={this.changeAlgorithm}
            list={Object.values(SUPPORTED_GRAPH_ALGORITMS)}
          ></Dropdown>
          <Button onClick={this.search}>Search</Button>
        </Menu>
        <VisualBox type={VISUAL_BOX_TYPES.GRAPH}>
          {Object.values(this.state.matrix).map((row, rIdx) =>
            Object.values(row).map((vertex: IVertex, cIdx) => (
              <Vertex
                changeStatus={this.setVertexStatus}
                pressedKey={this.state.pressedKey}
                statusModificator={vertex.status}
                key={`${rIdx}:${cIdx}`}
                column={cIdx}
                row={rIdx}
              />
            ))
          )}
        </VisualBox>
      </div>
    );
  }
}

const GraphComponent = () => (
  <NotificationContext.Consumer>
    {(showNotification: TShowNotification) => <Graph showNotification={showNotification} />}
  </NotificationContext.Consumer>
);

export default GraphComponent;
