import { createBrowserRouter } from "react-router-dom";

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
import Dashboard, {
  loader as teacherDashboardLoader,
} from "./pages/teachers/subroot/Dashboard";

import TeacherClassroomReport, {
  loader as teacherClassReportLoader,
} from "./pages/teachers/subroot/TeacherClassroomReport";

import TeacherSubjectReport, {
  loader as teacherSubjectReportLoader,
} from "./pages/teachers/subroot/TeacherSubjectReport/TeacherSubjectReport";

import TeacherAssignmentReport, {
  loader as teacherAssignmentReportLoader,
} from "./pages/teachers/subroot/TeacherAssignmentReport/TeacherAssignmentReport.jsx";

import Classroom, {
  loader as classroomLoader,
} from "./pages/teachers/subroot/Classroom";
import Invitation, {
  loader as invitationLoader,
} from "./pages/teachers/subroot/Invitation";
import AddClassroom from "./pages/teachers/subroot/AddClassroom";
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

import TeacherClassroom from "./pages/teachers/classroom/TeacherClassroom.jsx";

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
import ClassroomSettings from "./pages/teachers/classroom/ClassroomSettings";

//* Teacher Settings
import TeacherSettings from "./pages/teachers/classroom/subroot/TeacherSettings.jsx";

//* Teacher Settings subroot pages
import TeacherViewProfile from "./pages/teachers/classroom/subroot/TeacherSettings/subroot/TeacherViewProfile";
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
import JoinClassroomSetting from "./pages/teachers/JoinClassroom/JoinClassroomSetting.jsx";

//* Teacher Subject page
import SubjectRoot, {
  loader as subjectRootLoader,
} from "./pages/teachers/subject/Root/SubjectRoot";
//* Teacher subject/subroot Pages
import TeacherSubject from "./pages/teacher/subject/TeacherSubject";
import TeacherSubjectPeoples, {
  loader as teacherSubjectPeoplesLoader,
} from "./pages/teachers/subject/subroot/TeacherSubjectPeoples";
import SubjectAssignments, {
  loader as subjectAssignmentsLoader,
} from "./pages/teachers/subject/subroot/SubjectAssignments";
import TeacherSubjectAssignment, {
  loader as teacherSubjectAssignmentLoader,
} from "./pages/teacher/subject/subroot/TeacherSubjectAssignment";
import TeacherSubjectResources from "./pages/teacher/subject/subroot/TeacherSubjectResources";
import TeacherSubjectQuiz, {
  loader as teacherSubjectQuizLoader,
} from "./pages/teacher/subject/subroot/TeacherSubjectQuiz";
import TeacherSubjectAttendance from "./pages/teacher/subject/subroot/TeacherSubjectAttendance";
import TeacherSubmittedAssignment, {
  loader as teacherSubmittedAssignmentLoader,
  action as teacherSubmittedAssignmentAction,
} from "./pages/teacher/subject/TeacherSubmittedAssignment";

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
import StudentSettings from "./pages/students/subroot/StudentSettings";
import StudentNotification, {
  loader as studentNotificationLoader,
} from "./pages/students/subroot/StudentNotification";
import StudentProfile from "./pages/students/subroot/student-profile/StudentProfile";
import StudentEditProfile, {
  action as studentEditProfileAction,
} from "./pages/students/subroot/student-edit-profile/StudentEditProfile";
import StudentPrivacy from "./pages/students/subroot/student-privacy/StudentPrivacy";

//* Student join-classroom pages
import StudentJoinClassroom from "./pages/students/join-classroom/StudentJoinClassroom.jsx";
import StudentJoinClassRoot, {
  loader as studentJoinClassRootLoader,
} from "./pages/students/join-classroom/root-layout/StudentJoinClassRoot";
import StudentJoinClassOverview, {
  loader as studentJoinClassOverviewLoader,
} from "./pages/students/join-classroom/subroot/StudentJoinClassOverview";
import StudentJoinClassPeoples from "./pages/students/join-classroom/subroot/StudentJoinClassPeoples";
import StudentJoinClassSubject, {
  loader as studentJoinClassSubjectLoader,
} from "./pages/students/join-classroom/subroot/StudentJoinClassSubject";
import StudentJoinClassSettings from "./pages/students/join-classroom/subroot/StudentJoinClassSettings";

//^ student subject page
import StudentSubject from "./pages/students/subject/StudentSubject.jsx";
import StudentSubjectRoot, {
  loader as studentSubjectRootLoader,
} from "./pages/students/subject/root/StudentSubjectRoot";
import StudentSubjectAssignments, {
  loader as studentSubjectAssignmentsLoader,
} from "./pages/students/subject/subroot/StudentSubjectAssignment";
import StudentSubjectAssignment, {
  loader as studentSubjectAssignmentLoader,
} from "./pages/students/subject/subroot/assignment/subroot/StudentSubjectAssignment";
import StudentResource from "./pages/students/subject/subroot/Resource";

import StudentAllQuizzes, {
  loader as studentAllQuizzesLoader,
} from "./pages/students/subject/subroot/StudentAllQuizzes/StudentAllQuizzes";

