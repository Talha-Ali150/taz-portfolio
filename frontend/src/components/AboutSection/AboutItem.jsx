import React from "react";
import { BsCursorFill } from "react-icons/bs";

const AboutItem = ({ heading, para }) => (
  <article className="about-item">
    <span className="about-icon" aria-hidden="true"><BsCursorFill /></span>
    <div><h3>{heading}</h3><p>{para}</p></div>
  </article>
);

export default AboutItem;
