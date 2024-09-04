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
  const isDarkmode = useSelector((state) => state.ui.isDarkMode);

  const NavigateHandler = () => {
    dispatch(uiAction.toggler());
  };

  return (
    <>
      <footer
        className={`${isDarkmode ? styles.darkFooter : styles.lightFooter}`}
      >
        <section className={`${styles.footer}`}>
          <div className={styles.item1}>
            <Link to="/" onClick={NavigateHandler}>
              {isDarkmode ? <EdugateDarkMode /> : <EdugateLightMode />}
            </Link>
          </div>
          <div className={styles.item2}>
            <h3 className={styles.header3}>IMPORTANT LINKS</h3>
          </div>
          <div className={styles.item3}>
            <h3 className={styles.header3}>CONNECT WITH ME</h3>
          </div>
          <div className={styles.item4}>
            <p>
              Edugate App is a great education management software which allows
              the user to create their own college/school server and they can
              conduct live sessions and recorded sessions for free
            </p>
          </div>
          <div className={styles.item5}>
            <ul className={styles.list}>
              <li>
                <Link to="/" onClick={NavigateHandler}>
                  Home
                </Link>
              </li>
              <li>
                <Link to="about" onClick={NavigateHandler}>
                  About Us
                </Link>
              </li>
              <li>
                <Link to="login" onClick={NavigateHandler}>
                  Login
                </Link>
              </li>
            </ul>
          </div>
          <div className={styles.item6}>
            <ul className={styles.list}>
              <li>
                <p>+917498412426</p>
              </li>
              <li>
                <a href="mailto:">edugate110@gmail.com</a>
              </li>
            </ul>
          </div>
        </section>
        <div className={styles.item7}>
          <div className={styles.subItem1}>
            <BubbleOne />
          </div>
          <div className={styles.subItem2}>
            <BubbleTwo />
          </div>
        </div>
      </footer>
    </>
  );
};

export default MainFooter;
