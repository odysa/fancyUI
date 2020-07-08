/*
 * @Author: Chengxu Bian 
 * @Date: 2020-07-06 22:45:08 
 * @Last Modified by:   Chengxu Bian 
 * @Last Modified time: 2020-07-06 22:45:08 
 */
import React from "react";
import Button, { ButtonType, ButtonSize } from "./components/Button/button";
import Menu from './components/Menu/menu';
import MenuItem from './components/Menu/menuItem'
function App() {
  return (
    <div className="App">
      <header className="App-header">
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
      </header>
      <body>
        <Menu mode='vertical'>
          <MenuItem index={1}>123</MenuItem>
          <MenuItem index={2}>123</MenuItem>
          <MenuItem index={3} disabled={true}>123</MenuItem>
          <MenuItem index={4}>123</MenuItem>
        </Menu>

      </body>
    </div>
  );
}

export default App;
