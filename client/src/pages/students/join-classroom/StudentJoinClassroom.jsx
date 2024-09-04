import React, { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'

const StudentJoinClassroom = () => {

  const navigate = useNavigate();
  useEffect(() => {
    navigate("overview")
  }, [])

  return (
    <div>StudentJoinClassroom</div>
  )
}

export default StudentJoinClassroom