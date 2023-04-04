import React from "react";
import { useSelector, useDispatch } from "react-redux";

import styles from "../../../../scss/components/teacher/subject/SubjectAssignments.module.scss";

//* components
import IconBtn from "../../../../components/UI/Buttons/IconBtn";
import FormPortal from "../../../../components/model/FormPortal";
import AddBtnOne from "../../../../components/UI/Icons/AddBtnOne";
import CreateAssignment from "../../../../components/subject/CreateAssignment.jsx";
import NoAssignmentPlaceholderComponent from "../../../../components/subject/subroot/NoAssignmentPlaceholderComponent.jsx";

//* svg
import NoAssignmentPlaceholder from "../../../../components/UI/Icons/Subject/NoAssignmentPlacholder";

//^ action
import { uiAction } from "../../../../store/ui-slice";

const SubjectAssignments = () => {
  // ^ redux hooks
  const dispatch = useDispatch();

  //^ themeMode
  const themeMode = useSelector((state) => state.ui.isDarkMode);

  //^ createAssignmentToggler state
  const isCreateAssignmentActive = useSelector(
    (state) => state.ui.isCreateAssignmentActive
  );

  const createAssignmentToggler = () => {
    dispatch(uiAction.ToggleCreateAssignment());
  };

  return (
    <>
      {isCreateAssignmentActive && (
        <FormPortal
          onBackdrop={createAssignmentToggler}
          buttonOnClick={createAssignmentToggler}
          modelTitle={"Create Assignment"}
          cardClassName={styles["form-header"]}
        >
          <CreateAssignment />
        </FormPortal>
      )}
      <section
        className={`${styles["section"]} ${themeMode && styles["dark"]}`}
      >
        {/*
         //&====================================================================
         //^ If there is no assignment Then the below component will render as a 
         //^ Placeholder.
        */}

        <NoAssignmentPlaceholderComponent />

        {/*
         //&==================================================================== 
        */}
      </section>
    </>
  );
};

export const loader = async ({ request, params }) => {
  // const getAssignmentRes = await fetch(`${process.env.REACT_APP_HOSTED_URL}/`)
};

export const action = async ({ request, params }) => {
  // const postCreateAssignment = await fetch(`${process.env.REACT_APP_HOSTED_URL}/assignment/create-assignment`)
};

export default SubjectAssignments;
