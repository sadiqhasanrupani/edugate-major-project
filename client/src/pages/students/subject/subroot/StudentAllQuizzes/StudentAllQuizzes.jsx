import React from 'react'

import styles from "./StudentAllQuizzes.module.scss"

const StudentAllQuizzes = () => {
  return (
    <section className={styles['student-all-quizzes']}>
      StudentAllQuizzes
    </section>
  )
}

export const loader = async({ request, params }) => {
  return null;
}

export default StudentAllQuizzes