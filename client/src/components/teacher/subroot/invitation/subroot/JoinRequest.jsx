import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

//* styles
import styles from "../../../../../scss/components/teacher/subroot/invitation/subroot/JoinRequest.module.scss";

//* components
import SecondaryCard from "../../../../UI/Card/CardSecondary";
import HTMLRenderer from "../../../../HTMLRenderer/HTMLRenderer";
import PrimaryCard from "../../../../UI/Card/TeacherCard";
import DeclineBtn from "../../../../UI/Buttons/CancelBtn";
import PrimaryBtn from "../../../../UI/Buttons/PrimaryBtn";
import LoadingWheel from "../../../../UI/loading/LoadingWheel";

//* utils
import { getAuthToken } from "../../../../../utils/auth";

const JoinRequest = ({
  teacherImg,
  inviteMsg,
  classroomProfileImg,
  leftMinutes,
  classroomName,
  inviteToken,
  inviteFromId,
  classroomId,
  themeMode,
  inviteId,
}) => {
  //^ state hook
  const [isLoading, setIsLoading] = useState();

  const navigate = useNavigate();

  //& Functions =====================================================

  //^ AcceptHandler Function
  const acceptHandler = () => {
    const acceptInvitationRequest = async () => {
      setIsLoading(true);

      const response = await fetch(
        `${process.env.REACT_APP_HOSTED_URL}/invite/join-request/accept-invite?token=${inviteToken}&classId=${classroomId}&inviteFromId=${inviteFromId}&inviteId=${inviteId}`,
        {
          headers: {
            Authorization: `Bearer ${getAuthToken()}`,
          },
        }
      );

      if (
        response.status === 401 ||
        response.status === 403 ||
        response.status === 400
      ) {
        setIsLoading(false);
        console.log(await response.json());
        return await response.json();
      }

      if (!response.ok) {
        setIsLoading(false);
        throw new Error("Something went wrong");
      }

      navigate(`/teacher/classroom`);

      setIsLoading(false);
    };
    acceptInvitationRequest();
  };

  //^ DeclineHandler Function
  const declineHandler = async () => {
    setIsLoading(true);

    const response = await fetch(
      `${process.env.REACT_APP_HOSTED_URL}/invite/join-request/decline-invite`,
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
          <PrimaryBtn
            className={styles["primary-btn"]}
            onClick={acceptHandler}
            disabled={isLoading}
          >
            {isLoading ? <LoadingWheel /> : "Accept"}
          </PrimaryBtn>
        </div>
      </div>
    </SecondaryCard>
  );
};

export default JoinRequest;
