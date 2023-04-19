import React, { Fragment, useEffect } from "react";
import { json, redirect, useLoaderData } from "react-router-dom";
import { gsap } from "gsap";

//* styles
import styles from "../../../scss/pages/teacher/subroot/ClassroomOverview.module.scss";

//* components
import ClassroomProfile from "../../../components/classroom/ClassroomProfile";

//* utils
import { getAuthToken } from "../../../utils/auth";

const ClassroomDetail = () => {
  const { classroomData } = useLoaderData();

  useEffect(() => {
    gsap.fromTo(".section", { opacity: 0 }, { opacity: 1, ease: "linear" });
  });

  return (
    <Fragment>
      <section className={`section ${styles["section"]}`}>
        <header className={styles["classroom-profile"]}>
          <ClassroomProfile
            bannerImg={classroomData.classroom_banner_img}
            profileImg={classroomData.classroom_profile_img}
            classroomName={classroomData.classroom_name}
            classCode={classroomData.classroom_code}
          />
        </header>
      </section>
    </Fragment>
  );
};

export const loader = async ({ request, params }) => {
  const classId = await params.classId;
  const token = getAuthToken();

  if (!token) {
    return redirect("/login");
  }

  const response = await fetch(
    `${process.env.REACT_APP_HOSTED_URL}/classroom/${classId}`,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );

  if (!response.ok) {
    throw json({ message: "Something went wrong" }, { status: 500 });
  }

  if (response.status === 401) {
    return response;
  }

  return response;
};

export default ClassroomDetail;
