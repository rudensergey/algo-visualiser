// Absolute imports
import React from "react";

// Types
import { DROPDOWN, IDropdownProps } from "./types";

const Dropdown = <T extends string>({ list, defaultValue, onChange }: IDropdownProps<T>) => {
  const [dropDownValue, setAlgorithm] = React.useState(defaultValue);
  const [hidden, setHiddenStatus] = React.useState(true);

  const buttonRef = React.useRef(null);
  const listRef = React.useRef(null);

  React.useEffect(() => {
    function onResize() {
      const { bottom, left, width } = buttonRef.current.getBoundingClientRect();

      if (!listRef.current) return;
      listRef.current.style.top = bottom + document.documentElement.scrollTop + "px";
      listRef.current.style.left = left + width / 2 - 100 + "px";
    }

    onResize();
    window.addEventListener("resize", onResize);
    return () => removeEventListener("resize", onResize);
  });

  const toogleList = () => setHiddenStatus(!hidden);

  const setValue = (value: T) => () => {
    setAlgorithm(value);
    onChange(value);
    toogleList();
  };

  return (
    <>
      <button ref={buttonRef} className={DROPDOWN.BUTTON} onClick={toogleList}>
        {dropDownValue}
      </button>

      {!hidden && (
        <ul ref={listRef} className={DROPDOWN.LIST}>
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

export default Dropdown;
