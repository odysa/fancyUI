/*
 * @Author: Chengxu Bian 
 * @Date: 2020-07-18 19:33:07 
 * @Last Modified by: Chengxu Bian
 * @Last Modified time: 2020-07-18 20:29:47
 */
import React from "react";
import ReactDOM from "react-dom";
import Message, { MessageProps } from "./message";


// create notification message in html body
function createMessage() {
  const div = document.createElement("div");
  document.body.appendChild(div);
  const notification: any = ReactDOM.render(<Message />, div);
  return {
    addMessage(notice: MessageProps) {
      return notification.addMessage(notice);
    },
    destory() {
      ReactDOM.unmountComponentAtNode(div);
      document.body.removeChild(div);
    },
  };
}

let notification: any;
// add message
const notice = ({ type, message, duration = 5000, onClose }: any) => {
  //if not exist, then create
  if (!notification) notification = createMessage();

  return notification.addMessage({ type, message, duration, onClose });
};

export default {
  info({ message, duration, onClose }: any) {
    return notice({ type: "info", message, duration, onClose });
  },
  success({ message, duration, onClose }: any) {
    return notice({ type: "success", message, duration, onClose });
  },
  error({ message, duration, onClose }: any) {
    return notice({ type: "error", message, duration, onClose });
  },
  warning({ message, duration, onClose }: any) {
    return notice({ type: "warning", message, duration, onClose });
  },
};
