//* dependencies
import { useEffect } from "react";
import { useSelector } from "react-redux";
import { RouterProvider } from "react-router-dom";
import { Toaster } from "sonner";

//* router
import router from "./routes";

function App() {
    const isDarkMode = useSelector((state) => state.ui.isDarkMode);

    const themeMode = JSON.parse(localStorage.getItem("theme"));
    useEffect(() => {
        if (isDarkMode) {
            document.body.className = "dark-theme";
        } else {
            document.body.className = "light-theme";
        }
    }, [themeMode, isDarkMode]);
    return (
        <>
            <RouterProvider router={router} />
            <Toaster theme={isDarkMode ? "dark" : "light"} richColors />
        </>
    );
}

export default App;
