import { createBrowserRouter } from "react-router-dom";

//* root pages
import RootLayout, { loader as rootLoader } from "./pages/Root/Root";
import TeacherRoot from "./pages/teachers/TeacherRoot";

//* static pages
import Home from "./pages/static/Home";
import About from "./pages/static/About";

//* error pages
import ErrorPage from "./pages/error/Error";

//* auth pages

import Login, { action as loginAction } from "./pages/auth/Login";
import SignUp, { action as signupAction } from "./pages/auth/SignUp";

//* teacher pages
import Teacher, { loader as teacherLoader } from "./pages/teachers/Teacher";
import Dashboard from "./pages/teachers/subroot/Dashboard";
import Classroom, {
  loader as classroomLoader,
} from "./pages/teachers/subroot/Classroom";
import Invitation, {
  loader as invitationLoader,
} from "./pages/teachers/subroot/Invitation";
import AddClassroom from "./pages/teachers/subroot/AddClassroom";
// import Message from "./pages/teachers/subroot/Message";
// import VideoSession from "./pages/teachers/subroot/VideoSession";
// import Schedule from "./pages/teachers/subroot/Schedule";
import Notification, {
  loader as notificationLoader,
} from "./pages/teachers/subroot/Notification";

//* teacher settings
import Setting from "./pages/teachers/subroot/Setting";

//* teacher sub-settings
import ViewProfile from "./pages/teachers/subroot/setting-subroot/ViewProfile.jsx";
import EditProfile, {
  loader as editProfileLoader,
  action as editProfileAction,
} from "./pages/teachers/subroot/setting-subroot/EditProfile.jsx";
import PrivacyAndSecurity from "./pages/teachers/subroot/setting-subroot/PrivacyAndSecurity.jsx";

//* student pages
import Student, { loader as studentLoader } from "./pages/students/Student";

//* Classroom pages

import ClassroomDetailRoot, {
  loader as classroomDetailRootLoader,
} from "./pages/teachers/classroom/Root/ClassroomRoot";

import TeacherClassroom from "./pages/teachers/classroom/TeacherClassroom.jsx"

import ClassroomOverview, {
  loader as classroomOverviewLoader,
} from "./pages/teachers/classroom/ClassroomOverview";
import ClassroomSubjects, {
  action as classroomSubjectAction,
  loader as classroomSubjectLoader,
} from "./pages/teachers/classroom/ClassroomSubjects";
import ClassroomTeachers, {
  loader as classroomTeachersLoader,
} from "./pages/teachers/classroom/ClassroomTeachers";
import ClassroomStudents, {
  loader as classroomStudentsLoader,
} from "./pages/teachers/classroom/ClassroomStudents";
// import ClassroomMessages from "./pages/teachers/classroom/ClassroomMessages";
// import ClassroomVideoSessions from "./pages/teachers/classroom/ClassroomVideoSessions";
// import ClassroomSchedule from "./pages/teachers/classroom/ClassroomSchedules";
import ClassroomSettings from "./pages/teachers/classroom/ClassroomSettings";

//* Teacher Settings
import TeacherSettings from "./pages/teachers/classroom/subroot/TeacherSettings.jsx";

//* Teacher Settings subroot pages
import TeacherViewProfile from "./pages/teachers/classroom/subroot/TeacherSettings/subroot/TeacherViewProfile";
// import TeacherEditProfile from "./pages/teachers/classroom/subroot/TeacherSettings/subroot/TeacherEditProfile";
import TeacherPrivacyAndSecurity from "./pages/teachers/classroom/subroot/TeacherSettings/subroot/TeacherPrivacyAndSecurity";

//* Create Classroom
import CreateClassroom, {
  action as CreateClassroomAction,
  loader as createClassroomLoader,
} from "./pages/teachers/subroot/CreateClassroom";

//* pages/JoinClassroom
import JoinClassroomRoot, {
  loader as joinClassroomRootLoader,
} from "./pages/teachers/JoinClassroom/JoinClassroomRoot";
import JoinClassroomOverview, {
  loader as joinClassroomOverviewLoader,
} from "./pages/teachers/JoinClassroom/JoinClassroomOverview";
import JoinClassroomSubject from "./pages/teachers/JoinClassroom/JoinClassroomSubject.jsx";
import JoinClassroomTeacher from "./pages/teachers/JoinClassroom/JoinClassroomTeacher.jsx";
import JoinClassroomStudent from "./pages/teachers/JoinClassroom/JoinClassroomStudent.jsx";
// import JoinClassroomMessage from "./pages/teachers/JoinClassroom/JoinClassroomMessage.jsx";
// import JoinClassroomSchedule from "./pages/teachers/JoinClassroom/JoinClassroomSchedule.jsx";
import JoinClassroomSetting from "./pages/teachers/JoinClassroom/JoinClassroomSetting.jsx";

