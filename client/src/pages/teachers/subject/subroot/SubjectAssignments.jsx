import React, { useEffect, useRef, useState } from "react";
import {
  json,
  redirect,
  useParams,
  useRouteLoaderData,
  useNavigate,
} from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { gsap } from "gsap";

import styles from "../../../../scss/components/teacher/subject/SubjectAssignments.module.scss";

//* components
import FormPortal from "../../../../components/model/FormPortal";
import CreateAssignment from "../../../../components/subject/CreateAssignment.jsx";
import NoAssignmentPlaceholderComponent from "../../../../components/subject/subroot/NoAssignmentPlaceholderComponent.jsx";
import Assignments from "../../../../components/teacher/subject/assignment/Assignments";

//^ action
import { uiAction } from "../../../../store/ui-slice";

//^ auth
import { getAuthToken } from "../../../../utils/auth";

const SubjectAssignments = () => {
  //^ animation useEffect
  useEffect(() => {
    gsap.fromTo(".section", { opacity: 0 }, { opacity: 1, ease: "power4" });
  }, []);

  //^ ref
  const refData = useRef({});

  //^ getting the subject ID from the useParams hook
  const { subjectId } = useParams();

  //^ states
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState(undefined);
  const [internalError, setInternalError] = useState(undefined);
  const [unAuthMsg, setUnAuthMsg] = useState(undefined);
  const [responseMsg, setResponseMsg] = useState(undefined);

  //^ loader data
  const { assignmentData } = useRouteLoaderData("subject-assignments-loader");

  // ^ redux hooks
  const dispatch = useDispatch();

  //^ navigate fn
  const navigate = useNavigate();

  //^ themeMode
  const themeMode = useSelector((state) => state.ui.isDarkMode);

  //^ createAssignmentToggler state
  const isCreateAssignmentActive = useSelector(
    (state) => state.ui.isCreateAssignmentActive
  );

  const createAssignmentToggler = () => {
    dispatch(uiAction.ToggleCreateAssignment());
  };

  const getCreateAssignmentData = (data) => {
    refData.current.data = data;
  };

  //^ async function to send the request to create a assignment
  const createAssignmentHandler = async (e) => {
    e.preventDefault();

    //^ loading state to true
    setIsLoading(true);

    //^ retrieving the data from refData.
    const {
      totalMarksEnteredValue,
      files,
      topicEnteredValue,
      descriptionEnteredValue,
      startFormattedDateTime,
      endFormattedDateTime,
    } = refData.current.data;

    const totalMarks = parseInt(totalMarksEnteredValue);
    const currentData = new Date();

    //^ creating a formData that can also accept file type data.
    const formData = new FormData();
    formData.append("assignmentTopic", topicEnteredValue);
    formData.append("totalMarks", totalMarks);
    formData.append("assignmentDescription", descriptionEnteredValue);
    files.forEach((file) => {
      formData.append("files", file);
    });
    formData.append("subjectId", subjectId);

    formData.append(
      "startTime",
      startFormattedDateTime ? startFormattedDateTime : currentData
    );
    endFormattedDateTime && formData.append("endTime", endFormattedDateTime);

    //^ sending a post request to the api.
    const postCreateAssignment = await fetch(
      `${process.env.REACT_APP_HOSTED_URL}/assignment/create-assignment`,
      {
        method: "POST",
        headers: {
          Authorization: `Bearer ${getAuthToken()}`,
        },
        body: formData,
      }
    );

    if (!postCreateAssignment.status === 401) {
      //^ loading state to false
      setIsLoading(false);

      const response = await postCreateAssignment.json();
      setUnAuthMsg({ message: response.message });
    }

    if (!postCreateAssignment.ok) {
      //^ loading state to false
      setIsLoading(false);

      const response = await postCreateAssignment.json();
      setInternalError({ message: response.message, error: response.error });
    }

    //^ loading state to false
    setIsLoading(false);

    const response = await postCreateAssignment.json();
    setResponseMsg(response.message);

    dispatch(uiAction.ToggleCreateAssignment());

    navigate(`/teacher/subject/${subjectId}/assignment`);
  };

  useEffect(() => {
    gsap.fromTo(
      ".subject-assignments-section",
      { x: 1000 },
      { x: 0, ease: "power4" }
    );
  }, []);

  return (
    <section className={`subject-assignments-section section`}>
      {isCreateAssignmentActive && (
        <FormPortal
          onBackdrop={createAssignmentToggler}
          buttonOnClick={createAssignmentToggler}
          modelTitle={"Create Assignment"}
          cardClassName={styles["form-header"]}
        >
          <CreateAssignment
            onCreateAssignment={getCreateAssignmentData}
            onSubmit={createAssignmentHandler}
            isLoading={isLoading}
            errorMessage={errorMessage}
          />
        </FormPortal>
      )}
      <article
        className={`${styles["section"]} ${themeMode && styles["dark"]}`}
      >
        {/*
         //&====================================================================
         //^ If there is no assignment Then the below component will render as a 
         //^ Placeholder.
        */}

        {assignmentData.length <= 0 ? (
          <NoAssignmentPlaceholderComponent />
        ) : (
          <Assignments assignments={assignmentData} />
        )}

        {/*
         //&==================================================================== 
        */}
      </article>
    </section>
  );
};

export const loader = async ({ request, params }) => {
  if (!getAuthToken()) {
    return redirect("/login");
  }

  const { subjectId } = params;

  const getAssignmentRes = await fetch(
    `${process.env.REACT_APP_HOSTED_URL}/assignment/get-assignments-for-teacher/${subjectId}`,
    {
      headers: {
        Authorization: `Bearer ${getAuthToken()}`,
      },
    }
  );

  if (getAssignmentRes.status === 401) {
    const response = await getAssignmentRes.json();
    throw json(
      { message: response.message },
      { status: getAssignmentRes.status }
    );
  }

  if (!getAssignmentRes.ok) {
    throw json(
      { message: getAssignmentRes.statusText },
      { status: getAssignmentRes.status }
    );
  }

  return getAssignmentRes;
};

export const action = async ({ request, params }) => {
  // const postCreateAssignment = await fetch(`${process.env.REACT_APP_HOSTED_URL}/assignment/create-assignment`)
};

export default SubjectAssignments;
