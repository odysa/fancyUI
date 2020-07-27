/*
 * @Author: Chengxu Bian 
 * @Date: 2020-07-16 10:39:20 
 * @Last Modified by: Chengxu Bian
 * @Last Modified time: 2020-07-16 14:50:04
 */
import React, { FC } from "react";
import { ThemeProps } from "../Icon/icon";

export interface ProgressProps {
  /** percentage of prograss*/
  percent: number;
  /** show text or not */
  showText?: boolean;
  /** CSS style */
  styles?: React.CSSProperties;
  /** theme of component */
  theme?: ThemeProps;
  barHeight?: string;
}

export const Progress: FC<ProgressProps> = (props) => {
  const { percent, showText, styles, theme, barHeight, ...restProps } = props;
  return (
    <div className="fancy-progress-bar" style={styles} {...restProps}>
      <div className="fancy-progress-bar-outer">
        <div
          className={`fancy-progress-bar-inner color-${theme}`}
          style={{ width: `${percent}%` }}
        >
          {showText && <span className="inner-text">{`${percent}%`}</span>}
        </div>
      </div>
    </div>
  );
};

Progress.defaultProps={
  theme:'primary',
}

export default Progress;