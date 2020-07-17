import React from "react";
import { storiesOf } from "@storybook/react";
import { action } from "@storybook/addon-actions";
import Button from "./button";

const defaultButton = () => (
  <Button onClick={action("click")}>It is my button</Button>
);
const buttonWithSize = () => (
  <div>
    <Button size="lg">large button</Button>
    <Button size="sm">small button</Button>
  </div>
);

const buttonWithType = () => (
  <div>
    <Button btnType="primary">Primary Button</Button>
    <Button btnType="danger">Danger Button</Button>
    <Button btnType="default">Default Button</Button>
    <Button btnType="link">Link Button</Button>
    <Button btnType="primary" disabled>Disabled Button</Button>
  </div>
);

storiesOf("Button", module)
  .add("Button", defaultButton)
  .add("Button Size", buttonWithSize)
  .add("Button Type", buttonWithType);
