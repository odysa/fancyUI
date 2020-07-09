/*
 * @Author: Chengxu Bian
 * @Date: 2020-07-06 22:44:36
 * @Last Modified by:   Chengxu Bian
 * @Last Modified time: 2020-07-06 22:44:36
 */

import React, { createContext, useState } from "react";
import classNames from "classnames";
import { MenuItemProps } from "./menuItem";
type MenuMode = "horizontal" | "vertical";

type SelectCallback = (selectedIndex: string) => void;

export interface MenuProps {
  defaultIndex?: string;
  className?: string;
  mode?: MenuMode;
  style?: React.CSSProperties;
  onSelect?: SelectCallback;
  defaultOpenSubmenu?: string[];
}

interface MenuContext {
  index: string;
  onSelect?: SelectCallback;
  mode?: MenuMode;
  defaultOpenSubmenu?: string[];
}

export const MenuContext = createContext<MenuContext>({ index: "0" });

const Menu: React.FC<MenuProps> = (props) => {
  const { className, mode, style, onSelect, defaultIndex, children } = props;
  const [currentIndex, setIndex] = useState(defaultIndex);

  const classes = classNames("fancy-menu", className, {
    "menu-vertical": mode === "vertical",
    "menu-horizontal": mode === "horizontal",
  });

  const handleClick = (index: string) => {
    setIndex(index);
    if (onSelect) {
      onSelect(index);
    }
  };

  const passedContext: MenuContext = {
    index: currentIndex ? currentIndex : "0",
    onSelect: handleClick,
    mode,
    defaultOpenSubmenu: [],
  };
  // check children components
  const renderChildren = () => {
    return React.Children.map(children, (child, index) => {
      const childElement = child as React.FunctionComponentElement<
        MenuItemProps
      >;
      const { displayName } = childElement.type;
      if (displayName === "MenuItem" || displayName === "Submenu")
        return React.cloneElement(childElement, { index: index.toString() });
      else console.error("Error: Not a Menu Item Component");
    });
  };

  return (
    <ul className={classes} style={style} data-testid="test-menu">
      <MenuContext.Provider value={passedContext}>
        {renderChildren()}
      </MenuContext.Provider>
    </ul>
  );
};

Menu.defaultProps = {
  defaultIndex: "0",
  mode: "horizontal",
  defaultOpenSubmenu: [],
};

export default Menu;
