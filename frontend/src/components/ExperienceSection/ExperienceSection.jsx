import React from "react";
import { SiHtml5 } from "react-icons/si";
import { SiCss3 } from "react-icons/si";
import { SiReact } from "react-icons/si";
import { SiNodedotjs } from "react-icons/si";
import { SiMongodb } from "react-icons/si";
import { SiFirebase } from "react-icons/si";
import { SiExpress } from "react-icons/si";
import { SiPython } from "react-icons/si";
import { SiDjango } from "react-icons/si";
import { SiGraphql } from "react-icons/si";
import { SiJavascript } from "react-icons/si";
import { SiTailwindcss } from "react-icons/si";
import Heading from "../Heading/Heading";

const ExperienceSection = () => {
  return (
    <div id="experience">
      <Heading heading={`EXPERIENCE`} />
      <div className="experienceSectionMainContainer w-[90vw] mx-auto">
        <div className=" text-white bg-gradient-to-r from-black to-blue-500 rounded-2xl w-[100%]  flex flex-col items-center  lg:flex lg:flex-row lg:justify-around  lg:w-[70vw] lg:mx-auto lg:flex-wrap">
          <div className="flex flex-col items-center">
            <SiHtml5 className="my-3 mx-5 text-9xl text-white bg-black rounded-full" />
            <p className="text-2xl font-medium">HTML</p>
          </div>
          <div className="flex flex-col items-center">
            <SiCss3 className="my-3 mx-5 text-9xl text-white bg-black rounded-full" />
            <p className="text-2xl font-medium">CSS</p>
          </div>
          <div className="flex flex-col items-center">
            <SiTailwindcss className="my-3 mx-5 text-9xl text-white bg-black rounded-full" />
            <p className="text-2xl font-medium">TAILWIND CSS</p>
          </div>
          <div className="flex flex-col items-center">
            <SiJavascript className="my-3 mx-5 text-9xl text-white bg-black rounded-full" />
            <p className="text-2xl font-medium">JS</p>
          </div>
          <div className="flex flex-col items-center">
            <SiReact className="my-3 mx-5 text-9xl text-white bg-black rounded-full" />
            <p className="text-2xl font-medium">REACT</p>
          </div>
          <div className="flex flex-col items-center">
            <SiReact className="my-3 mx-5 text-9xl text-white bg-black rounded-full" />
            <p className="text-2xl font-medium">REACT NATIVE</p>
          </div>
          <div className="flex flex-col items-center">
            <SiNodedotjs className="my-3 mx-5 text-9xl text-white bg-black rounded-full" />
            <p className="text-2xl font-medium">NODE</p>
          </div>
          <div className="flex flex-col items-center">
            <SiExpress className="my-3 mx-5 text-9xl text-white bg-black rounded-full" />
            <p className="text-2xl font-medium">EXPRESS</p>
          </div>
          <div className="flex flex-col items-center">
            <SiPython className="my-3 mx-5 text-9xl text-white bg-black rounded-full" />
            <p className="text-2xl font-medium">PYTHON</p>
          </div>
          <div className="flex flex-col items-center">
            <SiDjango className="my-3 mx-5 text-9xl text-white bg-black rounded-full" />
            <p className="text-2xl font-medium">DJANGO</p>
          </div>
          <div className="flex flex-col items-center">
            <SiMongodb className="my-3 mx-5 text-9xl text-white bg-black rounded-full" />
            <p className="text-2xl font-medium">MONGODB</p>
          </div>
          <div className="flex flex-col items-center">
            <SiFirebase className="my-3 mx-5 text-9xl text-white bg-black rounded-full" />
            <p className="text-2xl font-medium">FIREBASE</p>
          </div>
          <div className="flex flex-col items-center">
            <SiGraphql className="my-3 mx-5 text-9xl text-white bg-black rounded-full" />
            <p className="text-2xl font-medium">GRAPHQL</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ExperienceSection;
