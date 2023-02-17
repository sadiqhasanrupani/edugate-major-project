import { useEffect } from "react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";

// pages
import RootLayout from "./pages/Root/Root";
import ErrorPage from "./pages/error/Error";
import Home from "./pages/static/Home";
import About from "./pages/static/About";
import Login from "./pages/auth/Login";
import SignUp, { action as signupAction } from "./pages/auth/SignUp";

const router = createBrowserRouter([
  {
    path: "/",
    element: <RootLayout />,
    errorElement: <ErrorPage />,
    children: [
      { index: true, element: <Home /> },
      { path: "about", element: <About /> },
    ],
  },
  { path: "/login", element: <Login /> },
  {
    path: "/signup",
    element: <SignUp />,
    action: signupAction,
  },
]);

const App = () => {
  const themeMode = JSON.parse(localStorage.getItem("theme"))
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
