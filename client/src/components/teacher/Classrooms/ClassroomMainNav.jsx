import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

import styles from "../../../scss/components/teacher/TeacherMainNav.module.scss";

// images
import UserProfile from "../../../assets/Images/user-profile.png";
import DarkUserProfile from "../../../assets/Images/dark-user-profile.png";

// components
// import SearchBar from "../../UI/SearchBar/SearchBar";
// import ClassroomBtn from "../../UI/Buttons/IconBtn";
// import AddBtnOne from "../../UI/Icons/AddBtnOne";
import LightMode from "../../UI/Icons/LightMode";
import DarkMode from "../../UI/Icons/DarkModeIcon";
import Settings from "../../UI/Icons/Settings";
import DarkSettings from "../../UI/Icons/Dark/DarkSettingIcon";
import ImagePortal from "../../model/ImagePortal";

import { uiAction } from "../../../store/ui-slice";
// import Notification from "../../UI/Icons/NotificationBingOne";

const TeacherMainNav = ({ message, themeMode, teacherData }) => {
  const uiThemeMode = useSelector((state) => state.ui.isDarkMode);
  const dispatch = useDispatch();

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
    localStorage.setItem("theme", JSON.stringify(uiThemeMode));
  }, [uiThemeMode]);

  //& Image view ==============================================================
  const isViewImageActive = useSelector((state) => state.ui.isViewImageActive);

  const imageToggler = () => {
    dispatch(uiAction.viewImageTogglerHandler());
  };

  //& =================================================================

  return (
    <>
      {isViewImageActive && (
        <ImagePortal
          onBackdrop={imageToggler}
          image={teacherData.teacher_img}
        />
      )}
      <nav
        className={`${styles.nav} ${
          themeMode ? styles["dark-nav"] : undefined
        }`}
      >
        <div className={styles["item-1"]}>
          <div className={styles["classroom-header"]}>
            <h4>{message}</h4>
          </div>
        </div>
        <div className={styles["item-2"]}>
          <div className={styles["theme-mode"]} onClick={themeHandler}>
            <button>{uiThemeMode ? <DarkMode /> : <LightMode />}</button>
          </div>

          <div className={styles["settings"]}>
            {uiThemeMode ? (
              <Link to="teacher-setting">
                <DarkSettings />
              </Link>
            ) : (
              <Link to="teacher-setting">
                <Settings />
              </Link>
            )}
          </div>
          <div className={styles["user-img"]}>
            <img
              src={
                teacherData.teacher_img
                  ? teacherData.teacher_img
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

export default TeacherMainNav;
