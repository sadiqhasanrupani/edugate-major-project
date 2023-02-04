import { createBrowserRouter, RouterProvider } from "react-router-dom";

// pages
import RootLayout from "./pages/RootLayout";
import Home from "./pages/Home";
import About from "./pages/About";
import Login from "./pages/Login";
import SignUp, { action as signupAction } from "./pages/SignUp";


const router = createBrowserRouter([
  {
    path: "/",
    element: <RootLayout />,
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
  return <RouterProvider  router={router} />;
};

export default App;
