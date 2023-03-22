import React from "react";

//* styles
import styles from "../../../../../scss/components/teacher/subroot/invitation/subroot/AdminRequest.module.scss";

//* components
import SecondaryCard from "../../../../UI/Card/CardSecondary";
import HTMLRenderer from "../../../../HTMLRenderer/HTMLRenderer";
import PrimaryCard from "../../../../UI/Card/TeacherCard";
import DeclineBtn from "../../../../UI/Buttons/CancelBtn";
import PrimaryBtn from "../../../../UI/Buttons/PrimaryBtn";

//* utils
import { getAuthToken } from "../../../../../utils/auth";
const AdminRequest = ({
  teacherImg,
  inviteMsg,
  classroomProfileImg,
  leftMinutes,
  classroomName,
  inviteToken,
  themeMode,
}) => {
  //& Functions =====================================================

  //^ AcceptHandler Function
  const acceptHandler = () => {
    const acceptInvitationRequest = async () => {
      setIsLoading(true);

      const response = await fetch(
        `${process.env.REACT_APP_HOSTED_URL}/invite/accept-invite?token=${inviteToken}`,
        {
          headers: {
            Authorization: `Bearer ${getAuthToken()}`,
          },
        }
      );

      if (!response.ok) {
        setIsLoading(false);
        throw new Error("Something went wrong");
      }

      console.log(await response.json());

      setIsLoading(false);
    };
    acceptInvitationRequest();
  };

  //^ DeclineHandler Function
  const declineHandler = async () => {
    setIsLoading(true);

    const response = await fetch(
      `${process.env.REACT_APP_HOSTED_URL}/invite/decline-invite`,
      {
        headers: {
          Authorization: `Bearer ${getAuthToken()}`,
        },
      }
    );

    if (!response.ok) {
      setIsLoading(false);
      throw new Error("Something went wrong");
    }

    setIsLoading(false);
  };

  //& ===============================================================

  return (
    <SecondaryCard
      className={`${styles["secondary-card"]} ${themeMode && styles["dark"]}`}
    >
      <div>
        <img src={teacherImg} alt="invited-teacher-img" />
      </div>
      <div>
        <HTMLRenderer html={inviteMsg} />
        <p className={styles["left-time"]}>{leftMinutes}</p>
        <PrimaryCard className={styles["primary-card"]}>
          <img src={classroomProfileImg} alt="classroom-profile-img" />
          <h4>{classroomName}</h4>
        </PrimaryCard>

        <div className={styles["buttons"]}>
          <DeclineBtn onClick={declineHandler}>Decline</DeclineBtn>
          <PrimaryBtn className={styles["primary-btn"]} onClick={acceptHandler}>
            Accept
          </PrimaryBtn>
        </div>
      </div>
    </SecondaryCard>
  );
};

export default AdminRequest;
