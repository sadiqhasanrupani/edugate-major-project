import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { Form, useNavigation } from "react-router-dom";

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

//* component
import SecondaryCard from "../../../../UI/Card/CardSecondary";
import PrimaryBtn from "../../../../UI/Buttons/PrimaryBtn";
import UpdateTeacherInput from "../../../../UI/Input/SignupInput";
import ImagePortal from "../../../../model/ImagePortal";
import LoadingWheel from "../../../../UI/loading/LoadingWheel";

//* utils
import { isEmpty, isNumber, isEmail } from "../../../../../utils/validation";
import { uiAction } from "../../../../../store/ui-slice";

const EditProfileForm = ({ teacher }) => {
  const themeMode = useSelector((state) => state.ui.isDarkMode);
  const dispatch = useDispatch();

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

  //* Second name input hook
  const {
    enteredValue: lastNameEnteredValue,
    hasError: lastNameHasError,
    isValid: lastNameIsValid,
    onBlurHandler: lastNameBlurHandler,
    onChangeHandler: lastNameChangeHandler,
  } = useInput(isEmpty);

  //* DOB input hook

  const {
    enteredValue: DobEnteredValue,
    hasError: DobHasError,
    isValid: DobIsValid,
    onBlurHandler: DobBlurHandler,
    onChangeHandler: DobChangeHandler,
  } = useInput(isEmpty);

  const {
    enteredValue: numberEnteredValue,
    hasError: numberHasError,
    isValid: numberIsValid,
    onBlurHandler: numberBlurHandler,
    onChangeHandler: numberChangeHandler,
  } = useInput(isNumber);

  const {
    enteredValue: emailEnteredValue,
    hasError: emailHasError,
    isValid: emailIsValid,
    onBlurHandler: emailBlurHandler,
    onChangeHandler: emailChangeHandler,
  } = useInput(isEmail);

  const {
    enteredValue: bioEnteredValue,
    hasError: bioHasError,
    isValid: bioIsValid,
    onBlurHandler: bioBlurHandler,
    onChangeHandler: bioChangeHandler,
  } = useInput((value) => value.trim().length <= 10000);

  //& ===============================================================

  //& Image view ==============================================================
  const isViewImageActive = useSelector((state) => state.ui.isViewImageActive);

  const imageViewToggler = () => {
    dispatch(uiAction.viewImageTogglerHandler());
  };

  //& =================================================================

  const navigation = useNavigation();
  const isSubmitting = navigation.state === "submitting";
  return (
    <>
      {isViewImageActive && (
        <ImagePortal
          onBackdrop={imageViewToggler}
          image={teacher.teacher_img}
        />
      )}
      <section
        className={`${styles["section"]} ${themeMode && styles["dark"]}`}
      >
        <h2>Edit Profile</h2>
        <Form
          className={styles["form-input"]}
          action="/teacher/setting/edit-profile"
          method="POST"
          encType="multipart/form-data"
        >
          <div className={styles["item-1"]}>
            <div className={styles["user-img-input"]}>
              <img
                src={
                  teacherPreviewImage
                    ? teacherPreviewImage
                    : teacher.teacher_img
                }
                alt="teacher-profile-img"
                onClick={imageViewToggler}
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
            <div className={styles["update-btn"]}>
              <PrimaryBtn disabled={isSubmitting}>
                {isSubmitting ? <LoadingWheel /> : "Update"}
              </PrimaryBtn>
            </div>
          </div>
          <div className={styles["teacher-details"]}>
            <div
              className={`${styles["detail-1"]} ${
                firstNameHasError && styles["is-valid"]
              }`}
            >
              <label htmlFor="teacher-name">First Name</label>
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
                name="teacher-updated-first-name"
                id={"teacher-name"}
              />
              <h3>Enter valid first name</h3>
            </div>

            <div
              className={`${styles["detail-2"]} ${
                lastNameHasError && styles["is-valid"]
              }`}
            >
              <label htmlFor="teacher-last-name">Last Name</label>
              <UpdateTeacherInput
                type={"text"}
                Icon={UserIcon}
                placeholder={"Last Name"}
                defaultValue={
                  lastNameEnteredValue
                    ? lastNameEnteredValue
                    : teacher.teacher_last_name
                }
                onChange={lastNameChangeHandler}
                onBlur={lastNameBlurHandler}
                name="teacher-updated-last-name"
                id={"teacher-last-name"}
              />
              <h3>Enter valid last name</h3>
            </div>
            <div
              className={`${styles["detail-3"]} ${
                DobHasError && styles["is-valid"]
              }`}
            >
              <label htmlFor="teacher-dob">Date of Birth</label>
              <UpdateTeacherInput
                type={"date"}
                Icon={DOBIcon}
                placeholder={"DOB"}
                defaultValue={
                  DobEnteredValue ? DobEnteredValue : teacher.teacher_dob
                }
                onChange={DobChangeHandler}
                onBlur={DobBlurHandler}
                name={"teacher-updated-dob"}
                id={"teacher-dob"}
              />
              <h3>Enter valid DOB</h3>
            </div>
            <div
              className={`${styles["detail-4"]} ${
                numberHasError && styles["is-valid"]
              }`}
            >
              <label htmlFor="teacher-phone-number">Phone number</label>
              <UpdateTeacherInput
                type={"text"}
                Icon={PhoneIcon}
                placeholder={"Phone number"}
                defaultValue={
                  numberEnteredValue
                    ? numberEnteredValue
                    : teacher.teacher_phone_number
                }
                onChange={numberChangeHandler}
                onBlur={numberBlurHandler}
                name={"teacher-updated-phone-number"}
                id="teacher-phone-number"
              />
              <h3>Enter valid phone number</h3>
            </div>
            <div
              className={`${styles["detail-5"]} ${
                emailHasError && styles["is-valid"]
              }`}
            >
              <label htmlFor="teacher-email">Email ID</label>
              <UpdateTeacherInput
                type={"email"}
                Icon={EmailIcon}
                placeholder={"Email ID"}
                defaultValue={
                  emailEnteredValue ? emailEnteredValue : teacher.teacher_email
                }
                onChange={emailChangeHandler}
                onBlur={emailBlurHandler}
                required={true}
                id="teacher-email"
                name={"teacher-updated-email"}
              />
              <h3>Enter valid Email ID</h3>
            </div>
            <div
              className={`${styles["detail-6"]} ${
                bioHasError && styles["is-valid"]
              }`}
            >
              <label htmlFor="teacher-bio">About me</label>
              <textarea
                defaultValue={
                  bioEnteredValue
                    ? bioEnteredValue
                    : teacher.teacher_bio && teacher.teacher_bio
                }
                name="teacher-updated-bio"
                id="teacher-bio"
                cols="30"
                rows="4"
                onChange={bioChangeHandler}
                onBlur={bioBlurHandler}
                placeholder="Tell the student about yourself..."
              />
              <h3>Bio should be less then 255 characters.</h3>
            </div>
          </div>
        </Form>
      </section>
    </>
  );
};

export default EditProfileForm;
