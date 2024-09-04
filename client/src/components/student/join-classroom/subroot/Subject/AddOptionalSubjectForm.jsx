import React, { Fragment, useState } from "react";

//^ stylesheet
import styles from "./AddOptionalSubjectFrom.module.scss";

//^ components
import SubjectCard from "./subject-card/SubjectCard";
import PrimaryBtn from "../../../../UI/Buttons/PrimaryBtn";
import LoadingWheel from "../../../../UI/loading/LoadingWheel";

const AddOptionalSubjectForm = ({
  optionalSubjects,
  onClick,
  isLoading,
  onAddOptionalSubjectFrom,
}) => {
  const [selectedOptionalSubjectData, setSelectedOptionalSubjectData] =
    useState([]);

  const getSubjectCardData = (data) => {
    //^ removing the a data which having same optionalSubjectId data in the previous saved array.
    const filteredSelectedOptionalSubject = selectedOptionalSubjectData.filter(
      (selectedSubjectData) => {
        return selectedSubjectData.optionalSubjectId !== data.optionalSubjectId;
      }
    );

    filteredSelectedOptionalSubject.push(data);
    setSelectedOptionalSubjectData(filteredSelectedOptionalSubject);
  };

  onAddOptionalSubjectFrom(selectedOptionalSubjectData);

  //^ disable primary button if no radio input is selected
  const isPrimaryBtnDisabled = selectedOptionalSubjectData.length === 0;

  return (
    <>
      <div className={styles["optional-subjects"]}>
        {optionalSubjects.map((optionalSubject) => {
          return (
            <Fragment key={optionalSubject.optional_subject_id}>
              <SubjectCard
                key={optionalSubject.optional_subject_id}
                onSubjectCard={getSubjectCardData}
                subjectOne={optionalSubject.subjectOne}
                subjectTwo={optionalSubject.subjectTwo}
                optionalSubjectId={optionalSubject.optional_subject_id}
              />
            </Fragment>
          );
        })}
      </div>
      <div className={styles["primary-btn-div"]}>
        <PrimaryBtn
          type="submit"
          className={styles["primary-btn"]}
          onClick={onClick}
          disabled={isLoading || isPrimaryBtnDisabled} //^ set disabled based on isPrimaryBtnDisabled
        >
          {isLoading ? <LoadingWheel /> : "Add Optional Subjects"}
        </PrimaryBtn>
      </div>
    </>
  );
};

export default AddOptionalSubjectForm;
