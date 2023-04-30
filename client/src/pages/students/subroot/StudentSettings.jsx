import React from "react";
import { useSelector } from "react-redux";

//^ components
import Settings from "../../../components/Settings/UserSettings";

//^ light icon
import ProfileView from "../../../components/UI/Icons/settings Icons/Light/ProfileView";
import EditProfile from "../../../components/UI/Icons/settings Icons/Light/EditProfile";
import Privacy from "../../../components/UI/Icons/settings Icons/Light/PrivacyIcon";
import Notification from "../../../components/UI/Icons/settings Icons/Light/Notification";

//^ dark icon
import DarkProfileView from "../../../components/UI/Icons/settings Icons/Dark/ProfileView";
import DarkEditProfile from "../../../components/UI/Icons/settings Icons/Dark/EditProfile";
import DarkPrivacy from "../../../components/UI/Icons/settings Icons/Dark/PrivacyIcon";
import DarkNotification from "../../../components/UI/Icons/settings Icons/Dark/Notification";

const StudentSettings = () => {
  const themeMode = useSelector((state) => state.ui.isDarkMode);

  const SETTING_NAV_ITEMS = [
    {
      id: 1,
      to: "/student/student-profile",
      title: "Profile",
      description: "view profile",
      icon: themeMode ? DarkProfileView : ProfileView,
    },
    {
      id: 2,
      to: "/student/edit-profile",
      title: "Edit Profile",
      description: "edit user-name, profile, etc...",
      icon: themeMode ? DarkEditProfile : EditProfile,
    },
    {
      id: 3,
      to: "/student/privacy-security",
      title: "Privacy and Security",
      description: "password reset",
      icon: themeMode ? DarkPrivacy : Privacy,
    },
    {
      id: 4,
      to: "/student/notifications",
      title: "Notification",
      description: "get notified",
      icon: themeMode ? DarkNotification : Notification,
    },
  ];

  return (
    <>
      <Settings SETTINGS_ITEMS={SETTING_NAV_ITEMS} />
    </>
  );
};

export default StudentSettings;
