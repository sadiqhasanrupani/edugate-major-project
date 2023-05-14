import React, { useEffect, useState, useRef } from "react";
import { json, useLoaderData, useParams, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { gsap } from "gsap";

//^ styles
import styles from "../../../../scss/pages/student/join-classroom/StudentJoinClassSubject.module.scss";

//^ components
import IconBtn from "../../../../components/UI/Buttons/IconBtn";
import CompulsorySubjects from "../../../../components/student/join-classroom/subroot/CompulsorySubjects";
import OptionalSubjects from "../../../../components/student/join-classroom/subroot/optional-subjects/OptionalSubject";
import AddOptionalSubjectForm from "../../../../components/student/join-classroom/subroot/Subject/AddOptionalSubjectForm";
import FormPortal from "../../../../components/model/FormPortal";
import SuccessModel from "../../../../components/model/success-model/SuccessModel";

//^ icons
import AddBtnOne from "../../../../components/UI/Icons/AddBtnOne";

//^ actions
import { uiAction } from "../../../../store/ui-slice";

//^ auth
import { getAuthToken } from "../../../../utils/auth";

const StudentJoinClassSubject = () => {
  const themeMode = useSelector((state) => state.ui.isDarkMode);

  //^ ref
  const refData = useRef([]);

  //^ getting the isOptionalSubjectOverlayActive for ui-slice,
  const isOptionalSubjectOverlayActive = useSelector(
    (state) => state.ui.isOptionalSubjectOverlayActive
  );

  //^ isSuccessfullyJoinOptionalSub ui-slice state
  const isSuccessfullyJoinOptionalSub = useSelector(
    (state) => state.ui.isSuccessfullyJoinOptionalSub
  );

  //^ navigation func
  const navigate = useNavigate();

  //^ loading state
  const [isLoading, setIsLoading] = useState(false);

  //^ bad request state
  const [badRequest, setBadRequest] = useState();

  //^ errorMessageState
  const [errorResponse, setErrorResponse] = useState();

  //^ responseData,
  const [responseData, setResponseData] = useState({});

  const dispatch = useDispatch();

  //^ getting the joinClass id from url
  const { joinClassId } = useParams();

  //^ loader-data
  const { getOptionalSubject, getJoinedSubjects } = useLoaderData();
  const { optionalSubData } = getOptionalSubject;

  //^ getting the compulsorySubjects and optionalSubjects from getJoinSubjects constant.
  const { compulsorySubjects, optionalSubjects } = getJoinedSubjects;

  //^ Animation useEffect.
  useEffect(() => {
    gsap.fromTo(
      ".student-subject-join-classroom",
      { opacity: 0 },
      { opacity: 1, ease: "power5" }
    );
  }, []);

  const openOptionalSubjectHandler = () => {
    dispatch(uiAction.togglerOptionalSubjectOverlay());
  };

  const optionalSubjectHandler = () => {
    setResponseData({});
    setErrorResponse({});
    setBadRequest({});
    dispatch(uiAction.togglerOptionalSubjectOverlay());
  };

  const getOptionalSubjectData = (data) => {
    refData.current.optionalSubjects = data;
  };

  useEffect(() => {
    const timeOut = setTimeout(() => {
      dispatch(uiAction.closeSuccessfullyJoinOptionalSubMessage());
    }, 4000);

    return () => {
      clearTimeout(timeOut);
    };
  }, [responseData]);

  //^ Creating a async function that can send the data to the backend
  const addOptionalSubjectsHandler = async (e) => {
    e.preventDefault();

    const { optionalSubjects } = refData.current;

    setIsLoading(true);

    const postOptionalSubjects = await fetch(
      `${process.env.REACT_APP_HOSTED_URL}/join-optional-subject/add-optional-subject-as-student`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${getAuthToken()}`,
        },
        body: JSON.stringify({ optionalSubjects, joinClassId }),
      }
    );

    if (postOptionalSubjects.status === 401) {
      setIsLoading(false);
      const errorResponse = await postOptionalSubjects.json();

      setErrorResponse(errorResponse);
    }

    if (!postOptionalSubjects.ok) {
      setIsLoading(false);
      const badResponse = await postOptionalSubjects.json();

      setBadRequest(badResponse);
    }

    setIsLoading(false);
    const resData = await postOptionalSubjects.json();

    setResponseData({ message: resData && resData.message && resData.message });

    dispatch(uiAction.togglerOptionalSubjectOverlay());

    dispatch(uiAction.successfullyJoinOptionalSubMessage());

    console.log(resData);

    navigate(`/student/join-classroom/${joinClassId}/subject`);
  };

  return (
    <>
      {isOptionalSubjectOverlayActive && (
        <FormPortal
          modelTitle="Optional Subjects"
          onBackdrop={optionalSubjectHandler}
          buttonOnClick={optionalSubjectHandler}
          cardClassName={styles["form-portal-card"]}
        >
          <AddOptionalSubjectForm
            optionalSubjects={optionalSubData}
            onClick={addOptionalSubjectsHandler}
            isLoading={isLoading}
            onAddOptionalSubjectFrom={getOptionalSubjectData}
          />
        </FormPortal>
      )}
      {isSuccessfullyJoinOptionalSub && (
        <SuccessModel
          cardClassName={`response-message-close-card ${styles["success-card-model"]}`}
        >
          {responseData && responseData.message && responseData.message}
        </SuccessModel>
      )}
      <article
        className={`student-subject-join-classroom ${styles["article"]} ${
          themeMode && styles["dark"]
        }`}
      >
        <div className={styles["title-div"]}>
          <h2>Student Subjects</h2>
          <IconBtn
            Icon={AddBtnOne}
            onClick={openOptionalSubjectHandler}
            className={styles["optional-subject-btn"]}
          >
            Optional Subject
          </IconBtn>
        </div>
        <div className={styles["subjects"]}>
          <CompulsorySubjects compulsorySubjects={compulsorySubjects} />
          <OptionalSubjects optionalSubjects={optionalSubjects} />
        </div>
      </article>
    </>
  );
};

export const loader = async ({ request, params }) => {
  const joinClassId = await params.joinClassId;

  const getOptionalSubject = await fetch(
    `${process.env.REACT_APP_HOSTED_URL}/optional-subject/for-student/${joinClassId}`,
    {
      headers: {
        Authorization: `Bearer ${getAuthToken()}`,
      },
    }
  );

  if (!getOptionalSubject.ok) {
    throw json({ message: getOptionalSubject.statusText }, { status: 500 });
  }

  const getJoinedSubjects = await fetch(
    `${process.env.REACT_APP_HOSTED_URL}/join-subject/get-joined-subjects-for-student/${params.joinClassId}`,
    {
      headers: {
        Authorization: `Bearer ${getAuthToken()}`,
      },
    }
  );

  if (getJoinedSubjects.status === 401) {
    const badResponse = await getJoinedSubjects.json();

    throw json({ message: badResponse.message }, { status: 500 });
  }

  if (!getJoinedSubjects.ok) {
    throw json(
      { message: getJoinedSubjects.statusText },
      { status: getJoinedSubjects.status }
    );
  }

  const data = {
    getOptionalSubject: await getOptionalSubject.json(),
    getJoinedSubjects: await getJoinedSubjects.json(),
  };

  return data;
};

export default StudentJoinClassSubject;
