import React, { Fragment, useState } from "react";

import SimpleInput from "../UI/Input/SimpleInput";

//* styles
import styles from "../../scss/components/student/CreateAssignment.module.scss";

//* custom hooks
import useInput from "../../hooks/user-input";
import useFileInput from "../../hooks/use-file-input";

//* components
import DateInput from "../UI/Input/DateInput";
import useDateFormat from "../../hooks/use-date-format";
import UploadBtn from "../../components/UI/Buttons/UploadBtn";
import PrimaryBtn from "../../components/UI/Buttons/PrimaryBtn";
import { isEmpty } from "../../utils/validation";
import LoadingWheel from "../UI/loading/LoadingWheel";

const CreateAssignment = ({
  onSubmit,
  isLoading,
  errorMessage,
  onCreateAssignment,
}) => {
  //^ startDate state
  const [startDate, setStartDate] = useState("");

  //^ endDate state
  const [endDate, setEndDate] = useState("");

  const { handleFileChange, error, files } = useFileInput();

  const { formattedDateTime: startFormattedDateTime } =
    useDateFormat(startDate);

  const { formattedDateTime: endFormattedDateTime } = useDateFormat(endDate);

  //* start date change handler
  const startDateChangeHandler = (date) => {
    setStartDate(date);
  };

  //^ Input Validation ==================================================================

  //& Topic input =======================================================================
  const {
    enteredValue: topicEnteredValue,
    hasError: topicHasError,
    isValid: topicIsValid,
    onBlurHandler: topicOnBlurHandler,
    onChangeHandler: topicOnChangeHandler,
  } = useInput(isEmpty);
  //& ===================================================================================

  //& Total Marks =======================================================================
  const {
    enteredValue: totalMarksEnteredValue,
    hasError: totalMarksHasError,
    isValid: totalMarksIsValid,
    onBlurHandler: totalMarksOnBlurHandler,
    onChangeHandler: totalMarksOnChangeHandler,
  } = useInput(isEmpty);
  //& ===================================================================================

  //& End Time input ====================================================================
  const endTimeOnChangeHandler = (date) => {
    setEndDate(date);
  };
  //& ===================================================================================
  //& Description Input =================================================================
  const {
    enteredValue: descriptionEnteredValue,
    onBlurHandler: descriptionBlurHandler,
    onChangeHandler: descriptionChangeHandler,
  } = useInput(isEmpty);
  //& ===================================================================================

  //& overAll form is valid
  const formIsValid = topicIsValid && totalMarksIsValid;

  const data = {
    topicEnteredValue,
    totalMarksEnteredValue,
    descriptionEnteredValue,
    startFormattedDateTime,
    endFormattedDateTime,
    files: files,
  };

  onCreateAssignment(data);

  //^ ===================================================================================
  return (
    <>
      <article className={styles["article"]}>
        <div className={`${styles["assignment-input-div"]}`}>
          <SimpleInput
            name={"assignment-topic"}
            placeholder={"Topic"}
            inputmessage={"Enter valid Topic"}
            className={styles["topic"]}
            type="text"
            defaultValue={topicEnteredValue}
            onBlur={topicOnBlurHandler}
            onChange={topicOnChangeHandler}
            hasError={topicHasError}
          />
          <SimpleInput
            name={"assignment-total-marks"}
            placeholder={"Total Marks"}
            inputmessage={"Enter valid total marks"}
            className={styles["total-marks"]}
            type="number"
            defaultValue={totalMarksEnteredValue}
            hasError={totalMarksHasError}
            onBlur={totalMarksOnBlurHandler}
            onChange={totalMarksOnChangeHandler}
          />
          <div className={styles["flex-2"]}>
            <div>
              <DateInput
                value={startDate}
                onChange={startDateChangeHandler}
                showTimeSelect={true}
                timeFormat="hh:mm aa"
                dateFormat="MMMM d, yyyy h:mm aa"
                placeholder={"Start Time"}
              />
            </div>
            <div>
              <DateInput
                value={endDate}
                onChange={endTimeOnChangeHandler}
                showTimeSelect={true}
                timeFormat="hh:mm aa"
                dateFormat="MMMM d, yyyy h:mm aa"
                placeholder={"End Time"}
                inputmessage={"Enter valid end time"}
              />
            </div>
          </div>
          <div className={`${styles["description-div"]} `}>
            <textarea
              name={"assignment-description"}
              placeholder={"Description"}
              inputmessage={"Enter valid start time"}
              className={styles["description"]}
              onChange={descriptionChangeHandler}
              onBlur={descriptionBlurHandler}
              defaultValue={descriptionEnteredValue}
            />
            <h6>Enter valid Description</h6>
          </div>
          <div
            className={`${styles["upload-div"]} ${
              error && styles["is-valid-bro"]
            }`}
          >
            <UploadBtn
              htmlFor={"upload-assignment"}
              className={styles["upload-btn"]}
            >
              Upload file (excel, word, ppt, image, PDF)
            </UploadBtn>
            <input
              type="file"
              multiple
              onChange={handleFileChange}
              id="upload-assignment"
            />
            <h5>Please select valid file types</h5>
          </div>
          {files.length !== 0 && (
            <div className={styles["file-names"]}>
              {files.length !== 0 &&
                files.map((file) => {
                  return (
                    <Fragment key={Math.random()}>
                      <div>{file.name}</div>
                    </Fragment>
                  );
                })}
            </div>
          )}
          <div className={`${styles["primary-div"]}`}>
            <PrimaryBtn disabled={!formIsValid || isLoading} onClick={onSubmit}>
              {isLoading ? <LoadingWheel /> : "Create Assignment"}
            </PrimaryBtn>
          </div>
        </div>
      </article>
    </>
  );
};

export default CreateAssignment;
