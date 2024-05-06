import React from "react";
import Navbar from "./components/Navbar/Navbar";
import HeroSection from "./components/HeroSection/HeroSection";
import AboutSection from "./components/AboutSection/AboutSection";
import ExperienceSection from "./components/ExperienceSection/ExperienceSection";
import ProjectsSection from "./components/ProjectsSection/ProjectsSection";

const App = () => {
  return (
    <>
      <Navbar />
      <HeroSection />
      <AboutSection />
      <ExperienceSection />
      <ProjectsSection />
    </>
  );
};

export default App;
