import { Form } from "react-router-dom";

import styles from "../../../scss/components/teacher/CreateInstitute/InstituteForm.module.scss";

// hooks
import useImage from "../../../hooks/use-image";
import useInput from "../../../hooks/user-input";

// UI
import EditBtnBig from "../.././UI/Icons/EditBtnBig";
import EditBtnSmall from "../../UI/Icons/EditBtnSmall";
import InstituteBuilding from "../../UI/Icons/InstituteBuilding";
import InstituteInput from "../../UI/Input/SignupInput";
import Card from "../../UI/Card/Card";

// images
import InstituteBackgroundImg from "../../../assets/Images/Institute/institute-background-img.png";
import InstituteImagePlaceholder from "../../../assets/Images/Institute/institute-img-placeholder.png";

const InstituteBackground = () => {
  const {
    imageChangeHandler: backgroundImageChangeHandler,
    previewImage: backgroundPreviewImage,
  } = useImage();

  const {
    imageChangeHandler: instituteProfileChangeHandler,
    previewImage: InstituteProfilePreviewImage,
  } = useImage();

  const isEmpty = (value) => value.trim().length !== 0;

  const {
    enteredValue: InstituteEnteredValue,
    hasError: InstituteHasError,
    isValid: InstituteIsValid,
    onBlurHandler: InstituteBlurHandler,
    onChangeHandler: InstituteChangeHandler,
  } = useInput(isEmpty);

  return (
    <>
      <article className={styles.article}>
        <Form method="POST" action="/create-institute">
          <div className={styles["institute-background-div"]}>
            {backgroundPreviewImage ? (
              <img
                src={backgroundPreviewImage}
                alt="background-preview"
                loading="lazy"
              />
            ) : (
              <img
                src={InstituteBackgroundImg}
                alt="institute-background"
                loading="lazy"
              />
            )}

            <label
              htmlFor="institute-background"
              className={styles["institute-background"]}
            >
              <EditBtnBig />
            </label>
            <input
              type="file"
              id="institute-background"
              name="institute-background"
              onChange={backgroundImageChangeHandler}
            />
            <Card className={styles["institute-form"]}>
              <Card className={styles["profile-card"]}>
                {InstituteProfilePreviewImage ? (
                  <img
                    src={InstituteProfilePreviewImage}
                    alt="institute-profile"
                  />
                ) : (
                  <img
                    src={InstituteImagePlaceholder}
                    alt="institute-profile"
                  />
                )}
                <input
                  type="file"
                  id="institute-profile"
                  name="institute-profile-img"
                  onChange={instituteProfileChangeHandler}
                />
                <label
                  htmlFor="institute-profile"
                  className={styles["edit-btn-label"]}
                >
                  <EditBtnSmall />
                </label>
              </Card>
              <div className={styles["institute-name-input"]}>
                <InstituteInput
                  Icon={InstituteBuilding}
                  className={styles["institute-name"]}
                  placeholder={"Institute name"}
                  required={true}
                  defaultValue={InstituteEnteredValue}
                  onChange={InstituteChangeHandler}
                  onBlur={InstituteBlurHandler}
                />
                <h6>Enter Institute name</h6>
              </div>
              <div>
                <label htmlFor="institute-category">Select Category</label>
                <input
                  type="radio"
                  name="institute-category"
                  id="institute-category"
                  value="School"
                />
                <input
                  type="radio"
                  name="institute-category"
                  id="institute-category"
                  value="College"
                />
                <input
                  type="radio"
                  name="institute-category"
                  id="institute-category"
                  value="Coaching Institute"
                />
                <input
                  type="radio"
                  name="institute-category"
                  id="institute-category"
                  value="School"
                />
                <input
                  type="radio"
                  name="institute-category"
                  id="institute-category"
                  value="School"
                />
              </div>
            </Card>
          </div>
        </Form>
      </article>
    </>
  );
};

export default InstituteBackground;
