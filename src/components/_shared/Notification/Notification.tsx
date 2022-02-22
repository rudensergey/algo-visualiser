// Absolute imports
import React from "react";

// Types
import {
  INotificationProps,
  mapNotificationTypes,
  NOTIFICATION_TYPES,
  NOTIFICATION,
} from "./Notification.types";

const NotificationContext = React.createContext({});

const Notification: React.FC<INotificationProps> = ({ children }) => {
  const [notificatons, setNotifications] = React.useState([]);

  const showNotification = (text: string, type = NOTIFICATION_TYPES.DEFAULT): void => {
    setNotifications((notificatons) => [
      {
        id: Date.now(),
        text,
        type,
      },
      ...notificatons,
    ]);

    setTimeout(() => {
      setNotifications((prevNotifications) => {
        const newNotifications = [...prevNotifications];
        newNotifications.pop();
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
