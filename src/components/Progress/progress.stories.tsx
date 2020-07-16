/*
 * @Author: Chengxu Bian
 * @Date: 2020-07-16 10:39:16
 * @Last Modified by: Chengxu Bian
 * @Last Modified time: 2020-07-16 11:14:39
 */
import React, { useState } from "react";
import { storiesOf } from "@storybook/react";
import Progress from "./progress";
const defaultProgress= () => {
  const [percent,setPercent] = useState(0);
  setTimeout(() => {
    if (percent < 100) setPercent(percent+1);
    else setPercent(0);    
  }, 200);

  return (
    <>
      <Progress percent={percent} theme="primary" />
      <br />
      <Progress percent={percent} theme="primary" showText />
    </>
  );
};
const themeProgress = () => (
  <>
    <Progress percent={80} theme="primary" showText />
    <br />
    <Progress percent={60} theme="danger" showText />
    <br />
    <Progress percent={50} theme="info" showText />
    <br />
    <Progress percent={40} theme="secondary" showText />
    <br />
    <Progress percent={30} theme="success" showText />
    <br />
    <Progress percent={20} theme="warning" showText />
  </>
);

storiesOf("Progress", module)
  .add("default", defaultProgress)
  .add("theme progress", themeProgress);
