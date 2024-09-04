import React, { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'

const StudentSubject = () => {
  const navigate = useNavigate();
  useEffect(() => {
    navigate("assignment")
  }, [])
  
  return (
    <div>StudentSubject</div>
  )
}

export default StudentSubject