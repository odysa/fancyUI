/*
 * @Author: Chengxu Bian
 * @Date: 2020-07-14 12:04:20
 * @Last Modified by: Chengxu Bian
 * @Last Modified time: 2020-07-14 18:25:58
 */
import React, { FC, useState, ChangeEvent, useEffect, useRef } from "react";
import classNames from "classnames";
import { InputProps, Input } from "../Input/input";
import useDebounce from "../../hooks/useDebounce";
import useClickOutside from '../../hooks/useClickOutside';
interface DataObject {
  value: string;
}

export type DataType<T = {}> = T & DataObject;

export interface AutoCompleteProps extends Omit<InputProps, "onSelect"> {
  /** fuction to get suggestions*/
  fetchSuggestions: (str: string) => DataType[] | Promise<DataType[]>;
  /** callback function for selection*/
  onSelect?: (itemL: string) => void;
  renderOption?: (item: DataType) => React.ReactElement;
}
/**
 * A auto complete input component
 * Built on basic input component
 */
export const AutoComplete: FC<AutoCompleteProps> = (props) => {
  const {
    fetchSuggestions,
    onSelect,
    value,
    renderOption,
    ...restProps
  } = props;

  const [inputValue, setInput] = useState(value as string);
  const [suggestions, setSuggestions] = useState<DataType[]>([]);
  const [highlightIndex, setHighligtIndex] = useState(-1);
  const triggleSearch = useRef(false);
  const debouncedValue = useDebounce(inputValue, 500);
  const commonRef = useRef(null);
  useClickOutside(commonRef,()=>{setSuggestions([])})

  //debounced value change callback
  useEffect(() => {
    if (debouncedValue&&triggleSearch.current) {
      const res = fetchSuggestions(debouncedValue);

      if (res instanceof Promise) {
        res.then((data) => {
          setSuggestions(data);
        });
      } else {
        setSuggestions(res);
      }
    } else {
      setSuggestions([]);
    }
    setHighligtIndex(-1);
  }, [debouncedValue]);

  const highlight = (index: number) => {
    if (index < 0) index = 0;
    if (index >= suggestions.length) index = suggestions.length - 1;
    setHighligtIndex(index);
  };
  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    switch (e.keyCode) {
      //enter
      case 13:
        if (suggestions[highlightIndex]) {
          handleSelect(suggestions[highlightIndex]);
        }
        break;
      //up
      case 38:
        highlight(highlightIndex - 1); 
        break;
      //down
      case 40:
        highlight(highlightIndex + 1);
        break;
      //esc
      case 27:
        setSuggestions([]);
        break;
      default:
        break;
    }
  };

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    //remove redundant spaces
    const value = e.target.value.trim();
    setInput(value);
    triggleSearch.current = true;
  };

  const handleSelect = (item: DataType) => {
    setInput(item.value);
    setSuggestions([]);
    if (onSelect) onSelect(item.value);
    triggleSearch.current = false;
  };

  const renderTemplate = (item: DataType) => {
    return renderOption ? renderOption(item) : item;
  };

  /**
   * create a dropdown board for suggestions
   */
  const createDropDown = () => (
    <ul>
      {suggestions.map((item, index) => {
        const classes = classNames("suggestion-item", {
          "item-highlighted": index === highlightIndex,
        });
        return (
          <li
            className={classes}
            key={index}
            onClick={() => {
              handleSelect(item);
            }}
          >
            {renderTemplate(item)}
          </li>
        );
      })}
    </ul>
  );
  return (
    <div ref={commonRef}>
      <Input
        value={inputValue}
        {...restProps}
        onChange={handleChange}
        onKeyDown={handleKeyDown}
      />
      {suggestions.length > 0 && createDropDown()}
    </div>
  );
};

export default AutoComplete;
