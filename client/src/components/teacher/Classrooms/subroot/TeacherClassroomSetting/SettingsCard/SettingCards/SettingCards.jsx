import React, { Fragment } from "react";
import { Link } from "react-router-dom";

//* styles
import styles from "./SettingCards.module.scss";

//* components
import SecondaryCard from "../../../../../../UI/Card/CardSecondary";

const SettingCards = ({ SETTINGS_ITEMS, themeMode }) => {
  return (
    <div className={`${styles["settings-items"]} ${themeMode && styles.dark}`}>
      {SETTINGS_ITEMS.map((settingItem) => {
        if (settingItem.to) {
          const SettingIcon = settingItem.icon; // Store the icon component in a variable
          return (
            <Fragment key={settingItem.id}>
              <Link to={settingItem.to}>
                <SecondaryCard className={styles["secondary-card"]}>
                  <div>
                    <SettingIcon /> {/* Render the icon component */}
                  </div>
                  <div className={styles["setting-title"]}>
                    <h4>{settingItem.title}</h4>
                    <p>{settingItem.description}</p>
                  </div>
                </SecondaryCard>
              </Link>
            </Fragment>
          );
        } else {
          const SettingIcon = settingItem.icon;

          return <Fragment key={settingItem.id}>
            <button>
              <SecondaryCard className={styles['secondary-card']}>
                <div>
                  <SettingIcon />
                </div>
                <div className={styles['setting-title']}>
                  <h4>{settingItem.title}</h4>
                  <p>{settingItem.description}</p>
                </div>
              </SecondaryCard>
            </button>
          </Fragment>;
        }
      })}
    </div>
  );
};

export default SettingCards;
