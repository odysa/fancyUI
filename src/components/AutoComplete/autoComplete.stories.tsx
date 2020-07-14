import React from "react";
import { storiesOf } from "@storybook/react";
import { action } from "@storybook/addon-actions";
import AutoComplete from './autoComplete';


const simpleComplete = ()=>{
  const nations = ['China','US','France','German','UK','Canada','Japan','Korea'];
  const handleFetch = (query:string)=>{
    return nations.filter(name=>name.includes(query));
  }
  return <AutoComplete fetchSuggestions={handleFetch}></AutoComplete>
}


storiesOf('Auto Complete',module)
.add('Simple one',simpleComplete)