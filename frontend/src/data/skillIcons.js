import {
  FiAward,
  FiBox,
  FiCloud,
  FiCode,
  FiCommand,
  FiCpu,
  FiDatabase,
  FiGitBranch,
  FiGlobe,
  FiLayers,
  FiLock,
  FiMonitor,
  FiPackage,
  FiSearch,
  FiServer,
  FiSettings,
  FiShield,
  FiSmartphone,
  FiTerminal,
  FiTool,
  FiTrendingUp,
  FiZap,
} from "react-icons/fi";
import {
  SiCss3,
  SiDjango,
  SiExpress,
  SiFirebase,
  SiGraphql,
  SiHtml5,
  SiJavascript,
  SiMongodb,
  SiNodedotjs,
  SiPython,
  SiReact,
  SiTailwindcss,
} from "react-icons/si";

export const skillIconOptions = [
  { key: "code", label: "Code", Icon: FiCode },
  { key: "html5", label: "HTML5", Icon: SiHtml5 },
  { key: "css3", label: "CSS3", Icon: SiCss3 },
  { key: "tailwind", label: "Tailwind CSS", Icon: SiTailwindcss },
  { key: "javascript", label: "JavaScript", Icon: SiJavascript },
  { key: "react", label: "React", Icon: SiReact },
  { key: "nodejs", label: "Node.js", Icon: SiNodedotjs },
  { key: "express", label: "Express", Icon: SiExpress },
  { key: "python", label: "Python", Icon: SiPython },
  { key: "django", label: "Django", Icon: SiDjango },
  { key: "mongodb", label: "MongoDB", Icon: SiMongodb },
  { key: "firebase", label: "Firebase", Icon: SiFirebase },
  { key: "graphql", label: "GraphQL", Icon: SiGraphql },
  { key: "database", label: "Database", Icon: FiDatabase },
  { key: "server", label: "Server", Icon: FiServer },
  { key: "cloud", label: "Cloud", Icon: FiCloud },
  { key: "git", label: "Git / branching", Icon: FiGitBranch },
  { key: "terminal", label: "Terminal", Icon: FiTerminal },
  { key: "mobile", label: "Mobile", Icon: FiSmartphone },
  { key: "web", label: "Web / globe", Icon: FiGlobe },
  { key: "layers", label: "Layers", Icon: FiLayers },
  { key: "zap", label: "Lightning", Icon: FiZap },
  { key: "cpu", label: "Processor", Icon: FiCpu },
  { key: "box", label: "Box", Icon: FiBox },
  { key: "command", label: "Command line", Icon: FiCommand },
  { key: "award", label: "Award", Icon: FiAward },
  { key: "tool", label: "Tool", Icon: FiTool },
  { key: "monitor", label: "Monitor", Icon: FiMonitor },
  { key: "package", label: "Package", Icon: FiPackage },
  { key: "settings", label: "Settings", Icon: FiSettings },
  { key: "shield", label: "Security", Icon: FiShield },
  { key: "lock", label: "Lock", Icon: FiLock },
  { key: "search", label: "Search", Icon: FiSearch },
  { key: "trending", label: "Trending", Icon: FiTrendingUp },
];

const iconByKey = new Map(skillIconOptions.map(({ key, Icon }) => [key, Icon]));
const legacySkillIconKeys = {
  HTML: "html5",
  CSS: "css3",
  "Tailwind CSS": "tailwind",
  JavaScript: "javascript",
  React: "react",
  "React Native": "react",
  "Node.js": "nodejs",
  Express: "express",
  Python: "python",
  Django: "django",
  MongoDB: "mongodb",
  Firebase: "firebase",
  GraphQL: "graphql",
};

