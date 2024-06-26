import React, { useState } from "react";
import { IoMenu } from "react-icons/io5";
import { IoClose } from "react-icons/io5";

const Navbar = () => {
  const [isMobile, setIsMobile] = useState(true);
  return (
    <nav className="navbarMainContainer flex flex-col items-center lg:flex lg:flex-row lg:items-center lg:justify-between lg:mt-3">
      <div>
        <h1
          style={{
            background: "linear-gradient(to right, #02050a, #3a7ff2)",
            color: "transparent",
            WebkitBackgroundClip: "text",
          }}
          className="text-3xl p-3"
        >
          PORTFOLIO
        </h1>
      </div>

      <div>
        {isMobile ? (
          <IoMenu
            className="text-5xl lg:hidden"
            onClick={() => setIsMobile(!isMobile)}
          />
        ) : (
          <IoClose
            className="text-5xl lg:hidden"
            onClick={() => setIsMobile(!isMobile)}
          />
        )}
      </div>

      <ul
        className={` ${
          isMobile && "hidden"
        } flex flex-col w-[100vw] items-center lg:flex lg:flex-row lg:justify-around lg:p-3 lg:w-[60vw]`}
      >
        <li
          className="my-1 cursor-pointer text-2xl  font-medium hover:font-bold hover:text-black transition-all duration-300"
          onClick={() => {
            window.location.href = "#about";
          }}
        >
          About
        </li>
        <li
          onClick={() => {
            window.location.href = "#experience";
          }}
          className="my-1 cursor-pointer text-2xl  font-medium hover:font-bold hover:text-black transition-all duration-300"
        >
          Experience
        </li>
        <li
          onClick={() => {
            window.location.href = "#projects";
          }}
          className="my-1 cursor-pointer text-2xl  font-medium hover:font-bold hover:text-black transition-all duration-300"
        >
          Projects
        </li>
        <li
          onClick={() => {
            window.location.href = "#contact";
          }}
          className="my-1 cursor-pointer text-2xl  font-medium hover:font-bold hover:text-black transition-all duration-300"
        >
          Contact
        </li>
      </ul>
    </nav>
  );
};

export default Navbar;
