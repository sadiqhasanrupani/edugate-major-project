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
import { BarChart, BookOpen, ChevronDown, Laptop, Users } from "lucide-react";

const features = [
  {
    icon: <Laptop className="size-10" />,
    title: "Virtual Classrooms",
    description:
      "Host live classes with interactive whiteboards and real-time collaboration",
  },
  {
    icon: <Users className="size-10" />,
    title: "Student Management",
    description:
      "Track attendance, grades, and progress with our comprehensive dashboard",
  },
  {
    icon: <BookOpen className="size-10" />,
    title: "Course Creation",
    description:
      "Build engaging courses with multimedia content and assessments",
  },
  {
    icon: <BarChart className="size-10" />,
    title: "Analytics",
    description:
      "Get detailed insights into student performance and engagement",
  },
];

const Home = () => {
  const isDarkMode = useSelector((state) => state.ui.isDarkMode);
  const dispatch = useDispatch();

  const navigateHandler = () => {
    dispatch(uiAction.toggler());
  };

  useEffect(() => {
    const timeline = gsap.timeline();
    timeline.fromTo(
      ".home",
      { x: -100, opacity: 0 },
      { x: 0, opacity: 1, ease: "linear", duration: 0.7 },
    );
  }, []);

  return (
    <div
      className={`home relative min-h-screen ${
        isDarkMode
          ? "bg-gradient-to-b from-gray-950 to-gray-900 text-gray-50"
          : "bg-gradient-to-b from-gray-50 to-white text-gray-900"
      }`}
    >
      {/* Hero Section */}
      <section className="relative min-h-[90vh] flex flex-col items-center justify-center px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-4xl mx-auto space-y-8">
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight">
            Best Education Management Software for Online Teaching
          </h1>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Set up your own college/school server, generate comprehensive
            analysis reports, and create custom classes within your server.
          </p>
          <div className="flex justify-center gap-4">
            <Link to="/signup">
              <button className={`${styles.btn}`} onClick={navigateHandler}>
                Start now
              </button>
            </Link>
          </div>
        </div>
        <div className="absolute bottom-8 animate-bounce">
          <ChevronDown className="size-8 text-muted-foreground" />
        </div>
      </section>

      {/* Features Section */}
      <section className="py-24 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-3xl font-bold text-center mb-16">
            Everything You Need to Succeed
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, index) => (
              <div
                key={index}
                className={`p-6 rounded-2xl transition-all duration-200 hover:scale-105 ${
                  isDarkMode
                    ? "bg-gray-800/50 hover:bg-gray-800"
                    : "bg-white hover:bg-gray-50"
                } border border-border shadow-sm`}
              >
                <div className="mb-4 text-indigo-600">{feature.icon}</div>
                <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
                <p className="text-muted-foreground">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="relative py-24 px-4 sm:px-6 lg:px-8 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-indigo-600 to-purple-600 opacity-90" />
        <div className="relative max-w-4xl mx-auto text-center">
          <h2 className="text-3xl sm:text-4xl font-bold mb-8 text-white relative z-20">
            Ready to Transform Your Teaching?
          </h2>
          <button className="px-8 py-3 bg-white text-indigo-600 rounded-full text-lg font-semibold hover:bg-gray-100 transition-all duration-200 shadow-xl hover:shadow-2xl">
            Get Started Now
          </button>
        </div>
      </section>

      {/* Decorative Elements */}
      <div className="absolute top-1/4 right-0 transform translate-x-1/2 overflow-hidden">
        <TraingleOne />
      </div>
      <div className="absolute bottom-1/4 left-0 transform -translate-x-1/2 overflow-hidden -z-10">
        <TraingleTwo />
      </div>
      <div className="hidden absolute bottom-0 right-0 transform translate-x-1/4 translate-y-1/4 opacity overflow-hidden z-10 md:block">
        <HomeSvgOne />
      </div>
    </div>
  );
};

export default Home;
