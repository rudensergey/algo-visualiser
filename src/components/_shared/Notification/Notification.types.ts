export interface INotificationProps {
  children: React.ReactNode;
}

export enum NOTIFICATION {
  WRAPPER = "notification",
}

export enum NOTIFICATION_TYPES {
  ERROR = "error",
  WARNING = "warning",
  DEFAULT = "default",
}

export const mapNotificationTypes = {
  [NOTIFICATION_TYPES.DEFAULT]: "notification__text",
  [NOTIFICATION_TYPES.WARNING]: "notification__text notification__text--warning",
  [NOTIFICATION_TYPES.ERROR]: "notification__text notification__text--error",
};
