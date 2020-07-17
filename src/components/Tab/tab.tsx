/*
 * @Author: Chengxu Bian
 * @Date: 2020-07-10 16:50:59
 * @Last Modified by: Chengxu Bian
 * @Last Modified time: 2020-07-17 18:09:43
 */
import React, { createContext, useState, FC, FunctionComponentElement, ReactNode } from "react";
import classNames from "classnames";
import { TabItemProps } from "./tabItem";

// type of callback function
type SelectCallBack = (
  selectIndex: number,
  selectContent: React.ReactNode
) => void;
type TabMode = "vertical" | "horizontal";

export interface TabProps {
  defaultIndex?: number;
  onSelect?: (index: number) => void;
  className?: string;
  size?: string;
  mode?: TabMode;
}

export interface TabContext {
  //current index selected
  index: number;
  onSelect?: SelectCallBack;
  content?: React.Component;
}

export const TabContext = createContext<TabContext>({ index: 0 });

export const Tab: FC<TabProps> = (props) => {
  const { defaultIndex, onSelect, children, className, mode } = props;
  
  const tabClasses = classNames("fancy-tab",{
    "tab-horizontal": mode === "horizontal",
    "tab-vertical": mode === "vertical",
  });
  const contentClasses = classNames('tab-content',{
    "content-horizontal": mode === "horizontal",
    "content-vertical": mode === "vertical",
  });
  const containerClasses = classNames(className,'tab-container',{
    "container-horizontal": mode === "horizontal",
    "container-vertical": mode === "vertical",
  });
  
  const [currentIndex, setindex] = useState(defaultIndex);
  //get first children's props
  const childrenElements = children as FunctionComponentElement<any>[];
  const defaultContent = childrenElements[0].props.children;
  const [currentContent, setContent] = useState(defaultContent);
  // change content after clicked
  const handleClick = (index: number, content:ReactNode) => {
    setindex(index);
    if (onSelect) {
      onSelect(index);
    }
    //change content
    if (content) {
      setContent(content);
    }
  };
  //pass context to children
  const passedContext: TabContext = {
    index: currentIndex ? currentIndex : 0,
    onSelect: handleClick,
  };

  const renderChildren = () => {
    return React.Children.map(children, (child, index) => {
      const childElement = child as FunctionComponentElement<
        TabItemProps
      >;
      //attach index to children
      return React.cloneElement(childElement, { index });
    });
  };
  return (
    <div className={containerClasses}>
      <ul className={tabClasses}>
        <TabContext.Provider value={passedContext}>
          {renderChildren()}
        </TabContext.Provider>
      </ul>
      {/* content to display */}
      <div className={contentClasses}>{currentContent}</div>
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
