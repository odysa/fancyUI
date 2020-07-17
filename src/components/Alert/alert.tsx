/*
 * @Author: Chengxu Bian
 * @Date: 2020-07-11 16:33:38
 * @Last Modified by: Chengxu Bian
 * @Last Modified time: 2020-07-11 17:26:27
 */
import React, { useState, FC } from "react";
import classNames from "classnames";
import Icon from "../Icon/icon";
type AlertType = "success" | "info" | "warning" | "error";

/**
 * Interface of props
 */
export interface AlertProps {
  /** Message to display */
  messgae: string;
  /** description of message */
  description?: string;
  /** Alert type*/
  type?: AlertType;
  /** closable or not*/
  closable?: boolean;
  className?: string;
}

export const Alert: FC<AlertProps> = (props) => {
  const { messgae, description, type, closable, children, className,...restProps } = props;
  const [visible, setVisibility] = useState(true);
  const classes = classNames("fancy-alert", className, {
    [`alert-${type}`]: type,
    "is-not-visible": !visible,
  });
  //flip visivility
  const handleClick = () => {
    setVisibility(!visible);
  };
  return (
    <div className={classes} {...restProps}>
      <p className="alert-message">{messgae}</p>
      <span className="alert-desc">{description}</span>
      {closable && (
        <Icon
          theme="secondary"
          icon="times"
          className="alert-close"
          onClick={handleClick}
        />
      )}
    </div>
  );
};

Alert.defaultProps = {
  type: "info",
  closable: true,
};

export default Alert;
