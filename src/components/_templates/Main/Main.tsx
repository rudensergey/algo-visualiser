// Absolute imports
import Button from "@shared/Button";
import React from "react";

const MainTemplate = () => {
  return (
    <div className="main">
      <p className="main__title">Alogrithms visualiser</p>
      <Button className="main__button" href={"/graphs"} asHref={"/graphs"}>
        Graphs
      </Button>
      <Button className="main__button" href={"/sorting"} asHref={"/sorting"}>
        Sorting
      </Button>
    </div>
  );
};

export default MainTemplate;
