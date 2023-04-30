import React from "react";
import { useNavigation } from "react-router-dom";
import { useSelector } from "react-redux";

//^ stylesheet
import styles from "./StudentFormHeader.module.scss";

//^ components
import PrimaryBtn from "../../../../../components/UI/Buttons/PrimaryBtn";
import LoadingWheel from "../../../../../components/UI/loading/LoadingWheel";
import CardSecondary from "../../../../../components/UI/Card/CardSecondary";

//^ light Icon
import EditIconSmall from "../../../../../components/UI/Icons/edit/light/EditIconSmall";

//^ dark icon
import DarkEditIconSmall from "../../../../../components/UI/Icons/edit/dark/EditIconSmall";

//^ hook
import useImage from "../../../../../hooks/use-image";

const StudentFormHeader = ({ studentImg }) => {
  const themeMode = useSelector((state) => state.ui.isDarkMode);

  const navigation = useNavigation();

  const isSubmitting = navigation.state === "submitting";

  //^ image hook
  const { imageChangeHandler, previewImage } = useImage();

  return (
    <>
      <div className={styles["student-form-header"]}>
        <div className={styles["student-img-div"]}>
          <img
            src={previewImage ? previewImage : studentImg}
            alt="current-student-profile-img"
          />
          <label htmlFor="file-input">
            <CardSecondary className={styles["card"]}>
              {themeMode ? <DarkEditIconSmall /> : <EditIconSmall />}
            </CardSecondary>
          </label>
          <input
            type="file"
            id="file-input"
            name="student-updated-image"
            onChange={imageChangeHandler}
          />
        </div>
        <PrimaryBtn disabled={isSubmitting}>
          {isSubmitting ? <LoadingWheel /> : "Update Profile"}
        </PrimaryBtn>
      </div>
    </>
  );
};

export default StudentFormHeader;
