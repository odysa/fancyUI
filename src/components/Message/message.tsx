/*
 * @Author: Chengxu Bian
 * @Date: 2020-07-18 19:29:04
 * @Last Modified by: Chengxu Bian
 * @Last Modified time: 2020-07-18 20:30:37
 */
import React, { Component } from "react";
import Icon from "../Icon/icon";

export type MessageType = "success" | "error" | "info" | "warning";

export interface MessageProps {
  key: string;
  type: MessageType;
  message: string;
  duration?: number;
  onClose?: (key: string) => void;
}

export interface StateProps {
  messages: MessageProps[];
}

export class Message extends Component {
  state: StateProps = {
    messages: [],
  };
  //generate key
  getNoticeKey(message: MessageProps) {
    message.key = `message-${Date.now()}`;
    return message;
  }
  //add message to notification
  addMessage(message: MessageProps) {
    const { messages } = this.state;

    const res = messages.concat(this.getNoticeKey(message));
    this.setState({
      messages: res,
    });

    //remove notification
    if (message.duration && message.duration > 0) {
      setTimeout(() => {
        this.removeMessage(message.key);
      }, message.duration);
    }
  }

  removeMessage(key: string) {
    const { messages } = this.state;
    const res = messages.filter((messages) => {
      if (messages.key === key) {
        if (messages.onClose) messages.onClose(key);
        return false;
      }
      return true;
    });
    this.setState({
      messages: res,
    });
  }
  //generate Icon
  createIcon(type: MessageType) {
    switch (type) {
      case "warning":
        return "exclamation-circle";
      case "info":
        return "info-circle";
      case "error":
        return "times-circle";
      case "success":
        return "check-circle";
      default:
        return "info-circle";
    }
  }
  render() {
    const { messages } = this.state;
    return (
      <div className="fancy-message">
        {messages.map((item) => (
          <div className={`message-item-warrper message-item-${item.type}`}>
            <Icon icon={this.createIcon(item.type)} theme={item.type} />
            <span className={`message-item`} key={item.key}>
              {item.message}
            </span>
          </div>
        ))}
      </div>
    );
  }
}

export default Message;
