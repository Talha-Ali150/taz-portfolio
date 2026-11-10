import React from "react";
import Heading from "../Heading/Heading";
import ProjectsCard from "./ProjectsCard";
import { usePortfolioContent } from "../../data/PortfolioContext";

const ProjectsSection = () => {
  const { projects, headings } = usePortfolioContent();
  return (
    <section id="projects" className="content-section section-shell" aria-labelledby="projects-heading">
      <Heading heading={headings.projects} kicker="MY WORK" id="projects-heading" />
      <div className="projects-grid">{projects.map((item) => <ProjectsCard item={item} key={item.id} />)}</div>
    </section>
  );
};

export default ProjectsSection;
