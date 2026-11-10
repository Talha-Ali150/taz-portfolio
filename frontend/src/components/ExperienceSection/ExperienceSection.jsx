import React from "react";
import Heading from "../Heading/Heading";
import { usePortfolioContent } from "../../data/PortfolioContext";
import SkillIcon from "../SkillIcon";
import { getSkillIconKey } from "../../data/skillIcons";

const ExperienceSection = () => {
  const { skills, skillIcons = [], headings } = usePortfolioContent();
  return (
    <section id="experience" className="content-section section-shell" aria-labelledby="experience-heading">
      <Heading heading={headings.skills} kicker="EXPERIENCE & SKILLS" id="experience-heading" />
      <ul className="skills-grid">
        {skills.map((name, index) => <li className="skill-card" key={`${name}-${index}`}><SkillIcon icon={skillIcons[index] || getSkillIconKey(name)} /><span>{name}</span></li>)}
      </ul>
    </section>
  );
};

export default ExperienceSection;
