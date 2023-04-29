import React from "react";
import { Outlet } from "react-router-dom";

const StudentSubjectRoot = () => {
  return (
    <>
      <div>StudentSubjectRoot</div>
      <Outlet />
    </>
  );
};

export default StudentSubjectRoot;
