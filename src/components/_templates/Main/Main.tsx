// Absolute imports
import React from "react";

// Components
import { Wrapper, Button, Title } from "./Main.styled";

const MainTemplate = () => {
  return (
    <Wrapper>
      <Title>Alogrithms visualiser</Title>
      <Button href={"/graphs"} asHref={"/graps"} color={"rgb(46, 168, 238)"}>
        Graphs
      </Button>
      <Button href={"/sorting"} asHref={"/sorting"} color={"rgb(104, 57, 233)"}>
        Sorting
      </Button>
    </Wrapper>
  );
};

export default MainTemplate;
