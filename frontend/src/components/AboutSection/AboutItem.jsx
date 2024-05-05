import React from "react";
import { BsCursorFill } from "react-icons/bs";

const AboutItem = ({heading, para}) => {
  return (
    <div className="flex items-center p-3  w-[100%] bg-gradient-to-r from-black to-blue-500 rounded-2xl my-3 lg:w-[80%]">
      <div className="m-2">
        <BsCursorFill className="text-3xl"/>
      </div>
      <div className="m-2">
        <p className="text-base">{heading}</p>
        <p className="text-base">{para}</p>
      </div>
    </div>
  );
};

export default AboutItem;
