import React, { useEffect, useState } from "react";
import { gsap } from "gsap";

//^ styles
import styles from "../../../../scss/pages/student/join-classroom/StudentJoinClassSubject.module.scss";

const StudentJoinClassSubject = () => {
  //^ Animation useEffect.
  useEffect(() => {
    gsap.fromTo(
      ".student-subject-join-classroom",
      { opacity: 0 },
      { opacity: 1, ease: "linear" }
    );
  }, []);

  return (
    <section className={`student-subject-join-classroom`}>
      <h1>Student Subjects</h1>
    </section>
  );
};

export default StudentJoinClassSubject;
