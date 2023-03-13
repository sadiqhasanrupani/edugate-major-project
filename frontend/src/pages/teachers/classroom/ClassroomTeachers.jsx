import React, { useRef, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useLoaderData, useParams } from "react-router-dom";
import { io } from "socket.io-client";

//* styles
import styles from "../../../scss/components/teacher/subroot/ClassroomTeachers.module.scss";

//* component
import AdminTeacher from "../../../components/teacher/subroot/AdminTeacher";
import CoTeacher from "../../../components/teacher/subroot/CoTeacher";
import AddBtn from "../../../components/UI/Buttons/IconBtn";
import TeacherInviteForm from "../../../components/teacher/Classrooms/TeacherInviteForm";

//* Icon
import AddIcon from "../../../components/UI/Icons/AddBtnOne";

//* model
import FormPortal from "../../../components/model/FormPortal";

//* store
import { uiAction } from "../../../store/ui-slice";

//* utils
import { getAuthToken, verifyToken } from "../../../utils/auth";

const ClassroomTeachers = () => {
  //* connecting the socket
  const socket = io(process.env.REACT_APP_HOSTED_URL);

  const data = useLoaderData();

  //* useStates
  const [inviteMessage, setInviteMessage] = useState(null);
  const [errorMessage, setErrorMessage] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  // const [responseData, setResponseData] = useState(null);

  const refData = useRef({});

  const params = useParams();
  const classId = params.classId;

  //* dispatch
  const dispatch = useDispatch();

  //* Boolean value of TeacherInviteToggler
  const isTeacherInviteForm = useSelector(
    (state) => state.ui.isTeacherInviteFormActive
  );

  const TeacherInviteToggler = () => {
    dispatch(uiAction.viewTeacherInviteFormToggler());
  };

  //* onSubmit function
  const invitationSubmitHandler = async (e) => {
    e.preventDefault();

    setIsLoading(true);

    //* invite data object
    const invitationData = {
      inviteMail: refData.current.inviteMail,
      classId: classId,
    };

    const response = await fetch(
      `${process.env.REACT_APP_HOSTED_URL}/teacher/invite-teacher`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${getAuthToken()}`,
        },
        body: JSON.stringify(invitationData),
      }
    );

    if (response.status === 422 || response.status === 401) {
      setErrorMessage(await response.json());
      return response;
    }

    if (!response.ok) {
      setIsLoading(false);
      throw new Error("Something went wrong");
    }

    dispatch(uiAction.viewTeacherInviteFormToggler());

    setIsLoading(false);
  };

  const getInviteMail = (mail) => {
    refData.current.inviteMail = mail;
  };

  return (
    <>
      {isTeacherInviteForm && (
        <FormPortal
          buttonOnClick={TeacherInviteToggler}
          onBackdrop={TeacherInviteToggler}
          modelTitle={"Invite Teacher"}
          formOnSubmit={invitationSubmitHandler}
        >
          <TeacherInviteForm
            errorMessage={errorMessage}
            inviteMail={getInviteMail}
            isSubmitting={isLoading}
          />
        </FormPortal>
      )}
      {inviteMessage && inviteMessage}
      <section className={styles["section"]}>
        <div className={styles["teacher-header"]}>
          <h2>Teachers</h2>
          <div>
            <AddBtn Icon={AddIcon} onClick={TeacherInviteToggler}>
              Add Teachers
            </AddBtn>
          </div>
        </div>
        <div className={styles["admin-teacher"]}>
          <AdminTeacher adminData={data.adminClassroomData} />
        </div>
        <div className={styles["co-teacher"]}>
          <CoTeacher
            coTeachersData={data.coTeacherClassroomData.joinClassrooms}
          />
        </div>
      </section>
    </>
  );
};

export const loader = async ({ request, params }) => {
  verifyToken();

  const classId = await params.classId;

  const response1 = await fetch(
    `${process.env.REACT_APP_HOSTED_URL}/teacher/get-admin-teacher/${classId}`,
    {
      headers: {
        Authorization: `Bearer ${getAuthToken()}`,
      },
    }
  );

  const response2 = await fetch(
    `${process.env.REACT_APP_HOSTED_URL}/teacher/get-co-teachers/${classId}`,
    {
      headers: {
        Authorization: `Bearer ${getAuthToken()}`,
      },
    }
  );

  const data = {
    adminClassroomData: await response1.json(),
    coTeacherClassroomData: await response2.json(),
  };

  return data;
};

export default ClassroomTeachers;
