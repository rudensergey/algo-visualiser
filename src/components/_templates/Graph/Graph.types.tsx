export enum GRAPH {
  GRAPH = "graph",
  TITLE = "graph__title",
  BOX = "graph__box",
}

export enum SUPPORTED_GRAPH_ALGORITMS {
  BFS = "bfs",
}

export enum STATUS {
  SEARCHING = "Searching...",
  CHOSE_ALGORITHM = "Choose your algorithm",
}

export enum VERTEX_STATUS {
  VISITED = "visited",
  DESTINATION = "destination",
  START = "start",
  PATH = "path",
  BLOCKED = "blocked",
}

export type Nullable<T> = T | null;
export interface IVertex {
  column: number;
  row: number;
  status: Nullable<VERTEX_STATUS>;
  predecessor: Nullable<{ row: number; column: number }>;
}

export interface IGraphState {
  changed: boolean;
  pressedKey: boolean;
  searching: boolean;
  matrix: TMatrix;
  currentAlgorithm: SUPPORTED_GRAPH_ALGORITMS;
}

export type TMatrix = Record<number, Record<number, IVertex>>;
