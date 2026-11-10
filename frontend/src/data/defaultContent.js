import { getSkillIconKey, isSkillIconReference } from "./skillIcons";

const defaultSkills = ["HTML", "CSS", "Tailwind CSS", "JavaScript", "React", "React Native", "Node.js", "Express", "Python", "Django", "MongoDB", "Firebase", "GraphQL"];

const content = {
  seo: { title: "Talha Ali | Full Stack Developer", description: "Talha Ali is a full stack developer building thoughtful, responsive digital experiences with React, Node.js, and MongoDB." },
  profile: {
    name: "Talha Ali",
    role: "Full stack developer building thoughtful digital experiences.",
    summary: "I’m a MERN stack developer with over a year of experience creating responsive interfaces and useful web applications.",
    availability: "Available for opportunities",
    location: "Pakistan",
    portrait: "https://res.cloudinary.com/mern-notes/image/upload/c_limit,f_auto,q_auto,w_1200/v1/true-north/propic-jpg?_a=BAMAROa40",
    email: "syed.talha.ali.150@gmail.com",
    linkedIn: "https://www.linkedin.com/in/sssyedtalhaali",
    github: "https://github.com/Talha-Ali150",
  },
  headings: { about: "A little about me", skills: "Tools I work with", projects: "Selected projects", contact: "Have a project in mind?", heroCta: "Let’s talk", workCta: "Explore my work", contactNote: "I’d love to hear what you’re working on." },
  sections: { about: true, skills: true, projects: true, contact: true },
  about: {
    intro: "I enjoy turning ideas into clean, accessible products. From the first sketch to the final API, I care about making every part of the experience feel considered.",
    capabilities: [
      { title: "Frontend development", description: "Responsive, accessible interfaces built with React and modern CSS." },
      { title: "Backend development", description: "Reliable APIs and data-driven applications with Node, Express, and MongoDB." },
    ],
  },
  skills: defaultSkills,
  skillIcons: defaultSkills.map(getSkillIconKey),
  projects: [
    { id: "turo", title: "Turo Frontend", description: "A responsive car rental experience built to explore Ant Design and media queries.", image: "https://res.cloudinary.com/mern-notes/image/upload/c_limit,f_auto,q_auto,w_1600/v1/true-north/pic1?_a=BAMAROa40", demoUrl: "https://turo.vercel.app", sourceUrl: "https://github.com/Talha-Ali150/turo" },
    { id: "estore", title: "E-Store", description: "An online store project focused on authentication and the shopping experience.", image: "https://res.cloudinary.com/mern-notes/image/upload/c_limit,f_auto,q_auto,w_1600/v1/true-north/pic2?_a=BAMAROa40", demoUrl: "https://e-store-frontend-nine.vercel.app", sourceUrl: "https://github.com/Talha-Ali150/e-store" },
    { id: "corporate-prism", title: "Corporate Prism", description: "A corporate website with a custom visual treatment built around a UI library.", image: "https://res.cloudinary.com/mern-notes/image/upload/c_limit,f_auto,q_auto,w_1600/v1/true-north/pic3?_a=BAMAROa40", demoUrl: "https://corporateprism.com", sourceUrl: "" },
    { id: "chat-app", title: "Realtime Chat App", description: "A real-time messaging app powered by Firebase.", image: "https://res.cloudinary.com/mern-notes/image/upload/c_limit,f_auto,q_auto,w_1600/v1/true-north/pic9?_a=BAMAROa40", demoUrl: "https://realtime-chat-app-khaki-five.vercel.app/login", sourceUrl: "https://github.com/Talha-Ali150/realtime-chat-app" },
    { id: "todo-notes", title: "TO-DO Notes", description: "A notes and task app built with the MERN stack.", image: "https://res.cloudinary.com/mern-notes/image/upload/c_limit,f_auto,q_auto,w_1600/v1/true-north/pic8?_a=BAMAROa40", demoUrl: "https://mern-notes-frontend-pink.vercel.app", sourceUrl: "https://github.com/Talha-Ali150/mern-notes" },
  ],
};

export const mergeContent = (data = {}) => {
  const skills = Array.isArray(data.skills) ? data.skills : content.skills;
  const skillIcons = skills.map((skill, index) => {
    const storedIcon = data.skillIcons?.[index];
    return isSkillIconReference(storedIcon) ? storedIcon : getSkillIconKey(skill);
  });
  return {
    ...content,
    ...data,
    seo: { ...content.seo, ...(data.seo || {}) },
    profile: { ...content.profile, ...(data.profile || {}) },
    headings: { ...content.headings, ...(data.headings || {}) },
    sections: { ...content.sections, ...(data.sections || {}) },
    about: {
      ...content.about,
      ...(data.about || {}),
      capabilities: Array.isArray(data.about?.capabilities) ? data.about.capabilities : content.about.capabilities,
    },
    skills,
    skillIcons,
    projects: Array.isArray(data.projects) ? data.projects : content.projects,
  };
};

export default content;
