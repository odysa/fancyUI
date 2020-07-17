/*
 * @Author: Chengxu Bian 
 * @Date: 2020-07-16 10:39:05 
 * @Last Modified by: Chengxu Bian
 * @Last Modified time: 2020-07-17 18:13:30
 */
import React from 'react';
import { storiesOf } from "@storybook/react";
import { action } from "@storybook/addon-actions";
import Upload from './upload';
const checkFileSize = (file:File)=>{
  if(file.size / 1024 > 10000){
    alert('file too big');
    return false;
  }
  return true;
}


const SimpleUpload = () =>{
  return(
    <Upload
      action="www.exaple.com"
      onChange={action('changed')}
      beforeUpload = {checkFileSize}
    />
  )
}


storiesOf('Upload component',module)
.add('Upload',SimpleUpload);