const iconSetLoaders = {
  ai: () => import("react-icons/ai"),
  bi: () => import("react-icons/bi"),
  bs: () => import("react-icons/bs"),
  cg: () => import("react-icons/cg"),
  ci: () => import("react-icons/ci"),
  di: () => import("react-icons/di"),
  fa: () => import("react-icons/fa"),
  fa6: () => import("react-icons/fa6"),
  fc: () => import("react-icons/fc"),
  fi: () => import("react-icons/fi"),
  gi: () => import("react-icons/gi"),
  go: () => import("react-icons/go"),
  gr: () => import("react-icons/gr"),
  hi: () => import("react-icons/hi"),
  hi2: () => import("react-icons/hi2"),
  im: () => import("react-icons/im"),
  io: () => import("react-icons/io"),
  io5: () => import("react-icons/io5"),
  lia: () => import("react-icons/lia"),
  lu: () => import("react-icons/lu"),
  md: () => import("react-icons/md"),
  pi: () => import("react-icons/pi"),
  ri: () => import("react-icons/ri"),
  rx: () => import("react-icons/rx"),
  si: () => import("react-icons/si"),
  sl: () => import("react-icons/sl"),
  tb: () => import("react-icons/tb"),
  tfi: () => import("react-icons/tfi"),
  ti: () => import("react-icons/ti"),
  vsc: () => import("react-icons/vsc"),
  wi: () => import("react-icons/wi"),
};
const iconSetByPrefix = {
  Ai: ["ai"],
  Bi: ["bi"],
  Bs: ["bs"],
  Cg: ["cg"],
  Ci: ["ci"],
  Di: ["di"],
  Fa: ["fa6", "fa"],
  Fc: ["fc"],
  Fi: ["fi"],
  Gi: ["gi"],
  Go: ["go"],
  Gr: ["gr"],
  Hi: ["hi2", "hi"],
  Im: ["im"],
  Io: ["io5", "io"],
  Lia: ["lia"],
  Lu: ["lu"],
  Md: ["md"],
  Pi: ["pi"],
  Ri: ["ri"],
  Rx: ["rx"],
  Si: ["si"],
  Sl: ["sl"],
  Tb: ["tb"],
  Tfi: ["tfi"],
  Ti: ["ti"],
  Vsc: ["vsc"],
  Wi: ["wi"],
};

export const getSkillIconKey = (skill) => legacySkillIconKeys[skill] || "code";
export const isSkillIconKey = (key) => iconByKey.has(key);
export const getSkillIcon = (key) => iconByKey.get(key) || FiCode;

// React Icons exports renderable icon components as functions. Be deliberately
// strict here: module namespace objects and other named exports must never be
// passed through to JSX as an element type.
export const isValidSkillIconComponent = (candidate) => typeof candidate === "function";

const parseSkillIcon = (value) => {
  const reference = value.trim();
  const separator = reference.indexOf(":");
  if (separator !== -1) {
    const set = reference.slice(0, separator).toLowerCase();
    const name = reference.slice(separator + 1);
    if (iconSetLoaders[set] && /^[A-Z][A-Za-z0-9]*$/.test(name)) return { name, sets: [set] };
    throw new Error(`Use an icon name like FaGithub or a set-qualified name like fa:FaGithub.`);
  }

  const prefix = Object.keys(iconSetByPrefix)
    .sort((left, right) => right.length - left.length)
    .find((candidate) => reference.startsWith(candidate) && /^[A-Z][A-Za-z0-9]*$/.test(reference));
  if (!prefix) throw new Error(`"${reference}" is not a supported React Icons export name.`);
  return { name: reference, sets: iconSetByPrefix[prefix] };
};

const loadedIconSets = new Map();
const loadIconSet = (set) => {
  if (!loadedIconSets.has(set)) loadedIconSets.set(set, iconSetLoaders[set]());
  return loadedIconSets.get(set);
};

export const loadSkillIcon = async (value) => {
  if (typeof value !== "string" || !value.trim()) {
    throw new Error("Choose a valid React Icons component name.");
  }
  if (iconByKey.has(value)) return iconByKey.get(value);
  const { name, sets } = parseSkillIcon(value);
  for (const set of sets) {
    const icons = await loadIconSet(set);
    if (isValidSkillIconComponent(icons[name])) return icons[name];
    if (icons[name]) throw new Error(`${name} exists in React Icons, but it is not an icon component.`);
  }
  throw new Error(`Could not find ${name} in the React Icons set${sets.length > 1 ? "s" : ""} ${sets.join(", ")}.`);
};

export const isSkillIconReference = (value) => typeof value === "string" && value.trim().length > 0;
