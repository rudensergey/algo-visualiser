// Absolute imports
import React from "react";
import Link from "next/link";

// Components
import { Button, Wrapper } from "./Main.styled";
const MainTemplate = () => {
  return (
    <Wrapper>
      <Link href={"/graphs"}>
        <Button>Graphs</Button>
      </Link>
      <Link href={"/sorting"}>
        <Button>Sorting</Button>
      </Link>
    </Wrapper>
  );
};

export default MainTemplate;
