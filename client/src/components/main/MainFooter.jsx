import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

// styles
import styles from "../../scss/headers/MainFooter.module.scss";

// svg
import BubbleOne from "../UI/global/BubbleOne";
import BubbleTwo from "../UI/global/BubbleTwo";
import EdugateLightMode from "../UI/logo/EdugateLightMode";
import EdugateDarkMode from "../UI/logo/EdugateDarkMode";

// action
import { uiAction } from "../../store/ui-slice";

const MainFooter = () => {
  const dispatch = useDispatch();
  const isDarkMode = useSelector((state) => state.ui.isDarkMode);

  const navigateHandler = () => {
    dispatch(uiAction.toggler());
  };

  return (
    <>
      <footer
        className={`${isDarkMode ? "bg-gray-900 text-white" : "bg-white text-gray-800"} py-8`}
      >
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="flex flex-col items-start">
              <Link href="/" onClick={navigateHandler}>
                {isDarkMode ? <EdugateDarkMode /> : <EdugateLightMode />}
              </Link>
              <p className="mt-4 text-sm">
                Edugate App is a great education management software which
                allows the user to create their own college/school server and
                they can conduct live sessions and recorded sessions for free
              </p>
            </div>

            <div>
              <h3 className="text-lg font-semibold mb-4">IMPORTANT LINKS</h3>
              <ul className="space-y-2">
                <li>
                  <Link
                    href="/"
                    onClick={navigateHandler}
                    className="hover:underline"
                  >
                    Home
                  </Link>
                </li>
                <li>
                  <Link
                    href="/about"
                    onClick={navigateHandler}
                    className="hover:underline"
                  >
                    About Us
                  </Link>
                </li>
                <li>
                  <Link
                    href="/login"
                    onClick={navigateHandler}
                    className="hover:underline"
                  >
                    Login
                  </Link>
                </li>
              </ul>
            </div>

            <div>
              <h3 className="text-lg font-semibold mb-4">CONNECT WITH ME</h3>
              <ul className="space-y-2">
                <li>
                  <p>+917498412426</p>
                </li>
                <li>
                  <a
                    href="mailto:edugate110@gmail.com"
                    className="hover:underline"
                  >
                    edugate110@gmail.com
                  </a>
                </li>
              </ul>
            </div>

            <div className="relative">
              <div className="absolute -top-16 -left-16 opacity-10">
                <BubbleOne />
              </div>
              <div className="absolute -bottom-16 -right-16 opacity-10">
                <BubbleTwo />
              </div>
            </div>
          </div>
        </div>
      </footer>
    </>
  );
};

export default MainFooter;