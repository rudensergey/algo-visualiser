// Absolute imports
import React from "react";

// Types
import {
  INotificationProps,
  mapNotificationTypes,
  NOTIFICATION,
  NOTIFICATION_TYPES,
  TShowNotification,
} from "./Notification.types";

export const NotificationContext = React.createContext({});

const Notification: React.FC<INotificationProps> = ({ children }) => {
  const [notificatons, setNotifications] = React.useState([]);

  const showNotification: TShowNotification = (text, type = NOTIFICATION_TYPES.DEFAULT) => {
    setNotifications((notificatons) => [
      ...notificatons,
      {
        id: Date.now(),
        text,
        type,
      },
    ]);

    setTimeout(() => {
      setNotifications((prevNotifications) => {
        const newNotifications = [...prevNotifications];
        newNotifications.shift();
        return newNotifications;
      });
    }, 2000);
  };

  return (
    <NotificationContext.Provider value={showNotification}>
      <div className={NOTIFICATION.WRAPPER}>
        {!!notificatons.length &&
          notificatons.map(({ text, id, type }) => (
            <p key={id} className={mapNotificationTypes[type]}>
              {text}
            </p>
          ))}
      </div>
      {children}
    </NotificationContext.Provider>
  );
};

export default Notification;
