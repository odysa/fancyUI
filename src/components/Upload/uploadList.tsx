/*
 * @Author: Chengxu Bian 
 * @Date: 2020-07-18 20:32:10 
 * @Last Modified by:   Chengxu Bian 
 * @Last Modified time: 2020-07-18 20:32:10 
 */
import React from "react";
import { UploadFile } from "./upload";
import Progress from "../Progress/progress";

import Icon from "../Icon/icon";

interface UploadListProps {
  fileList: UploadFile[];
  onRemove?: (file: UploadFile) => void;
}
/**
 *
 * @param props
 */
const UploadList: React.FC<UploadListProps> = (props) => {
  const { fileList, onRemove } = props;
  return (
    <ul className="fancy-upload-list">
      {fileList.map((item) => (
        <li className="fancy-upload-item" key={item.id}>
          <span className={`fancy-file-name file-status-${item.status}`}>
            <Icon icon="file-alt" theme="secondary" />
            {item.name}
          </span>
          <span className="file-status">
            {item.status === "uploading" && (
              <Icon icon="spinner" spin theme="primary" />
            )}
            {item.status === "success" && (
              <Icon icon="check-circle" theme="success" />
            )}
            {item.status === "error" && (
              <Icon icon="times-circle" theme="danger" />
            )}
          </span>
          <span
            className="file-item-action"
            onClick={() => {
              if (onRemove) onRemove(item);
            }}
          >
            <Icon icon="times" theme="primary"></Icon>
          </span>
          <Progress percent={item.percent as number} theme="primary" />
        </li>
      ))}
    </ul>
  );
};

export default UploadList;
