/*
 * @Author: Chengxu Bian
 * @Date: 2020-07-06 22:44:36
 * @Last Modified by:   Chengxu Bian
 * @Last Modified time: 2020-07-06 22:44:36
 */

import React, { createContext, useState } from "react";
import classNames from "classnames";

type MenuMode = "horizontal" | "vertical";

type SelectCallback = (selectedIndex: number) => void;

export interface MenuProps {
  defaultIndex?: number;
  className?: string;
  mode?: MenuMode;
  style?: React.CSSProperties;
  onSelect?: SelectCallback;
}

interface MenuContext {
  index: number;
  onSelect?: SelectCallback;
}

export const MenuContext = createContext<MenuContext>({ index: 0 });

const Menu: React.FC<MenuProps> = (props) => {
  const { className, mode, style, onSelect, defaultIndex, children } = props;
  const [currentIndex, setIndex] = useState(defaultIndex);

  const classes = classNames("fancy-menu", className, {
    "menu-vertical": mode === "vertical",
  });

  const handleClick = (index: number) => {
    setIndex(index);        
    if (onSelect) {
      onSelect(index);
    }
  };

  const passedContext: MenuContext = {
    index: currentIndex ? currentIndex : 0,
    onSelect: handleClick,
  };

  return (
    <ul className={classes} style={style} data-testid="test-menu">
      <MenuContext.Provider value={passedContext}>
        {children}
      </MenuContext.Provider>
    </ul>
  );
};

Menu.defaultProps = {
  defaultIndex: 0,
  mode: "horizontal",
};

export default Menu;
