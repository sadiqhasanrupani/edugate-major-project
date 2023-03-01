import { useEffect } from "react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";

// root pages
import RootLayout, { loader as rootLoader } from "./pages/Root/Root";
import TeacherRoot from "./pages/teachers/TeacherRoot";

// static pages
import Home from "./pages/static/Home";
import About from "./pages/static/About";

// error pages
import ErrorPage from "./pages/error/Error";

// auth pages

import Login, { action as loginAction } from "./pages/auth/Login";
import SignUp, { action as signupAction } from "./pages/auth/SignUp";

// teacher pages
import Teacher, { loader as teacherLoader } from "./pages/teachers/Teacher";
import Dashboard from "./pages/teachers/subroot/Dashboard";
import Classroom from "./pages/teachers/subroot/Classroom";
import ClassroomDetail, {
  loader as classroomDetailLoader,
} from "./pages/teachers/classroom/ClassroomDetail";
import AddClassroom from "./pages/teachers/subroot/AddClassroom";
import Message from "./pages/teachers/subroot/Message";
import VideoSession from "./pages/teachers/subroot/VideoSession";
import Schedule from "./pages/teachers/subroot/Schedule";
import Setting from "./pages/teachers/subroot/Setting";

// student pages
import Student, { loader as studentLoader } from "./pages/students/Student";

import CreateClassroom, {
  action as CreateClassroomAction,
  loader as createClassroomLoader,
} from "./pages/teachers/subroot/CreateClassroom";
import JoinClassroom, {
  loader as joinClassroomLoader,
} from "./pages/teachers/subroot/JoinClassroom";

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
      },
      { path: "message", element: <Message /> },
      { path: "video-session", element: <VideoSession /> },
      { path: "schedule", element: <Schedule /> },
      { path: "setting", element: <Setting /> },
    ],
  },
  {
    path: "/teacher/classroom/:classId",
    element: <ClassroomDetail />,
    loader: classroomDetailLoader,
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
    loader: joinClassroomLoader,
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
