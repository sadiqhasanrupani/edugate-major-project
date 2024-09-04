import React from "react";
import { useDispatch } from "react-redux";

import styles from "../../../scss/components/teacher/subject/subroot/NoAssignmentPlaceholderComponent.module.scss"

//^ components
import NoAssignmentPlaceholder from "../../UI/Icons/Subject/NoAssignmentPlacholder";
import IconBtn from "../../UI/Buttons/IconBtn";
import AddBtnOne from "../../UI/Icons/AddBtnOne";

//^ actions
import { uiAction } from "../../../store/ui-slice";

const NoAssignmentPlaceholderComponent = () => {

  // ^ redux hooks
  const dispatch = useDispatch();

  const createAssignmentToggler = () => {
    dispatch(uiAction.ToggleCreateAssignment());
  };

  return (
    <div className={styles["no-assign-placeholder"]}>
      <NoAssignmentPlaceholder />
      <h3>Assignment</h3>
      <p>No Assignment present</p>
      <IconBtn Icon={AddBtnOne} onClick={createAssignmentToggler}>
        Create new Assignment
      </IconBtn>
    </div>
  );
};

export default NoAssignmentPlaceholderComponent;
