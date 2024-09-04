import { useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import { NavLink } from "react-router-dom";

import styles from "../../scss/headers/MainHeader.module.scss";

// UI
import EdugateLightMode from "../UI/logo/EdugateLightMode";
import EdugateDarkMode from "../UI/logo/EdugateDarkMode";

//components
import NavItems from "./navItems/NavItems";

// action
import { uiAction } from "../../store/ui-slice";

const MainHeader = () => {
  const dispatch = useDispatch();
  const isDarkmode = useSelector((state) => state.ui.isDarkMode);

  const NavigateHandler = useCallback(() => {
    dispatch(uiAction.toggler());
  }, [dispatch]);

  return (
    <nav
      className={`nav-bar ${styles.navBar} ${
        isDarkmode ? styles.darkNavBar : styles.lightNavBar
      } `}
    >
      <div className={styles.edugateLogo}>
        <NavLink to="/" onClick={NavigateHandler}>
          {isDarkmode ? <EdugateDarkMode /> : <EdugateLightMode />}
        </NavLink>
      </div>
      <NavItems />
    </nav>
  );
};

export default MainHeader;
