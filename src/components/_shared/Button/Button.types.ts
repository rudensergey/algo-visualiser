export enum BUTTON {
  WRAPPER = "button",
  DISABLED = "button button--disabled",
}

export enum BUTTON_TYPE {
  DEFAULT = "default",
  WARNING = "warning",
  ERROR = "error",
  GREEN = "green",
}

export const mapTypeToClass = {
  [BUTTON_TYPE.DEFAULT]: "button button--default",
  [BUTTON_TYPE.WARNING]: "button button--warning",
  [BUTTON_TYPE.ERROR]: "button button--error",
  [BUTTON_TYPE.GREEN]: "button button--green",
};

export interface IButtonProps {
  className?: string;
  type?: BUTTON_TYPE;
  children: React.ReactNode | string;
  href?: string;
  asHref?: string;
  onClick?: () => void;
  disabled?: boolean;
}
