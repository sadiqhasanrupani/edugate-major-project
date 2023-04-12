import { Fragment, useState } from "react";

import styles from "../../../scss/components/teacher/subject/RoleList.module.scss";

import ClassroomMember from "./ClassroomMember";

const RoleList = ({ teachers, students, themeMode, onRoleList }) => {
  //^ state to keep track of selected member ids
  const [selectedMemberIds, setSelectedMemberIds] = useState([]);

  //^ function to update the selected members
  const updateSelectedMembers = (memberId, isSelected) => {
    if (isSelected) {
      setSelectedMemberIds([...selectedMemberIds, memberId]);
    } else {
      setSelectedMemberIds(selectedMemberIds.filter((id) => id !== memberId));
    }
  };

  onRoleList(selectedMemberIds);

  return (
    <>
      <div className={`${styles["role-list"]} ${themeMode && styles["dark"]}`}>
        {teachers &&
          teachers.map((teacher) => {
            //^ extracting member data from teacher object
            const memberId = teacher.coTeacher.teacher_id;
            const memberImg = teacher.coTeacher.teacher_img;
            const memberFullName = `${teacher.coTeacher.teacher_first_name} ${teacher.coTeacher.teacher_last_name}`;

            //^ checking if the member is selected
            const isSelected = selectedMemberIds.includes(memberId);

            return (
              <Fragment key={memberId}>
                {/* rendering ClassroomMember component */}
                <ClassroomMember
                  memberId={memberId}
                  memberImg={memberImg}
                  memberFullName={memberFullName}
                  selected={isSelected}
                  onSelect={(isSelected) =>
                    updateSelectedMembers(memberId, isSelected)
                  }
                />
              </Fragment>
            );
          })}

        {students &&
          students.map((student) => {
            //^ extracting member data from teacher object
            const memberId = student.student.student_id;
            const memberImg = student.student.student_img;
            const memberFullName = `${student.student.student_first_name} ${student.student.student_last_name}`;

            //^ checking if the member is selected
            const isSelected = selectedMemberIds.includes(memberId);

            return (
              <Fragment key={memberId}>
                <ClassroomMember
                  memberId={memberId}
                  memberImg={memberImg}
                  memberFullName={memberFullName}
                  selected={isSelected}
                  onSelect={(isSelected) =>
                    updateSelectedMembers(memberId, isSelected)
                  }
                />
              </Fragment>
            );
          })}
      </div>
    </>
  );
};

export default RoleList;
