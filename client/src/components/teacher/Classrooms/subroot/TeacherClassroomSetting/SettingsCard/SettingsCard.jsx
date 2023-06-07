//^ dependencies
import React from "react";

//^ styles
import styles from "./SettingsCard.module.scss";

//^ components
import PrimaryCard from "../../../../../UI/Card/TeacherCard"
import SettingCards from "./SettingCards/SettingCards";

const SettingsCard = ({ themeMode }) => {
  
  
  return (
    <div className={`${styles["settings-card"]} ${themeMode && styles.dark}`}>
      <PrimaryCard className={`${styles["primary-card"]}`}>
        {map}
      </PrimaryCard>

    </div>
  );
};

export default SettingsCard;
