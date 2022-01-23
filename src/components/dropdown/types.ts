import { SUPPORTED_ALGORITMS } from "../visualiser/types";

export type TDropdown = React.FC<{
  list: SUPPORTED_ALGORITMS[];
  classNames: string;
  onChange: (value: string) => void;
}>;
