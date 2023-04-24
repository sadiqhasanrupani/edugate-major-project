import React, { useEffect } from 'react'
import { useNavigate, useRouteLoaderData } from 'react-router-dom'

const TeacherClassroom = () => {
  const navigate = useNavigate();

  const { classroomData } = useRouteLoaderData("classroom-root-loader");

  const { classroomData: classroom } = classroomData;

  
  useEffect(() => {
    navigate(`/teacher/classroom/${classroom.classroom_id}/overview`)
  },[])

  return (
    <div>TeacherClassroom</div>
  )
}

export default TeacherClassroom