// Absolute imports
import React from "react";

// Types
import { SORT_COUNTER, ISortCounterProps, mapAlogrithm } from "./SortCounter.types";

const SortCounter: React.FC<ISortCounterProps> = ({ counter, algorithm }) => (
  <p className={SORT_COUNTER.COUNTER}>
    Complexity:<span>{mapAlogrithm[algorithm]}</span> Iterations count: <span>{counter}</span>
  </p>
);

export default SortCounter;
