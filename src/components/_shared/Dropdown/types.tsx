export interface IDropdownProps<T> {
  list: T[];
  defaultValue: T;
  onChange: any;
}

export enum DROPDOWN {
  BUTTON = "dropdown__button",
  LIST = "dropdown__list",
}
