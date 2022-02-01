import { IVertex, TMatrix, VERTEX_STATUS } from "../components/graph/types";

export const wait = (time: number) =>
  new Promise((res) => setTimeout(res, time));

export function constructMatrix(n: number): TMatrix {
  const matrix = [];

  for (let r = 0; r < n; r++) {
    const newRow = [];

    for (let c = 0; c < n; c++) {
      const vertex: IVertex = {
        column: c,
        row: r,
        status:
          c === 0 && r === 0
            ? VERTEX_STATUS.START
            : c === n - 1 && r === n - 1
            ? VERTEX_STATUS.DESTINATION
            : null,
        predecessor: null,
      };

      newRow.push(vertex);
    }

    matrix.push(newRow);
  }

  return matrix;
}