//^ give quiz for student page.
import GiveQuizForStudent, {
  loader as giveQuizForStudentLoader,
} from "./pages/students/subject/give-quiz/GiveQuizForStudent/GiveQuizForStudent";

//^ create quiz page
import CreateQuiz, {
  loader as createQuizLoader,
} from "./pages/create-quiz/CreateQuiz";

import EditQuiz, {
  loader as editQuizLoader,
} from "./pages/edit-quiz/EditQuiz.jsx";

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
      {
        path: "dashboard",
        children: [
          {
            index: true,
            element: <Dashboard />,
            loader: teacherDashboardLoader,
          },
          {
            path: "classroom-report/:classroomId",
            element: <TeacherClassroomReport />,
            loader: teacherClassReportLoader,
          },
          {
            path: "subject-report/:joinSubjectId",
            element: <TeacherSubjectReport />,
            loader: teacherSubjectReportLoader,
          },
          {
            path: "assignment-report/:assignmentId",
            element: <TeacherAssignmentReport />,
            loader: teacherAssignmentReportLoader,
          },
        ],
      },
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
      { index: true, element: <TeacherClassroom /> },
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
      { index: true, element: <TeacherSubject /> },
      {
        path: "add-peoples",
        element: <TeacherSubjectPeoples />,
        loader: teacherSubjectPeoplesLoader,
      },
      {
        path: "assignment",
        loader: subjectAssignmentsLoader,
        id: "subject-assignments-loader",
        children: [
          { index: true, element: <SubjectAssignments /> },
          {
            path: ":assignmentId",
            children: [
              {
                index: true,
                element: <TeacherSubjectAssignment />,
                loader: teacherSubjectAssignmentLoader,
              },
              {
                path: ":submittedAssignmentId",
                element: <TeacherSubmittedAssignment />,
                loader: teacherSubmittedAssignmentLoader,
                action: teacherSubmittedAssignmentAction,
              },
            ],
          },
        ],
      },
      {
        path: "resources",
        element: <TeacherSubjectResources />,
      },
      {
        path: "quiz",
        element: <TeacherSubjectQuiz />,
        loader: teacherSubjectQuizLoader,
      },
      { path: "attendance", element: <TeacherSubjectAttendance /> },
    ],
  },
  //^ Student page.
  {
    path: "/student",
    element: <StudentRoot />,
    errorElement: <ErrorPage />,
    loader: studentLoader,
    id: "student-root-loader",
    children: [
      { path: "dashboard", element: <StudentDashboard /> },
      {
        path: "classrooms",
        element: <StudentClassroom />,
        loader: studentClassroomLoader,
      },
      { path: "messages", elements: <StudentMessages /> },
      {
        path: "notifications",
        element: <StudentNotification />,
        loader: studentNotificationLoader,
      },
      {
        path: "settings",
        element: <StudentSettings />,
      },
      { path: "student-profile", element: <StudentProfile /> },
      {
        path: "edit-profile",
        element: <StudentEditProfile />,
        action: studentEditProfileAction,
      },
      { path: "privacy-security", element: <StudentPrivacy /> },
    ],
  },
  //^ Student join classroom page
  {
    path: "/student/join-classroom/:joinClassId",
    element: <StudentJoinClassRoot />,
    errorElement: <ErrorPage />,
    loader: studentJoinClassRootLoader,
    children: [
      { index: true, element: <StudentJoinClassroom /> },
      {
        path: "overview",
        element: <StudentJoinClassOverview />,
        loader: studentJoinClassOverviewLoader,
      },
      {
        path: "subject",
        element: <StudentJoinClassSubject />,
        loader: studentJoinClassSubjectLoader,
      },
      { path: "peoples", element: <StudentJoinClassPeoples /> },
      { path: "settings", element: <StudentJoinClassSettings /> },
    ],
  },
  //^ Student subject page
  {
    path: "/student/subject/:joinSubjectId",
    element: <StudentSubjectRoot />,
    errorElement: <ErrorPage />,
    loader: studentSubjectRootLoader,
    children: [
      { index: true, element: <StudentSubject /> },
      {
        path: "assignment",
        children: [
          {
            index: true,
            element: <StudentSubjectAssignments />,
            loader: studentSubjectAssignmentsLoader,
          },
          {
            path: ":assignmentId",
            element: <StudentSubjectAssignment />,
            loader: studentSubjectAssignmentLoader,
          },
        ],
      },
      { path: "resource", element: <StudentResource /> },
      {
        path: "quiz",
        children: [
          {
            index: true,
            element: <StudentAllQuizzes />,
            loader: studentAllQuizzesLoader,
          },
        ],
      },
    ],
  },
  //^ give quiz for student.
  {
    path: "/student/:joinSubjectId/give-quiz/:joinQuizId",
    element: <GiveQuizForStudent />,
    loader: giveQuizForStudentLoader,
  },
  //^ Create Quiz page
  {
    path: "/teacher/:subjectId/create-quiz",
    errorElement: <ErrorPage />,
    element: <CreateQuiz />,
    loader: createQuizLoader,
  },
  //^ Updating of quiz page
  {
    path: "/teacher/:subjectId/edit-quiz/:quizId",
    errorElement: <ErrorPage />,
    element: <EditQuiz />,
    loader: editQuizLoader,
  },
]);

export default router;
