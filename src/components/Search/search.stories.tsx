/*
 * @Author: Chengxu Bian 
 * @Date: 2020-07-17 20:51:32 
 * @Last Modified by: Chengxu Bian
 * @Last Modified time: 2020-07-17 20:52:26
 */
import React from "react";
import { storiesOf } from "@storybook/react";

import Search from './search';

const Searchwithcompletion = ()=>{
  const handleFetch = (query: string) => {
    return fetch(`https://api.github.com/search/users?q=${query}`)
      .then((res) => {
        return res.json();
      })
      .then((items) => {
        return items.items
          .slice(0, 10)
          .map((item: any) => ({ value: item.login, ...item }));
      });
  };
  return(
    <Search
    isAutoCompleted
    fetchSuggestions={handleFetch}
    onSearch={(value)=>{alert(value)}}
    />
  )
}
const defaultSearch = ()=>(
  <Search
  onSearch={(value)=>{alert(value)}}
  />
)

storiesOf('Search',module)
.add('AutoComplete Search',Searchwithcompletion)
.add('Default Search',defaultSearch)