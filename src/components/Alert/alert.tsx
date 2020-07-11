/*
 * @Author: Chengxu Bian
 * @Date: 2020-07-11 16:33:38
 * @Last Modified by: Chengxu Bian
 * @Last Modified time: 2020-07-11 17:26:27
 */
import React, { useState } from "react";
import classNames from "classnames";

type AlertType = "success" | "info" | "warning" | "error";

/**
 * Interface of props
 */
export interface AlertProps {
  //title
  messgae: string;
  //blank description
  description?: string;
  type?: AlertType;
  closable?: boolean;
  className?: string;
}

const Alert: React.FC<AlertProps> = (props) => {
  const {
    messgae,
    description,
    type,
    closable,
    children,
    className,
  } = props;
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
    <div className={classes}>
      <p className="alert-message">{messgae}</p>
      <span className="alert-desc">{description}</span>
      {closable&&<i className="iconfont icon-close alert-close" onClick={handleClick}/>}
    </div>
  );
};

Alert.defaultProps = {
  type: "info",
  closable:true,
};

export default Alert;
