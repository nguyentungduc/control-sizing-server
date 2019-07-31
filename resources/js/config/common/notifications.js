import { notification } from "antd";

export function notifications(type, title, msg) {
  notification[type]({
    message: title,
    description: msg
  });
}

export default {
  notifications
}