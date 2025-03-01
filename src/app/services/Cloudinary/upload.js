import { useState } from "react";
import { uploadImage } from "./cloudinary";

const useUpload = () => {
  const [files, setFiles] = useState([]);

  const [progressList, setProgressList] = useState({});

  const handleFileChange = (e) => {
    if (e.target.files) {
      setFiles(Array.from(e.target.files));
    }
  };

  const handleUpload = async () => {
    if (files.length === 0) return;

    const uploadedUrls = [];

    await Promise.all(
      files.map(async (file) => {
        try {
          const url = await uploadImage(file, (progress) => {
            setProgressList((prev) => ({ ...prev, [file.name]: progress }));
          });
          uploadedUrls.push(url);
        } catch (error) {
          console.error(`Upload failed for ${file.name}`);
        }
      })
    );

    setFiles([]);
    return uploadedUrls;
  };

  return {
    files,
    progressList,
    handleFileChange,
    handleUpload,
  };
};

export default useUpload;
