// dependencies
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { gsap } from "gsap";

import styles from "../../scss/pages/Home.module.scss";

// svg
import HomeSvgOne from "../../components/UI/home/HomeSvgOne";
import TraingleOne from "../../components/UI/global/TriangleOne";
import TraingleTwo from "../../components/UI/global/TraingleTwo";

// action
import { uiAction } from "../../store/ui-slice";

const Home = () => {
  const isDarkMode = useSelector((state) => state.ui.isDarkMode);
  const dispatch = useDispatch();
  const NavigateHandler = () => {
    dispatch(uiAction.toggler());
  };

  useEffect(() => {
    const timeline = gsap.timeline();
    timeline.fromTo(
      [`.home`],
      { x: -100, opacity: 0 },
      { x: 0, opacity: 1, ease: "linear", duration: 0.7 }
    );
  }, []);

  return (
    <>
      <main
        className={`home ${styles.main} ${
          isDarkMode ? styles.darkMain : styles.lightMain
        }`}
        id="start"
      >
        <div className={`${styles.item1}`}>
          <h1>
            Best Education Management Software for the Online Teaching Business
          </h1>
        </div>
        <div className={`${styles.item2}`}>
          <HomeSvgOne />
          <div className={`${styles.subItem1}`}>
            <p>
              This software will assist you in setting up your own
              college/school server, generate comprehensive analysis reports,
              and creating your own classes within the server.
            </p>
            <div className={`${styles.subItem2}`}>
              <Link to="signup">
                <button
                  className={`btn ${styles.btn}`}
                  onClick={NavigateHandler}
                >
                  Start now
                </button>
              </Link>
            </div>
          </div>
        </div>
        <div className={`${styles.item3}`}>
          <TraingleOne />
        </div>
        <div className={`${styles.item4}`}>
          <TraingleTwo />
        </div>
      </main>
    </>
  );
};

export default Home;
