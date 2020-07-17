/*
 * @Author: Chengxu Bian 
 * @Date: 2020-07-16 16:15:38 
 * @Last Modified by:   Chengxu Bian 
 * @Last Modified time: 2020-07-16 16:15:38 
 */
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


const loaderFn = () => {
  const allExports = [require("../src/welcome.stories.tsx")];
  const req = require.context("../src/components", true, /\.stories\.tsx$/);
  req.keys().forEach((fname) => allExports.push(req(fname)));
  return allExports;
};

configure(
  loaderFn,
  module
);