import React from "react";
import Heading from "../Heading/Heading";
import ProjectsCard from "./ProjectsCard";

const ProjectsSection = () => {
  const data = [
    {
      pic: require("../../assets/pic1.png"),
      heading: "Turo Frontend",
      para: "This is a project made to explore antd library and media queries.",
      demoLink: "https://turo.vercel.app",
      sourceLink: "https://github.com/Talha-Ali150/turo",
    },
    {
      pic: require("../../assets/pic2.png"),
      heading: "E-Store",
      para: "This is a project made to explore authentication.",
      demoLink: "https://e-store-frontend-nine.vercel.app",
      sourceLink: "https://github.com/Talha-Ali150/e-store",
    },
    {
      pic: require("../../assets/pic3.png"),
      heading: "Corporate Prism",
      para: "This is a project made to practice adding cutsom touch to libraries.",
      demoLink: "https://corporateprism.com",
      // sourceLink: "https://github.com/Talha-Ali150/turo",
    },
    {
      pic: require("../../assets/pic4.png"),
      heading: "Calculator",
      para: "Calculator made using HTML,CSS and JS.",
      demoLink: "https://calculator-mu-amber-32.vercel.app",
      sourceLink: "https://github.com/Talha-Ali150/calculator",
    },
    {
      pic: require("../../assets/pic5.png"),
      heading: "TO-DO Notes",
      para: "TO-DO Notes using HTML,CSS and JS.",
      demoLink: "https://todo-notes-sigma.vercel.app",
      sourceLink: "https://github.com/Talha-Ali150/todo_notes",
    },
    {
      pic: require("../../assets/pic6.png"),
      heading: "Memory Game",
      para: "Memory Game made using HTML,CSS and JS.",
      demoLink: "https://memory-game-ruby-rho.vercel.app",
      sourceLink: "https://github.com/Talha-Ali150/memory_game",
    },
    {
      pic: require("../../assets/pic7.png"),
      heading: "Tic-Tac-Toe Game",
      para: "Tic-Tac-Toe Game made using ReactJS.",
      demoLink: "https://tic-tac-toe-game-psi-jet.vercel.app",
      sourceLink: "https://github.com/Talha-Ali150/tic-tac-toe-game",
    },
    {
      pic: require("../../assets/pic8.png"),
      heading: "TO-DO Notes",
      para: "TO-DO notes made using MERN.",
      demoLink: "https://mern-notes-frontend-pink.vercel.app",
      sourceLink: "https://github.com/Talha-Ali150/mern-notes",
    },
  ];
  return (
    <div id="projects">
      <Heading heading={`PROJECTS`} />
      <div className="projectsSectionMainContainer flex flex-col justify-center w-[70%] mx-auto lg:flex lg:flex-row lg:flex-wrap">
        {data.map((item, index) => {
          return <ProjectsCard item={item} key={index} />;
        })}
      </div>
    </div>
  );
};

export default ProjectsSection;
