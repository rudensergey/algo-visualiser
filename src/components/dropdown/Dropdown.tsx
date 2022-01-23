// Absolute imports
import * as React from "react";

// Components

// Types
import { TDropdown } from "./types";

// Utils

// Style
import "./style.css";
import { SUPPORTED_ALGORITMS } from "../visualiser/types";

export const Dropdown: TDropdown = ({ list, classNames, onChange }) => {
  const [algorithm, setAlgorithm] = React.useState(list[0]);
  const [hidden, setHiddenStatus] = React.useState(true);
  const [coordinates, setCoordinates] = React.useState({ x: 0, y: 0 });

  const buttonRef = React.useRef(null);
  const listRef = React.useRef(null);

  const toogleList = () => {
    if (hidden) {
      const { bottom, left, width } = buttonRef.current.getBoundingClientRect();

      setCoordinates({
        x: left + width / 2 - 100,
        y: bottom + document.documentElement.scrollTop,
      });
      setHiddenStatus(false);
    } else {
      setHiddenStatus(true);
    }
  };

  const setValue = (value: SUPPORTED_ALGORITMS) => () => {
    setAlgorithm(value);
    onChange(value);
    toogleList();
  };

  return (
    <>
      <button
        ref={buttonRef}
        className={"dropdown__button" + ` ${classNames}`}
        onClick={toogleList}
      >
        {algorithm + " sort"}
      </button>
      {!hidden && (
        <ul
          ref={listRef}
          style={{ top: coordinates.y + "px", left: coordinates.x + "px" }}
          className={"dropdown__list"}
        >
          {list.map((value) => (
            <li onClick={setValue(value)}>{`${value} sort`}</li>
          ))}
        </ul>
      )}
    </>
  );
};
