import { useEffect } from "react";
import { gsap } from "gsap";
import {
  Users,
  Clock,
  BookOpen,
  Target,
  Sparkles,
  GraduationCap,
  Calendar,
  MessageSquare,
  Globe,
  LucideLinkedin,
} from "lucide-react";

// Images
import Sadiqhasan from "../../assets/Images/Sadiqhasan-close-up.png";
import AanchalShadija from "../../assets/Images/Aancahl Shadija.jpg";
import Shraddha from "../../assets/Images/shraddha.jpeg";

const founders = [
  {
    id: 1,
    name: "SADIQHASAN RUPANI",
    role: "Full Stack Developer",
    image: Sadiqhasan,
    portfolio: true,
    portfolioLink: "https://sadiqr.in",
    linkedinUrl: "https://linkedin.com/in/sadiqhasanrupani",
    twitterUrl: "https://x.com/Sh_Rupani",
    intro1:
      "I’m Sadiqhasan Rupani, a Full Stack Developer and the creator of Edugate, a platform designed to transform learning experiences. From backend logic to frontend UI, I handle every aspect of development.",
    intro2:
      "With expertise in React, TypeScript, Express.js, Sequelize, and GSAP, I create high-performance, intuitive, and user-friendly applications that make technology more accessible for education.",
  },
  {
    id: 2,
    name: "AANCHAL SHADIJA",
    role: "UI/UX Designer",
    image: AanchalShadija,
    portfolio: false,
    linkedinUrl: "https://www.linkedin.com/in/aanchal-shadija-3293232b9/",
    intro1:
      "I’m Aanchal, a UI/UX designer passionate about crafting visually appealing and interactive experiences that resonate with users.",
    intro2:
      "Designing Edugate was a challenge—balancing minimalism with engagement. Through continuous feedback and iterations, we created an intuitive and dynamic interface for users.",
  },
  {
    id: 3,
    name: "SHRADDHA PATIL",
    role: "Content Writer",
    image: Shraddha,
    portfolio: false,
    linkedinUrl: "https://www.linkedin.com/in/shraddha-patil-911b75292/",
    intro1:
      "Hey! I’m Shraddha, a content writer dedicated to shaping narratives that inform, engage, and connect audiences through compelling storytelling.",
    intro2:
      "From SEO-driven blogs to brand storytelling, I ensure every word adds value, making content both impactful and meaningful for users.",
  },
];

const services = [
  { id: 1, service: "Flexibility", icon: Clock },
  { id: 2, service: "Cost Free", icon: Sparkles },
  { id: 3, service: "More Free Time", icon: Calendar },
  { id: 4, service: "Increased Course Variety", icon: BookOpen },
  { id: 5, service: "Career Advancement", icon: Target },
  { id: 6, service: "Increased Collaboration", icon: Users },
  { id: 7, service: "Personalized Education", icon: GraduationCap },
  { id: 8, service: "Time Management", icon: Clock },
  { id: 9, service: "Immediate Feedback", icon: MessageSquare },
];

