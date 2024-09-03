import React, { useState } from "react";
import { Button, Upload, Image, message } from "antd";
import { UploadOutlined } from "@ant-design/icons";

const CloudinaryUpload = ({ onUpload }) => {
  const [imageSrc, setImageSrc] = useState();

  const uploadProps = {
    name: "file",
    action: `${process.env.NEXT_PUBLIC_CLOUDINARY_URL}/image/upload`,
    data: {
      upload_preset: "tstdfsn5",
      api_key: "579496954431158",
    },
    onChange(info) {
      if (info.file.status === "uploading") {
        setImageSrc(undefined);
      }
      if (info.file.status === "done") {
        setImageSrc(info.file.response.secure_url);
        onUpload(info.file.response.secure_url);
        message.success(`${info.file.name} file uploaded successfully`);
      } else if (info.file.status === "error") {
        message.error(`${info.file.name} file upload failed.`);
      }
    },
  };

  return (
    <div>
      <Upload {...uploadProps}>
        <Button icon={<UploadOutlined />}>Click to Upload</Button>
      </Upload>
      {imageSrc && <Image width={200} src={imageSrc} alt="Uploaded" />}
    </div>
  );
};

export default CloudinaryUpload;
