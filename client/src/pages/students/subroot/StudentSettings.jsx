import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import { gsap } from "gsap";

//^ components
import Settings from "../../../components/Settings/UserSettings";

//^ light icon
// import ProfileView from "../../../components/UI/Icons/settings Icons/Light/ProfileView";
import EditProfile from "../../../components/UI/Icons/settings Icons/Light/EditProfile";
// import Privacy from "../../../components/UI/Icons/settings Icons/Light/PrivacyIcon";
// import Notification from "../../../components/UI/Icons/settings Icons/Light/Notification";

//^ dark icon
// import DarkProfileView from "../../../components/UI/Icons/settings Icons/Dark/ProfileView";
import DarkEditProfile from "../../../components/UI/Icons/settings Icons/Dark/EditProfile";
// import DarkPrivacy from "../../../components/UI/Icons/settings Icons/Dark/PrivacyIcon";
// import DarkNotification from "../../../components/UI/Icons/settings Icons/Dark/Notification";

const StudentSettings = () => {
  const themeMode = useSelector((state) => state.ui.isDarkMode);

  useEffect(() => {
    gsap.fromTo(
      ".student-settings-section",
      { x: 1000 },
      { x: 0, ease: "power4" }
    );
  }, []);

  const SETTING_NAV_ITEMS = [
    {
      id: 2,
      to: "/student/edit-profile",
      title: "Edit Profile",
      description: "edit user-name, profile, etc...",
      icon: themeMode ? DarkEditProfile : EditProfile,
    },
  ];

  return (
    <section className={`student-settings-section`}>
      <Settings SETTINGS_ITEMS={SETTING_NAV_ITEMS} />
    </section>
  );
};

export default StudentSettings;
