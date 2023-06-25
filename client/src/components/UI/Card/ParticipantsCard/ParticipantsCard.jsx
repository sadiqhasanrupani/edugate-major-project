import React from "react";

import styles from "./ParticipantsCard.module.scss";

import SecondaryCard from "../CardSecondary";

const ParticipantsCard = ({
  className,
  name,
  profileImg,
  emailId,
  themeMode,
}) => {
  return (
    <div
      className={`${styles["card"]} ${themeMode && styles.dark} ${className}`}
    >
      <SecondaryCard className={styles["secondary-card"]}>
        <div className={styles["title"]}>
          <img src={profileImg} alt="participant-profile-img" />

          <div className={styles["participants-detail"]}>
            <p>{name}</p>
            <p>{emailId}</p>
          </div>
        </div>
      </SecondaryCard>
    </div>
  );
};

export default ParticipantsCard;
