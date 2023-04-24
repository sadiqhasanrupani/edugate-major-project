//^ dependencies
import { Fragment } from "react";
import { useLocation, NavLink } from "react-router-dom";

//^ styles
import styles from "./BreadCrumb.module.scss";

const BreadCrumb = () => {
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

      return (
        <Fragment key={Math.random()}>
          <div className={styles["crumb"]}>
            <NavLink to={currentLink} className={isActiveFn}>
              {crumb}
            </NavLink>
          </div>
        </Fragment>
      );
    });

  return <div className={styles["bread-crumb"]}>{crumbs}</div>;
};

export default BreadCrumb;
