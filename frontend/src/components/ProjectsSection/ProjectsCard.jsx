import React from "react";

const ProjectsCard = ({ item }) => {
  return (
    <div
      className="text-white projectsCardMainContainer bg-gradient-to-r from-black to-blue-500 
    w-[80vw] h-[60vh] md:w-[60vw] md:h-[60vh]
    
    flex flex-col items-center rounded-xl my-5 mx-5
    "
    >
      <img
        className="rounded-xl mt-3    w-[70vw] h-[30vh]    md:w-[50vw] md:h-[30vh]"
        alt="project thumbnail"
        src={item.pic}
      />
      <p className="mt-5 text-xl">{item.heading}</p>
      <p className="my-3 text-lg w-[80%] mx-auto text-center">{item.para}</p>
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
