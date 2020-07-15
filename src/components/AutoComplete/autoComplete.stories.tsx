/*
 * @Author: Chengxu Bian
 * @Date: 2020-07-14 12:04:23
 * @Last Modified by: Chengxu Bian
 * @Last Modified time: 2020-07-14 19:31:04
 */
import React from "react";
import { storiesOf } from "@storybook/react";
import { action } from "@storybook/addon-actions";
import AutoComplete from "./autoComplete";

const simpleComplete = () => {
  const nations = [
    "China",
    "US",
    "France",
    "German",
    "UK",
    "Canada",
    "Japan",
    "Korea",
  ];
  const lakers = [
    { value: "bradley" },
    { value: "pope" },
    { value: "caruso" },
    { value: "cook" },
    { value: "cousins" },
    { value: "james" },
    { value: "AD" },
    { value: "green" },
    { value: "howard" },
    { value: "kuzma" },
    { value: "McGee" },
    { value: "rando" },
  ];
  // const handleFetch = (query:string)=>{
  //   return lakers.filter(name=>name.value.includes(query));
  // }
  const handleFetch = (query: string) => {
    return fetch(`https://eaza.cc/api/v1/search/${query}/1`)
      .then((res) => {
        const r = res.json();
        console.log(r);
        return r;
      })
      .then((items ) => {
        //console.log(items);
        items = items.data;
        return items
          .slice(0, 10)
          .map((item:any) => ({ value: item.name, ...item }));
      });
  };
  const renderOption = (item: any) => {
    return (
      <>
        <h2>Name: {item.value}</h2>
      </>
    );
  };

  return (
    <AutoComplete
      fetchSuggestions={handleFetch}
      renderOption={renderOption}
    ></AutoComplete>
  );
};

storiesOf("Auto Complete", module).add("Simple one", simpleComplete);
