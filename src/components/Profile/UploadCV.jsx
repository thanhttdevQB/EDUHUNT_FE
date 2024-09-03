import React, { useState, useEffect } from "react";
import CloudinaryCV from "../cloud/CloudinaryCV";
import { Image } from "antd";
import { useProfile } from "../../hooks/useProfile";

const UploadCV = () => {
  const userId = localStorage.getItem("userId");
  const [cvUrl, setCvUrl] = useState("");
  const { uploadCV, getCV } = useProfile();

  useEffect(() => {
    getCV(userId).then(setCvUrl).catch(console.error);
  }, [userId, getCV]);

  const handleCvUpload = (cvUrl) => {
    setCvUrl(cvUrl);
    uploadCV(userId, cvUrl)
      .then((response) => console.log(response.message))
      .catch(console.error);
  };

  const pdfToImageURL = (url) => {
    const newUrl = url.replace(/\.pdf$/, ".jpg");
    return newUrl;
  };

  return (
    <div className=" flex flex-col items-center space-y-4 p-4 pb-28">
      <CloudinaryCV onUpload={handleCvUpload} />
      {cvUrl && <Image src={pdfToImageURL(cvUrl)} alt="CV" width={800}></Image>}
    </div>
  );
};

export default UploadCV;
