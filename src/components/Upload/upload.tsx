import React, { FC, useRef, useState } from "react";
import UploadList from "./uploadList";
import Button from "../Button/button";
import axios from "axios";
import { setegid } from "process";

export interface UploadProps {
  action: string;
  defaultFileList?: UploadFile[];
  beforeUpload?: (file: File) => boolean | Promise<File>;
  onProgress?: (percentage: number, file: File) => void;
  onSuccess?: (data: any, file: File) => void;
  onError?: (err: any, file: File) => void;
  onChange?: (file: File) => void;
  onRemove?: (file: UploadFile) => void;
  display?: string;
}

type fileStatus = "uploading" | "ready" | "success" | "error";
export interface UploadFile {
  id: string;
  size: number;
  name: string;
  status?: fileStatus;
  percent?: number;
  raw?: File;
  response?: any;
  error?: any;
}

export const Upload: FC<UploadProps> = (props) => {
  const {
    action,
    onProgress,
    onSuccess,
    onError,
    beforeUpload,
    onRemove,
    display,
  } = props;
  const fileInput = useRef<HTMLInputElement>(null);
  const [fileList, setFileList] = useState<UploadFile[]>([]);

  //update attributes of file such as status
  const updateFileStatus = (
    upLoadFile: UploadFile,
    updateStatus: Partial<UploadFile>
  ) => {
    setFileList((prevList) => {
      return prevList.map((file) => {
        if (file.id === upLoadFile.id) {
          return {
            ...file,
            ...updateStatus,
          };
        } else {
          return file;
        }
      });
    });
  };
  const handleClick = () => {
    if (fileInput.current) {
      fileInput.current.click();
    }
  };
  const handleRemove = (file: UploadFile) => {
    setFileList((prevList) => prevList.filter((item) => item.id !== file.id));
    if (onRemove) {
      onRemove(file);
    }
  };
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files) {
      return;
    }
    upLoadFiles(files);
    if (fileInput.current) {
      fileInput.current.value = "";
    }
  };
  const upLoadFiles = (files: FileList) => {
    let postFiles = Array.from(files);
    postFiles.forEach((file) => {
      if (beforeUpload) {
        const result = beforeUpload(file);
        //change file or not valid file
        if (result && result instanceof Promise) {
          result.then((file) => {
            postHelper(file);
          });
        } else if (result) {
          postHelper(file);
        }
      } else {
        postHelper(file);
      }
    });
  };
  /**
   * Post method to upload file
   * @param file
   */
  const postHelper = (file: File) => {
    let _file: UploadFile = {
      id: Date.now() + "upload-file",
      status: "ready",
      name: file.name,
      size: file.size,
      percent: 0,
      raw: file,
    };
    //add new file
    setFileList([_file, ...fileList]);
    const formData = new FormData();
    formData.append(file.name, file);
    axios
      .post(action, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
        onUploadProgress: (e) => {
          let percentage = Math.round((e.loaded * 100) / e.total) || 0;
          console.log(percentage);
          //not uploaded yet
          if (percentage < 100) {
            updateFileStatus(_file, {
              percent: percentage,
              status: "uploading",
            });
            if (onProgress) {
              onProgress(percentage, file);
            }
          }
        },
      })
      .then((res) => {
        updateFileStatus(_file, { status: "success" });
        if (onSuccess) {
          onSuccess(res.data, file);
        }
      })
      .catch((err) => {
        updateFileStatus(_file, { status: "error" });
        if (onError) {
          onError(err, file);
        }
      });
  };
  return (
    <div className="fancy-upload">
      <Button btnType="primary" onClick={handleClick}>
        {display}
      </Button>
      <input
        type="file"
        ref={fileInput}
        onChange={handleChange}
        style={{ display: "none" }}
      />
      <UploadList fileList={fileList} onRemove={handleRemove} />
    </div>
  );
};
Upload.defaultProps = {
  display: "Upload Here",
};
export default Upload;
