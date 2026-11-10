import React, { useState } from "react";
import { IoMenu, IoClose } from "react-icons/io5";
import { usePortfolioContent } from "../../data/PortfolioContext";
import ThemeToggle from "../../theme/ThemeToggle";

const links = [
  ["About", "#about", "about"],
  ["Experience", "#experience", "skills"],
  ["Projects", "#projects", "projects"],
  ["Contact", "#contact", "contact"],
];

const Navbar = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const { profile, sections } = usePortfolioContent();

  return (
    <header className="site-header">
      <nav className="navbar" aria-label="Main navigation">
        <a className="brand" href="#home" onClick={() => setMenuOpen(false)}>
          {profile.name.split(" ")[0].toUpperCase()}<span>.</span>
        </a>
        <ul id="primary-navigation" className={`nav-links${menuOpen ? " is-open" : ""}`}>
          {links.filter(([, , section]) => sections[section]).map(([label, href]) => (
            <li key={href}>
              <a href={href} onClick={() => setMenuOpen(false)}>{label}</a>
            </li>
          ))}
        </ul>
        <div className="navbar-controls">
          <ThemeToggle />
          <button
            className="menu-toggle"
            type="button"
            aria-label={menuOpen ? "Close navigation menu" : "Open navigation menu"}
            aria-expanded={menuOpen}
            aria-controls="primary-navigation"
            onClick={() => setMenuOpen((open) => !open)}
          >
            {menuOpen ? <IoClose aria-hidden="true" /> : <IoMenu aria-hidden="true" />}
          </button>
        </div>
      </nav>
    </header>
  );
};

export default Navbar;
