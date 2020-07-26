/*
 * @Author: Chengxu Bian 
 * @Date: 2020-07-06 22:44:07 
 * @Last Modified by: Chengxu Bian
 * @Last Modified time: 2020-07-13 17:12:28
 */

import React,{FC,ButtonHTMLAttributes,AnchorHTMLAttributes} from "react";
import classNames from "classnames";


type ButtonSize = 'lg' | 'sm';
type ButtonType = "primary"|"default"|"danger"|"link";
interface BaseButtonProps {
  className?: string;
  /**disable button*/
  disabled?: boolean;
  /**size of button*/
  size?: ButtonSize;
  /**type of button*/
  btnType?: ButtonType;
  children?: React.ReactNode;
  /**href of link button*/
  href?: string;
}

//intersection type gather two types
type NativeButtonProps = BaseButtonProps &
  ButtonHTMLAttributes<HTMLElement>;
type AnchorButtonProps = BaseButtonProps &
 AnchorHTMLAttributes<HTMLElement>;

// partial types all optional
export type ButtonProps = Partial<NativeButtonProps & AnchorButtonProps>;

/**
 * A fancy button
 * 
 */
export const Button: FC<ButtonProps> = (props) => {
  const {
    btnType,
    disabled,
    size,
    children,
    className,
    href,
    ...restProps
  } = props;

  const classes = classNames("fancy-btn", className, {
    [`fancy-btn-${btnType}`]: btnType,
    [`fancy-btn-${size}`]: size,
    disabled: disabled,
  });

  if (btnType === 'link' && href) {
    return (
      <a className={classes} href={href} {...restProps}>
        {children}
      </a>
    );
  }

  return (
    <button className={classes} disabled={disabled} {...restProps}>
      {children}
    </button>
  );
};

Button.defaultProps = {
  disabled: false,
  btnType: "default",
};

export default Button;
