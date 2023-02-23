import React from "react";
import { useRouteLoaderData } from "react-router-dom";

import styles from "../../scss/components/teacher/TeacherMainNav.module.scss";

// components
import SearchBar from "../UI/SearchBar/SearchBar";
import ClassroomBtn from "../UI/Buttons/IconBtn";
import AddBtnOne from "../UI/Icons/AddBtnOne";
import LightMode from "../UI/Icons/LightMode";
import Settings from "../UI/Icons/Settings";

const TeacherMainNav = ({ message }) => {
  const { user } = useRouteLoaderData("teacher-loader");
  console.log(user);
  return (
    <>
      <nav className={styles.nav}>
        <div className={styles["greet-msg"]}>
          <h4>Hii {message},</h4>
          <h5>Welcome back!</h5>
        </div>
        <div>
          <SearchBar />
        </div>
        <div>
          <ClassroomBtn type={"button"} Icon={AddBtnOne}>
            New Classroom
          </ClassroomBtn>
        </div>
        <div className={styles['theme-mode']} >
          <LightMode />
        </div>
        <div className={styles['settings']} >
          <Settings />
        </div>
        <div className={styles['user-img']} >
          <img
            src={
              user.userImg
                ? user.userImg
                : `https://cdn.pixabay.com/photo/2016/08/08/09/17/avatar-1577909_1280.png`
            }
            alt=""
          />
        </div>
      </nav>
    </>
  );
};

export default TeacherMainNav;
