import { SUPPORTED_ALGORITMS } from "../visualiser/types";

export interface IDropdownProps<T> {
  list: T[];
  classNames?: string;
  onChange: (value: string) => void;
}

export enum DROPDOWN {
  BUTTON = "dropdown__button",
  LIST = "dropdown__list",
}
