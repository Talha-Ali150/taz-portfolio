import React from "react";

const ProjectsCard = ({ item }) => {
  return (
    <div className="text-white projectsCardMainContainer bg-gradient-to-r from-black to-blue-500 w-[300px] h-[400px]  flex flex-col items-center rounded-xl my-3 mx-5">
      <img
        className="rounded-xl mt-3 w-[280px] h-[200px] "
        alt="project thumbnail"
        src={item.pic}
      />
      <p className="mt-5">{item.heading}</p>
      <p className="my-3 w-[80%] mx-auto">{item.para}</p>
      <div>
        <button
          className="p-2 mx-3 bg-black rounded-xl"
          onClick={() => {
            window.open(`${item.demoLink}`, "_blank");
          }}
        >
          Demo
        </button>
        <button
          className="p-2 mx-3 bg-black rounded-xl"
          onClick={() => {
            if (!item.sourceLink) {
              return window.alert("client did not allow to share source code");
            }
            window.open(`${item.sourceLink}`, "_blank");
          }}
        >
          Source
        </button>
      </div>
    </div>
  );
};

export default ProjectsCard;
