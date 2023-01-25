import { useEffect, useCallback } from "react";
import { useSelector, useDispatch } from "react-redux";
import { NavLink } from "react-router-dom";
import { gsap, Linear } from "gsap";

import styles from "../../scss/headers/MainHeader.module.scss";

// UI
import EdugateLogo from "../UI/EdugateLogo";
import Toggler from "../UI/global/Toggler";

// action
import { uiAction } from "../../store/ui-slice";

const MainHeader = () => {
  const isToggle = useSelector((state) => state.ui.isActive);
  const dispatch = useDispatch();

  const NavigateHandler = useCallback(() => {
    console.log(isToggle);
    dispatch(uiAction.toggler());
  }, [dispatch, isToggle]);

  useEffect(() => {
    gsap.fromTo(
      [".active-line"],
      { x: -100 },
      {
        x: 0,
        // ease: "bounce",
        ease: Linear.easeOut,
      }
    );
  }, [NavigateHandler]);

  return (
    <nav className={`nav-bar ${styles.navBar}`}>
      <div className={styles.edugateLogo}>
        <NavLink to="/" onClick={NavigateHandler}>
          <EdugateLogo />
        </NavLink>
      </div>
      <ul className={styles.navItems}>
        <li>
          <div className={styles.toggler} >
            <Toggler />
          </div>
        </li>
        <li className={styles.navList}>
          <NavLink
            to="/"
            className={({ isActive }) =>
              isActive ? `active ${styles.active}` : undefined
            }
            onClick={NavigateHandler}
          >
            Home
          </NavLink>
          <div className={`active-line ${styles.activeLine}`} />
        </li>
        <li className={styles.navList}>
          <NavLink
            to="about"
            className={({ isActive }) =>
              isActive ? `active ${styles.active}` : undefined
            }
            onClick={NavigateHandler}
          >
            About
          </NavLink>
          <div className={`active-line ${styles.activeLine}`} />
        </li>
        <li className={styles.navList}>
          <NavLink
            to="signup"
            className={({ isActive }) =>
              isActive ? `active ${styles.active}` : undefined
            }
            onClick={NavigateHandler}
          >
            Login/Signup
          </NavLink>
          <div className={`active-line ${styles.activeLine}`} />
        </li>
      </ul>
    </nav>
  );
};

export default MainHeader;
