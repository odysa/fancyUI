import React from "react";
import Upload, { UploadFile } from "./upload";
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
        </li>
      ))}
    </ul>
  );
};

export default UploadList;
