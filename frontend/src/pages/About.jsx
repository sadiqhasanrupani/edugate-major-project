import { useEffect } from "react";
import { gsap } from "gsap";

import styles from "../scss/pages/About.module.scss";

const About = () => {
  useEffect(() => {
    const timeline = gsap.timeline();
    timeline.fromTo(
      [`.about`],
      { x: -1000, opacity: 0 },
      { x: 0, opacity: 1, duration: 1 }
    );
  }, []);

  return (
    <article className={`about`}>
      <h1 className={styles.h1}>
        We try to bring learning of people instead of people to learning.
      </h1>
    </article>
  );
};

export default About;
