import React from "react";
import { SiGmail } from "react-icons/si";
import { SiLinkedin } from "react-icons/si";
import { SiGithub } from "react-icons/si";

const ContactSection = () => {
  return (
    <div
      className="contactSectionMainContainer bg-black text-white flex flex-col items-center  p-3 lg:flex lg:flex-row lg:justify-around lg:items-center"
      id="contact"
    >
      <div>
        <p className="text-7xl font-bold">Contact</p>
        <p className="text-4xl">Feel free to reach out! </p>
      </div>
      <div>
        <div
          className="flex items-center cursor-pointer my-3 text-2xl font-normal lg:text-4xl"
          onClick={() => {
            window.location.href = "mailto:syed.talha.ali.150@gmail.com";
          }}
        >
          <SiGmail className="mx-2" />
          <p>MAIL</p>
        </div>
        <div
          className="flex items-center cursor-pointer my-3 text-2xl font-normal lg:text-4xl"
          onClick={() => {
            window.open("https://www.linkedin.com/in/sssyedtalhaali", "_blank");
          }}
        >
          <SiLinkedin className="mx-2" />
          <p>LINKEDIN</p>
        </div>
        <div
          className="flex items-center cursor-pointer my-3 text-2xl font-normal lg:text-4xl"
          onClick={() => {
            window.open("https://github.com/Talha-Ali150", "_blank");
          }}
        >
          <SiGithub className="mx-2" />
          <p>GITHUB</p>
        </div>
      </div>
    </div>
  );
};

export default ContactSection;
