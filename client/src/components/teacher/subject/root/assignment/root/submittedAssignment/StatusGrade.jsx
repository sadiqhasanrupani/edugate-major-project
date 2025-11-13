
//^ stylesheet
import styles from "./StatusGrade.module.scss";

const StatusGrade = ({
  submissionStatus,
  totalMarks,
  themeMode,
  formik
}) => {

  const gradeHasError = formik.touched.grade && formik.errors.grade;

  return (
    <div className={`${styles["status-grade"]} ${themeMode && styles["dark"]}`}>
      <div className={styles["flex-1"]}>
        <h5>STATUS</h5>
        <p>{submissionStatus}</p>
      </div>
      <div
        className={`${styles["flex-2"]} ${gradeHasError && styles["is-valid"]}`}
      >
        <h5>GRADE</h5>
        <div>
          <input
            type="text"
            className={styles["grade-input"]}
            defaultValue={formik.values.grade ?? ''}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            name="grade"
            placeholder="0"
          />
          /<p>{totalMarks}</p>
        </div>
        <h6>Grade should not be grater than {totalMarks}</h6>
      </div>
    </div>
  );
};

export default StatusGrade;
