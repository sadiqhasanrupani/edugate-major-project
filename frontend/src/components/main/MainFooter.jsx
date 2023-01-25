import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import EdugateLogo from "../UI/EdugateLogo";

// styles
import styles from "../../scss/headers/MainFooter.module.scss";

// svg
import BubbleOne from "../UI/global/BubbleOne";
import BubbleTwo from "../UI/global/BubbleTwo";

// action
import { uiAction } from "../../store/ui-slice";

const MainFooter = () => {
  const dispatch = useDispatch();

  const NavigateHandler = () => {
    dispatch(uiAction.toggler());
  };

  return (
    <>
      <footer>
        <section className={styles.footer}>
          <div className={styles.item1}>
            <Link to="/" onClick={NavigateHandler}>
              <EdugateLogo />
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
                  About
                </Link>
              </li>
              <li>
                <Link to="signup" onClick={NavigateHandler}>
                  Login/Signup
                </Link>
              </li>
            </ul>
          </div>
          <div className={styles.item6}>
            <ul className={styles.list}>
              <li>+917498412427</li>
              <li>
                <a href="mailto:">sadiqhasanrupani11@gmail.com</a>
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
