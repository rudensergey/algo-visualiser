// Absolute import
import React from "react";

// Types
import { IInputProps, INPUT, PLACEHOLDER } from "./Input.types";

const InputComponent: React.FC<IInputProps> = ({ type, onInput, value, disabled, title }) => {
  return (
    <div className={INPUT.WRAPPER}>
      <input
        className={disabled ? INPUT.FIELD_DISABLED : INPUT.FIELD}
        placeholder={PLACEHOLDER}
        disabled={disabled}
        onInput={onInput}
        value={value}
        type={type}
      />
      {title && <p className={INPUT.TITLE}>{title}</p>}
    </div>
  );
};

export default InputComponent;
