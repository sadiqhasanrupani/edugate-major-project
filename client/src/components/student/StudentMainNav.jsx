import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

import styles from "../../scss/components/student/StudentMainNav.module.scss";

// images
import UserProfile from "../../assets/Images/user-profile.png";
import DarkUserProfile from "../../assets/Images/dark-user-profile.png";

// components
import SearchBar from "../UI/SearchBar/SearchBar";
import ClassroomBtn from "../UI/Buttons/IconBtn";
import AddBtnOne from "../UI/Icons/AddBtnOne";
import LightMode from "../UI/Icons/LightMode";
import DarkMode from "../UI/Icons/DarkModeIcon";
import Settings from "../UI/Icons/Settings";
import DarkSettings from "../UI/Icons/Dark/DarkSettingIcon";
import Notification from "../UI/Icons/NotificationBingOne";
import DarkNotification from "../UI/Icons/Dark/DarkNotificationBing";
import ImagePortal from "../model/ImagePortal";

import { uiAction } from "../../store/ui-slice";

const StudentMainNav = ({ message, studentData, className }) => {
  const themeMode = useSelector((state) => state.ui.isDarkMode);
  const dispatch = useDispatch();

  //^ themeMode
  const themeHandler = () => {
    dispatch(uiAction.themeToggler());
  };

  useEffect(() => {
    const localTheme = JSON.parse(localStorage.getItem("theme"));

    if (localTheme) {
      dispatch(uiAction.setDarkMode(localTheme));
    }
  }, [dispatch]);

  useEffect(() => {
    localStorage.setItem("theme", JSON.stringify(themeMode));
  }, [themeMode]);

  //& Image view ==============================================================
  const isViewImageActive = useSelector((state) => state.ui.isViewImageActive);

  const imageToggler = () => {
    dispatch(uiAction.viewImageTogglerHandler());
  };

  //& =================================================================

  const joinClassroomToggler = () => {
    dispatch(uiAction.ToggleStudentJoinClassroom());
  };

  return (
    <>
      {isViewImageActive && (
        <ImagePortal
          onBackdrop={imageToggler}
          image={studentData.student_img}
        />
      )}
      <nav
        className={`${styles.nav} ${
          themeMode ? styles["dark-nav"] : undefined
        }`}
      >
        <div className={styles["item-1"]}>
          <div className={styles["greet-msg"]}>
            <h4>Hii {message},</h4>
            <h5>Student</h5>
          </div>
        </div>
        <div className={styles["item-2"]}>
          <div>
            <ClassroomBtn
              type={"button"}
              Icon={AddBtnOne}
              onClick={joinClassroomToggler}
            >
              Join Classroom
            </ClassroomBtn>
          </div>
          <div className={styles["theme-mode"]} onClick={themeHandler}>
            <button>{themeMode ? <DarkMode /> : <LightMode />}</button>
          </div>
          {/* <div className={styles["notification"]}>
            {themeMode ? (
              <Link to="notifications">
                <div className={styles["notifications-div"]}>
                  <DarkNotification />
                </div>
              </Link>
            ) : (
              <Link to="notifications">
                <div className={styles["notifications-div"]}>
                  <Notification />
                </div>
              </Link>
            )}
          </div> */}
          <div className={styles["settings"]}>
            {themeMode ? (
              <Link to="settings">
                <DarkSettings />
              </Link>
            ) : (
              <Link to="settings">
                <Settings />
              </Link>
            )}
          </div>
          <div className={styles["user-img"]}>
            <img
              src={
                studentData.student_img
                  ? studentData.student_img
                  : themeMode
                  ? DarkUserProfile
                  : UserProfile
              }
              alt="user-profile"
              onClick={imageToggler}
            />
          </div>
        </div>
      </nav>
    </>
  );
};

export default StudentMainNav;
