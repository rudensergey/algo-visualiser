export interface IInputProps {
  type:
    | "button"
    | "checkbox"
    | "color"
    | "date"
    | "datetime-local"
    | "email"
    | "file"
    | "hidden"
    | "image"
    | "month"
    | "number"
    | "password"
    | "radio"
    | "range"
    | "reset"
    | "search"
    | "submit"
    | "tel"
    | "text"
    | "time"
    | "url"
    | "week";

  value: string | number;
  disabled?: boolean;
  className?: string;
  onInput: (event: React.ChangeEvent<HTMLInputElement>) => void;
}

export enum INPUT {
  WRAPPER = "input",
  WRAPPER_DISABLED = "input input--disabled",
}
