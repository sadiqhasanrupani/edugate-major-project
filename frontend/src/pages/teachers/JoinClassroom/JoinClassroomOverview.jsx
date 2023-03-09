import React, { Fragment } from "react";
import { useLoaderData } from "react-router-dom";

import styles from "../../../scss/pages/teacher/join-classroom/JoinClassroomOverview.module.scss"

//* components
import ClassroomProfile from "../../../components/classroom/ClassroomProfile";

//* utils
import { getAuthToken } from "../../../utils/auth";

const JoinClassroomOverview = () => {
  const data = useLoaderData();
  const { classData } = data;
  console.log(classData);
  return (
    <Fragment>
      <section className={styles["section"]}>
        <header className={styles["classroom-profile"]}>
          <ClassroomProfile
            bannerImg={classData.classroom_banner_img}
            profileImg={classData.classroom_profile_img}
            classroomName={classData.classroom_name}
            classCode={classData.classroom_code}
          />
        </header>
      </section>
    </Fragment>
  );
};

export const loader = async ({ request, params }) => {
  const joinClassId = await params.joinClassroomId;
  const token = getAuthToken();

  if (!token) {
    return redirect("/login");
  }

  const response = await fetch(
    `${process.env.REACT_APP_HOSTED_URL}/joinClassroom/${joinClassId}`,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );

  if (!response.ok) {
    throw json({ message: "Something went wrong" }, { status: 500 });
  }

  return response;
};

export default JoinClassroomOverview;
