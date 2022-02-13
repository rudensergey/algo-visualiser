// Absolute imports
import React from "react";

// Components
import Button from "@shared/Button";

const MainTemplate = () => {
  return (
    <div className="main">
      <p className="main__title">Alogrithms visualiser</p>
      <Button className="main__button main__button--graph" href={"/graph"} asHref={"/graph"}>
        Graphs
      </Button>
      <Button className="main__button main__button--sorting" href={"/sort"} asHref={"/sort"}>
        Sorting
      </Button>
    </div>
  );
};

export default MainTemplate;
