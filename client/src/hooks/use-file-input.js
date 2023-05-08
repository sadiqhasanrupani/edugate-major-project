import { useState } from "react";

const useFileInput = () => {
  const [files, setFiles] = useState([]);
  const [error, setError] = useState(null);

  const allowedFileTypes = [
    "application/pdf",
    "application/vnd.ms-excel",
    "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
    "application/msword",
    "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
    "application/vnd.ms-powerpoint",
    "application/vnd.openxmlformats-officedocument.presentationml.presentation",
    "image/jpeg",
    "image/png",
    "image/gif",
    "image/svg+xml",
  ];

  const handleFileChange = (event) => {
    const selectedFiles = Array.from(event.target.files);

    if (selectedFiles.every((file) => allowedFileTypes.includes(file.type))) {
      setFiles([...files, ...selectedFiles]);
      setError(null);
    } else {
      setFiles([]);
      setError("Please select valid file types");
    }
  };

  return {
    files,
    error,
    handleFileChange,
  };
};

export default useFileInput;
