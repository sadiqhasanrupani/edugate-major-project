//^ stylesheet
import styles from "./FeedBack.module.scss";

const FeedBack = ({ themeMode, studentName, formik }) => {
  return (
    <div className={`${styles["feedback"]} ${themeMode && styles["dark"]}`}>
      <label htmlFor={"feedback"}>YOUR FEEDBACK</label>
      <div className={formik.touched.feedback && formik.errors.feedback ? styles["is-valid"] : undefined}>
        <textarea
          defaultValue={formik.values.feedback ?? ''}
          id="feedback"
          className={styles["feedback-input"]}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          name="feedback"
          placeholder={`Enter a feedback for ${studentName}`}
        />
        {formik.touched.feedback && formik.errors.feedback && <h6>Enter more than 2  characters</h6>}

      </div>
    </div>
  );
};

export default FeedBack;
