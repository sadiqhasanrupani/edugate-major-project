//* Dependencies
import React, { useState } from "react";

//* styles
import styles from "../../scss/components/classroom/ClassroomProfile.module.scss";

//* UI
import SecondaryCard from "../UI/Card/CardSecondary";

//* Light icons
import CopyClipboard from "../UI/Icons/CopyClipboard";
import CopyClipboardSuccess from "../UI/Icons/CopyClipboardSuccess";

//* Dark icons
import DarkCopyClipboard from "../UI/Icons/Dark/DarkCopyClipboard";
import DarkCopyClipboardSuccess from "../UI/Icons/Dark/DarkCopyClipboardSuccess";

const ClassroomProfile = ({
  bannerImg,
  profileImg,
  classroomName,
  classCode,
}) => {
  const themeMode = JSON.parse(localStorage.getItem("theme"));

  const [copied, setCopied] = useState(false);

  const onClickToCopy = () => {
    setCopied(true);

    navigator.clipboard.writeText(classCode);

    const copyTimeout = setTimeout(() => {
      setCopied(false);
    }, 1500);
  };

  return (
    <article
      className={`${styles["article"]} ${
        themeMode ? styles["dark"] : undefined
      }`}
    >
      <div className={styles["flex"]}>
        <div className={styles["classroom-images"]}>
          {bannerImg ? (
            <img src={bannerImg} alt="classroom-banner" />
          ) : undefined}

          {profileImg ? (
            <img src={profileImg} alt="classroom-profile" />
          ) : undefined}
        </div>
        <div className={styles["classroom-name"]}>
          <p>{classroomName}</p>
        </div>
      </div>
      <SecondaryCard className={`class-code ${styles["class-code"]}`}>
        <div>
          <h3>
            Code: <span>{classCode}</span>
          </h3>
        </div>
        <div className={`class-copy-btn`}>
          <button onClick={onClickToCopy}>
            {!copied ? (
              themeMode ? (
                <DarkCopyClipboard />
              ) : (
                <CopyClipboard />
              )
            ) : themeMode ? (
              <DarkCopyClipboardSuccess />
            ) : (
              <CopyClipboardSuccess />
            )}
          </button>
        </div>
      </SecondaryCard>
    </article>
  );
};

export default ClassroomProfile;
