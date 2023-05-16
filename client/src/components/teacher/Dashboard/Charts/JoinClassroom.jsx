import React, { useEffect, useState } from "react";

import styles from "./JoinClassroom.module.scss";

//^ components
import LineCharts from "../../../Charts/LineCharts/LineChart";

const JoinClassroom = ({ joinedClassroom, themeMode}) => {

  const joinedClassroomCountByMonth = Array(12).fill(0);

  useEffect(() => {
    joinedClassroom.forEach((classroom) => {
      const joinedAt = new Date(classroom.createdAt);
      const month = joinedAt.getMonth(); // 0-indexed month
      joinedClassroomCountByMonth[month] += 1; // Increment the count for the corresponding month
    });
  }, []);

  //^ states
  const [classroomData, setClassroomData] = useState({
    labels: [
      "January",
      "February",
      "March",
      "April",
      "May",
      "June",
      "July",
      "August",
      "September",
      "October",
      "November",
      "December",
    ],
    datasets: [
      {
        label: "Joined Classroom",
        data: joinedClassroomCountByMonth,
        fill: false,
        borderColor: "#7959FD",
      },
    ],
  });

  return (
    <div className={styles["join-classroom-analysis"]}>
      <LineCharts
        data={classroomData}
        options={{
          scales: {
            y: {
              beginAtZero: true,
              stepSize: 1,
            },
          },
        }}
      />
    </div>
  );
};

export default JoinClassroom;
