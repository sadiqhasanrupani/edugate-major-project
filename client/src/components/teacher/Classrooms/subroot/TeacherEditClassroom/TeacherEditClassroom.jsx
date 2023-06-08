import React, { useCallback, useState } from "react";
import { useParams } from "react-router-dom";

import styles from "./TeacherEditClassroom.module.scss";

//^ auth
import { getAuthToken } from "../../../../../utils/auth";

//^ components
import ClassroomImages from "./ClassroomImages/ClassroomImages";
import ClassroomName from "./ClassroomName/ClassroomName";
import PrimaryBtn from "../../../../UI/Buttons/PrimaryBtn";
import LoadingWheel from "../../../../UI/loading/LoadingWheel";
import NewErrorModel from "../../../../model/error-model/newErrorMode/NewErrorMode";
import NewSuccessModel from "../../../../model/success-model/new-success-mode/NewSuccessModel";

const TeacherEditClassroom = ({ classroomData, themeMode }) => {
  const [nameIsValid, setNameIsValid] = useState(null);
  const [classroomName, setClassroomName] = useState(null);
  const [classroomBannerImg, setClassroomBannerImg] = useState(null);
  const [classroomProfileImg, setClassroomProfileImg] = useState(null);

  //^ request states
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errorResponseMsg, setErrorResponseMsg] = useState(null);
  const [responseMsg, setResponseMsg] = useState(null);

  //& getting the class id params from the current route using useParams hook
  const { classId } = useParams();

  //^ An async function handler which will submit the updated changes to the backend.
  const postEditClassroomHandler = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    const formData = new FormData();

    console.log(classroomName);

    formData.append("classroomName", classroomName);
    formData.append("classroomId", classId);
    classroomBannerImg && formData.append("bannerImg", classroomBannerImg);
    classroomProfileImg && formData.append("profileImg", classroomProfileImg);

    const postEditClassroom = await fetch(
      `${process.env.REACT_APP_HOSTED_URL}/classroom/update-classroom`,
      {
        method: "POST",
        headers: {
          Authorization: `Bearer ${getAuthToken()}`,
        },
        body: formData,
      }
    );

    if (
      postEditClassroom.status === 401 ||
      postEditClassroom.status === 400 ||
      postEditClassroom.status === 403
    ) {
      setIsSubmitting(false);
      const response = await postEditClassroom.json();

      setErrorResponseMsg({ message: response.message });
      return;
    }

    if (!postEditClassroom.ok) {
      setIsSubmitting(false);
      setErrorResponseMsg({ message: "Internal server error" });
      return;
    }

    setIsSubmitting(false);

    const response = await postEditClassroom.json();

    setResponseMsg({ message: response.message });
  };

  //^ handler to get the data from the classroom images component
  const getClassroomImagesData = useCallback(
    (data) => {
      setClassroomBannerImg(data.bannerImageData);
      setClassroomProfileImg(data.profileImageData);
    },
    [setClassroomBannerImg, setClassroomProfileImg]
  );

  //^ handler to get the data from the classroom name component
  const getClassroomNameData = useCallback(
    (data) => {
      setNameIsValid(data.isValid);
      setClassroomName(data.className);
    },
    [setNameIsValid, setClassroomName]
  );

  //^ if any of the validations are true then the below formIsValid constant will be "true".
  const formIsValid = nameIsValid || classroomBannerImg || classroomProfileImg;

  //^ close error model handler
  const closeErrorModelHandler = () => {
    setErrorResponseMsg(null);
    setResponseMsg(null);
  };

  return (
    <>
      {responseMsg && (
        <NewSuccessModel onCloseBtn={closeErrorModelHandler}>
          {responseMsg.message}
        </NewSuccessModel>
      )}
      {errorResponseMsg && (
        <NewErrorModel onCloseBtn={closeErrorModelHandler}>
          {errorResponseMsg && errorResponseMsg.message}
        </NewErrorModel>
      )}
      <div
        className={`${styles["edit-classroom"]} ${themeMode && styles.dark}`}
      >
        <form onSubmit={postEditClassroomHandler}>
          <div className={styles["classroom-images"]}>
            <ClassroomImages
              themeMode={themeMode}
              classroomBannerImg={classroomData.classroom_banner_img}
              classroomProfileImg={classroomData.classroom_profile_img}
              onClassroomImages={getClassroomImagesData}
            />
          </div>
          <div className={styles["classroom-name"]}>
            <ClassroomName
              themeMode={themeMode}
              onClassroomName={getClassroomNameData}
              classroomName={classroomData.classroom_name}
            />
          </div>
          <div className={styles["primary-btn-div"]}>
            <PrimaryBtn
              disabled={!formIsValid || isSubmitting}
              className={styles["primary-button"]}
            >
              {isSubmitting ? <LoadingWheel /> : "Update"}
            </PrimaryBtn>
          </div>
        </form>
      </div>
    </>
  );
};

export default TeacherEditClassroom;
