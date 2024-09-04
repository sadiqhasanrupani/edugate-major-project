import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import { gsap } from "gsap";

//* style
import styles from "../../../scss/pages/teacher/subroot/Setting.module.scss";

//* components
import Settings from "../../../components/Settings/UserSettings";

//* settings/light-icons
import EditProfileIcon from "../../../components/UI/Icons/settings Icons/Light/EditProfile.jsx";
import PrivacyIcon from "../../../components/UI/Icons/settings Icons/Light/PrivacyIcon.jsx";
import NotificationIcon from "../../../components/UI/Icons/settings Icons/Light/Notification.jsx";

//* settings/dark-icons
import DarkProfileViewIcon from "../../../components/UI/Icons/settings Icons/Dark/ProfileView.jsx";
import DarkEditProfile from "../../../components/UI/Icons/settings Icons/Dark/EditProfile.jsx";
import DarkPrivacyIcon from "../../../components/UI/Icons/settings Icons/Dark/PrivacyIcon.jsx";
import DarkNotification from "../../../components/UI/Icons/settings Icons/Dark/Notification.jsx";

const Setting = () => {
  //* themeMode
  const themeMode = useSelector((state) => state.ui.isDarkMode);

  useEffect(() => {
    gsap.fromTo(
      ".teacher-settings-section",
      { x: 1000 },
      { x: 0, ease: "power4" },
    );
  }, []);

  //* Settings Items
  const SETTINGS_ITEMS = [
    // {
    //   id: Math.floor(Math.random() * 10000 + 1),
    //   icon: themeMode ? DarkProfileViewIcon : ProfileViewIcon,
    //   title: "View Profile",
    //   description: "profile view",
    //   to: "view-profile",
    // },
    {
      id: Math.floor(Math.random() * 10000 + 1),
      icon: themeMode ? DarkEditProfile : EditProfileIcon,
      title: "Edit Profile",
      description: "edit username, profile picture,...",
      to: "edit-profile",
    },
    // {
    //   id: Math.floor(Math.random() * 10000 + 1),
    //   icon: themeMode ? DarkPrivacyIcon : PrivacyIcon,
    //   title: "Privacy & Security",
    //   description: "password reset",
    //   to: "privacy",
    // },
    // {
    //   id: Math.floor(Math.random() * 10000 + 1),
    //   icon: themeMode ? DarkNotification : NotificationIcon,
    //   title: "Notification",
    //   description: "updates, invite request, submissions...",
    //   to: "/teacher/notification",
    // },
  ];

  return (
    <>
      <section
        className={`teacher-settings-section ${styles["section"]} ${themeMode && styles["dark"]}`}
      >
        <Settings SETTINGS_ITEMS={SETTINGS_ITEMS} />
      </section>
    </>
  );
};

export default Setting;
