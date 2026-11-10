import React from "react";
import { SiGmail, SiLinkedin, SiGithub } from "react-icons/si";
import { usePortfolioContent } from "../../data/PortfolioContext";

const ContactSection = () => {
  const { profile, headings } = usePortfolioContent();
  return (
    <footer className="contact-section" id="contact" aria-labelledby="contact-heading">
      <div className="contact-inner section-shell">
        <div><p className="eyebrow">GET IN TOUCH</p><h2 id="contact-heading">{headings.contact}</h2><p className="contact-copy">{headings.contactNote}</p></div>
        <div className="contact-links">
          <a href={`mailto:${profile.email}`}><SiGmail aria-hidden="true" />Email me <span aria-hidden="true">↗</span></a>
          <a href={profile.linkedIn} target="_blank" rel="noopener noreferrer"><SiLinkedin aria-hidden="true" />LinkedIn <span aria-hidden="true">↗</span></a>
          <a href={profile.github} target="_blank" rel="noopener noreferrer"><SiGithub aria-hidden="true" />GitHub <span aria-hidden="true">↗</span></a>
        </div>
      </div>
      <div className="footer-note section-shell"><span>© {new Date().getFullYear()} {profile.name}</span><a href="#home">Back to top ↑</a></div>
    </footer>
  );
};

export default ContactSection;
