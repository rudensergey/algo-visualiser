// Absolute imports
import React from "react";

// Components

// Types
import { DROPDOWN, IDropdownProps } from "./types";

// Utils

// Style
import "./style.css";

export const Dropdown = <T extends string>({ list, defaultValue, classNames = "", onChange }: IDropdownProps<T>) => {
  const [dropDownValue, setAlgorithm] = React.useState(defaultValue);
  const [hidden, setHiddenStatus] = React.useState(true);
  const [coordinates, setCoordinates] = React.useState({ x: 0, y: 0 });

  const buttonRef = React.useRef(null);
  const listRef = React.useRef(null);

  const toogleList = () => {
    if (!hidden) return setHiddenStatus(true);

    const { bottom, left, width } = buttonRef.current.getBoundingClientRect();

    setCoordinates({
      x: left + width / 2 - 100,
      y: bottom + document.documentElement.scrollTop,
    });

    return setHiddenStatus(false);
  };

  const setValue = (value: T) => () => {
    setAlgorithm(value);
    onChange(value);
    toogleList();
  };

  return (
    <>
      <button ref={buttonRef} className={DROPDOWN.BUTTON + (classNames ? " " + classNames : "")} onClick={toogleList}>
        {dropDownValue}
      </button>

      {!hidden && (
        <ul ref={listRef} style={{ top: coordinates.y + "px", left: coordinates.x + "px" }} className={DROPDOWN.LIST}>
          {list.map((value, i) => (
            <li key={i} onClick={setValue(value)}>
              {value}
            </li>
          ))}
        </ul>
      )}
    </>
  );
};
