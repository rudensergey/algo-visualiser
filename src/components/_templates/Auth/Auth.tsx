// Absolute imports
import React, { FormEvent } from "react";

// Components
import Button from "@shared/Button";

// Hooks
import useInput from "@hooks/useInput";

// Types
import { AUTH } from "./Auth.types";
import { BUTTON_TYPE } from "@shared/Button/Button.types";

const AuthTemplate = () => {
  const { value: username, reset: resetUserName, bind: bindUserName } = useInput();
  const { value: password, reset: resetPassword, bind: bindPassword } = useInput();
  const [loading, setLoading] = React.useState(false);

  const onSubmit = async (event: FormEvent) => {
    event.preventDefault();

    if (loading) return;

    setLoading(true);

    const responce = await fetch("/api/login", {
      method: "POST",
      body: JSON.stringify({ username, password }),
    });

    if (responce.ok) {
      const data = await responce.json();
      console.log(data);
      resetUserName();
      resetPassword();
    }

    setLoading(false);
  };

  return (
    <div className={AUTH.WRAPPER}>
      <p>Auth</p>
      <div>
        {loading ? (
          <p>Fetching</p>
        ) : (
          <form onSubmit={onSubmit}>
            <input type="text" {...bindUserName} />
            <input type="text" {...bindPassword} />
            <Button>Submit!</Button>
          </form>
        )}
      </div>
      <Button href="/" asHref="/" type={BUTTON_TYPE.GREEN}>
        &lt; Back
      </Button>
    </div>
  );
};

export default AuthTemplate;
