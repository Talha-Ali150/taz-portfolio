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
      pic: require("../../assets/pic1.png"),
      heading: "Turo Frontend",
      para: "This is a project made to explore antd library and media queries.",
      demoLink: "https://turo.vercel.app",
      sourceLink: "https://github.com/Talha-Ali150/turo",
    },
    {
      pic: require("../../assets/pic1.png"),
      heading: "Turo Frontend",
      para: "This is a project made to explore antd library and media queries.",
      demoLink: "https://turo.vercel.app",
      sourceLink: "https://github.com/Talha-Ali150/turo",
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
