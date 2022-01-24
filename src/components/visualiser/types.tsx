export type TVisualiserState = Readonly<{
  items: number[];
  selected: number;
  sorting: boolean;
  currentAlgorithm: SUPPORTED_ALGORITMS;
}>;

export enum SUPPORTED_ALGORITMS {
  BUBBLE = "bubble",
  SELECTION = "selection",
  INSERTION = "insertion",
  QUICK = "quick",
  MERGE = "merge",
}

export enum VISUALISER {
  VISUALISER = "visualiser",
  BUTTONS = "visualiser__buttons",
  BUTTON = "visualiser__button",
  TITLE = "visualiser__title",
  DROPDOWN = "visualiser__dropdown",
  BOX = "visualiser__box",
}

export enum STATUS {
  SORTING = "Sorting...",
  CHOSE_ALGORITHM = "Choose your algorithm",
}
