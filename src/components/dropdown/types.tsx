import { SUPPORTED_ALGORITMS } from "../visualiser/types";

export type TDropdown = React.FC<{
  list: any[];
  classNames?: string;
  onChange: (value: string) => void;
}>;

export enum DROPDOWN {
  BUTTON = "dropdown__button",
  LIST = "dropdown__list",
}
