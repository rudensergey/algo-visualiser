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
  APPROVE = "approve",
}

export const mapNotificationTypes = {
  [NOTIFICATION_TYPES.DEFAULT]: "notification__text",
  [NOTIFICATION_TYPES.WARNING]: "notification__text notification__text--warning",
  [NOTIFICATION_TYPES.ERROR]: "notification__text notification__text--error",
  [NOTIFICATION_TYPES.APPROVE]: "notification__text notification__text--approve",
};

export type TShowNotification = (text: string, type: NOTIFICATION_TYPES.DEFAULT) => void;
