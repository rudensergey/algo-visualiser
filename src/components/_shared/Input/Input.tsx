// Absolute import
import React from "react";

// Types
import { IInputProps, INPUT } from "./Input.types";

const InputComponent: React.FC<IInputProps> = ({ type, onInput, value, disabled }) => {
  return (
    <input
      className={disabled ? INPUT.WRAPPER_DISABLED : INPUT.WRAPPER}
      disabled={disabled}
      onInput={onInput}
      value={value}
      type={type}
    />
  );
};

export default InputComponent;
