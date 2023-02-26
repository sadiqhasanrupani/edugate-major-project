import React, { useEffect } from "react";
import { useRouteLoaderData, NavLink } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

import styles from "../../scss/components/teacher/TeacherMainNav.module.scss";

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

import { uiAction } from "../../store/ui-slice";

const TeacherMainNav = ({ message, themeMode }) => {
  const { teacher } = useRouteLoaderData("teacher-loader");
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

  const isActiveFn = ({ isActive }) => (isActive ? styles.active : undefined);
  return (
    <>
      <nav
        className={`${styles.nav} ${
          themeMode ? styles["dark-nav"] : undefined
        }`}
      >
        <div className={styles["item-1"]}>
          <div className={styles["greet-msg"]}>
            <h4>Hii {message},</h4>
            <h5>Welcome back!</h5>
          </div>
          <div>
            <SearchBar themeMode={themeMode} />
          </div>
        </div>
        <div className={styles["item-2"]}>
          <div>
            <NavLink to="add-classroom" className={isActiveFn}>
              <ClassroomBtn type={"button"} Icon={AddBtnOne}>
                New Classroom
              </ClassroomBtn>
            </NavLink>
          </div>
          <div className={styles["theme-mode"]} onClick={themeHandler}>
            <button>{uiThemeMode ? <DarkMode /> : <LightMode />}</button>
          </div>
          <div className={styles["settings"]}>
            {uiThemeMode ? <DarkSettings /> : <Settings />}
          </div>
          <div className={styles["user-img"]}>
            <img
              src={
                teacher.teacher_img
                  ? teacher.teacher_img
                  : themeMode
                  ? DarkUserProfile
                  : UserProfile
              }
              alt="user-profile"
            />
          </div>
        </div>
      </nav>
    </>
  );
};

export default TeacherMainNav;
