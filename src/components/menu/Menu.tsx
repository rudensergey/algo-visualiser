import * as React from "react";

export const Menu = () => {
  return (
    <div>
      <button>Shuffle</button>
      <button>Start</button>
      <select name="algo" id="alogrithm">
        <option value="buble">Buble Sort</option>
        <option value="selection">Selection Sort</option>
        <option value="insertion">Insertion Sort</option>
      </select>
    </div>
  );
};
