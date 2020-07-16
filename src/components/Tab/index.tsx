import Tab, { TabProps } from "./tab";
import TabItem, { TabItemProps } from "./tabItem";
import { FC } from "react";

type TabComponent = FC<TabProps> & {
  Item: FC<TabItemProps>;
};

const Tabs = Tab as TabComponent;
Tabs.Item = TabItem;
export default Tabs;
