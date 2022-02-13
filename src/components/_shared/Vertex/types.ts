import { VERTEX_STATUS } from "@templates/Graph/Graph.types";

export enum VERTEX {
  VERTEX = "vertex",
}

export interface IVertexProps {
  row: number;
  column: number;
  pressedKey: boolean;
  statusModificator: VERTEX_STATUS;
  changeStatus: (c: number, r: number, status: VERTEX_STATUS) => void;
}