function About() {
  useEffect(() => {
    const timeline = gsap.timeline();
    timeline
      .from(".hero-section", {
        y: 30,
        opacity: 0,
        duration: 1,
      })
      .from(
        ".welcome-section",
        {
          y: 30,
          opacity: 0,
          duration: 0.8,
        },
        "-=0.3",
      )
      .from(".founder-card", {
        y: 30,
        opacity: 0,
        duration: 0.6,
        stagger: 0.2,
      })
      .from(".service-item", {
        scale: 0.9,
        opacity: 1,
        duration: 0.4,
        stagger: 0.1,
      });
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-b from-purple-50 via-white to-purple-50">
      {/* Hero Section */}
      <section className="hero-section pt-32 pb-20 px-4">
        <div className="max-w-7xl mx-auto text-center">
          <h1 className="text-5xl md:text-6xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-purple-600 to-indigo-600 mb-6">
            Bringing Learning to People
          </h1>
          <p className="text-2xl md:text-3xl text-purple-600 font-light mb-8">
            Instead of People to Learning
          </p>
          <h2 className="text-4xl md:text-5xl font-bold text-gray-800">
            Premium Learning Experience
          </h2>
        </div>
      </section>

      {/* Welcome Section */}
      <section className="welcome-section py-20 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div className="space-y-6">
              <h3 className="text-3xl font-bold text-purple-800">
                Welcome to Edugate
              </h3>
              <p className="text-lg text-gray-600 leading-relaxed">
                Edugate education tools work together to transform teaching and
                learning so that every student and educator can pursue their
                personal potential.
              </p>
              <p className="text-lg text-gray-600 leading-relaxed">
                We sincerely believe that technology shouldn't hold back your
                educational institution. Technology alone will not improve
                education, but it can be a powerful part of the solution. We
                help in expanding learning for everyone at every age and stage
                -- they deserve the tools & skills that set them up for success
                in building the future they want for themselves.
              </p>
            </div>
            <div className="relative">
              <div className="absolute inset-0 bg-gradient-to-r from-purple-500 to-indigo-500 rounded-2xl transform rotate-3 opacity-20"></div>
              <img
                src="https://images.unsplash.com/photo-1522202176988-66273c2fd55f?auto=format&fit=crop&q=80&w=800"
                alt="Students learning"
                className="relative rounded-2xl shadow-2xl"
              />
            </div>
          </div>
        </div>
      </section>

      <div className="bg-white py-24 sm:py-32">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="mx-auto max-w-2xl lg:mx-0">
            <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
              Our team
            </h2>
            <p className="mt-6 text-lg leading-8 text-gray-600">
              We’re a dynamic group of individuals who are passionate about what
              we do and dedicated to delivering the best results for our
              clients.
            </p>
          </div>
          <div className="grid md:grid-cols-3 gap-8 mt-20">
            {founders.map((founder) => (
              <div
                key={founder.id}
                className="founder-card bg-white rounded-2xl shadow-xl overflow-hidden transform hover:scale-105 transition-transform duration-300"
              >
                <div className="relative h-[25rem]">
                  <div className="absolute inset-0 bg-gradient-to-b from-transparent to-black opacity-50"></div>
                  <img
                    src={founder.image}
                    alt={founder.name}
                    className="w-full h-[25rem] object-cover"
                  />
                  <div className="absolute bottom-4 left-4 text-white">
                    <h3 className="text-xl font-bold text-white">
                      {founder.name}
                    </h3>
                    <p className="text-purple-200 font-semibold">
                      {founder.role}
                    </p>
                    <p className="text-sm text-gray-300 font-semibold">
                      {founder.dob}
                    </p>
                    <ul className="flex gap-x-3 mt-4">
                      <li>
                        <a
                          target={"blank"}
                          href={founder.twitterUrl}
                          className="text-slate-50 hover:text-slate-200 cursor-pointer"
                        >
                          <span className="sr-only">X</span>
                          <svg
                            width="18"
                            height="25"
                            viewBox="0 0 25 23"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg"
                          >
                            <path
                              d="M19.6665 0H23.4999L15.0832 9.76015L24.9165 23H17.1999L11.1582 14.9542L4.24154 23H0.408203L9.32487 12.5609L-0.0917969 0H7.81654L13.2749 7.34981L19.6665 0ZM18.3249 20.7085H20.4499L6.69987 2.20664H4.41654L18.3249 20.7085Z"
                              fill="white"
                            />
                          </svg>
                        </a>
                      </li>
                      <li>
                        <a
                          target={"blank"}
                          href={founder.linkedinUrl}
                          className="text-slate-50 hover:text-slate-200 cursor-pointer"
                        >
                          <span className="sr-only">LinkedIn</span>
                          <LucideLinkedin />
                        </a>
                      </li>
                      <li>
                        <a
                          href={founder.portfolioLink}
                          className="text-slate-50 hover:text-slate-200 cursor-pointer"
                          target={"blank"}
                        >
                          <span className="sr-only">Portfolio</span>
                          <Globe />
                        </a>
                      </li>
                    </ul>
                  </div>
                </div>
                <div className="p-6 space-y-4">
                  <p className="text-gray-600">{founder.intro1}</p>
                  <p className="text-gray-600">{founder.intro2}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Services Section */}
      <section className="py-20 px-4">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-4xl font-bold text-center text-purple-800 mb-16">
            What We Provide
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {services.map((service) => {
              const Icon = service.icon;
              return (
                <div
                  key={service.id}
                  className="service-item group flex items-center p-6 bg-white rounded-xl shadow-md hover:shadow-xl transition-all duration-300 hover:bg-purple-50"
                >
                  <div className="p-3 bg-purple-100 rounded-lg group-hover:bg-purple-200 transition-colors duration-300">
                    <Icon className="w-6 h-6 text-purple-600" />
                  </div>
                  <span className="ml-4 text-lg font-medium text-gray-800">
                    {service.service}
                  </span>
                </div>
              );
            })}
          </div>
        </div>
      </section>
    </div>
  );
}

export default About;