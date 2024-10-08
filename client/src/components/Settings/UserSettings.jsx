import React, { Fragment } from "react";
import { useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";

//* styles
import styles from "./UserSettings.module.scss";

//* components
import PrimaryCard from "../UI/Card/TeacherCard";
import SecondaryCard from "../UI/Card/CardSecondary";

//* icons
import LogoutIcon from "../UI/Icons/settings Icons/Light/LogoutIcon";
import DarkLogoutIcon from "../UI/Icons/settings Icons/Dark/LogoutIcon";

const UserSettings = ({ SETTINGS_ITEMS }) => {
  const themeMode = useSelector((state) => state.ui.isDarkMode);

  //* Navigate function
  const navigate = useNavigate();

  const logoutHandler = () => {
    navigate("/login");
    localStorage.removeItem("token");
  };

  return (
    <PrimaryCard
      className={`${styles["primary-card"]} ${themeMode && styles["dark"]}`}
    >
      <h3>Settings</h3>
      <div className={styles["settings-items"]}>
        {SETTINGS_ITEMS.map((settingItem) => {
          return (
            <Fragment key={settingItem.id}>
              <Link to={settingItem.to}>
                <SecondaryCard className={`${styles["secondary-card"]}`}>
                  <div>
                    <settingItem.icon />
                  </div>
                  <div className={styles["setting-title"]}>
                    <h4>{settingItem.title}</h4>
                    <p>{settingItem.description}</p>
                  </div>
                </SecondaryCard>
              </Link>
            </Fragment>
          );
        })}
        <Link>
          <SecondaryCard
            className={`${styles["secondary-card"]}`}
            onClick={logoutHandler}
          >
            <div>{themeMode ? <DarkLogoutIcon /> : <LogoutIcon />}</div>
            <div className={styles["setting-title"]}>
              <h4>Logout</h4>
              <p>logout from the account</p>
            </div>
          </SecondaryCard>
        </Link>
      </div>
    </PrimaryCard>
  );
};

export default UserSettings;
