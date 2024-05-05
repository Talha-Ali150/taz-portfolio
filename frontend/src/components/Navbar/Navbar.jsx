import React from "react";

const Navbar = () => {
  return (
    <nav className="navbarMainContainer flex flex-col items-center lg:flex lg:flex-row lg:items-center lg:justify-between lg:mt-3">
      <div>
        <h1 className="text-sky-500 text-4xl p-3 ">PORTFOLIO</h1>
      </div>
      <ul className="flex flex-col w-[100vw] items-center lg:flex lg:flex-row lg:justify-around lg:p-3 lg:w-[60vw]">
        <li className="cursor-pointer text-lg  font-medium hover:font-bold hover:text-black transition-all duration-300">
          About
        </li>
        <li className="cursor-pointer text-lg  font-medium hover:font-bold hover:text-black transition-all duration-300">
          Experience
        </li>
        <li className="cursor-pointer text-lg  font-medium hover:font-bold hover:text-black transition-all duration-300">
          Projects
        </li>
        <li className="cursor-pointer text-lg  font-medium hover:font-bold hover:text-black transition-all duration-300">
          Contact
        </li>
      </ul>
    </nav>
  );
};

export default Navbar;
