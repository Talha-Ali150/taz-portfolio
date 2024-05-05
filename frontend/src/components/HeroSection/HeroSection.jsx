import React from "react";

const HeroSection = () => {
  return (
    <div className="heroSectionMainContainer  p-5 flex flex-col-reverse w-[80vw] mx-auto md:w-[70vw] lg:flex lg:flex-row lg:w-[60vw] lg:mx-auto lg:items-center">
      <div>
        <p className="text-7xl my-5">Hi, I'm Talha</p>
        <p className="text-3xl my-5">
          I'm a MERN stack developer with 6 months of experience.
        </p>
        <p className="text-3xl my-5">Reach out if you'd like to learn more!</p>
        <button
          className="text-3xl my-5 bg-black text-white p-4 rounded-3xl"
          onClick={() => {
            window.location.href = "mailto:syed.talha.ali.150@gmail.com";
          }}
        >
          Contact Me
        </button>
      </div>
      <div>
        <img
          src={require("../../assets/avatar.jpg")}
          alt="my hero section avatar"
          className="w-[500px] h-[300px]"
        />
      </div>
    </div>
  );
};

export default HeroSection;
