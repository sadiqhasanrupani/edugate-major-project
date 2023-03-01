import { Form, useNavigation, useActionData } from "react-router-dom";

import styles from "../../../scss/components/teacher/CreateInstitute/InstituteForm.module.scss";

// hooks
import useImage from "../../../hooks/use-image";
import useInput from "../../../hooks/user-input";

// utils
import { emailRegex } from "../../../utils/regex";

// UI
import EditBtnBig from "../../UI/Icons/EditBtnBig";
import EditBtnSmall from "../../UI/Icons/EditBtnSmall";
import ClassroomBuilding from "../../UI/Icons/InstituteBuilding";
import ClassroomInput from "../../UI/Input/SignupInput";
import Card from "../../UI/Card/Card";
import RadioInput from "../../UI/Input/RadioInput";
import LoadingWheel from "../../UI/loading/LoadingWheel";

// images
import ClassroomBackgroundImg from "../../../assets/Images/Classroom/classroom-background-img.png";
import ClassroomImagePlaceholder from "../../../assets/Images/Classroom/classroom-img-placeholder.png";
import { Fragment } from "react";
import PrimaryBtn from "../../UI/Buttons/PrimaryBtn";

const InstituteBackground = () => {
  const RADIO_BTN_DATA = [
    {
      key: 1,
      name: "classroom-category",
      id: "School",
      label: "School",
      value: "school",
    },
    {
      key: 2,
      name: "classroom-category",
      id: "College",
      label: "College",
      value: "college",
    },
    {
      key: 3,
      name: "classroom-category",
      id: "Coaching Classroom",
      label: "Coaching Classroom",
      value: "coaching-institute",
    },
    {
      key: 4,
      name: "classroom-category",
      id: "Online tutoring platform",
      label: "Online tutoring platform",
      value: "online-tutoring-platform",
    },
    {
      key: 5,
      name: "classroom-category",
      id: "Other",
      label: "Other",
      value: "other",
    },
  ];

  const data = useActionData();

  const navigation = useNavigation();
  const isSubmitting = navigation.state === "submitting";

  const {
    imageChangeHandler: backgroundImageChangeHandler,
    previewImage: backgroundPreviewImage,
  } = useImage();

  const {
    imageChangeHandler: classroomProfileChangeHandler,
    previewImage: classroomProfilePreviewImage,
  } = useImage();

  const isEmpty = (value) => value.trim().length !== 0;
  const isEmail = (value) => emailRegex.test(value);

  const {
    enteredValue: ClassroomEnteredValue,
    hasError: ClassroomHasError,
    isValid: ClassroomIsValid,
    onBlurHandler: ClassroomBlurHandler,
    onChangeHandler: ClassroomChangeHandler,
  } = useInput(isEmpty);

  const formIsValid = ClassroomIsValid;

  return (
    <>
      <article className={styles.article}>
        <Form
          method="POST"
          action="/create-classroom"
          className={styles["classroom-form"]}
          encType="multipart/form-data"
        >
          <div className={styles["classroom-background-div"]}>
            {backgroundPreviewImage ? (
              <img
                src={backgroundPreviewImage}
                alt="background-preview"
                loading="lazy"
              />
            ) : (
              <img
                src={ClassroomBackgroundImg}
                alt="classroom-background"
                loading="lazy"
              />
            )}

            <label
              htmlFor="classroom-background"
              className={styles["classroom-background"]}
            >
              <EditBtnBig />
            </label>
            <input
              type="file"
              id="classroom-background"
              name="classroom-background"
              onChange={backgroundImageChangeHandler}
            />
            <Card className={styles["classroom-form"]}>
              <Card className={styles["profile-card"]}>
                {classroomProfilePreviewImage ? (
                  <img
                    src={classroomProfilePreviewImage}
                    alt="classroom-profile"
                    loading="lazy"
                  />
                ) : (
                  <img
                    src={ClassroomImagePlaceholder}
                    alt="classroom-profile"
                    loading="lazy"
                  />
                )}
                <input
                  type="file"
                  id="classroom-profile"
                  name="classroom-profile-img"
                  onChange={classroomProfileChangeHandler}
                />
                <label
                  htmlFor="classroom-profile"
                  className={styles["edit-btn-label"]}
                >
                  <EditBtnSmall />
                </label>
              </Card>
              <div
                className={`${styles["classroom-name-input"]} ${
                  ClassroomHasError ? styles["is-valid"] : undefined
                }`}
              >
                <ClassroomInput
                  Icon={ClassroomBuilding}
                  className={styles["classroom-name"]}
                  placeholder={"classroom name"}
                  required={true}
                  defaultValue={ClassroomEnteredValue}
                  onChange={ClassroomChangeHandler}
                  onBlur={ClassroomBlurHandler}
                  name={"classroom-name"}
                />
                <h6>Enter Valid Classroom name</h6>
              </div>
              <div className={styles["category-div"]}>
                <label>Select Category</label>
                {RADIO_BTN_DATA.map((radio) => {
                  return (
                    <Fragment key={radio.key}>
                      <RadioInput
                        name={radio.name}
                        id={radio.id}
                        value={radio.value}
                        required={true}
                      >
                        {radio.label}
                      </RadioInput>
                    </Fragment>
                  );
                })}
              </div>
              <div className={styles["submit-btn"]}>
                <PrimaryBtn
                  type="submit"
                  disabled={!formIsValid | isSubmitting}
                  className={styles["primary-btn"]}
                >
                  {isSubmitting ? <LoadingWheel /> : "Create Classroom"}
                </PrimaryBtn>
              </div>
            </Card>
          </div>
        </Form>
      </article>
    </>
  );
};

export default InstituteBackground;
