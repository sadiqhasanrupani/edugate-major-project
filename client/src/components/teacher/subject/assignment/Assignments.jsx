import React from "react";
import { useSelector, useDispatch } from "react-redux";

import styles from "./Assignments.module.scss";

//^ components
import UnderLine from "../../../UI/underline/UnderLine";
import IconBtn from "../../../UI/Buttons/IconBtn";
import AssignmentTable from "../../../UI/Tables/AssignmentTable/AssignmentTable";

//^ icons
import AddBtnOne from "../../../UI/Icons/AddBtnOne";

//^ actions
import { uiAction } from "../../../../store/ui-slice";

const Assignments = ({ assignments }) => {
  const themeMode = useSelector((state) => state.ui.isDarkMode);

  //^ dispatch method
  const dispatch = useDispatch();

  //^ this function is used to toggle the createAssignment form model.
  const createAssignmentToggler = () => {
    dispatch(uiAction.ToggleCreateAssignment());
  };

  return (
    <>
      <article
        className={`${styles["article"]} ${themeMode && styles["dark"]}`}
      >
        <div className={styles["assignment-heading"]}>
          <h2>Assignments</h2>
          <IconBtn
            Icon={AddBtnOne}
            onClick={createAssignmentToggler}
            className={styles["assignment-btn"]}
          >
            Create Assignment
          </IconBtn>
        </div>
        <UnderLine />
        <div className={styles["assignment-table"]}>
          <AssignmentTable assignments={assignments} />
        </div>
      </article>
    </>
  );
};

export default Assignments;
