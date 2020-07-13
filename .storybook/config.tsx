import { configure, addDecorator, addParameters } from "@storybook/react";
import React from "react";
import { withInfo } from "@storybook/addon-info";

import "../src/styles/index.scss";

import { library } from "@fortawesome/fontawesome-svg-core";
import { fas } from "@fortawesome/free-solid-svg-icons";
library.add(fas);



const styleWrapper: React.CSSProperties = {
  padding: "20px 40px",
};
const UIDecorator = (storyFn: any) => (
  <div style={styleWrapper}>
    <h3>Demo</h3>
    {storyFn()}
  </div>
);
addDecorator(UIDecorator);
addDecorator(withInfo);
addParameters({ info: { inline: true, header: false } });

configure(
  require.context("../src/components", true, /\.stories\.tsx$/),
  module
);