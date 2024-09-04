import ReactPDF, {
  Document,
  Page,
  StyleSheet,
  View,
  Text,
  Font
} from "@react-pdf/renderer";

import MontserratMedium from "../../../../../assets/fonts/montserrat/Montserrat-Medium.ttf";

import formattedDateTime from "../../../../../utils/formatted-date-time";

Font.register({
  family: "Montserrat-Medium",
  src: MontserratMedium,
});

const styles = StyleSheet.create({
  assignmentTable: {
    display: "flex",
    flexDirection: "column",
    marginBottom: "2rem",
  },
  tableHeading: {
    display: "grid",
    gridTemplateColumns: "repeat(8, 1fr)",
  },
  tableRow: {
    display: "flex",
    justifyContent: "center",
    alignItems: "flex-start",
    padding: "1rem 0rem 1rem 0rem",
    backgroundColor: "#000",
    color: "#fff",
    maxHeight: "5rem",
    overflowY: "scroll",
  },
  tableContent: {
    display: "flex",
    flexDirection: "column",
  },
  tableData: {
    display: "grid",
    gridTemplateColumns: "repeat(8, 1fr)",
    padding: "1rem",
  },
  data: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    fontFamily: "Montserrat-Medium",
    fontSize: "1rem",
    overflowX: "scroll",
  },
});

const JoinTeacherClassroomReportTable = ({ teachersData, HEADING_ITEMS, HEADING_ITEMS_TWO }) => {
  const renderTable = () => {
    return (
      <View style={styles.assignmentTable}>
        <View style={styles.tableHeading}>
          {HEADING_ITEMS.map((item) => (
            <View key={item.id} style={styles.tableRow}>
              <Text>{item.title}</Text>
            </View>
          ))}
        </View>
        <View style={styles.tableContent}>
          {teachersData.map((teacher) => {
            const joinedDate = formattedDateTime(
              teacher.coTeacher.createdAt
            );
            return (
              <View key={teacher.teacher_id} style={styles.tableData}>
                <View style={styles.data}>
                  <Text>{teacher.teacher_id}</Text>
                </View>
                <View style={styles.data}>
                  <Text>{teacher.coTeacher.teacher_first_name}</Text>
                </View>
                <View style={styles.data}>
                  <Text>{teacher.coTeacher.teacher_last_name}</Text>
                </View>
                <View style={styles.data}>
                  <Text>{teacher.coTeacher.teacher_email}</Text>
                </View>
                <View style={styles.data}>
                  <Text>{teacher.coTeacher.teacher_phone_no}</Text>
                </View>
                <View style={styles.data}>
                  <Text>{teacher.coTeacher.teacher_dob}</Text>
                </View>
                <View style={styles.data}>
                  <Text>{joinedDate}</Text>
                </View>
              </View>
            );
          })}
        </View>
      </View>
    );
  };

  return (
    <Document>
      <Page>{renderTable()}</Page>
    </Document>
  );
};

export default JoinTeacherClassroomReportTable;