//* Teacher Subject page
import SubjectRoot, {
  loader as subjectRootLoader,
} from "./pages/teachers/subject/Root/SubjectRoot";
//* Teacher subject/subroot Pages
import TeacherSubjectPeoples, {
  loader as teacherSubjectPeoplesLoader,
} from "./pages/teachers/subject/subroot/TeacherSubjectPeoples";
import SubjectAssignments from "./pages/teachers/subject/subroot/SubjectAssignments";
import TeacherSubjectResources from "./pages/teacher/subject/subroot/TeacherSubjectResources";
import TeacherSubjectQuiz from "./pages/teacher/subject/subroot/TeacherSubjectQuiz";
import TeacherSubjectAttendance from "./pages/teacher/subject/subroot/TeacherSubjectAttendance";
// import TeacherSubjectVideoSession from "./pages/teacher/subject/subroot/TeacherSubjectVideoSession";
// import TeacherSubjectSchedule from "./pages/teacher/subject/subroot/TeacherSubjectSchedule";

//* Student Page
import StudentRoot, {
  loader as studentRootLoader,
} from "./pages/students/Root/StudentRoot";
//^ student subroot
import StudentDashboard from "./pages/students/subroot/StudentDashboard";
import StudentClassroom, {
  loader as studentClassroomLoader,
} from "./pages/students/subroot/StudentClassroom";
import StudentMessages from "./pages/students/subroot/StudentMessage";
// import StudentSchedule from "./pages/students/subroot/StudentSchedule";
import StudentSettings from "./pages/students/subroot/StudentSettings";
import StudentNotification, {
  loader as studentNotificationLoader,
} from "./pages/students/subroot/StudentNotification";

//* Student join-classroom pages
import StudentJoinClassRoot, {
  loader as studentJoinClassRootLoader,
} from "./pages/students/join-classroom/root-layout/StudentJoinClassRoot";
import StudentJoinClassOverview, {
  loader as studentJoinClassOverviewLoader,
} from "./pages/students/join-classroom/subroot/StudentJoinClassOverview";
import StudentJoinClassPeoples from "./pages/students/join-classroom/subroot/StudentJoinClassPeoples";
import StudentJoinClassSubject from "./pages/students/join-classroom/subroot/StudentJoinClassSubject";
// import StudentJoinClassMessages from "./pages/students/join-classroom/subroot/StudentJoinClassMessages";
// import StudentJoinClassSchedules from "./pages/students/join-classroom/subroot/StudentJoinClassSchedules";
import StudentJoinClassSettings from "./pages/students/join-classroom/subroot/StudentJoinClassSettings";

