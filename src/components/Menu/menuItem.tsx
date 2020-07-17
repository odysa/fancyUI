/*
 * @Author: Chengxu Bian
 * @Date: 2020-07-06 22:44:18
 * @Last Modified by: Chengxu Bian
 * @Last Modified time: 2020-07-17 18:10:50
 */

import React, { useContext, FC } from "react";
import classNames from "classnames";
import { MenuContext } from "./menu";

export interface MenuItemProps {
  index?: string;
  disabled?: boolean;
  className?: string;
  style?: React.CSSProperties;
}

export const MenuItem: FC<MenuItemProps> = (props) => {
  const { className, index, disabled, children, style } = props;

  const context = useContext(MenuContext);

  const classes = classNames("menu-item", className, {
    "is-disabled": disabled,
    "is-active": context.index === index,
  });

  const handleClick = () => {
    if (context.onSelect && !disabled && typeof index === "string") {
      context.onSelect(index);
    }
  };

  return (
    <li className={classes} style={style} onClick={handleClick}>
      {children}
    </li>
  );
};

MenuItem.displayName = "MenuItem";

export default MenuItem;
