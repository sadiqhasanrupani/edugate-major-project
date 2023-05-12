import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const TeacherSubject = () => {
  const navigate = useNavigate();

  useEffect(() => {
    navigate("assignment");
  }, []);
  
  return <div>TeacherSubject</div>;
};

export default TeacherSubject;
