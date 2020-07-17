/*
 * @Author: Chengxu Bian 
 * @Date: 2020-07-17 20:51:50 
 * @Last Modified by:   Chengxu Bian 
 * @Last Modified time: 2020-07-17 20:51:50 
 */
import Tab, { TabProps } from "./tab";
import TabItem, { TabItemProps } from "./tabItem";
import { FC } from "react";

type TabComponent = FC<TabProps> & {
  Item: FC<TabItemProps>;
};

const Tabs = Tab as TabComponent;
Tabs.Item = TabItem;
export default Tabs;
