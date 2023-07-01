import React, { useEffect, useImperativeHandle } from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

//^ stylesheet
import styles from "./StudentMainHeader.module.scss";

//^ light icons
import LightMode from "../../../UI/Icons/LightMode";
import Settings from "../../../UI/Icons/Settings";
import Notification from "../../../UI/Icons/NotificationBingOne";

//^ dark icons
import DarkModeIcon from "../../../UI/Icons/DarkModeIcon";
import DarkSettingIcon from "../../../UI/Icons/Dark/DarkSettingIcon";
import DarkNotification from "../../../UI/Icons/Dark/DarkNotificationBing";

//^ actions
import { uiAction } from "../../../../store/ui-slice";

//^ models
import ImagePortal from "../../../model/ImagePortal";

const StudentMainHeader = ({ studentImg, subjectName }) => {
  const themeMode = useSelector((state) => state.ui.isDarkMode);

  //^ dispatch function
  const dispatch = useDispatch();

  //^ writing the code to enable the light-dark toggle theme feature.
  const themeHandler = () => {
    dispatch(uiAction.themeToggler());
  };

  useEffect(() => {
    const theme = JSON.parse(localStorage.getItem("theme"));

    if (theme) {
      dispatch(uiAction.setDarkMode(theme));
    }
  }, [dispatch]);

  useEffect(() => {
    localStorage.setItem("theme", JSON.stringify(themeMode));
  }, [themeMode]);

  //^ Image model ===================================================
  const isViewImageActive = useSelector((state) => state.ui.isViewImageActive);

  const imageToggler = () => {
    dispatch(uiAction.viewImageTogglerHandler());
  };
  //^ ===============================================================

  return (
    <>
      {isViewImageActive && (
        <ImagePortal onBackdrop={imageToggler} image={studentImg} />
      )}
      <nav className={`${styles.nav} ${themeMode && styles["dark-nav"]}`}>
        <div className={styles["item-1"]}>
          <h4>{subjectName}</h4>
        </div>
        <div className={`${styles["item-2"]}`}>
          <div className={`${styles["theme-mode"]}`} onClick={themeHandler}>
            <button>{themeMode ? <DarkModeIcon /> : <LightMode />}</button>
          </div>
          {/* <div className={`${styles.notification}`}>
            {themeMode ? (
              <Link to={"notification"}>
                <DarkNotification />
              </Link>
            ) : (
              <Link to="notification">
                <Notification />
              </Link>
            )}
          </div> */}
          <div className={`${styles.settings}`}>
            {themeMode ? (
              <Link to={"/student/settings"}>
                <DarkSettingIcon />
              </Link>
            ) : (
              <Link to={"/student/settings"}>
                <Settings />
              </Link>
            )}
          </div>
          <div className={`${styles["user-img"]}`}>
            <img
              src={studentImg}
              alt="student-profile-img"
              onClick={imageToggler}
            />
          </div>
        </div>
      </nav>
    </>
  );
};

export default StudentMainHeader;
