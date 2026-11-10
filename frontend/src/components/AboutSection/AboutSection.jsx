import React from "react";
import AboutItem from "./AboutItem";
import Heading from "../Heading/Heading";
import { usePortfolioContent } from "../../data/PortfolioContext";

const AboutSection = () => {
  const { about, headings } = usePortfolioContent();
  return (
  <section id="about" className="content-section section-shell" aria-labelledby="about-heading">
    <Heading heading={headings.about} kicker="ABOUT" id="about-heading" />
    <div className="about-layout">
      <p className="about-intro">{about.intro}</p>
      <div className="about-items">
        {about.capabilities.map((item, index) => <AboutItem key={`${item.title}-${index}`} heading={item.title} para={item.description} />)}
      </div>
    </div>
  </section>
  );
};

export default AboutSection;
