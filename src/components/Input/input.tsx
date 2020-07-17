/*
 * @Author: Chengxu Bian
 * @Date: 2020-07-14 15:08:20
 * @Last Modified by: Chengxu Bian
 * @Last Modified time: 2020-07-17 20:48:57
 */
import React, {
  FC,
  ReactElement,
  InputHTMLAttributes,
  ChangeEvent,
  useState,
} from "react";
import classNames from "classnames";
import { IconProp } from "@fortawesome/fontawesome-svg-core";
import Icon from "../Icon/icon";

type InputSize = "lg" | "sm";
export interface InputProps
  extends Omit<InputHTMLAttributes<HTMLElement>, "size"> {
  /** whether disabled*/
  disabled?: boolean;
  /** size of input*/
  size?: InputSize;
  /** icon to display*/
  icon?: IconProp;
  /** element in the front*/
  addonBefore?: string | ReactElement;
  /** element in the back*/
  addonAfter?: string | ReactElement;
  /**callback function when changed */
  onChange?: (e: ChangeEvent<HTMLInputElement>) => void;
  onClickIcon?: (value: any) => void;
  onPressKey?: (value: any) => void;
}

export const Input: FC<InputProps> = (props) => {
  const {
    disabled,
    size,
    icon,
    addonBefore,
    addonAfter,
    style,
    onClickIcon,
    onPressKey,
    ...restProps
  } = props;
  const classes = classNames("fancy-input-wrapper", {
    [`input-size-${size}`]: size,
    "is-disabled": disabled,
    "input-group": addonBefore || addonAfter,
  });
  const [inputValue, setInputValue] = useState("");
  const handleClick = (e: React.MouseEvent) => {
    if (onClickIcon) onClickIcon(inputValue);
  };
  const handlePress = (e: React.KeyboardEvent) => {
    if (e.keyCode === 13) {
      if (onPressKey) onPressKey(inputValue);
    }
  };
  const fixControlledValue = (value: any) => {
    //if value not exist, set it empty string
    if (value == null) {
      return "";
    }
    return value;
  };
  //should not both have defaultvalue and value
  if ("value" in props) {
    delete restProps.defaultValue;
    restProps.value = fixControlledValue(props.value);
  }
  return (
    <div className={classes} style={style}>
      {addonBefore && (
        <div className="fancy-input-group-addonBefore">{addonBefore}</div>
      )}
      {icon && (
        <div className="icon-wrapper">
          <Icon icon={icon} title={`title-${icon}`} onClick={handleClick} />
        </div>
      )}
      <input
        onChange={(e:any)=>{setInputValue(e.target.value)}}
        className="fancy-input-inner"
        disabled={disabled}
        onKeyDown={handlePress}
        {...restProps}
      />
      {addonAfter && (
        <div className="fancy-input-group-addonAfter">{addonAfter}</div>
      )}
    </div>
  );
};

export default Input;
