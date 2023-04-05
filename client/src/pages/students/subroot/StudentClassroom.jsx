import React from "react";

import StudentJoinClassroom from "../../../components/student/subroot/StudentJoinClassroom.jsx";

const StudentClassroom = () => {
  return (
    <>
      <section>
        <StudentJoinClassroom />
      </section>
    </>
  );
};

export const loader = async ({ request, params }) => {
  return null;
};

export default StudentClassroom;
