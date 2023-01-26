// import { useEffect } from "react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
// import { useDispatch, useSelector } from "react-redux";

// pages
import RootLayout from "./pages/RootLayout";
import Home from "./pages/Home";
import About from "./pages/About";
import SignUp from "./pages/SignUp";

// import { uiAction } from "./store/ui-slice";

const router = createBrowserRouter([
  {
    path: "/",
    element: <RootLayout />,
    children: [
      { index: true, element: <Home /> },
      { path: "about", element: <About /> },
      { path: "signup", element: <SignUp /> },
    ],
  },
]);

const App = () => {
  return (
    <div>
      <RouterProvider router={router} />
    </div>
  );
};

export default App;
