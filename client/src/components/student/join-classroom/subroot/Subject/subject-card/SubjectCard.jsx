import React, { useState } from "react";
import styles from "./SubjectCard.module.scss";

const SubjectCard = ({
  subjectOne,
  subjectTwo,
  onSubjectCard,
  optionalSubjectId,
}) => {
  const [selectedSubject, setSelectedSubject] = useState(null);
  // console.log(subjectOne, subjectTwo);

  const subjectOneId = subjectOne.subject_id;
  const subjectOneName = subjectOne.subject_name;

  const subjectTwoId = subjectTwo.subject_id;
  const subjectTwoName = subjectTwo.subject_name;

  const handleSubjectChange = (event) => {
    const value = event.target.value;
    setSelectedSubject(value);
    onSubjectCard({
      subjectId: value,
      subjectName: value === subjectOneId ? subjectOneName : subjectTwoName,
      optionalSubjectId: optionalSubjectId,
    });
  };

  return (
    <>
      <main className={styles["main"]}>
        <div
          className={`${
            selectedSubject === subjectTwoId && styles["disabled"]
          }`}
        >
          <input
            type="radio"
            id={subjectOneId}
            name="subject"
            value={subjectOneId}
            checked={selectedSubject === subjectOneId}
            onChange={handleSubjectChange}
          />
          <label
            htmlFor={subjectOneId}
            className={`${styles["subject-name"]} ${
              selectedSubject === subjectOneId && styles["selected"]
            }`}
          >
            {subjectOneName}
          </label>
        </div>
        <div
          className={`${
            selectedSubject === subjectOneId && styles["disabled"]
          }`}
        >
          <input
            type="radio"
            id={subjectTwoId}
            name="subject"
            value={subjectTwoId}
            checked={selectedSubject === subjectTwoId}
            onChange={handleSubjectChange}
          />
          <label
            htmlFor={subjectTwoId}
            className={`${styles["subject-name"]} ${
              selectedSubject === subjectTwoId && styles["selected"]
            }`}
          >
            {subjectTwoName}
          </label>
        </div>
      </main>
    </>
  );
};

export default SubjectCard;
