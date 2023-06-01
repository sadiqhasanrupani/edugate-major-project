import React, { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'

const StudentPage = () => {
  const navigate = useNavigate();

  useEffect(() => {
    navigate("/student/classrooms")
  }, [])
}

export default StudentPage