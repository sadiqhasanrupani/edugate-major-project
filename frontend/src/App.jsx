//* dependencies
import { useEffect } from "react";

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
