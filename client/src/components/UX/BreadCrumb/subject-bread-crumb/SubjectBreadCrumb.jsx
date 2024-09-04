//^ dependencies
import { Fragment, useState } from "react";
import { useLocation, NavLink, useParams, json } from "react-router-dom";

//^ styles
import styles from "./SubjectBreadCrumb.module.scss";

//^ auth
import { getAuthToken } from "../../../../utils/auth";

const SubjectBreadCrumb = ({ subjectId, assignmentId, subjectName }) => {
  //^ location hook
  const location = useLocation();

  //^ getting the submittedAssignmentId from params
  const { submittedAssignmentId } = useParams();

  //^ useState
  const [assignmentName, setAssignmentName] = useState("");
  const [studentName, setStudentName] = useState("");

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

      if (crumb === subjectId) {
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

      if (crumb === "subject") {
        return <Fragment key={Math.random()}></Fragment>;
      }

      if (crumb === assignmentId) {
        const getAssignment = async () => {
          const assignment = await fetch(
            `${process.env.REACT_APP_HOSTED_URL}/assignment/get-assignment/${assignmentId}`,
            {
              headers: {
                Authorization: `Bearer ${getAuthToken()}`,
              },
            }
          );

          if (!assignment.ok) {
            throw new Error("Internal server Error");
          }

          const response = await assignment.json();

          const { assignmentName } = response;
          setAssignmentName(assignmentName);
        };

        getAssignment();

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

      if (crumb === submittedAssignmentId) {
        const getSubmittedAssignment = async () => {
          const submittedAssignment = await fetch(
            `${process.env.REACT_APP_HOSTED_URL}/assignment/get-submitted-assignment-by-submit-id/${submittedAssignmentId}`,
            {
              headers: {
                Authorization: `Bearer ${getAuthToken()}`,
              },
            }
          );

          if (submittedAssignment.status === 401) {
            const response = await submittedAssignment.json();
            console.log(response);

            throw json(
              { message: response.message },
              { status: submittedAssignment.status }
            );
          }

          if (!submittedAssignment.ok) {
            throw json(
              { message: submittedAssignment.statusText },
              { status: submittedAssignment.status }
            );
          }

          const response = await submittedAssignment.json();

          setStudentName(response.studentFullName);
        };

        getSubmittedAssignment();

        return (
          <Fragment key={Math.random()}>
            <div className={styles["crumb"]}>
              <NavLink to={currentLink} className={isActiveFn}>
                {studentName}
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

export default SubjectBreadCrumb;
