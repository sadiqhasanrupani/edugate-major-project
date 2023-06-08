//^ dependencies
import React from "react";

//^ styles
import styles from "./SettingsCard.module.scss";

//^ components
import PrimaryCard from "../../../../../UI/Card/TeacherCard";
import SettingCards from "./SettingCards/SettingCards";

//^ icons
import EditContent from "../../../../../UI/Icons/classroom/classroom-settings/EditContent";
import RemoveContent from "../../../../../UI/Icons/classroom/classroom-settings/RemoveContent";
import DarkEditContent from "../../../../../UI/Icons/classroom/classroom-settings/Dark/DarkEditContent";
import DarkRemoveContent from "../../../../../UI/Icons/classroom/classroom-settings/Dark/DarkRemoveContent";

const SettingsCard = ({ themeMode }) => {
  const removeClassroomHandler = async (e) => {
    e.preventDefault();
  };

  const SETTINGS_ITEMS = [
    {
      id: 1,
      to: "edit-classroom",
      icon: themeMode ? DarkEditContent  : EditContent ,
      title: "Edit Classroom",
      description: "Edit images, names.",
      onClick: undefined,
    },
    {
      id: 2,
      to: undefined,
      icon: themeMode ? DarkRemoveContent  : RemoveContent ,
      title: "Remove Classroom",
      description: "Deleting the classroom from your account.",
      onClick: removeClassroomHandler,
    },
  ];

  return (
    <div className={`${styles["settings-card"]} ${themeMode && styles.dark}`}>
      <PrimaryCard className={`${styles["primary-card"]}`}>
        <SettingCards SETTINGS_ITEMS={SETTINGS_ITEMS} themeMode={themeMode} />
      </PrimaryCard>
    </div>
  );
};

export default SettingsCard;
