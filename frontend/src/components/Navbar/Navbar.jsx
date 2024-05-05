import React, { useState } from "react";
import { IoMenu } from "react-icons/io5";
import { IoClose } from "react-icons/io5";

const Navbar = () => {
  const [isMobile, setIsMobile] = useState(true);
  return (
    <nav className="navbarMainContainer flex flex-col items-center lg:flex lg:flex-row lg:items-center lg:justify-between lg:mt-3">
      <div>
        <h1
          className="
        text-sky-500 text-3xl p-3
         "
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
        <li className="my-1 cursor-pointer text-2xl  font-medium hover:font-bold hover:text-black transition-all duration-300">
          About
        </li>
        <li className="my-1 cursor-pointer text-2xl  font-medium hover:font-bold hover:text-black transition-all duration-300">
          Experience
        </li>
        <li className="my-1 cursor-pointer text-2xl  font-medium hover:font-bold hover:text-black transition-all duration-300">
          Projects
        </li>
        <li className="my-1 cursor-pointer text-2xl  font-medium hover:font-bold hover:text-black transition-all duration-300">
          Contact
        </li>
      </ul>
    </nav>
  );
};

export default Navbar;
