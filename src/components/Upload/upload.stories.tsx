/*
 * @Author: Chengxu Bian 
 * @Date: 2020-07-16 10:39:05 
 * @Last Modified by:   Chengxu Bian 
 * @Last Modified time: 2020-07-16 10:39:05 
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

// const filePromise = (file:File){
//   const newFile = new File([file],'new.docx',{type:file.type})
//   return Promise.resolve(newFile);
// }

const SimpleUpload = () =>{
  return(
    <Upload
      action="https://run.mocky.io/v3/44435017-162d-49e1-8ace-03f5907ab0e1"
      onChange={action('changed')}
      beforeUpload = {checkFileSize}
    />
  )
}


storiesOf('Upload component',module)
.add('Upload',SimpleUpload)