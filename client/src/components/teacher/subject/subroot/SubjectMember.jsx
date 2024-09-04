import { useState } from "react";
import { useSelector } from "react-redux";
import { json, useParams, useNavigate } from "react-router-dom";

//^ stylesheet
import styles from "../../../../scss/components/teacher/subject/subroot/SubjectMember.module.scss";

//^ components
import SecondaryCard from "../../../UI/Card/CardSecondary";

//^ light icon
import Menu from "../../../UI/Icons/More";

//^ dark icon
import DarkMenu from "../../../UI/Icons/Dark/DarkMenu";

//^ auth
import { getAuthToken } from "../../../../utils/auth";
import LoadingWheel from "../../../UI/loading/LoadingWheel";

const SubjectMember = ({
  memberImg,
  memberFullName,
  memberEmailId,
  memberId,
}) => {
  //^ themeMode
  const themeMode = useSelector((state) => state.ui.isDarkMode);

  //^ states
  const [openMenu, setOpenMenu] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [responseData, setResponseData] = useState({});

  //^ Getting the param of the current route by using useParams
  const { subjectId } = useParams();

  const navigate = useNavigate();

  //^ openMenuHandler
  const openMenuHandler = () => {
    setOpenMenu(!openMenu);
  };

  //^ this handler will remove the member from the respective subject
  const removeMemberHandler = async () => {
    setIsLoading(true);

    const removeMemberData = await fetch(
      `${process.env.REACT_APP_HOSTED_URL}/subject/remove-subject-member`,
      {
        method: "POST",
        headers: {
          Authorization: `Bearer ${getAuthToken()}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ subjectId, memberId }),
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

    navigate(`/teacher/subject/${subjectId}/add-peoples`);
  };

  return (
    <article className={`${styles["article"]} ${themeMode && styles["dark"]}`}>
      <SecondaryCard className={styles["secondary-card"]}>
        <div className={`${styles["flex"]}`}>
          <div className={styles["member-info"]}>
            <img src={memberImg} alt={"member's img"} />
            <div className={`${styles["member-txt"]}`}>
              <h4>{memberFullName}</h4>
              <p>{memberEmailId}</p>
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
        </div>
      </SecondaryCard>
    </article>
  );
};

export default SubjectMember;
