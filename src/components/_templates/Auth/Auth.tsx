// Absolute imports
import React from "react";

// Components
import Button from "@shared/Button";

// Types
import { AUTH } from "./Auth.types";
import { BUTTON_TYPE } from "@shared/Button/Button.types";

const AuthTemplate = () => {
  return (
    <div className={AUTH.WRAPPER}>
      <p>Auth</p>
      <div>
        <form>
          <input type="text"></input>
          <input type="text"></input>
          <button onClick={(event) => event.preventDefault()}>Submit!</button>
        </form>
      </div>
      <Button href="/" asHref="/" type={BUTTON_TYPE.GREEN}>
        &lt; Back
      </Button>
    </div>
  );
};

export default AuthTemplate;
