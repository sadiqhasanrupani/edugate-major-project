//^ dependencies
import { Fragment, useState } from "react";
import { useLocation, NavLink, useParams } from "react-router-dom";

//^ styles
import styles from "./BreadCrumb.module.scss";

//^ auth
import { getAuthToken } from "../../../utils/auth";

const BreadCrumb = () => {
  //^ location hook
  const location = useLocation();

  const {
    classroomId,
    joinSubjectId,
    assignmentId,
    quizId,
    joinClassroomId,
  } = useParams();

  //^ states
  const [classroomName, setClassroomName] = useState("");
  const [subjectName, setSubjectName] = useState("");
  const [assignmentName, setAssignmentName] = useState("");
  const [quizName, setQuizName] = useState("");
  const [joinClassroomName, setJoinClassroomName] = useState("");

  //^ we will store the current route in "currentLink" variable
  let currentLink = "";

  const isActiveFn = ({ isActive }) =>
    isActive ? styles["active"] : undefined;

  //^ getting the pathname from location var and will split it.
  const crumbs = location.pathname
    .split("/")
    .filter((crumb) => crumb !== "")
    .map((crumb) => {
      currentLink += `/${crumb}`;

      if (crumb === "classroom-report") {
        return <Fragment key={Math.random()}></Fragment>;
      }

      if (crumb === classroomId) {
        const getClassroomName = async () => {
          const getClassroom = await fetch(
            `${process.env.REACT_APP_HOSTED_URL}/classroom/${classroomId}`,
            {
              headers: {
                Authorization: `Bearer ${getAuthToken()}`,
              },
            }
          );

          if (!getClassroom.ok) {
            console.log(await getClassroom.json());
            return Error({ message: "Something went wrong" });
          }

          const response = await getClassroom.json();
          setClassroomName(
            `${response.classroomData.classroom_name}-classroom-report`
          );
        };
        getClassroomName();
        return (
          <Fragment key={Math.random()}>
            <div className={styles["crumb"]}>
              <NavLink to={currentLink} className={isActiveFn}>
                {classroomName}
              </NavLink>
            </div>
          </Fragment>
        );
      }

      if (crumb === "subject-report") {
        return <Fragment key={Math.random()}></Fragment>;
      }

      if (crumb === joinClassroomId) {
        const getJoinClassroomName = async () => {
          const getJoinClassroomData = await fetch(
            `${process.env.REACT_APP_HOSTED_URL}/joinClassroom/${joinClassroomId}`,
            {
              headers: {
                Authorization: `Bearer ${getAuthToken()}`,
              },
            }
          );

          if (getJoinClassroomData.status === 401) {
            const response = await getJoinClassroomData.json();
            throw new Error(response.message);
          }

          if (!getJoinClassroomData.ok) {
            const response = await getJoinClassroomData.json();
            throw new Error(response.message);
          }

          const response = await getJoinClassroomData.json();
          setJoinClassroomName(
            `${response.classData.classroom_name} Class Report`
          );
        };

        getJoinClassroomName();

        return (
          <Fragment key={Math.random()}>
            <div className={styles["crumb"]}>
              <NavLink to={currentLink} className={isActiveFn}>
                {joinClassroomName}
              </NavLink>
            </div>
          </Fragment>
        );
      }

      if (crumb === joinSubjectId) {
        const getSubjectName = async () => {
          const getSubject = await fetch(
            `${process.env.REACT_APP_HOSTED_URL}/join-subject/get-join-subject-data/${joinSubjectId}`,
            {
              headers: {
                Authorization: `Bearer ${getAuthToken()}`,
              },
            }
          );

          if (!getSubject.ok) {
            console.log(await getSubject.json());
            return Error({ message: "Something went wrong" });
          }

          const response = await getSubject.json();
          setSubjectName(`${response.subjectName} Subject Report`);
        };
        getSubjectName();
        return (
          <Fragment key={Math.random()}>
            <div className={styles["crumb"]}>
              <NavLink to={currentLink} className={isActiveFn}>
                {subjectName}
              </NavLink>
            </div>
          </Fragment>
        );
      }

      if (crumb === "assignment-report") {
        return <Fragment key={Math.random()}></Fragment>;
      }

      if (crumb === assignmentId) {
        const getAssignmentName = async () => {
          const getAssignment = await fetch(
            `${process.env.REACT_APP_HOSTED_URL}/assignment/get-assignment/${assignmentId}`,
            {
              headers: {
                Authorization: `Bearer ${getAuthToken()}`,
              },
            }
          );

          if (!getAssignment.ok) {
            console.log(await getAssignment.json());
            return Error({ message: "Something went wrong" });
          }

          const response = await getAssignment.json();
          setAssignmentName(`${response.assignment.topic}-assignment-report`);
        };
        getAssignmentName();
        return (
          <Fragment key={Math.random()}>
            <div className={styles["crumb"]}>
              <NavLink to={currentLink} className={isActiveFn}>
                {assignmentName}
              </NavLink>
            </div>
          </Fragment>
        );
      }

      if (crumb === "quiz-report") {
        return <Fragment key={Math.random()}></Fragment>;
      }

      if (crumb === quizId) {
        const getQuizData = async () => {
          const getQuizName = await fetch(
            `${process.env.REACT_APP_HOSTED_URL}/quiz/get-quiz/${quizId}`,
            {
              headers: {
                Authorization: `Bearer ${getAuthToken()}`,
              },
            }
          );

          if (getQuizName.status === 401 || getQuizName.status === 403) {
            const response = await getQuizName.json();

            throw new Error(response.message);
          }

          if (!getQuizName.ok) {
            const response = await getQuizName.json();

            throw new Error(response.message);
          }
          const response = await getQuizName.json();

          setQuizName(`${response.quizData.title}-quiz-report`);
        };

        getQuizData();
        return (
          <Fragment key={Math.random()}>
            <div className={styles["crumb"]}>
              <NavLink to={currentLink} className={isActiveFn}>
                {quizName}
              </NavLink>
            </div>
          </Fragment>
        );
      }

      const capitalizeCrumb =
        crumb.charAt(0).toUpperCase() + crumb.slice(1).toLowerCase();

      return (
        <Fragment key={Math.random()}>
          <div className={styles["crumb"]}>
            <NavLink to={currentLink} className={isActiveFn}>
              {capitalizeCrumb}
            </NavLink>
          </div>
        </Fragment>
      );
    });

  return <div className={styles["bread-crumb"]}>{crumbs}</div>;
};

export default BreadCrumb;
