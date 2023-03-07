import React from "react";
import { useSelector } from "react-redux";
import { Form } from "react-router-dom";

import styles from "../../../../../scss/components/teacher/subroot/setting-subroot/EditProfileForm.module.scss";

//* hooks
import useImage from "../../../../../hooks/use-image";
import useInput from "../../../../../hooks/user-input";

//* icons
import EditIcon from "../../../../UI/Icons/edit/light/EditIconSmall";
import DarkEditIcon from "../../../../UI/Icons/edit/dark/EditIconSmall";
import UserIcon from "../../../../UI/Icons/update-form/light/UserIcon";
import DOBIcon from "../../../../UI/Icons/update-form/light/DOBIcon";
import PhoneIcon from "../../../../UI/Icons/update-form/light/PhoneIcon";
import EmailIcon from "../../../../UI/Icons/update-form/light/EmailIcon";
import RoleIcon from "../../../../UI/Icons/update-form/light/RoleIcon";

//* component
import SecondaryCard from "../../../../UI/Card/CardSecondary";
import PrimaryBtn from "../../../../UI/Buttons/PrimaryBtn";
import UpdateTeacherInput from "../../../../UI/Input/SignupInput";

//* utils
import { isEmpty } from "../../../../../utils/validation";

const EditProfileForm = ({ teacher }) => {
  const themeMode = useSelector((state) => state.ui.isDarkMode);

  const {
    imageChangeHandler: teacherImageChangeHandler,
    previewImage: teacherPreviewImage,
  } = useImage();

  //& ===============================================================
  //* First name input hook
  const {
    enteredValue: firstNameEnteredValue,
    hasError: firstNameHasError,
    isValid: firstNameIsValid,
    onBlurHandler: firstNameOnBlurHandler,
    onChangeHandler: firstNameOnChangeHandler,
  } = useInput(isEmpty);
  //& ===============================================================

  return (
    <>
      <section
        className={`${styles["section"]} ${themeMode && styles["dark"]}`}
      >
        <h2>Edit Profile</h2>
        <Form encType="multipart/form-data" className={styles["form-input"]}>
          <div className={styles["item-1"]}>
            <div className={styles["user-img-input"]}>
              <img
                src={
                  teacherPreviewImage
                    ? teacherPreviewImage
                    : teacher.teacher_img
                }
                alt="teacher-profile-img"
              />
              <label htmlFor="file-picker" className={styles["file-picker"]}>
                <SecondaryCard className={styles["card"]}>
                  {themeMode ? <DarkEditIcon /> : <EditIcon />}
                </SecondaryCard>
              </label>
              <input
                type="file"
                id="file-picker"
                name="teacher-updated-img"
                onChange={teacherImageChangeHandler}
              />
            </div>
            <PrimaryBtn>Update</PrimaryBtn>
          </div>
          <div className={styles["teacher-details"]}>
            <div
              className={`${styles["detail-1"]} ${
                firstNameHasError && styles["is-valid"]
              }`}
            >
              <label htmlFor="teacher-name">Name</label>
              <UpdateTeacherInput
                type={"text"}
                Icon={UserIcon}
                placeholder={"First Name"}
                defaultValue={
                  firstNameEnteredValue
                    ? firstNameEnteredValue
                    : teacher.teacher_first_name
                }
                onChange={firstNameOnChangeHandler}
                onBlur={firstNameOnBlurHandler}
              />
              <h3>Enter valid first name</h3>
            </div>
          </div>
        </Form>
      </section>
    </>
  );
};

export default EditProfileForm;
