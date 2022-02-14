// absoule
import React from "react";

// Components
import Button from "@shared/Button";
import Image from "@shared/Image";

// Types
import { ERROR } from "./Error.types";

// public
import doggo from "@public/dog.png";

interface IErrorProps {
  errorCode: number;
}

const Error: React.FC<IErrorProps> = ({ errorCode }) => {
  return (
    <div className={ERROR.ERROR}>
      <div className={ERROR.BOX}>
        <Image className={ERROR.IMAGE} src={doggo} />
        <p className={ERROR.TEXT}>{`Here we go again...${errorCode}`}</p>
        <Button href="/" asHref="/">
          {"< Back to main page"}
        </Button>
      </div>
    </div>
  );
};

export default Error;
