export enum SUPPORTED_ALGORITMS {
  BUBBLE = "bubble",
  SELECTION = "selection",
  INSERTION = "insertion",
  QUICK = "quick",
  MERGE = "merge",
}

export type TSortState = Readonly<{
  items: number[];
  selected: number;
  sorting: boolean;
  currentAlgorithm: SUPPORTED_ALGORITMS;
}>;

export enum SORT {
  SORT = "sort",
  BUTTONS = "sort__buttons",
  BUTTON = "sort__button",
  TITLE = "sort__title",
  DROPDOWN = "sort__dropdown",
  BOX = "sort__box",
}

export enum STATUS {
  SORTING = "Sorting...",
  CHOSE_ALGORITHM = "Choose your algorithm",
}
