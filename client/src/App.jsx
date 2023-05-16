//* dependencies
import { useEffect } from "react";
import { RouterProvider } from "react-router-dom";

//* router
import router from "./routes";

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


// TODO: Create a report in teacher admin 

// TODO Report no.1: Create a report of separate classroom where be teacher and student data which is inside the classroom.

// TODO Report no.2: Create a report of 