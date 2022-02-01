import { IVertex, TMatrix } from "../components/graph/types";

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
        status: null,
        predecessor: null,
      };

      newRow.push(vertex);
    }

    matrix.push(newRow);
  }

  return matrix;
}
