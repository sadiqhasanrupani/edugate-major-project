import React, { useState } from "react";

//* stylesheet
import styles from "../../../../scss/components/teacher/subroot/invitation/InviteCard.module.scss";

//* components
import SecondaryCard from "../../../UI/Card/CardSecondary";
import HTMLRenderer from "../../../HTMLRenderer/HTMLRenderer";
import PrimaryCard from "../../../UI/Card/TeacherCard";
import DeclineBtn from "../../../UI/Buttons/CancelBtn";
import PrimaryBtn from "../../../UI/Buttons/PrimaryBtn";
import JoinRequest from "./subroot/JoinRequest";
import AdminRequest from "./subroot/AdminRequest.jsx";

//* utils
import { getAuthToken } from "../../../../utils/auth";

const InviteCard = ({ inviteData, themeMode }) => {
  //^ state hook
  const [isLoading, setIsLoading] = useState(false);

  //^ Storing the updatedAt data in the updatedAt variable.
  const updatedAt = inviteData.updatedAt;
  const updatedAtDate = new Date(updatedAt);

  const currentDate = new Date();

  //^ difference in milliseconds
  const timeDiff = currentDate.getTime() - updatedAtDate.getTime();

  //^ difference in minutes (rounded off)
  const diffInMinutes = Math.round(timeDiff / 60000);

  let leftMinutes;

  if (diffInMinutes < 1) {
    leftMinutes = "just now";
  } else if (diffInMinutes < 60) {
    leftMinutes = `${diffInMinutes} minute${diffInMinutes > 1 ? "s" : ""} ago`;
  } else if (diffInMinutes < 1440) {
    //* less than 24 hours
    const hours = Math.floor(diffInMinutes / 60);
    leftMinutes = `${hours} hour${hours > 1 ? "s" : ""} ago`;
  } else {
    const days = Math.floor(diffInMinutes / 1440);
    leftMinutes = `${days} day${days > 1 ? "s" : ""} ago`;
  }

  return (
    <article className={`${styles["article"]} ${themeMode && styles["dark"]}`}>
      {inviteData &&
        inviteData.invite_status &&
        inviteData.invite_status === "joinRequest" && (
          <JoinRequest
            secondaryClassName={styles["secondary-card"]}
            classroomName={inviteData.classroom.classroom_name}
            classroomProfileImg={inviteData.classroom.classroom_profile_img}
            inviteMsg={inviteData.invite_msg}
            inviteToken={inviteData.invite_token}
            teacherImg={inviteData.inviteFrom.teacher_img}
            leftMinutes={leftMinutes}
            themeMode={themeMode}
            inviteId={inviteData.invite_id}
            inviteFromId={inviteData.invite_from_id}
            classroomId={inviteData.classroom_id}
          />
        )}
      {inviteData &&
        inviteData.invite_status &&
        inviteData.invite_status === "adminRequest" && (
          <AdminRequest
            secondaryClassName={styles["secondary-card"]}
            classroomName={inviteData.classroom.classroom_name}
            classroomProfileImg={inviteData.classroom.classroom_profile_img}
            inviteMsg={inviteData.invite_msg}
            inviteToken={inviteData.inviteToken}
            teacherImg={inviteData.inviteFrom.teacher_img}
            leftMinutes={leftMinutes}
            themeMode={themeMode}
          />
        )}
    </article>
  );
};

export default InviteCard;
