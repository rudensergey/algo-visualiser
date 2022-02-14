import { IVertex, TMatrix, VERTEX_STATUS } from "@templates/Graph/Graph.types";

export const wait = (time: number) => new Promise((resolve) => setTimeout(resolve, time));

export function constructMatrix(size: number): TMatrix {
  const matrix = {};

  for (let row = 0; row < size; row++) {
    const newRow = {};

    for (let column = 0; column < size; column++) {
      const vertex: IVertex = {
        column,
        row,
        status:
          column === 0 && row === 0
            ? VERTEX_STATUS.START
            : column === size - 1 && row === size - 1
              ? VERTEX_STATUS.DESTINATION
              : null,
        predecessor: null,
      };

      newRow[column] = vertex;
    }

    matrix[row] = newRow;
  }

  return matrix;
}
