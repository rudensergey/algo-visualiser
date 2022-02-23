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
  title?: string;
  disabled?: boolean;
  className?: string;
  onInput: (event: React.ChangeEvent<HTMLInputElement>) => void;
}

export const PLACEHOLDER = " ";

export enum INPUT {
  WRAPPER = "input",
  FIELD = "input__field",
  FIELD_DISABLED = "input__field input__field--disabled",
  TITLE = "input__title",
}
