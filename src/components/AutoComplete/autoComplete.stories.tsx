/*
 * @Author: Chengxu Bian
 * @Date: 2020-07-14 12:04:23
 * @Last Modified by: Chengxu Bian
 * @Last Modified time: 2020-07-18 20:31:32
 */
import React from "react";
import { storiesOf } from "@storybook/react";
import AutoComplete from "./autoComplete";

const simpleComplete = () => {
  const handleFetch = (query: string) => {
    const nations = [
      "China",
      "US",
      "France",
      "German",
      "UK",
      "Canada",
      "Japan",
      "Korea",
    ].map((item) => ({ value: item }));
    return nations.filter((item) => item.value.includes(query));
  };
  return <AutoComplete fetchSuggestions={handleFetch}></AutoComplete>;
};

const asyncComplete = () => {
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
  const renderOption = (item: any) => {
    return (
      <>
        <span>Name:{item.value}</span>
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

storiesOf("AutoComplete", module)
  .add("Default", simpleComplete, {
    info: {
      text: `
      ## Local suggestions example
      ~~~js
      const handleFetch = (query: string) => {
        const nations = [
          "China",
          "US",
          "France",
          "German",
          "UK",
          "Canada",
          "Japan",
          "Korea",
        ].map((item) => ({ value: item }));
        return nations.filter((item) => item.includes(query));
      };
      ~~~
      `,
    },
  })
  .add("Async", asyncComplete, {
    info: {
      text: `
  ## Async suggetions example
  ~~~js
  const handleFetch = (query: string) => {
    return fetch("https://api.github.com/search/users?q="+query)
      .then((res) => {
        return res.json();
      })
      .then((items) => {
        return items.items
          .slice(0, 10)
          .map((item: any) => ({ value: item.login, ...item }));
      });
  };
  // render template
  const renderOption = (item: any) => {
    return (
      <>
        <span>Name: {item.value}</span>
      </>
    );
  };
  ~~~
  `,
    },
  });
