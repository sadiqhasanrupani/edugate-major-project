import React from 'react'

import styles from "../../../scss/pages/students/subroot/StudentNotification.module.scss"

const StudentNotification = () => {
  return (
    <section className={styles['section']} >
      <h1>Student Notifications</h1>
    </section>
  )
}

export const loader = async({ request, params }) => {
  return null;
}

export default StudentNotification