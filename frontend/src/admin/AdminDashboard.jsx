import React, { useEffect, useMemo, useState } from "react";
import { FiArrowDown, FiArrowLeft, FiArrowUp, FiCheck, FiLogOut, FiPlus, FiSave, FiTrash2 } from "react-icons/fi";
import defaults, { mergeContent } from "../data/defaultContent";
import { getSkillIconKey, loadSkillIcon } from "../data/skillIcons";
import ThemeToggle from "../theme/ThemeToggle";
import ImageUploadControl from "./ImageUploadControl";
import SkillIcon from "../components/SkillIcon";
import "./AdminDashboard.css";

const API = process.env.REACT_APP_API_URL || "";
const tabs = ["Overview", "Profile & contact", "About", "Skills", "Projects"];
const blankProject = () => ({ id: `project-${Date.now()}`, title: "New project", description: "", image: "", demoUrl: "", sourceUrl: "" });
const readApiJson = async (response) => {
  if (!response.headers.get("content-type")?.includes("application/json")) throw new Error("The portfolio API is unavailable. Start the backend and try again.");
  return response.json();
};

const AdminDashboard = () => {
  const [authenticated, setAuthenticated] = useState(false);
  const [checking, setChecking] = useState(true);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [content, setContent] = useState(defaults);
  const [activeTab, setActiveTab] = useState("Overview");
  const [notice, setNotice] = useState("");
  const [busy, setBusy] = useState(false);

  useEffect(() => {
    fetch(`${API}/api/admin/session`, { credentials: "include" })
      .then((response) => { if (response.ok && response.headers.get("content-type")?.includes("application/json")) setAuthenticated(true); })
      .catch(() => {})
      .finally(() => setChecking(false));
  }, []);

  useEffect(() => {
    if (!authenticated) return;
    fetch(`${API}/api/content`)
      .then((response) => response.ok ? readApiJson(response) : null)
      .then((stored) => { if (stored) setContent(mergeContent(stored)); })
      .catch(() => setNotice("Could not reach the API. Check the backend is running."));
  }, [authenticated]);

  const projectCount = useMemo(() => content.projects.length, [content.projects.length]);
  const updateProfile = (key, value) => setContent((current) => ({ ...current, profile: { ...current.profile, [key]: value } }));
  const updateHeading = (key, value) => setContent((current) => ({ ...current, headings: { ...current.headings, [key]: value } }));
  const updateAbout = (key, value) => setContent((current) => ({ ...current, about: { ...current.about, [key]: value } }));
  const updateCapability = (index, key, value) => setContent((current) => ({ ...current, about: { ...current.about, capabilities: current.about.capabilities.map((item, i) => i === index ? { ...item, [key]: value } : item) } }));
  const updateProject = (index, key, value) => setContent((current) => ({ ...current, projects: current.projects.map((item, i) => i === index ? { ...item, [key]: value } : item) }));
  const moveProject = (index, direction) => setContent((current) => {
    const targetIndex = index + direction;
    if (targetIndex < 0 || targetIndex >= current.projects.length) return current;
    const projects = [...current.projects];
    [projects[index], projects[targetIndex]] = [projects[targetIndex], projects[index]];
    return { ...current, projects };
  });

  const signIn = async (event) => {
    event.preventDefault(); setBusy(true); setNotice("");
    try {
      const response = await fetch(`${API}/api/admin/login`, { method: "POST", credentials: "include", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ email, password }) });
      const result = await readApiJson(response);
      if (!response.ok) throw new Error(result.error || "Sign in failed.");
      setAuthenticated(true); setPassword("");
    } catch (error) { setNotice(error.message || "Could not reach the API. Check the backend is running."); }
    finally { setBusy(false); }
  };

  const publish = async () => {
    setBusy(true); setNotice("");
    try {
      await Promise.all(content.skillIcons.map(loadSkillIcon));
      const response = await fetch(`${API}/api/content`, { method: "PUT", credentials: "include", headers: { "Content-Type": "application/json" }, body: JSON.stringify(content) });
      const result = await readApiJson(response);
      if (!response.ok) throw new Error(result.error || "Could not publish changes.");
      setNotice("Your portfolio is updated and live.");
    } catch (error) { setNotice(error.message || "Could not reach the API. Check the backend is running."); }
    finally { setBusy(false); }
  };

  const signOut = async () => {
    await fetch(`${API}/api/admin/logout`, { method: "POST", credentials: "include" }).catch(() => {});
    setAuthenticated(false);
  };

  if (checking) return <main className="admin-loading">Checking admin session…</main>;
  if (!authenticated) return (
    <main className="admin-login-wrap">
      <form className="admin-login" onSubmit={signIn}>
        <div className="admin-login-tools"><a href="/" className="admin-back"><FiArrowLeft aria-hidden="true" /> Back to portfolio</a><ThemeToggle /></div>
        <p className="admin-kicker">PORTFOLIO CONTROL</p><h1>Welcome back.</h1>
        <p className="admin-subtitle">Sign in to manage your website content.</p>
        <label>Email address<input type="email" value={email} autoComplete="username" onChange={(event) => setEmail(event.target.value)} required /></label>
        <label>Password<input type="password" value={password} autoComplete="current-password" onChange={(event) => setPassword(event.target.value)} required /></label>
        {notice && <p className="admin-notice error" role="alert">{notice}</p>}
        <button className="admin-primary" disabled={busy}>{busy ? "Signing in…" : "Sign in"}</button>
      </form>
    </main>
  );

  return (
    <div className="admin-shell">
      <aside className="admin-sidebar">
        <a className="admin-logo" href="/">TALHA<span>.</span></a>
        <p className="admin-label">MANAGE WEBSITE</p>
        <nav aria-label="Dashboard sections">{tabs.map((tab) => <button key={tab} className={activeTab === tab ? "active" : ""} onClick={() => setActiveTab(tab)}>{tab}</button>)}</nav>
        <a className="admin-view-site" href="/" target="_blank" rel="noopener noreferrer"><FiArrowLeft aria-hidden="true" /> View live site</a>
      </aside>
      <main className="admin-main">
        <header className="admin-topbar"><div><p className="admin-kicker">WEBSITE SETTINGS</p><h1>{activeTab}</h1></div><div className="admin-top-actions"><ThemeToggle /><button className="admin-logout" onClick={signOut}><FiLogOut aria-hidden="true" /> Sign out</button><button className="admin-primary publish-button" disabled={busy} onClick={publish}><FiSave aria-hidden="true" /> {busy ? "Publishing…" : "Publish changes"}</button></div></header>
        {notice && <p className="admin-notice success" role="status"><FiCheck aria-hidden="true" /> {notice}</p>}

        {activeTab === "Overview" && <section className="admin-panel"><h2>Portfolio overview</h2><p className="admin-help">Make updates here, then publish to push them live on your public portfolio.</p><div className="admin-stats"><article><span>Projects</span><strong>{projectCount}</strong></article><article><span>Skills</span><strong>{content.skills.length}</strong></article><article><span>About cards</span><strong>{content.about.capabilities.length}</strong></article></div><h3>Website text</h3><div className="admin-form-grid">{[["about", "About section heading"], ["skills", "Skills section heading"], ["projects", "Projects section heading"], ["contact", "Contact headline"], ["heroCta", "Hero contact button"], ["workCta", "Hero projects button"], ["contactNote", "Contact supporting text"]].map(([key, label]) => <label key={key}>{label}<input value={content.headings[key]} onChange={(event) => updateHeading(key, event.target.value)} /></label>)}</div><h3>Search preview</h3><div className="admin-form-grid"><label>Page title<input value={content.seo.title} onChange={(event) => setContent((current) => ({ ...current, seo: { ...current.seo, title: event.target.value } }))} /></label><label>Meta description<input value={content.seo.description} onChange={(event) => setContent((current) => ({ ...current, seo: { ...current.seo, description: event.target.value } }))} /></label></div><h3>Visible sections</h3><div className="admin-visibility">{[["about", "About"], ["skills", "Experience & skills"], ["projects", "Projects"], ["contact", "Contact" ]].map(([key, label]) => <label key={key}><input type="checkbox" checked={content.sections[key]} onChange={(event) => setContent((current) => ({ ...current, sections: { ...current.sections, [key]: event.target.checked } }))} /> Show {label}</label>)}</div></section>}

        {activeTab === "Profile & contact" && <section className="admin-panel"><h2>Profile & contact details</h2><p className="admin-help">These details appear in your hero and contact area. Use a hosted image URL or upload a file.</p><div className="admin-form-grid">{[["name", "Name"], ["role", "Role / headline"], ["availability", "Availability note"], ["location", "Location"], ["email", "Email"], ["linkedIn", "LinkedIn URL"], ["github", "GitHub URL"], ["portrait", "Portrait image URL"]].map(([key, label]) => <label key={key}>{label}<input value={content.profile[key]} onChange={(event) => updateProfile(key, event.target.value)} /></label>)}</div><ImageUploadControl purpose="portrait" onUploaded={(url) => updateProfile("portrait", url)} /><label className="admin-wide">Introduction<textarea rows="4" value={content.profile.summary} onChange={(event) => updateProfile("summary", event.target.value)} /></label>{content.profile.portrait && <img className="admin-portrait-preview" src={content.profile.portrait} alt="Portrait preview" />}</section>}

        {activeTab === "About" && <section className="admin-panel"><h2>About section</h2><label className="admin-wide">Introduction<textarea rows="4" value={content.about.intro} onChange={(event) => updateAbout("intro", event.target.value)} /></label><div className="admin-section-title"><h3>About cards</h3><button className="admin-secondary" onClick={() => updateAbout("capabilities", [...content.about.capabilities, { title: "New capability", description: "" }])}><FiPlus aria-hidden="true" /> Add card</button></div>{content.about.capabilities.map((item, index) => <article className="admin-item-card" key={index}><div className="admin-form-grid"><label>Title<input value={item.title} onChange={(event) => updateCapability(index, "title", event.target.value)} /></label><label>Description<input value={item.description} onChange={(event) => updateCapability(index, "description", event.target.value)} /></label></div><button className="admin-remove" onClick={() => updateAbout("capabilities", content.about.capabilities.filter((_, i) => i !== index))}><FiTrash2 aria-hidden="true" /> Remove</button></article>)}</section>}

        {activeTab === "Skills" && <section className="admin-panel"><h2>Skills & technologies</h2><p className="admin-help">Paste an icon export name from React Icons, such as FaGithub. To choose a specific set for duplicate names, use a prefix like fa:FaGithub.</p><div className="admin-skill-list">{content.skills.map((skill, index) => { const iconName = content.skillIcons?.[index] || getSkillIconKey(skill); return <div className="admin-skill-row" key={index}><input aria-label={`Skill ${index + 1}`} value={skill} onChange={(event) => setContent((current) => ({ ...current, skills: current.skills.map((item, i) => i === index ? event.target.value : item) }))} /><label className="admin-skill-icon-picker"><SkillIcon icon={iconName} showError /><span className="admin-sr-only">React Icons name for {skill || `skill ${index + 1}`}</span><input className="admin-skill-icon-input" aria-label={`React Icons name for ${skill || `skill ${index + 1}`}`} value={iconName} onChange={(event) => setContent((current) => ({ ...current, skillIcons: current.skills.map((_, i) => i === index ? event.target.value : current.skillIcons?.[i] || getSkillIconKey(current.skills[i])) }))} placeholder="FaGithub" /></label><button aria-label={`Remove ${skill || `skill ${index + 1}`}`} className="admin-remove-icon" onClick={() => setContent((current) => ({ ...current, skills: current.skills.filter((_, i) => i !== index), skillIcons: current.skillIcons.filter((_, i) => i !== index) }))}><FiTrash2 /></button></div>; })}</div><div className="admin-skills-actions"><button className="admin-secondary" onClick={() => setContent((current) => ({ ...current, skills: [...current.skills, ""], skillIcons: [...current.skillIcons, "code"] }))}><FiPlus aria-hidden="true" /> Add skill</button><button className="admin-primary" disabled={busy || content.skills.some((skill, index) => !skill.trim() || !content.skillIcons?.[index]?.trim())} onClick={publish}><FiSave aria-hidden="true" /> Save skills</button></div></section>}

        {activeTab === "Projects" && <section className="admin-panel"><div className="admin-section-title"><div><h2>Projects</h2><p className="admin-help">Edit project details, links, and preview image. Add a project or remove one from your portfolio.</p></div><button className="admin-secondary" onClick={() => setContent((current) => ({ ...current, projects: [blankProject(), ...current.projects] }))}><FiPlus aria-hidden="true" /> Add project</button></div>{content.projects.map((item, index) => <article className="admin-project-card" key={item.id || index}><div className="admin-project-head"><h3>{item.title || "New project"}</h3><div className="admin-project-actions"><button type="button" className="admin-secondary admin-order-button" aria-label={`Move ${item.title || "project"} up`} title="Move up" disabled={index === 0} onClick={() => moveProject(index, -1)}><FiArrowUp aria-hidden="true" /></button><button type="button" className="admin-secondary admin-order-button" aria-label={`Move ${item.title || "project"} down`} title="Move down" disabled={index === content.projects.length - 1} onClick={() => moveProject(index, 1)}><FiArrowDown aria-hidden="true" /></button><button className="admin-remove" onClick={() => setContent((current) => ({ ...current, projects: current.projects.filter((_, i) => i !== index) }))}><FiTrash2 aria-hidden="true" /> Remove</button></div></div><div className="admin-form-grid">{[["title", "Project name"], ["image", "Image URL"], ["demoUrl", "Live demo URL"], ["sourceUrl", "Source code URL (optional)"], ["description", "Description"]].map(([key, label]) => <label className={key === "description" ? "admin-wide" : ""} key={key}>{label}{key === "description" ? <textarea rows="3" value={item[key]} onChange={(event) => updateProject(index, key, event.target.value)} /> : <input value={item[key]} onChange={(event) => updateProject(index, key, event.target.value)} />}</label>)}</div><ImageUploadControl purpose="project" onUploaded={(url) => setContent((current) => ({ ...current, projects: current.projects.map((project) => project.id === item.id ? { ...project, image: url } : project) }))} />{item.image && <img className="admin-project-preview" src={item.image} alt={`${item.title} preview`} />}</article>)}</section>}
      </main>
    </div>
  );
};

export default AdminDashboard;
