/*
 * @Author: Chengxu Bian
 * @Date: 2020-07-10 16:50:59
 * @Last Modified by: Chengxu Bian
 * @Last Modified time: 2020-07-10 18:24:43
 */
import React, { createContext, useState } from "react";
import classNames from "classnames";
import { TabItemProps } from "./tabItem";
type SelectCallBack = (selectIndex: number) => void;
type TabMode = "vertical" | "horizontal";

export interface TabProps {
  defaultIndex?: number;
  onSelect?: SelectCallBack;
  className?: string;
  size?: string;
  mode?: TabMode;
}

export interface TabContext {
  index: number;
  onSelect?: SelectCallBack;
}

export const TabContext = createContext<TabContext>({ index: 0 });

const Tab: React.FC<TabProps> = (props) => {
  const { defaultIndex, onSelect, children, className, mode } = props;
  const classes = classNames("fancy-tab", className, {
    "tab-horizontal": mode === "horizontal",
    "tab-vertical": mode === "vertical",
  });
  const [currentIndex, setindex] = useState(defaultIndex);
  const handleClick = (index: number) => {
    setindex(index);
    if (onSelect) {
      onSelect(index);
    }
  };
  const passedContext: TabContext = {
    index: currentIndex ? currentIndex : 0,
    onSelect: handleClick,
  };
  const renderChildren = () => {
    return React.Children.map(children, (child, index) => {
      const childElement = child as React.FunctionComponentElement<
        TabItemProps
      >;
      return React.cloneElement(childElement, { index });
    });
  };
  return (
    <div>
      <ul className={classes}>
        <TabContext.Provider value={passedContext}>
          {renderChildren()}
        </TabContext.Provider>
      </ul>
    </div>
  );
};

Tab.defaultProps = {
  defaultIndex: 0,
  size: "sm",
  className: "",
  mode: "horizontal",
};

export default Tab;
