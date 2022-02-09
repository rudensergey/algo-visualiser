export interface IDropdownProps<T> {
  list: T[];
  defaultValue: T;
  classNames?: string;
  onChange: any;
}

export enum DROPDOWN {
  BUTTON = "dropdown__button",
  LIST = "dropdown__list",
}
