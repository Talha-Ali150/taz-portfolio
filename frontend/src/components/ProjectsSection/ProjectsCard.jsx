import React from "react";

const ProjectsCard = () => {
  return (
    <div className="text-white projectsCardMainContainer bg-gradient-to-r from-black to-blue-500 w-[400px] h-[400px]  flex flex-col items-center rounded-xl">
      <img
        className="rounded-xl mt-3 w-[300px] h-[200px] "
        alt="project thumbnail"
        src={require("../../assets/pic1.png")}
      />
      <p className="mt-5">Turo Frontend</p>
      <p className="my-3 w-[80%] mx-auto">
        This is a project made to explore antd library and media queries.
      </p>
      <div>
        <button
          className="p-2 mx-3 bg-black rounded-xl"
          onClick={() => {
            window.open("https://turo.vercel.app","_blank");
          }}
        >
          Demo
        </button>
        <button
          className="p-2 mx-3 bg-black rounded-xl"
          onClick={() => {
            window.open("https://github.com/Talha-Ali150/turo", "_blank");
          }}
        >
          Source
        </button>
      </div>
    </div>
  );
};

export default ProjectsCard;
