import React, { useEffect } from "react";
import { gsap } from "gsap";

const StudentJoinClassOverview = () => {
  //^ Animation useEffect
  useEffect(() => {
    gsap.fromTo(
      `.student-join-classroom-dashboard`,
      { opacity: 0 },
      { opacity: 1, ease: "linear" }
    );
  }, []);

  return (
    <section className={`student-join-classroom-dashboard`}>
      <h1>StudentJoinClassOverview</h1>
    </section>
  );
};

export default StudentJoinClassOverview;
