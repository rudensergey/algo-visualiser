export enum GRAPH {
  GRAPH = "graph",
  BUTTONS = "graph__buttons",
  BUTTON = "graph__button",
  TITLE = "graph__title",
  DROPDOWN = "graph__dropdown",
  BOX = "graph__box",
  VERTEX = "graph__vertex",
}

export enum SUPPORTED_GRAPH_ALGORITMS {
  DFS = "dfs",
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
}

export type Nullable<T> = T | null;
export interface IVertex {
  column: number;
  row: number;
  status: Nullable<VERTEX_STATUS>;
  predecessor: Nullable<IVertex>;
}

export type TMatrix = Record<number, Record<number, IVertex>>;