const router = createBrowserRouter([
  {
    path: "/",
    element: <RootLayout />,
    errorElement: <ErrorPage />,
    loader: rootLoader,
    children: [
      { index: true, element: <Home /> },
      { path: "about", element: <About /> },
    ],
  },
  {
    path: "/login",
    element: <Login />,
    errorElement: <ErrorPage />,
    action: loginAction,
  },
  {
    path: "/signup",
    element: <SignUp />,
    errorElement: <ErrorPage />,
    action: signupAction,
  },
  //^ Teacher page
  {
    path: "/teacher",
    element: <TeacherRoot />,
    errorElement: <ErrorPage />,
    id: "teacher-loader",
    loader: teacherLoader,
    children: [
      { index: true, element: <Teacher /> },
      { path: "dashboard", element: <Dashboard /> },
      { path: "add-classroom", element: <AddClassroom /> },
      {
        path: "classroom",
        element: <Classroom />,
        loader: classroomLoader,
        id: "classroom-loader",
      },
      {
        path: "invitation",
        element: <Invitation />,
        loader: invitationLoader,
      },
      {
        path: "notification",
        element: <Notification />,
        loader: notificationLoader,
      },
      {
        path: "setting",
        children: [
          { index: true, element: <Setting /> },
          { path: "view-profile", element: <ViewProfile /> },
          {
            path: "edit-profile",
            element: <EditProfile />,
            loader: editProfileLoader,
            action: editProfileAction,
          },
          { path: "privacy", element: <PrivacyAndSecurity /> },
        ],
      },
    ],
  },
  //^ teacher/classroom
  {
    path: "/teacher/classroom/:classId",
    element: <ClassroomDetailRoot />,
    loader: classroomDetailRootLoader,
    id: "classroom-root-loader",
    errorElement: <ErrorPage />,
    children: [
      {index: true, element: <TeacherClassroom />},
      {
        path: "overview",
        element: <ClassroomOverview />,
        loader: classroomOverviewLoader,
      },
      {
        path: "subjects",
        element: <ClassroomSubjects />,
        action: classroomSubjectAction,
        loader: classroomSubjectLoader,
        id: "class-subject-loader",
      },
      {
        path: "teachers",
        element: <ClassroomTeachers />,
        loader: classroomTeachersLoader,
      },
      {
        path: "students",
        element: <ClassroomStudents />,
        loader: classroomStudentsLoader,
      },
      // { path: "messages", element: <ClassroomMessages /> },
      // { path: "video-sessions", element: <ClassroomVideoSessions /> },
      // { path: "schedule", element: <ClassroomSchedule /> },
      { path: "setting", element: <ClassroomSettings /> },
      {
        path: "teacher-setting",
        children: [
          { index: true, element: <TeacherSettings /> },
          { path: "view-profile", element: <TeacherViewProfile /> },
          {
            path: "edit-profile",
            element: <EditProfile />,
            loader: editProfileLoader,
            action: editProfileAction,
          },
          { path: "privacy", element: <TeacherPrivacyAndSecurity /> },
        ],
      },
    ],
  },

  //^ join-teacher-page.
  {
    path: "/teacher/join-classroom/:joinClassroomId",
    element: <JoinClassroomRoot />,
    errorElement: <ErrorPage />,
    loader: joinClassroomRootLoader,
    children: [
      {
        index: true,
        element: <JoinClassroomOverview />,
        loader: joinClassroomOverviewLoader,
      },
      {
        path: "overview",
        element: <JoinClassroomOverview />,
        loader: joinClassroomOverviewLoader,
      },
      { path: "subjects", element: <JoinClassroomSubject /> },
      { path: "teachers", element: <JoinClassroomTeacher /> },
      { path: "students", element: <JoinClassroomStudent /> },
      // { path: "messages", element: <JoinClassroomMessage /> },
      // { path: "schedule", element: <JoinClassroomSchedule /> },
      { path: "setting", element: <JoinClassroomSetting /> },
    ],
  },
  //^ create classroom.
  {
    path: "/create-classroom",
    element: <CreateClassroom />,
    action: CreateClassroomAction,
    loader: createClassroomLoader,
  },
  //^ teacher/subjects.
  {
    path: "/teacher/subject/:subjectId",
    element: <SubjectRoot />,
    errorElement: <ErrorPage />,
    loader: subjectRootLoader,
    id: "teacher-subject-root-loader",
    children: [
      {
        path: "add-peoples",
        element: <TeacherSubjectPeoples />,
        loader: teacherSubjectPeoplesLoader,
      },
      {
        path: "assignment",
        element: <SubjectAssignments />,
      },
      {
        path: "resources",
        element: <TeacherSubjectResources />,
      },
      { path: "quiz", element: <TeacherSubjectQuiz /> },
      { path: "attendance", element: <TeacherSubjectAttendance /> },
      // { path: "video-session", element: <TeacherSubjectVideoSession /> },
      // { path: "schedule", element: <TeacherSubjectSchedule /> },
    ],
  },
  //^ Student page.
  {
    path: "/student",
    element: <StudentRoot />,
    errorElement: <ErrorPage />,
    loader: studentLoader,
    children: [
      { path: "dashboard", element: <StudentDashboard /> },
      {
        path: "classrooms",
        element: <StudentClassroom />,
        loader: studentClassroomLoader,
      },
      { path: "messages", elements: <StudentMessages /> },
      // { path: "schedule", element: <StudentSchedule /> },
      {
        path: "notifications",
        element: <StudentNotification />,
        loader: studentNotificationLoader,
      },
      { path: "settings", element: <StudentSettings /> },
    ],
  },
  //^ Student join classroom page
  {
    path: "/student/join-classroom/:joinClassId",
    element: <StudentJoinClassRoot />,
    errorElement: <ErrorPage />,
    loader: studentJoinClassRootLoader,
    children: [
      {
        path: "overview",
        element: <StudentJoinClassOverview />,
        loader: studentJoinClassOverviewLoader,
      },
      { path: "subject", element: <StudentJoinClassSubject /> },
      { path: "peoples", element: <StudentJoinClassPeoples /> },
      // { path: "messages", element: <StudentJoinClassMessages /> },
      // { path: "schedules", element: <StudentJoinClassSchedules /> },
      { path: "settings", element: <StudentJoinClassSettings /> },
    ],
  },
]);

export default router;
