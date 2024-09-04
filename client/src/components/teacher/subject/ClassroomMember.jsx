import React from "react";

import styles from "../../../scss/components/teacher/subject/ClassroomMember.module.scss";

const ClassroomMember = ({
  memberImg,
  memberFullName,
  memberId,
  selected,
  onSelect,
}) => {
  //^ on change handler to update the selected state
  const checkChangeHandler = (e) => {
    const isSelected = e.target.checked;
    onSelect(isSelected);
  };

  return (
    <>
      {/* rendering input element with onChange and checked props */}
      <input
        type="checkbox"
        id={memberId}
        onChange={checkChangeHandler}
        checked={selected}
      />
      {/* rendering label element with className and htmlFor props*/}
      <label
        htmlFor={memberId}
        className={`${styles["classroom-members"]} ${
          selected && styles["checked"]
        }`}
      >
        <img src={memberImg} alt="member's img" />
        <p>{memberFullName}</p>
      </label>
    </>
  );
};

export default ClassroomMember;
