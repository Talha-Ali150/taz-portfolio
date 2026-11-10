import React, { useEffect } from "react";
import Navbar from "./components/Navbar/Navbar";
import HeroSection from "./components/HeroSection/HeroSection";
import AboutSection from "./components/AboutSection/AboutSection";
import ExperienceSection from "./components/ExperienceSection/ExperienceSection";
import ProjectsSection from "./components/ProjectsSection/ProjectsSection";
import ContactSection from "./components/ContactSection/ContactSection";
import { PortfolioProvider, usePortfolioContent } from "./data/PortfolioContext";
import AdminDashboard from "./admin/AdminDashboard";
import { ThemeProvider } from "./theme/ThemeContext";

const PublicPortfolio = () => {
  const { sections, seo } = usePortfolioContent();
  useEffect(() => {
    document.title = seo.title;
    const description = document.querySelector('meta[name="description"]');
    if (description) description.setAttribute("content", seo.description);
  }, [seo.title, seo.description]);
  return <>
      <Navbar />
      <HeroSection />
      {sections.about && <AboutSection />}
      {sections.skills && <ExperienceSection />}
      {sections.projects && <ProjectsSection />}
      {sections.contact && <ContactSection />}
    </>;
};

const App = () => {
  const isAdmin = window.location.pathname === "/admin" || window.location.pathname.startsWith("/admin/");
  return (
    <ThemeProvider>
      {isAdmin ? <AdminDashboard /> : <PortfolioProvider><PublicPortfolio /></PortfolioProvider>}
    </ThemeProvider>
  );
};

export default App;
