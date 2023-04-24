import { useState } from "react";
import { useNavigate } from "react-router-dom";

//* styles
import styles from "../../../../../scss/components/teacher/subroot/invitation/subroot/AdminRequest.module.scss";

//* components
import SecondaryCard from "../../../../UI/Card/CardSecondary";
import HTMLRenderer from "../../../../HTMLRenderer/HTMLRenderer";
import PrimaryCard from "../../../../UI/Card/TeacherCard";
import DeclineBtn from "../../../../UI/Buttons/CancelBtn";
import PrimaryBtn from "../../../../UI/Buttons/PrimaryBtn";
import LoadingWheel from "../../../../UI/loading/LoadingWheel";

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
  inviteId,
  inviteFromId,
  classroomId,
}) => {
  const [isLoading, setIsLoading] = useState(false);

  console.log(classroomId, inviteFromId, inviteId, inviteToken);

  const navigate = useNavigate();

  //& Functions =====================================================
  //^ AcceptHandler Function
  const acceptHandler = () => {
    const acceptInvitationRequest = async () => {
      setIsLoading(true);

      const response = await fetch(
        `${process.env.REACT_APP_HOSTED_URL}/invite/admin-request/accept-invite`,
        {
          method: "POST",
          headers: {
            Authorization: `Bearer ${getAuthToken()}`,
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            inviteToken,
            inviteId,
            inviteFromId,
            classroomId,
          }),
        }
      );

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
            {isLoading ? <LoadingWheel /> : "Accept"}
          </PrimaryBtn>
        </div>
      </div>
    </SecondaryCard>
  );
};

export default AdminRequest;
