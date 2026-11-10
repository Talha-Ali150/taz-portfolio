import React from "react";

const ProjectsCard = ({ item }) => (
  <article className="project-card">
    <a className="project-image-link" href={item.demoUrl} target="_blank" rel="noopener noreferrer" aria-label={`View ${item.title} demo`}>
      <img className="project-image" alt={`${item.title} project preview`} src={item.image} loading="lazy" />
    </a>
    <div className="project-content">
      <h3>{item.title}</h3>
      <p>{item.description}</p>
      <div className="project-links">
        <a className="text-link" href={item.demoUrl} target="_blank" rel="noopener noreferrer">Live demo <span aria-hidden="true">↗</span></a>
        {item.sourceUrl ? <a className="text-link" href={item.sourceUrl} target="_blank" rel="noopener noreferrer">Source code <span aria-hidden="true">↗</span></a> : <span className="private-note">Source unavailable</span>}
      </div>
    </div>
  </article>
);

export default ProjectsCard;
