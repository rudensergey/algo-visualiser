export enum VISUAL_BOX_TYPES {
  GRAPH = "graph",
  SORT = "sort",
}

export interface IVisualBoxProps {
  children: JSX.Element[][] | JSX.Element[];
  type: "graph" | "sort";
}

export enum VISUAL_BOX {
  WRAPPER = "visual-box",
  GRAPH = "visual-box visual-box--graph",
  SORT = "visual-box visual-box--sort",
}

export const mapTypeToClasses = {
  [VISUAL_BOX_TYPES.GRAPH]: VISUAL_BOX.GRAPH,
  [VISUAL_BOX_TYPES.SORT]: VISUAL_BOX.SORT,
};
