import React, { Fragment } from "react";
import { useSelector } from "react-redux";

import styles from "./ASsignmentFiles.module.scss";

//^ component
import File from "./file/File";
import PrimaryCard from "../../../../UI/Card/TeacherCard";

const AssignmentFiles = ({ files }) => {
  const themeMode = useSelector((state) => state.ui.isDarkMode);

  return (
    <div
      className={`${styles["attachment-files"]} ${themeMode && styles["dark"]}`}
    >
      <h5>ATTACHMENTS</h5>
      <PrimaryCard className={`${styles["files"]} ${styles["primary-card"]}`}>
        {Array.isArray(files) && files.length > 0 ? (
          files?.map((file) => {
            return (
              <Fragment key={Math.random()}>
                <File
                  fileName={file.name}
                  filePath={file.path}
                  fileOriginalName={file.original_name}
                  enableDownload={true}
                />
              </Fragment>
            );
          })
        ) : (
          <p>No files are here</p>
        )}
      </PrimaryCard>
    </div>
  );
};

export default AssignmentFiles;
