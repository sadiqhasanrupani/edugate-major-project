//^ dependencies
import { Fragment, useState, useEffect } from "react";
import { useLocation, NavLink, json } from "react-router-dom";

//^ styles
import styles from "../BreadCrumb/BreadCrumb.module.scss";
import { getAuthToken } from "../../../utils/auth";

const SubjectBreadCrumb = () => {
  //^ location hook
  const location = useLocation();

  const [crumbs, setCrumbs] = useState([]);

  const isActiveFn = ({ isActive }) =>
    isActive ? styles["active"] : undefined;

  //^ we will store the current route in "currentLink" variable
  let currentLink = "";

  useEffect(() => {
    const getSubjectName = async () => {
      const crumbs = [];
      const pathSegments = location.pathname
        .split("/")
        .filter((crumb) => crumb !== "");
      for (let i = 0; i < pathSegments.length; i++) {
        currentLink += `/${pathSegments[i]}`;
        if (i === 2) {
          // subject id
          const subjectName = await fetch(
            `${process.env.REACT_APP_HOSTED_URL}/subject/${pathSegments[i]}`,
            {
              headers: {
                Authorization: `Bearer ${getAuthToken()}`,
              },
            }
          );

          const subjectData = await subjectName.json();

          const { subject } = subjectData;

          setCrumbs([...crumbs, subject.subject_name]);
          // setCrumbs(crumbs);

          if (!subjectName.ok) {
            throw json(
              { message: subjectName.statusText },
              { status: subjectName.status }
            );
          }
        } else {
          crumbs.push(pathSegments[i]);
          setCrumbs(crumbs);
        }
      }
    };
    getSubjectName();
  }, [location.pathname]);

  //^ getting the pathname from location var and will split it.
  const breadcrumbLinks = crumbs.map((crumb) => {
    let link = "";
    link += `${currentLink}/${crumb}`;
    currentLink += `/${crumb}`;
    return (
      <Fragment key={Math.random()}>
        <div className={styles["crumb"]}>
          <NavLink to={link} className={isActiveFn}>
            {crumb}
          </NavLink>
        </div>
      </Fragment>
    );
  });

  return <div className={styles["bread-crumb"]}>{breadcrumbLinks}</div>;
};

export default SubjectBreadCrumb;
