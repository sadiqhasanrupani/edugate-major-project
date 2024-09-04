import React, { useEffect } from "react";

//^ styles
import styles from "./ClassroomImage.module.scss";

//^ hook
import useNewImage from "../../../../../../hooks/use-new-image";

//^ icon
import BigEditIcon from "../../../../../UI/Icons/EditBtnBig";
import EditIconSmall from "../../../../../UI/Icons/EditBtnSmall";

const ClassroomImages = ({
  themeMode,
  classroomBannerImg,
  classroomProfileImg,
  onClassroomImages,
}) => {
  //^ image hooks
  const {
    imageChangeHandler: bannerChangeHandler,
    previewImage: bannerPreviewImage,
    selectedImage: bannerSelectedImage,
  } = useNewImage(classroomBannerImg);

  const {
    imageChangeHandler: profileChangeHandler,
    previewImage: profilePreviewImage,
    selectedImage: profileSelectedImage,
  } = useNewImage(classroomProfileImg);

  //^ whenever their is an update inside the banner and profile selected image constant then this useEffect function will run.
  useEffect(() => {
    const data = {
      bannerImageData: bannerSelectedImage,
      profileImageData: profileSelectedImage,
    };

    onClassroomImages(data);
  }, [bannerSelectedImage, profileSelectedImage, onClassroomImages]);

  return (
    <div
      className={`${styles["classroom-images"]} ${themeMode && styles.dark}`}
    >
      <div className={styles["classroom-banner"]}>
        <img
          src={bannerPreviewImage}
          alt="classroomBannerImage"
          className={styles["classroom-banner-img"]}
        />
        <label
          htmlFor="banner-image-file-picker"
          className={styles["banner-file-picker"]}
        >
          <BigEditIcon />
        </label>
        <input
          type="file"
          onChange={bannerChangeHandler}
          id="banner-image-file-picker"
        />
      </div>
      <div className={styles["classroom-profile"]}>
        <div className="classroom-relative-profile">
          <img
            src={profilePreviewImage}
            alt="classroom-profile-img"
            className={styles["classroom-profile-img"]}
          />
          <label
            htmlFor="profile-image-file-picker"
            className={styles["profile-file-picker"]}
          >
            <EditIconSmall />
          </label>
          <input
            type="file"
            onChange={profileChangeHandler}
            id="profile-image-file-picker"
          />
        </div>
      </div>
    </div>
  );
};

export default ClassroomImages;
