import React, { Fragment, useState } from "react";
import { json, useParams, useNavigate } from "react-router-dom";

//* styles
import styles from "./PendingTeacher.module.scss";

//* components
import SecondaryCard from "../../UI/Card/CardSecondary";
import LoadingWheel from "../../UI/loading/LoadingWheel";

//* Icons
import DarkMenu from "../../UI/Icons/Dark/DarkMenu";
import Menu from "../../UI/Icons/More";

//^ auth
import { getAuthToken } from "../../../utils/auth";

const ApprovedTeacher = ({ coTeacher, themeMode, memberId }) => {
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

    navigate(`/teacher/classroom/${classId}/teachers`);
  };

  return (
    <Fragment key={coTeacher.teacher_id}>
      <SecondaryCard
        className={`${styles["secondary-card"]} ${themeMode && styles["dark"]}`}
      >
        <div className={styles["teacher-div"]}>
          <img src={coTeacher.teacher_img} alt="" />
          <div className={styles["teacher-detail"]}>
            <h4>
              {coTeacher.teacher_first_name} &nbsp;
              {coTeacher.teacher_last_name}
            </h4>
            <p>{coTeacher.teacher_email}</p>
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
    </Fragment>
  );
};

export default ApprovedTeacher;
