export type TVisualizerState = Readonly<{
  items: TItems;
  selected: number;
  sorting: boolean;
  currentAlgorithm: SUPPORTED_ALGORITMS;
}>;

export type TItems = { value: number }[];

export enum SUPPORTED_ALGORITMS {
  BUBBLE = "bubble",
  SELECTION = "selection",
  INSERTION = "insertion",
}
