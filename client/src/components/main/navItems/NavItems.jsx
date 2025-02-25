import { useEffect, useCallback } from "react";
import { NavLink } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { gsap, Linear } from "gsap";

// sass
import styles from "../../../scss/headers/navItem/NavItems.module.scss";

import Toggler from "../../UI/global/Toggler";
import { uiAction } from "../../../store/ui-slice";

const NavItems = () => {
  const dispatch = useDispatch();
  const isDarkmode = useSelector((state) => state.ui.isDarkMode);
  const isActive = useSelector((state) => state.ui.isActive);

  const NavigateHandler = useCallback(() => {
    dispatch(uiAction.toggler());
  }, [dispatch]);

  useEffect(() => {
    gsap.fromTo(
      [".active-line"],
      { x: -50 },
      {
        x: 0,
        ease: Linear.easeOut,
      },
    );
  }, [NavigateHandler, isActive]);

  const isActiveFn = ({ isActive }) => (isActive ? styles.active : undefined);

  return (
    <>
      <ul
        className={`${
          isDarkmode ? styles.darkNavItems : styles.lightNavItems
        } ${styles.navItems}`}
      >
        <li className={styles.navList}>
          <NavLink to="/" className={isActiveFn} onClick={NavigateHandler}>
            Home
          </NavLink>
          <div className={`active-line ${styles.activeLine}`} />
        </li>
        <li className={styles.navList}>
          <NavLink to="about" className={isActiveFn} onClick={NavigateHandler}>
            About Us
          </NavLink>
          <div className={`active-line ${styles.activeLine}`} />
        </li>
        <li className={styles.navList}>
          <NavLink to="login" className={isActiveFn} onClick={NavigateHandler}>
            Login
          </NavLink>
          <div className={`active-line ${styles.activeLine}`} />
        </li>
        {/* <li>
          <div className={`${styles.toggler}`}>
            <Toggler />
          </div>
        </li> */}
      </ul>
    </>
  );
};

export default NavItems;
