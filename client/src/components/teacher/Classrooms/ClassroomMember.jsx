import React, { useState } from "react";
import { useNavigate, useParams, json } from "react-router-dom";

//* styles
import styles from "../../../scss/components/teacher/Classrooms/JoinStudents.module.scss";

import SecondaryCard from "../../UI/Card/CardSecondary";
import LoadingWheel from "../../UI/loading/LoadingWheel";

//* icons
import Menu from "../../UI/Icons/More";
import DarkMenu from "../../UI/Icons/Dark/DarkMenu";

//^ auth
import { getAuthToken } from "../../../utils/auth";

const ClassroomMember = ({ memberId, themeMode, fullName, image, emailId }) => {
  const [openMenu, setOpenMenu] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [responseData, setResponseData] = useState({});

  const navigate = useNavigate();
  const { classId } = useParams();

  const openMenuHandler = () => {
    setOpenMenu(!openMenu);
  };

  const removeMemberHandler = async () => {
    setIsLoading(true);

    const removeMemberData = await fetch(
      `${process.env.REACT_APP_HOSTED_URL}/join-classroom/remove-classroom-member`,
      {
        method: "POST",
        headers: {
          Authorization: `Bearer ${getAuthToken()}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ classId, memberId }),
      }
    );

    if (removeMemberData.status === 401) {
      setIsLoading(false);

      throw json(
        { message: await removeMemberData.json().message },
        { status: 500 }
      );
    }

    if (!removeMemberData.ok) {
      setIsLoading(false);

      throw json({ message: "Internal Server Error" }, { status: 500 });
    }

    setResponseData(await removeMemberData.json());
    setIsLoading(false);

    navigate(`/teacher/classroom/${classId}/students`);
  };

  return (
    <SecondaryCard className={styles["secondary-card"]}>
      <div className={styles["student-div"]}>
        <img src={image} alt="memberImg" />
        <div className={styles["student-detail"]}>
          <h4>
            {fullName}
          </h4>
          <p>{emailId}</p>
        </div>
      </div>
      <div className={styles["menu"]} onClick={openMenuHandler}>
        <div>
          {themeMode ? <DarkMenu /> : <Menu />}
          {openMenu && (
            <div
              className={`menu-dropdown ${styles["menu-dropdown"]}`}
              onClick={removeMemberHandler}
            >
              <p>{isLoading ? <LoadingWheel /> : "Remove"}</p>
            </div>
          )}
        </div>
      </div>
    </SecondaryCard>
  );
};

export default ClassroomMember;
