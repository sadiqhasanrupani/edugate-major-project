//* dependencies
import { useEffect } from "react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";

//* root pages
import RootLayout, { loader, loader as rootLoader } from "./pages/Root/Root";
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
import AddClassroom from "./pages/teachers/subroot/AddClassroom";
import Message from "./pages/teachers/subroot/Message";
import VideoSession from "./pages/teachers/subroot/VideoSession";
import Schedule from "./pages/teachers/subroot/Schedule";
import Setting from "./pages/teachers/subroot/Setting";

//* student pages
import Student, { loader as studentLoader } from "./pages/students/Student";

//* Classroom pages

import ClassroomDetailRoot, {
  loader as classroomDetailRootLoader,
} from "./pages/teachers/classroom/Root/ClassroomRoot";

import ClassroomOverview, {
  loader as classroomOverviewLoader,
} from "./pages/teachers/classroom/ClassroomOverview";
import ClassroomSubjects, {
  action as classroomSubjectAction,
  loader as classroomSubjectLoader,
} from "./pages/teachers/classroom/ClassroomSubjects";
import ClassroomTeachers from "./pages/teachers/classroom/ClassroomTeachers";
import ClassroomStudents from "./pages/teachers/classroom/ClassroomStudents";
import ClassroomMessages from "./pages/teachers/classroom/ClassroomMessages";
import ClassroomVideoSessions from "./pages/teachers/classroom/ClassroomVideoSessions";
import ClassroomSchedule from "./pages/teachers/classroom/ClassroomSchedules";
import ClassroomSettings from "./pages/teachers/classroom/ClassroomSettings";

//* Create Classroom
import CreateClassroom, {
  action as CreateClassroomAction,
  loader as createClassroomLoader,
} from "./pages/teachers/subroot/CreateClassroom";

//* Join Classroom
import JoinClassroom, {
  loader as joinClassroomLoader,
} from "./pages/teachers/subroot/JoinClassroom";

//* Subject page
import SubjectRoot, { loader as subjectRootLoader } from "./pages/teachers/subject/Root/SubjectRoot.jsx"

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
      { path: "message", element: <Message /> },
      { path: "video-session", element: <VideoSession /> },
      { path: "schedule", element: <Schedule /> },
      { path: "setting", element: <Setting /> },
    ],
  },
  {
    path: "/teacher/classroom/:classId",
    element: <ClassroomDetailRoot />,
    loader: classroomDetailRootLoader,
    id: "classroom-root-loader",
    errorElement: <ErrorPage />,
    children: [
      {
        index: true,
        element: <ClassroomOverview />,
        loader: classroomOverviewLoader,
        id: "classroom-overview",
      },
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
        id: "class-subject-loader"
      },
      { path: "teachers", element: <ClassroomTeachers /> },
      { path: "students", element: <ClassroomStudents /> },
      { path: "messages", element: <ClassroomMessages /> },
      { path: "video-sessions", element: <ClassroomVideoSessions /> },
      { path: "schedule", element: <ClassroomSchedule /> },
      { path: "setting", element: <ClassroomSettings /> },
    ],
  },
  {
    path: "/create-classroom",
    element: <CreateClassroom />,
    action: CreateClassroomAction,
    loader: createClassroomLoader,
  },
  {
    path: "/join-classroom",
    element: <JoinClassroom />,
    errorElement: <ErrorPage />,
    loader: joinClassroomLoader,
  },
  { 
    path: "/teacher/subject/:subjectId",
    element: <SubjectRoot />,
    errorElement: <ErrorPage />,
    loader: subjectRootLoader,
    id: "subject-root-loader"
  },
  {
    path: "/student",
    element: <Student />,
    errorElement: <ErrorPage />,
    loader: studentLoader,
  },
]);

const App = () => {
  const themeMode = JSON.parse(localStorage.getItem("theme"));
  useEffect(() => {
    if (themeMode) {
      document.body.className = "dark-theme";
    } else {
      document.body.className = "light-theme";
    }
  }, [themeMode]);
  return <RouterProvider router={router} />;
};

export default App;
