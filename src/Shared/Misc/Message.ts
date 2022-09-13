import { message } from "antd";
import { ArgsProps, ConfigOptions } from "antd/lib/message";

const defaultMessageConfig: ConfigOptions = {
  duration: 3,
  maxCount: 10,
};

export enum MessageType {
  Success = "success",
  Erorr = "error",
  Info = "info",
  Warning = "warning",
  Loading = "loading",
}

export type MessageConfig = {
  content: string;
  duration?: number;
  type?: MessageType;
  onClose?: () => void;
  icon?: React.ReactNode;
  style?: React.CSSProperties;
  className?: string;
  onClick?: (e: React.MouseEvent<HTMLDivElement>) => void;
};

function showMessage(
  msg: string,
  action: (msg: string, duration: number) => any
) {
  action(msg, defaultMessageConfig.duration as number);
}

export const Message = {
  error: function (msg: string) {
    showMessage(msg, message.error);
  },
  info: function (msg: string) {
    showMessage(msg, message.info);
  },
  warning: function (msg: string) {
    showMessage(msg, message.warn);
  },
  success: function (msg: string) {
    showMessage(msg, message.success);
  },
  loading: function (msg: string) {
    showMessage(msg, () => message.loading);
  },
  custom: function (config: MessageConfig) {
    message.open(config as ArgsProps);
  },
};
