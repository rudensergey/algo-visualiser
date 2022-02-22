// Absolute imports
import React, { FormEvent } from "react";

// Components
import Button from "@shared/Button";
import Input from "@shared/Input";
import { NotificationContext } from "@shared/Notification/Notification";

// Hooks
import useInput from "@hooks/useInput";

// Types
import { AUTH } from "./Auth.types";
import { BUTTON_TYPE } from "@shared/Button/Button.types";
import { NOTIFICATION_TYPES, TShowNotification } from "@shared/Notification/Notification.types";
import Meta from "@shared/Meta";

const Auth = ({ showNotification }) => {
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
      showNotification("Successful authentication!", NOTIFICATION_TYPES.APPROVE);
    } else {
      showNotification(
        responce.status === 401 ? "Invalid username or/and password" : "Something went wrong",
        NOTIFICATION_TYPES.WARNING
      );
    }

    setLoading(false);
  };

  return (
    <div className={AUTH.WRAPPER}>
      <Meta title="Visualiser: authentication"></Meta>
      <div className={AUTH.LOGIN}>
        {
          <>
            <p className={AUTH.TITLE}>Authentication</p>
            <div>
              <form className={AUTH.FORM} onSubmit={onSubmit}>
                <Input type="text" disabled={loading} {...bindUserName} />
                <Input type="password" disabled={loading} {...bindPassword} />
                <Button type={BUTTON_TYPE.GREEN} disabled={loading}>
                  Sign in
                </Button>
              </form>
            </div>
          </>
        }
      </div>
      <Button href="/" asHref="/">
        &lt; Back
      </Button>
    </div>
  );
};

const AuthComponent = () => (
  <NotificationContext.Consumer>
    {(showNotification: TShowNotification) => <Auth showNotification={showNotification}></Auth>}
  </NotificationContext.Consumer>
);

export default AuthComponent;
