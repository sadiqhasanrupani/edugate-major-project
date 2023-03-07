import React, { Fragment } from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";

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

  return (
    <PrimaryCard
      className={`${styles["primary-card"]} ${themeMode && styles["dark"]}`}
    >
      <h3>Settings</h3>
      <div className={styles["settings-items"]}>
        {SETTINGS_ITEMS.map((settingItem) => {
          return (
            <Link to={settingItem.to}>
              <Fragment key={settingItem.id}>
                <SecondaryCard className={`${styles["secondary-card"]}`}>
                  <div>
                    <settingItem.icon />
                  </div>
                  <div className={styles["setting-title"]}>
                    <h4>{settingItem.title}</h4>
                    <p>{settingItem.description}</p>
                  </div>
                </SecondaryCard>
              </Fragment>
            </Link>
          );
        })}
        <Link>
          <SecondaryCard className={`${styles["secondary-card"]}`}>
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
