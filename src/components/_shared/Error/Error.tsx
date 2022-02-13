// absoule
import React from "react";

// Components
import Button from "@shared/Button";

interface IErrorProps {
  errorCode: number;
}

const Error: React.FC<IErrorProps> = ({ errorCode }) => {
  return (
    <div className="error">
      <div className="error__box">
        <p className="error__text">
          Here we go again...<span>{errorCode}</span>
        </p>
        <Button href="/" asHref="/">
          {"< Back to main page"}
        </Button>
      </div>
    </div>
  );
};

export default Error;
