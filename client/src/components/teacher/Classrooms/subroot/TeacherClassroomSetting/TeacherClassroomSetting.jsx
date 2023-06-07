import React from "react";

//^ styles
import styles from "./TeacherClassroomSetting.module.scss";

//^ components
import UnderLine from "../../../../UI/underline/UnderLine";
import SettingsCard from "./SettingsCard/SettingsCard";

const TeacherClassroomSetting = ({ themeMode, classroomData }) => {
  return (
    <div
      className={`${styles["classroom-setting"]} ${themeMode && styles.dark}`}
    >
      <div className={styles["teacher-settings-title"]}>
        <h1>Teacher Settings</h1>
        <UnderLine themeMode={themeMode} />
      </div>

      <SettingsCard themeMode={themeMode} />
    </div>
  );
};

export default TeacherClassroomSetting;
