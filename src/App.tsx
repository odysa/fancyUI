/*
 * @Author: Chengxu Bian
 * @Date: 2020-07-06 22:45:08
 * @Last Modified by: Chengxu Bian
 * @Last Modified time: 2020-07-14 20:05:35
 */
import React from "react";
import Button from "./components/Button/button";
import Menu from "./components/Menu/menu";
import MenuItem from "./components/Menu/menuItem";
import SubMenu from "./components/Menu/subMenu";
import Tab from "./components/Tab/tab";
import TabItem from "./components/Tab/tabItem";
import Alert from './components/Alert/alert'
import Icon from './components/Icon/icon'
import Input from './components/Input/input';
import axios from 'axios';
import Uplaod, { Upload } from './components/Upload/upload';
function App() {
  const handleFileChange = (e:React.ChangeEvent<HTMLInputElement>)=>{
    const files = e.target.files;
    if(files){
      const uploadedFile = files[0];
      const formData = new FormData()
      formData.append(uploadedFile.name,uploadedFile);
      axios.post("https://jsonplaceholder.typicode.com/posts",formData,{
        headers:{
          'Content-Type':'multipart/form-data'
        }
      }).then(res=>{
        console.log(res);
      })

    }
  }
  return(
    <div className="App">
        <Upload action="https://jsonplaceholder.typicode.com/posts"></Upload>
    </div>
  )
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
        <Menu mode="horizontal">
          <MenuItem>123</MenuItem>
          <MenuItem>123</MenuItem>
          <MenuItem disabled={true}>123</MenuItem>
          <SubMenu title='new'>
            <MenuItem>sub</MenuItem>
            <MenuItem>sub</MenuItem>
          </SubMenu>
          <MenuItem>123</MenuItem>
        </Menu>
      </body>
      <Tab mode="horizontal">
        <TabItem label="tab1">tab1</TabItem>
        <TabItem label="tab2">tab2</TabItem>
        <TabItem label="tab3">tab3</TabItem>
        <TabItem label="tab4">tab4</TabItem>
      </Tab>
      <Tab mode="vertical">
        <TabItem label="tab1">tab1123123</TabItem>
        <TabItem label="tab2">tab2</TabItem>
        <TabItem label="tab3">tab3</TabItem>
        <TabItem label="tab4">tab4</TabItem>
      </Tab>
      <Alert messgae="Information" description="It is a description" type="info"/>
      <Alert messgae="Information" description="It is a description" type="warning"/>
      <Alert messgae="Information" description="It is a description" type="error"/>
      <Alert messgae="Information" description="It is a description" type="success"/>
      <Icon icon="coffee" theme="danger" size="10x" /> */}
    
    {/* <Input
    addonBefore="https://"
    placeholder="123123"
    ></Input> */}
    </div>
    
  );
}

export default App;
