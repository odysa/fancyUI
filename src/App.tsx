/*
 * @Author: Chengxu Bian
 * @Date: 2020-07-06 22:45:08
 * @Last Modified by: Chengxu Bian
 * @Last Modified time: 2020-07-10 18:36:51
 */
import React from "react";
import Button, { ButtonType, ButtonSize } from "./components/Button/button";
import Menu from "./components/Menu/menu";
import MenuItem from "./components/Menu/menuItem";
import SubMenu from "./components/Menu/subMenu";
import Tab from './components/Tab/tab';
import TabItem from './components/Tab/tabItem'
function App() {
  return (
    <div className="App">
      {/* <header className="App-header">
        <Button btnType={ButtonType.Primary} size={ButtonSize.Large}>
          Hello
        </Button>
        <Button
          btnType={ButtonType.Link}
          size={ButtonSize.Small}
          href={"www.baidu.com"}
        >
          Link Test
        </Button>
        <Button
          btnType={ButtonType.Link}
          disabled={true}
          size={ButtonSize.Small}
        >
          Disabled Link
        </Button>
        <Button btnType={ButtonType.Primary} size={ButtonSize.Large}>
          Large Button
        </Button>
        <Button btnType={ButtonType.Danger} size={ButtonSize.Large}>
          Danger Button
        </Button>
        <Button
          btnType={ButtonType.Primary}
          disabled={true}
          size={ButtonSize.Large}
        >
          Disabled Button
        </Button>
  </header>*/}
      {/* <body>
        <Menu mode="vertical">
          <MenuItem>123</MenuItem>
          <MenuItem>123</MenuItem>
          <MenuItem disabled={true}>123</MenuItem>
          <SubMenu title='new'>
            <MenuItem>sub</MenuItem>
            <MenuItem>sub</MenuItem>
          </SubMenu>
          <MenuItem>123</MenuItem>
        </Menu>
      </body> */}
      <Tab mode="vertical">
        <TabItem label="tab1">tab1123123</TabItem>
        <TabItem label="tab2">tab2</TabItem>
        <TabItem label="tab3">tab3</TabItem>
        <TabItem label="tab4">tab4</TabItem>
      </Tab>
    </div>
  );
}

export default App;
