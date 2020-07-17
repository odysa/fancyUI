/*
 * @Author: Chengxu Bian
 * @Date: 2020-07-17 20:39:38
 * @Last Modified by: Chengxu Bian
 * @Last Modified time: 2020-07-17 22:21:59
 */
import React, { FC } from "react";
import AutoComlete, { AutoCompleteProps } from "../AutoComplete/autoComplete";
import Input from "../Input/input";
export interface SearchProps extends Partial<AutoCompleteProps> {
  placeholder?: string;
  isAutoCompleted?: boolean;
  onSearch?: (query: string) => void;
}

export const Search: FC<SearchProps> = (props) => {
  const { placeholder, fetchSuggestions, isAutoCompleted, onSearch } = props;

  if (isAutoCompleted && fetchSuggestions)
    return (
      <AutoComlete
        placeholder={placeholder}
        fetchSuggestions={fetchSuggestions}
        icon="search"
        onClickIcon={onSearch}
        onPressKey={onSearch}
      />
    );

  return (
    <Input
      placeholder={placeholder}
      icon="search"
      onClickIcon={onSearch}
      onPressKey={onSearch}
    />
  );
};

Search.defaultProps = {
  placeholder: "Search..",
};

export default Search;
