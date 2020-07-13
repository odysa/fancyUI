import React, {
  FC,
  ReactElement,
  InputHTMLAttributes,
  ChangeEvent,
} from "react";
import classNames from "classnames";
import { IconProp } from "@fortawesome/fontawesome-svg-core";
import Icon from "../Icon/icon";

type InputSize = "lg" | "sm";
export interface InputProps
  extends Omit<InputHTMLAttributes<HTMLElement>, "size"> {
  /**是否禁用 Input */
  disabled?: boolean;
  /**设置 input 大小，支持 lg 或者是 sm */
  size?: InputSize;
  /**添加图标，在右侧悬浮添加一个图标，用于提示 */
  icon?: IconProp;
  /**添加前缀 用于配置一些固定组合 */
  addonBefore?: string | ReactElement;
  /**添加后缀 用于配置一些固定组合 */
  addonAfter?: string | ReactElement;
  onChange?: (e: ChangeEvent<HTMLInputElement>) => void;
}

/**
 * Input component
 *
 * Support all input HTML Attributes
 */
export const Input: FC<InputProps> = (props) => {
  const {
    disabled,
    size,
    icon,
    addonBefore,
    addonAfter,
    style,
    ...restProps
  } = props;
  const classes = classNames("fancy-input-wrapper", {
    [`input-size-${size}`]: size,
    "is-disabled": disabled,
    "input-group": addonBefore || addonAfter,
  });
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
          <Icon icon={icon} title={`title-${icon}`} />
        </div>
      )}
      <input className="fancy-input-inner" disabled={disabled} {...restProps} />
      {addonAfter && (
        <div className="fancy-input-group-addonAfter">{addonAfter}</div>
      )}
    </div>
  );
};

export default Input;
