import React, { useContext } from "react";
import classNames from "classnames";
import { MenuContext } from "./menu";
import { MenuItemProps } from "./menuItem";

export interface SubMenuProps {
  index?: number;
  title: string;
  className?: string;
}

const SubMenu: React.FC<SubMenuProps> = (props) => {
  const { title, index, className, children } = props;
  const context = useContext(MenuContext);
  const classes = classNames("menu-item subMenu-item", className, {
    "is-active": context.index === index,
  });
  const renderChildre = () => {
    const childrenComponent = React.Children.map(children, (child, index) => {
      const childrenElement = child as React.FunctionComponentElement<
        MenuItemProps
      >;
      const { displayName } = childrenElement.type;
      if (displayName === "MenuItem") return childrenElement;
      else console.error("Error: Submenu have a child which is not MenuItem");
    });
  };
  return (
    <li className={classes}>
      <div>{title}</div>
    </li>
  );
};

SubMenu.displayName = "SubMenu";

export default SubMenu;
