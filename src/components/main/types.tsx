export enum SECTIONS {
  SORTING = "sorting",
  GRAPHS = "graphs",
}

export type TMenu = React.FC<{
  menuSections: SECTIONS[];
  setSection: any;
  defaultSection: SECTIONS;
}>;
