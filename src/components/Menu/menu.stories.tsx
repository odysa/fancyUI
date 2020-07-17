import React from "react";
import { storiesOf } from "@storybook/react";
import { action } from "@storybook/addon-actions";

import Menu from "./index";

const defaultMenu = () => {
  return (
    <Menu
      defaultIndex="0"
      mode="horizontal"
      onSelect={action(`selected!`)}
    >
      <Menu.Item>Item 1</Menu.Item>
      <Menu.Item>Item 2</Menu.Item>
      <Menu.Item disabled>Disabled Item</Menu.Item>
      <Menu.SubMenu title="Dropdown">
        <Menu.Item>Dropdown Item 1</Menu.Item>
        <Menu.Item>Dropdown Item 2</Menu.Item>
      </Menu.SubMenu>
      <Menu.SubMenu title="Default opened Dropdown">
        <Menu.Item>Default Dropdown Item 1</Menu.Item>
        <Menu.Item>Default Dropdown Item 2</Menu.Item>
      </Menu.SubMenu>
    </Menu>
  );
};

const menuWithMode = () => {
  return (
    <Menu defaultIndex="0" mode="vertical" onSelect={action(`selected!`)}>
      <Menu.Item>cool link</Menu.Item>
      <Menu.Item>cool link 2</Menu.Item>
      <Menu.SubMenu title="Click to Open SubMenu">
        <Menu.Item>Item 1</Menu.Item>
        <Menu.Item>Item 2</Menu.Item>
      </Menu.SubMenu>
    </Menu>
  );
};

const menuWithOpen = () => {
  return (
    <Menu
      defaultIndex="0"
      defaultOpenSubmenu={["2"]}
      mode="vertical"
      onSelect={action(`selected!`)}
    >
      <Menu.Item>cool link</Menu.Item>
      <Menu.Item>cool link 2</Menu.Item>
      <Menu.SubMenu title="Default Opened SubMenu">
        <Menu.Item>Item1</Menu.Item>
        <Menu.Item>Item2 </Menu.Item>
      </Menu.SubMenu>
    </Menu>
  );
};

storiesOf("Menu", module)
  .addParameters({
    info: {
      text: `
          ## This is Menu Component
          `,
    },
  })
  .add("Horizontal Menu", defaultMenu)
  .add("Vertical Menu", menuWithMode)
  .add("Default Opend Menu", menuWithOpen);
