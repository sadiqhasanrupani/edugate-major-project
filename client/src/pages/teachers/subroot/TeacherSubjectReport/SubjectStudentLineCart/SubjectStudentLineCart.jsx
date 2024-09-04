import LineCharts from "../../../../../components/Charts/LineCharts/LineChart";

const SubjectStudentLineChart = ({ studentsData }) => {
  // Prepare data for the line chart
  const data = {
    labels: [studentsData.map((student) => student.createdAt)],
    datasets: [
      {
        label: "Students Joined",
        data: studentsData.map((student, index) => index + 1),
        fill: false,
        borderColor: "rgb(75, 192, 192)",
        tension: 0.1,
      },
    ],
  };

  return (
    <div>
      <h2>Student Line Chart</h2>
      <LineCharts data={data} />
    </div>
  );
};

export default SubjectStudentLineChart;
