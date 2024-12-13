import React, { Fragment } from "react";

//^ stylesheet
import styles from "./SubmittedAttachments.module.scss";

//^ components
import File from "../../../../../../subject/subroot/assignment/subroot/file/File";

import PrimaryCard from "../../../../../../UI/Card/TeacherCard";

const SubmittedAttachments = ({ files }) => {
  return (
    <div className={styles["submitted-attachment"]}>
      <h5>SUBMITTED ATTACHMENTS</h5>
      <PrimaryCard className={styles["primary-card"]}>
        {Array.isArray(files) && files.length !== 0
          ? files.map((file) => {
            return (
              <Fragment key={Math.random()}>
                <File
                  enableDownload={true}
                  fileName={file.name}
                  fileOriginalName={file.original_name}
                  filePath={file.path}
                />
              </Fragment>
            );
          })
          : ""}
      </PrimaryCard>
    </div>
  );
};

export default SubmittedAttachments;
