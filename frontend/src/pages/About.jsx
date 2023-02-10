import { useEffect } from "react";
import { gsap } from "gsap";

import styles from "../scss/pages/About.module.scss";
import profileImg from "../assets/Images/profile.png";
import icons from "../assets/Images/icons.png";
import sideImg from "../assets/Images/AboutUsSideImg.png"

const founders = [{
  Name: "SADIQHASAN RUPANI",
  Role: "Full Stack Developer",
  DOB: "Jan 09,2003",
  profile: profileImg,
  Introduction1: "Hi , I am overwhelmed to provide a technology that will make a great impact on the users getting connected on EDUGATE everyday. I did a full time job to provide the comforting functionalities and features for Edugate users.",
  Introduction2: "I used modern means and methods to develop this frontend and worked on backend and designs for creating a customized learning experience :)."
},
{
  Name: "AANCHAL SHADIJA",
  Role: "UI/UX Designer",
  DOB: "Jan 27,2002",
  profile: profileImg,
  Introduction1: "Hi, I was super excited to work for the concept of Edugate , I am a part of designing team , I love to engage with the users through my creativity and making sure that more users get connected to us",
  Introduction2: "We made sure of keeping the designs Minimalistic yet interactive and its quite a tough job to do ! We tried to take client reviews to ensure the quality of our delivery which helped us to upgrade and update :)"
},
{
  Name: "SHRADDHA PATIL",
  Role: "Backend Developer and Content Writer",
  DOB: "Dec 18,2000",
  profile: profileImg,
  Introduction1: "Helllo, I am pleased to having worked as a back end support for our Webapp,I also provided quality content , ensuring about the users inclining to our Webapp ,And managed the effiicient data of our clients through secure and safer methods and analysed the growth of our clients through our data being collected.",
  Introduction2: "Eduagate is a Quality brand to it was necessary to provide a top quality and original content , being a part of Edugate makes me feel delightful and lively Thank You :)"
},
]

const services = ["Flexibity", "Reduced Costs", "More Free Time", "Increased Course Variety", "Career Advancement Opportunities", "Increased Collaboration", "Personalised Education", "Enhanced Time Management Skills", "Immediate Feedback", "Repeated Access to Course Materials"]

const About = () => {
  useEffect(() => {
    const timeline = gsap.timeline();
    timeline.fromTo([`.about`], { opacity: 0 }, { opacity: 1 });
  }, []);

  return (
    <article className={`about`}>
      <h3 className={styles.h3} > We try to bring learning of people instead of people to learning. </h3>
          <h1 className={styles.h1}>Premium learning experience</h1>
      <div className={styles.aboutUsInfo}>
        <div>
          <h3 className={styles.h3} style={{textAlign : "left", marginLeft : '13px'}}>
            Welcome to Edugate,
          </h3>
          <h3 className={styles.para}> Edugate education tools work together to transform teaching and the learning so that every student educator can pursue their personal potential.</h3>
          <h3 className={styles.para}> We sincerely believe that technology shouldn't hold back your educational institution . Technology alone will not improve education, but it can be a powerful part of solution. We help in expanding the learning for everyone at every age and stage --deserve the tools & skills that set them up for success in building the he future they want themselves.</h3>
        </div>
        <img src={sideImg} width="600px" alt=""/>
      </div>
      <h2 className={styles.h2}>Meet our Founders . .</h2>
      {founders.map((founder) => {
        return <div className={styles.cards}>
          <div className={styles.profileDiv}>
            <img src={founder.profile} alt=""/>
            <h3>{founder.Name}</h3>
            <p>{founder.DOB}</p>
          </div>
          <div className={styles.introDiv}>
            <h2>{founder.Name}, {founder.Role}</h2>
            <p>{founder.Introduction1}</p>
            <p>{founder.Introduction2}</p>
            <img src={icons} alt=""/>
          </div>
        </div>
      })}
      <br />
      <h2 className={styles.h2}>We Try To Provide</h2>
      <div className={styles.serviceDiv}>
        {services.map((service) => {
          return <p className={styles.service}>{service}</p>
        })}
      </div>
    </article>
  );
};

export default About;
