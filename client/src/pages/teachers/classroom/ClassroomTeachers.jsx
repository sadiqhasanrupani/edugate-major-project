import React, { useEffect, useRef, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useLoaderData, useParams, useNavigate } from "react-router-dom";
import { gsap } from "gsap";

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
  //* react-routers hooks
  const data = useLoaderData();
  const navigate = useNavigate();
  const params = useParams();

  //* state
  const [inviteMessage, setInviteMessage] = useState(null);
  const [errorMessage, setErrorMessage] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const refData = useRef({});

  const classId = params.classId;

  useEffect(() => {
    gsap.fromTo(
      ".section",
      { opacity: 0 },
      { opacity: 1, ease: "Linear.easeInOut" }
    );
  });

  //* dispatch
  const dispatch = useDispatch();

  //* Boolean value of TeacherInviteToggler
  const isTeacherInviteForm = useSelector(
    (state) => state.ui.isTeacherInviteFormActive
  );

  const TeacherInviteToggler = (e) => {
    e.preventDefault();

    dispatch(uiAction.viewTeacherInviteFormToggler());
    setErrorMessage(null);
    setIsLoading(false);
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
      setIsLoading(false);
      return response;
    }

    if (!response.ok) {
      setIsLoading(false);
      throw new Error("Something went wrong");
    }

    dispatch(uiAction.viewTeacherInviteFormToggler());

    navigate(`/teacher/classroom/${classId}/teachers`);

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
      <section className={`section ${styles["section"]}`}>
        <div className={styles["teacher-header"]}>
          <h2>Teachers</h2>
          <div>
            <AddBtn
              Icon={AddIcon}
              type={"button"}
              onClick={TeacherInviteToggler}
            >
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
