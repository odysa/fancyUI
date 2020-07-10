/*
 * @Author: Chengxu Bian
 * @Date: 2020-07-10 16:51:01
 * @Last Modified by: Chengxu Bian
 * @Last Modified time: 2020-07-10 22:07:38
 */
import React, { useContext } from "react";
import classNames from "classnames";
import { TabContext } from "./tab";
export interface TabItemProps {
  index?: number;
  disabled?: boolean;
  label: string;
  classname?: string;
}

const TabItem: React.FC<TabItemProps> = (props) => {
  const { index, disabled, label, children, classname } = props;
  const context = useContext(TabContext);
  
  const classes = classNames("tab-item tab-title", classname, {
    "is-activated": context.index === index,
    "is-disabled": disabled,
  });
  const panelClasses = classNames('tab-panel',{
    "is-opened":context.index === index,
  })
  const handleClick = () => {
    if (context.onSelect && typeof index === 'number') {context.onSelect(index,children)};
  };
  return (
    <li className={classes}  onClick={handleClick}>
        {label}
    </li>
  );
};

export default TabItem;
