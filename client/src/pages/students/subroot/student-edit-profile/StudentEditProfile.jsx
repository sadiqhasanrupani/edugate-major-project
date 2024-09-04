import React, { useEffect } from "react";
import { useRouteLoaderData, Form, json, redirect } from "react-router-dom";
import { useSelector } from "react-redux";
import { gsap } from "gsap";

import styles from "./StudentEditProfile.module.scss";

//^ component
import StudentFormHeader from "./form-content/StudentFormHeader";
import StudentFormFooter from "./form-content/StudentFormFooter";

//^ auth
import { getAuthToken } from "../../../../utils/auth";

const StudentEditProfile = () => {
  const themeMode = useSelector((state) => state.ui.isDarkMode);

  //^ student-root-loader data
  const { student } = useRouteLoaderData("student-root-loader");

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
        <Form
          method="POST"
          action="/student/edit-profile"
          encType="multipart/form-data"
        >
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

  const formData = new FormData();

  formData.append("image", data.get("student-updated-image"));
  formData.append("firstName", data.get("user-first-name"));
  formData.append("lastName", data.get("user-last-name"));
  formData.append("dob", data.get("user-dob"));
  formData.append("phone", data.get("user-phone"));
  formData.append("email", data.get("user-email"));
  formData.append("bio", data.get("user-bio"));

  const postUpdateStudentData = await fetch(
    `${process.env.REACT_APP_HOSTED_URL}/student/update-profile`,
    {
      method: "POST",
      headers: {
        Authorization: `Bearer ${getAuthToken()}`,
      },
      body: formData,
    }
  );

  if (postUpdateStudentData.status === 401) {
    const response = await postUpdateStudentData.json();
    throw json(
      { message: response.message },
      { status: postUpdateStudentData.status }
    );
  }

  if (!postUpdateStudentData.ok) {
    throw json({ message: "Internal server error" }, { status: 500 });
  }

  return redirect(`/student/classrooms`);
};

export default StudentEditProfile;
