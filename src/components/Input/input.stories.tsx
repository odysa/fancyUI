/*
 * @Author: Chengxu Bian 
 * @Date: 2020-07-17 19:29:35 
 * @Last Modified by: Chengxu Bian
 * @Last Modified time: 2020-07-17 21:00:02
 */
import React from "react";
import { storiesOf } from "@storybook/react";
import { action } from "@storybook/addon-actions";
import Input from "./input";

const defaultInput = () => {
  return <Input onChange={action("change")} placeholder="Please Enter"/>;
};

const inputWithDisabled = () => {
  return <Input onChange={action("change")} placeholder="Disabled" disabled />;
};

const inputWithIcon = () => {
  return <Input icon="search" placeholder="Search..." />;
};

const inputWithSize = () => {
  return (
    <div>
      <Input defaultValue="large size" size="lg" />
      <Input placeholder="small size" size="sm" />
    </div>
  );
};

const inputWithPend = () => {
  return (
    <div>
      <Input defaultValue="prepend text" addonBefore="https://" />
      <Input addonAfter=".com" defaultValue="append text" />
    </div>
  );
};

storiesOf("Input", module)
  .addParameters({
    info: {
      text: `
      ## Input
            `,
    },
  })
  .add("Default Input", defaultInput)
  .add("Disabled Input", inputWithDisabled)
  .add("Input with Icon", inputWithIcon)
  .add("Input Size", inputWithSize)
  .add("Input with attachment", inputWithPend);
