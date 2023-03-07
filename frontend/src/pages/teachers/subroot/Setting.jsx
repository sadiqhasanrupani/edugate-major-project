import React from "react";
import { useSelector } from "react-redux";

//* style
import styles from "../../../scss/pages/teacher/subroot/Setting.module.scss";

//* components
import Settings from "../../../components/Settings/UserSettings";

//* settings/light-icons
import ProfileViewIcon from "../../../components/UI/Icons/settings Icons/Light/ProfileView";
import EditProfileIcon from "../../../components/UI/Icons/settings Icons/Light/EditProfile.jsx";
import PrivacyIcon from "../../../components/UI/Icons/settings Icons/Light/PrivacyIcon.jsx";
import NotificationIcon from "../../../components/UI/Icons/settings Icons/Light/Notification.jsx";
import LogoutIcon from "../../../components/UI/Icons/settings Icons/Light/LogoutIcon.jsx";

//* settings/dark-icons
import DarkProfileViewIcon from "../../../components/UI/Icons/settings Icons/Dark/ProfileView.jsx";
import DarkEditProfile from "../../../components/UI/Icons/settings Icons/Dark/EditProfile.jsx";
import DarkPrivacyIcon from "../../../components/UI/Icons/settings Icons/Dark/PrivacyIcon.jsx";
import DarkNotification from "../../../components/UI/Icons/settings Icons/Dark/Notification.jsx";
import DarkLogoutIcon from "../../../components/UI/Icons/settings Icons/Dark/LogoutIcon.jsx";

const Setting = () => {
  //* themeMode
  const themeMode = useSelector((state) => state.ui.isDarkMode);

  //* Settings Items
  const SETTINGS_ITEMS = [
    {
      id: Math.floor(Math.random() * 10000 + 1),
      icon: themeMode ? DarkProfileViewIcon : ProfileViewIcon,
      title: "View Profile",
      description: "profile view",
      to: "view-profile",
    },
    {
      id: Math.floor(Math.random() * 10000 + 1),
      icon: themeMode ? DarkEditProfile : EditProfileIcon,
      title: "Edit Profile",
      description: "edit username, profile picture,...",
      to: "edit-profile",
    },
    {
      id: Math.floor(Math.random() * 10000 + 1),
      icon: themeMode ? DarkPrivacyIcon : PrivacyIcon,
      title: "Privacy & Security",
      description: "password reset",
      to: "privacy",
    },
    {
      id: Math.floor(Math.random() * 10000 + 1),
      icon: themeMode ? DarkNotification : NotificationIcon,
      title: "Notification",
      description: "updates, invite request, submissions...",
      to: "notification",
    },
  ];

  return (
    <>
      <section
        className={`${styles["section"]} ${themeMode && styles["dark"]}`}
      >
        <Settings SETTINGS_ITEMS={SETTINGS_ITEMS} />
      </section>
    </>
  );
};

export default Setting;
