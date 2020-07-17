import React from "react";
import { storiesOf } from "@storybook/react";
import { action } from "@storybook/addon-actions";

import Tab from "./index";

const defaultTab = () => {
  return (
    <Tab  defaultIndex={0} onSelect={action("select")}>
      <Tab.Item label="Tab1">this is content one</Tab.Item>
      <Tab.Item label="Tab2">this is content two</Tab.Item>
      <Tab.Item label="Tab3">this is content three</Tab.Item>
    </Tab>
  );
};
const verticalTab = () => {
  return (
    <Tab mode="vertical" defaultIndex={0} onSelect={action("select")}>
      <Tab.Item label="Tab1">this is content one</Tab.Item>
      <Tab.Item label="Tab2">this is content two</Tab.Item>
      <Tab.Item label="Tab3">this is content three</Tab.Item>
    </Tab>
  );
};

storiesOf("Tab", module)
  .addParameters({
    info: {
      text: `
        ## Tab
          `,
    },
  })
  .add("Default Tab", defaultTab)
  .add("Vertical Tab",verticalTab);
