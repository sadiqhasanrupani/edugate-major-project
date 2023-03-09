import React from "react";
import { useLoaderData } from "react-router-dom";

//* styles
import styles from "../../../scss/components/teacher/subroot/ClassroomTeachers.module.scss";

//* component
import AdminTeacher from "../../../components/teacher/subroot/AdminTeacher";
import CoTeacher from "../../../components/teacher/subroot/CoTeacher";
import { getAuthToken, verifyToken } from "../../../utils/auth";
import AddBtn from "../../../components/UI/Buttons/IconBtn";

//* Icon
import AddIcon from "../../../components/UI/Icons/AddBtnOne";

const ClassroomTeachers = () => {
  const data = useLoaderData();
  return (
    <>
      <section className={styles["section"]}>
        <div className={styles['teacher-header']}>
          <h2>Teachers</h2>
          <div>
            <AddBtn Icon={AddIcon}>Add Teachers</AddBtn>
          </div>
        </div>
        <div className={styles["admin-teacher"]}>
          <AdminTeacher adminData={data.adminClassroomData} />
        </div>
        <div className={styles["co-teacher"]}>
          <CoTeacher
            coTeachersData={data.coTeacherClassroomData.joinClassrooms}
          />
        </div>
      </section>
    </>
  );
};

export const loader = async ({ request, params }) => {
  verifyToken();

  const classId = await params.classId;

  const response1 = await fetch(
    `${process.env.REACT_APP_HOSTED_URL}/teacher/get-admin-teacher/${classId}`,
    {
      headers: {
        Authorization: `Bearer ${getAuthToken()}`,
      },
    }
  );

  const response2 = await fetch(
    `${process.env.REACT_APP_HOSTED_URL}/teacher/get-co-teachers/${classId}`,
    {
      headers: {
        Authorization: `Bearer ${getAuthToken()}`,
      },
    }
  );

  const data = {
    adminClassroomData: await response1.json(),
    coTeacherClassroomData: await response2.json(),
  };

  return data;
};

export default ClassroomTeachers;
