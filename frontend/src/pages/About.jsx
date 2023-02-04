import { useEffect } from "react";
import { gsap } from "gsap";

const About = () => {
  useEffect(() => {
    const timeline = gsap.timeline();
    timeline.fromTo([`.about`], { opacity: 0 }, { opacity: 1 });
  }, []);

  return (
    <main className={`about`}>
      <h1>About page</h1>
    </main>
  );
};

export default About;
