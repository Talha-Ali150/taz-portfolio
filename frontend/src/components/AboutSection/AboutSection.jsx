import React from "react";
import AboutItem from "./AboutItem";
import Heading from "../Heading/Heading";

const AboutSection = () => {
  return (
    <div id="about">
      <Heading heading={`ABOUT`} />
      <div className="aboutSectionMainContainer flex items-center w-[90vw] mx-auto   text-white rounded-2xl lg:w-[80vw]">
        {/* <div className="hidden lg:w-[55%] lg:flex">
          <img
            alt="about section avatar"
            className="flex w-[80%] rounded-full "
            src={require("../../assets/propic.jpg")}
          />
        </div> */}
        <div className="w-[100%] mx-auto lg:w-[45%] lg:mx-auto">
          <AboutItem
            heading={`Frontend Developer`}
            para={`I'm a frontend developer with experience in building responsive and optimized web sites`}
          />
          <AboutItem
            heading={`Backend Developer`}
            para={`I have experience developing fast and
optimised back-end systems and APIs`}
          />
        </div>
      </div>
    </div>
  );
};

export default AboutSection;
