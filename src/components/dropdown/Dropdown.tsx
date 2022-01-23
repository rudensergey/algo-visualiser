// Absolute imports
import * as React from "react";

// Components

// Types
import { TDropdown } from "./types";

// Utils
import { getUniqueId } from "../../utils/common";

// Style
import "./style.css";
import { SUPPORTED_ALGORITMS } from "../visualiser/types";

export const Dropdown: TDropdown = ({ list, classNames, onChange }) => {
  const [id, dropdownId] = getUniqueId();
  const [algorithm, setAlgorithm] = React.useState(list[0]);
  const [hidden, setHidedStatus] = React.useState(true);

  const showList = () => setHidedStatus(false);
  const hideList = () => setHidedStatus(true);
  const setValue = (value: SUPPORTED_ALGORITMS) => () => setAlgorithm(value);

  return (
    <>
      <button
        id={id}
        className={"dropdown__button" + ` ${classNames}`}
        onMouseOver={showList}
        onMouseLeave={hideList}
      >
        {algorithm + " sort"}
      </button>
      {!hidden && (
        <ul id={dropdownId} className={"dropdown__list"}>
          {list.map((value) => (
            <li onClick={setValue(value)}>{`${value} sort`}</li>
          ))}
        </ul>
      )}
    </>
  );
};
