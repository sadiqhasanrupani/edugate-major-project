import { useState } from "react";

const useImage = () => {
  const [selectedImage, setSelectedImage] = useState(null);
  const [previewImage, setPreviewImage] = useState(null);

  const imageChangeHandler = (e) => {
    const file = e.target.files[0];

    if (!file) {
      console.log("There is no file.");
      return;
    }
    setSelectedImage(file);

    // creating a reader to read the file.
    const reader = new FileReader();
    reader.onload = () => {
      setPreviewImage(reader.result);
    };
    reader.readAsDataURL(file);
  };

  return {
    previewImage,
    selectedImage,
    imageChangeHandler,
  };
};

export default useImage;
