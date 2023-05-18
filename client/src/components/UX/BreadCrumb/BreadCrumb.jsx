//^ dependencies
import { Fragment, useState } from "react";
import { useLocation, NavLink, useParams, json } from "react-router-dom";

//^ styles
import styles from "./BreadCrumb.module.scss";
import { getAuthToken } from "../../../utils/auth";

const BreadCrumb = () => {
  //^ location hook
  const location = useLocation();

  const { classroomId } = useParams();

  //^ states
  const [classroomName, setClassroomName] = useState("");

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
          console.log(response);
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
