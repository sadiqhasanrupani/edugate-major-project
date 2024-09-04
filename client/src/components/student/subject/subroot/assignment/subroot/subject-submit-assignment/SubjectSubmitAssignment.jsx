import React, { Fragment, useEffect } from "react";
import { useSelector } from "react-redux";

//^ stylesheets
import styles from "./SubjectSubmitAssignment.module.scss";

//^ components
import UploadBtn from "../../../../../../UI/Buttons/UploadBtn";
import PrimaryCard from "../../../../../../UI/Card/TeacherCard";
import File from "../../../../../../subject/subroot/assignment/subroot/file/File";

//^ hooks
import useFileInput from "../../../../../../../hooks/use-file-input";

const SubjectSubmitAssignment = ({
  onSubjectSubmitAssignment,
  submittedFiles,
}) => {
  const themeMode = useSelector((state) => state.ui.isDarkMode);

  //^ file input hook
  const { handleFileChange, files, error } = useFileInput();

  useEffect(() => {
    onSubjectSubmitAssignment(files);
  }, [files, onSubjectSubmitAssignment]);

  return (
    <div
      className={`${styles["submit-assignment"]} ${
        themeMode && styles["dark"]
      }`}
    >
      <h5>SUBMISSION</h5>
      <div className={styles["upload"]}>
        <UploadBtn className={styles["upload-btn"]} htmlFor={`upload-files`}>
          Upload file (PDF, excel, ppt, word, image)
        </UploadBtn>

        <input type="file" id="upload-files" onChange={handleFileChange} />

        <PrimaryCard
          className={`${styles["primary-card"]} ${
            files.length === 0 &&
            submittedFiles.length === 0 &&
            styles["align-center"]
          }`}
        >
          {submittedFiles.length !== 0 && files.length !== 0 ? (
            <Fragment key={Math.random}>
              {submittedFiles.map((file) => {
                return (
                  <Fragment key={Math.random()}>
                    <File
                      fileOriginalName={file.name}
                      filePath={file.path}
                      fileName={file.original_name}
                    />
                  </Fragment>
                );
              })}
              {files.map((file) => {
                return (
                  <Fragment key={Math.random()}>
                    <File
                      fileOriginalName={file.name}
                      filePath={file.path}
                      fileName={file.original_name}
                    />
                  </Fragment>
                );
              })}
            </Fragment>
          ) : submittedFiles.length === 0 ? (
            files.length !== 0 ? (
              files.map((file) => {
                return (
                  <Fragment key={Math.random()}>
                    <File
                      fileOriginalName={file.name}
                      filePath={false}
                      fileName={""}
                    />
                  </Fragment>
                );
              })
            ) : (
              <p>Upload Assignment.</p>
            )
          ) : (
            submittedFiles.map((file) => {
              return (
                <Fragment key={Math.random()}>
                  <File
                    fileName={file.name}
                    filePath={file.path}
                    fileOriginalName={file.original_name}
                  />
                </Fragment>
              );
            })
          )}
        </PrimaryCard>
      </div>
    </div>
  );
};

export default SubjectSubmitAssignment;
