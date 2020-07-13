import React, { useContext, useState } from "react";
import { CSSTransition } from 'react-transition-group';
import classNames from "classnames";
import { MenuContext } from "./menu";
import { MenuItemProps } from "./menuItem";
import Icon from '../Icon/icon';
export interface SubMenuProps {
  index?: string;
  title: string;
  className?: string;
}

const SubMenu: React.FC<SubMenuProps> = (props) => {
  const { title, index, className, children } = props;
  const context = useContext(MenuContext);
  const openedSubmenus = context.defaultOpenSubmenu as Array<string>;
  const isOpened =
    index && context.mode === "vertical"
      ? openedSubmenus.includes(index)
      : false;
  const [focused, setFocused] = useState(isOpened);
  const classes = classNames("menu-item submenu-item", className, {
    "is-active": context.index === index,
  });
  const handleClick = (e: React.MouseEvent) => {
    e.preventDefault();
    setFocused(!focused);
  };
  let timer: any;
  const handleMouse = (e: React.MouseEvent, open: boolean) => {
    clearTimeout(timer);
    e.preventDefault();
    timer = setTimeout(() => {
      setFocused(open);
    }, 150);
  };
  const clickEvents =
    context.mode === "vertical"
      ? {
          onClick: handleClick,
        }
      : {};
  const hoverEvents =
    context.mode === "horizontal"
      ? {
          onMouseEnter: (e: React.MouseEvent) => {
            handleMouse(e, true);
          },
          onMouseLeave: (e: React.MouseEvent) => {
            handleMouse(e, false);
          },
        }
      : {};
  const renderChildren = () => {
    const subMenuClasses = classNames("fancy-submenu", {
      "menu-opened": focused,
    });
    const childrenComponent = React.Children.map(children, (child, i) => {
      const childrenElement = child as React.FunctionComponentElement<
        MenuItemProps
      >;
      const { displayName } = childrenElement.type;
      if (displayName === "MenuItem")
        return React.cloneElement(childrenElement, {
          index: `${index}-${i}`,
        });
      else console.error("Error: Submenu have a child which is not MenuItem");
    });
    return <ul className={subMenuClasses}>{childrenComponent}</ul>;
  };
  return (
    // <CSSTransition in={focused} classNames="submenu-motion" timeout={200}>
    <li className={classes} {...hoverEvents}>
      <div className="submenu-title" {...clickEvents}>
        <span> {title}</span>
        <Icon icon="angle-down" className="arrow-icon" />
      </div>
      {renderChildren()}
    </li>
    // </CSSTransition>
  );
};

SubMenu.displayName = "Submenu";

export default SubMenu;
