import React from "react";

const Heading = ({ heading, kicker, id }) => (
  <div className="section-heading">
    {kicker && <p className="eyebrow">{kicker}</p>}
    <h2 id={id}>{heading}</h2>
  </div>
);

export default Heading;
