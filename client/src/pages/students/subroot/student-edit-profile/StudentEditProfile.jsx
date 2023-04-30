import React, { useEffect } from "react";
import { useRouteLoaderData, Form, redirect } from "react-router-dom";
import { useSelector } from "react-redux";
import { gsap } from "gsap";

import styles from "./StudentEditProfile.module.scss";

//^ component
import StudentFormHeader from "./form-content/StudentFormHeader";
import StudentFormFooter from "./form-content/StudentFormFooter";

const StudentEditProfile = () => {
  const themeMode = useSelector((state) => state.ui.isDarkMode);

  //^ student-root-loader data
  const { student } = useRouteLoaderData("student-root-loader");
  console.log(student);

  useEffect(() => {
    gsap.fromTo(
      ".student-edit-profile-article",
      { opacity: 0 },
      { opacity: 1, ease: "power6" }
    );
  }, []);

  return (
    <>
      <article
        className={`student-edit-profile-article ${styles["article"]} ${
          themeMode && styles["dark"]
        }`}
      >
        <Form method="POST" action="/student/edit-profile">
          <StudentFormHeader studentImg={student.student_img} />
          <div className={styles["profile-input-form"]}>
            <StudentFormFooter
              studentFirstName={student.student_first_name}
              studentLastName={student.student_last_name}
              studentDOB={student.student_dob}
              studentEmailID={student.student_email}
              studentBio={student.student_bio}
              studentPhone={student.student_phone_number}
            />
          </div>
        </Form>
      </article>
    </>
  );
};

export const action = async ({ request, params }) => {
  const data = await request.formData();

  console.log(data);

  return redirect("/student/edit-profile");
};

export default StudentEditProfile;
