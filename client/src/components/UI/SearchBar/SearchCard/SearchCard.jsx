import React, { useCallback } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";

import styles from "./SearchCard.module.scss";

import { searchAction } from "../../../../store/search-slice";
import shortenString from "../../../../utils/string-shrinker";

import PrimaryCard from "../../../../components/UI/Card/TeacherCard";

const SearchCard = ({
  themeMode,
  name,
  link,
  profileImg,
  classroomName,
  itemName,
  subjectName,
}) => {
  const nameShrinker = shortenString(name, 18);
  const classroomNameShrinker = shortenString(classroomName, 20);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const navigateHandler = useCallback(
    (e) => {
      e.preventDefault();
      navigate(link);
      dispatch(searchAction.closeSearchList());
    },
    [navigate, link, dispatch]
  );

  return (
    <div
      className={`${styles["search-items"]} ${themeMode ? styles.dark : ""}`}
    >
      <PrimaryCard className={styles["primary-card"]}>
        <div className={styles["item-1"]}>
          <img src={profileImg} alt="search-card-img" />
          <div className={styles["names"]}>
            <p className={styles["card-name"]}>
              <Link onClick={navigateHandler}>{nameShrinker}</Link>
            </p>
            {classroomName !== name && (
              <p className={styles["class-name"]}>{classroomNameShrinker}</p>
            )}
          </div>
        </div>
        <div className={styles["item-2"]}>
          <p>{subjectName && shortenString(subjectName, 15)}</p>
          <p>{itemName}</p>
        </div>
      </PrimaryCard>
    </div>
  );
};

export default SearchCard;
