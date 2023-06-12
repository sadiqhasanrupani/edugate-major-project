//^ dependencies
import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";

//^ styles
import styles from "./SettingsCard.module.scss";

//^ auth
import { getAuthToken } from "../../../../../../utils/auth";

//^ slice actions
import { classroomAction } from "../../../../../../store/classroom-slice";

//^ icons
import EditContent from "../../../../../UI/Icons/classroom/classroom-settings/EditContent";
import RemoveContent from "../../../../../UI/Icons/classroom/classroom-settings/RemoveContent";
import DarkEditContent from "../../../../../UI/Icons/classroom/classroom-settings/Dark/DarkEditContent";
import DarkRemoveContent from "../../../../../UI/Icons/classroom/classroom-settings/Dark/DarkRemoveContent";

//^ components
import PrimaryCard from "../../../../../UI/Card/TeacherCard";
import SettingCards from "./SettingCards/SettingCards";
import NewErrorMode from "../../../../../model/error-model/newErrorMode/NewErrorMode";

const SettingsCard = ({ themeMode }) => {
  //^ getting the classId from the route.
  const { classId } = useParams();

  //^ dispatch method
  const dispatch = useDispatch();

  //^ navigate method
  const navigate = useNavigate();

  //^ request states
  const [badResMsg, setBadResMsg] = useState({ message: undefined });

  const removeClassroomHandler = async (e) => {
    e.preventDefault();

    const postRemoveClassroomHandler = await fetch(
      `${process.env.REACT_APP_HOSTED_URL}/classroom/remove-classroom`,
      {
        method: "POST",
        headers: {
          Authorization: `Bearer ${getAuthToken()}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ classroomId: classId }),
      }
    );

    if (postRemoveClassroomHandler.status === 401) {
      const response = await postRemoveClassroomHandler.json();

      setBadResMsg({ message: response.message });

      throw new Error(`${response.message}`);
    }

    if (!postRemoveClassroomHandler.ok) {
      const response = await postRemoveClassroomHandler.json();

      setBadResMsg({ message: response.message });

      throw new Error(`${response.message}`);
    }

    const response = await postRemoveClassroomHandler.json();

    dispatch(
      classroomAction.openClassroomDeletedMsg({ message: response.message })
    );

    navigate(`/teacher/classroom`);
  };

  const closeErrorModel = () => {
    setBadResMsg({ message: undefined });
  };

  const SETTINGS_ITEMS = [
    {
      id: 1,
      to: "edit-classroom",
      icon: themeMode ? DarkEditContent : EditContent,
      title: "Edit Classroom",
      description: "Edit images, names.",
      onClick: undefined,
    },
    {
      id: 2,
      to: undefined,
      icon: themeMode ? DarkRemoveContent : RemoveContent,
      title: "Remove Classroom",
      description: "Deleting the classroom from your account.",
      onClick: removeClassroomHandler,
    },
  ];

  return (
    <>
      {badResMsg.message && (
        <NewErrorMode onCloseBtn={closeErrorModel}>
          {badResMsg.message}
        </NewErrorMode>
      )}
      <div className={`${styles["settings-card"]} ${themeMode && styles.dark}`}>
        <PrimaryCard className={`${styles["primary-card"]}`}>
          <SettingCards SETTINGS_ITEMS={SETTINGS_ITEMS} themeMode={themeMode} />
        </PrimaryCard>
      </div>
    </>
  );
};

export default SettingsCard;
