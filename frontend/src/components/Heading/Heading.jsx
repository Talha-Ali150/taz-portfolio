import React from "react";

const Heading = ({ heading }) => {
  return (
    <div className="w-[90vw]  mx-auto my-5 lg:w-[70vw] lg:mx-auto">
      <p className="font-medium text-4xl">{heading}</p>
    </div>
  );
};

export default Heading;
