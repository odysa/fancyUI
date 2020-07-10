/*
 * @Author: Chengxu Bian
 * @Date: 2020-07-10 16:51:01
 * @Last Modified by: Chengxu Bian
 * @Last Modified time: 2020-07-10 18:36:38
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
  
  const classes = classNames("tab-item", classname, {
    "is-activated": context.index === index,
    "is-disabled": disabled,
  });
  const panelClasses = classNames('tab-panel',{
    "is-opened":context.index === index,
  })
  const handleClick = () => {
    if (context.onSelect && typeof index === 'number') {context.onSelect(index)};
  };
  return (
    <li className={classes}>
      <div className="tab-title" onClick={handleClick}>
        {label}
      </div>
      <div className={panelClasses}>{children}</div>
    </li>
  );
};

export default TabItem;
