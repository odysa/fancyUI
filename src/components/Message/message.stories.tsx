/*
 * @Author: Chengxu Bian
 * @Date: 2020-07-18 20:15:54
 * @Last Modified by: Chengxu Bian
 * @Last Modified time: 2020-07-18 20:29:20
 */
import React from "react";
import { storiesOf } from "@storybook/react";
import { action } from "@storybook/addon-actions";
import Button from "../Button/button";
import Message from "./index";
import { MessageType } from "./message";

const MessageWithTypes = () => {
  const showMessage = (key: MessageType, message: string) => {
    Message[key]({
      message,
      duration: 5000,
      onClose: action("onClose"),
    });
  };
  return (
    <div>
      <Button
        onClick={() => {
          showMessage("success", "This is success message");
        }}
      >
        Success
      </Button>
      <Button
        onClick={() => {
          showMessage("info", "This is info message");
        }}
      >
        Info
      </Button>
      <Button
        onClick={() => {
          showMessage("error", "This is error message");
        }}
      >
        Error
      </Button>
      <Button
        onClick={() => {
          showMessage("warning", "This is warning message");
        }}
      >
        Warning
      </Button>
    </div>
  );
};

storiesOf("Message", module).add("Message", MessageWithTypes);
