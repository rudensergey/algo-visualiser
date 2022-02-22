// Absolute import
import React from "react";

// Types
import { IInputProps, INPUT } from "./Input.types";

const InputComponent: React.FC<IInputProps> = ({ type, onInput, value }) => {
  return <input className={INPUT.WRAPPER} type={type} onInput={onInput} value={value} />;
};

export default InputComponent;
