import React from "react";
import { usePortfolioContent } from "../../data/PortfolioContext";

const HeroSection = () => {
  const { profile, headings, sections } = usePortfolioContent();
  return (
  <section className="hero section-shell" id="home" aria-labelledby="hero-title">
    <div className="hero-copy">
      <p className="eyebrow"><span className="status-dot" /> {profile.availability}</p>
      <h1 id="hero-title">Hi, I’m <span>{profile.name.split(" ")[0]}.</span></h1>
      <p className="hero-role">{profile.role}</p>
      <p className="hero-summary">{profile.summary}</p>
      <div className="hero-actions">
        <a className="button button-primary" href={`mailto:${profile.email}`}>{headings.heroCta} <span aria-hidden="true">↗</span></a>
        {sections.projects && <a className="button button-quiet" href="#projects">{headings.workCta} <span aria-hidden="true">↓</span></a>}
      </div>
    </div>
    <div className="hero-visual">
      <div className="hero-orbit" aria-hidden="true" />
      <img src={profile.portrait} alt={profile.name} />
      <span className="hero-caption">full-stack developer · {profile.location}</span>
    </div>
  </section>
  );
};

export default HeroSection;
