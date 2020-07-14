import React, { FC, useState, ChangeEvent } from "react";
import { InputProps, Input } from "../Input/input";

export interface AutoCompleteProps extends Omit<InputProps, "onSelect"> {
  fetchSuggestions: (str: string) => string[];
  onSelect?: (itemL: string) => void;
}

export const AutoComplete: FC<AutoCompleteProps> = (props) => {
  const { fetchSuggestions, onSelect, value, ...restProps } = props;
  const [inputValue, setInput] = useState(value);
  const [suggestions, setSuggestions] = useState<string[]>([]);
  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    //remove redundant spaces
    const value = e.target.value.trim();
    setInput(value);
    if (value) {
      setSuggestions(fetchSuggestions(value));
    } else {
      setSuggestions([]);
    }
  };
  const handleSelect = (item:string) =>{
    setInput(item);
    setSuggestions([]);
    if(onSelect) onSelect(item);
  }
  const createDropDown = () => (
    <ul>
      {suggestions.map((item, index) => (
        <li key={index} onClick={()=>{handleSelect(item)}}>{item}</li>
      ))}
    </ul>
  );
  return (
    <div>
      <Input value={inputValue} {...restProps} onChange={handleChange} />
      {suggestions.length > 0 && createDropDown()}
    </div>
  );
};

export default AutoComplete;
