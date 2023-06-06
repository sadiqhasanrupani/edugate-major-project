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

  const { classroomId, joinSubjectId, assignmentId, quizId } = useParams();

  //^ states
  const [classroomName, setClassroomName] = useState("");
  const [subjectName, setSubjectName] = useState("");
  const [assignmentName, setAssignmentName] = useState("");
  const [quizName, setQuizName] = useState("");

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
          setClassroomName(response.classroomData.classroom_name);
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
          setSubjectName(response.subjectName);
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
          setAssignmentName(response.assignment.topic);
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

          setQuizName(response.quizData.title);
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
