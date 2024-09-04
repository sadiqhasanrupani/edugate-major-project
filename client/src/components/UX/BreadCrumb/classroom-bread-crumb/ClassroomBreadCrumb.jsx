//^ dependencies
import { Fragment } from "react";
import { useLocation, NavLink } from "react-router-dom";

//^ styles
import styles from "./ClassroomBreadCrumb.module.scss";

const ClassroomBreadCrumb = ({ classroomId, classroomName }) => {
  //^ location hook
  const location = useLocation();

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

      if(crumb === classroomId) {
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

export default ClassroomBreadCrumb;
