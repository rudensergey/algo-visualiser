export enum SUPPORTED_ALGORITMS {
  BUBBLE = "bubble",
  SELECTION = "selection",
  INSERTION = "insertion",
  QUICK = "quick",
  MERGE = "merge",
  HEAP = "heap",
}

export type TSortState = Readonly<{
  counter: number;
  items: number[];
  selected: number;
  sorting: boolean;
  currentAlgorithm: SUPPORTED_ALGORITMS;
}>;

export enum SORT {
  SORT = "sort",
  TITLE = "sort__title",
  BOX = "sort__box",
}

export enum STATUS {
  SORTING = "Sorting...",
  CHOSE_ALGORITHM = "Choose your algorithm",
}
