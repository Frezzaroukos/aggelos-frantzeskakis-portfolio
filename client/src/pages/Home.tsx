import { AnimatePresence, motion, useReducedMotion, useScroll, useTransform } from "framer-motion";
import {
  ArrowDown,
  ArrowLeft,
  ArrowRight,
  ArrowUpRight,
  Check,
  ChevronRight,
  Clipboard,
  Code2,
  Command,
  ExternalLink,
  Github,
  Layers3,
  Menu,
  Moon,
  MousePointer2,
  Orbit,
  PanelTop,
  Search,
  Sparkles,
  Sun,
  X,
  Zap,
} from "lucide-react";
import { useEffect, useMemo, useRef, useState, type PointerEvent as ReactPointerEvent, type ReactNode } from "react";
import { getGitHubData, type GitHubRepository } from "@/data/loader";

/**
 * Angelos Frantzeskakis — vertical cinematic portfolio.
 * This page treats the scroll as a story: arrival, signal, work, system,
 * method, profile, and conversation. Motion is expressive but optional.
 */

const github = getGitHubData();
const profileName = "Angelos Frantzeskakis";
const profileHandle = github.profile.login;
const profileUrl = github.profile.html_url;
const handleUrl = `github.com/${profileHandle}`;
const accent = "#D4AF37";
const chapters = [
  { id: "home", label: "Arrival" },
  { id: "signal", label: "Signal" },
  { id: "work", label: "Selected work" },
  { id: "axon", label: "AXON OS" },
  { id: "method", label: "Method" },
  { id: "about", label: "Profile" },
  { id: "contact", label: "Contact" },
];
const curatedNames = ["axon", "anabasis", "thermidor", "anafora"];
const repositories = github.repositories.filter((repo) => !repo.name.toLowerCase().includes("morfos") && !repo.fork);
const curatedRepos = curatedNames.map((name) => repositories.find((repo) => repo.name.toLowerCase() === name)).filter((repo): repo is GitHubRepository => Boolean(repo));
const publicRepos = repositories.filter((repo) => !repo.private);
const axonRepo = repositories.find((repo) => repo.name.toLowerCase() === "axon");
const ease = [0.22, 1, 0.36, 1] as const;

type RepositoryFilter = "all" | "public" | "private" | "TypeScript";

type ProjectStory = {
  eyebrow: string;
  title: string;
  summary: string;
  detail: string;
  facts: string[];
};

const projectStories: Record<string, ProjectStory> = {
  axon: {
    eyebrow: "Private concept · systems room",
    title: "A cockpit for intelligence.",
    summary: "The repository description positions AXON OSS as a local-first AI Operating System with a multi-provider router, RAG, cost optimization, and a 25-panel cockpit.",
    detail: "AXON is the systems thread of the practice: an attempt to make orchestration visible, composable, and calm. The portfolio shows only the stated direction because the repository itself is private.",
    facts: ["Local-first AI", "Multi-provider router", "RAG", "25-panel cockpit"],
  },
  anabasis: {
    eyebrow: "Public · offline-first PWA",
    title: "Progress as a living map.",
    summary: "A weighted calisthenics and skill-progression tracker built around prerequisite chains, hold-times, technical milestones, and bilingual use.",
    detail: "Anabasis uses IndexedDB/Dexie, strict TypeScript, PWA tooling, local metrics, and a skill tree so training progress feels like a map rather than a single number. It is publicly available and links to anabasis.axonos.dev.",
    facts: ["IndexedDB / Dexie", "Bilingual EN / EL", "Skill tree", "PWA"],
  },
  thermidor: {
    eyebrow: "Public · AI-augmented PWA",
    title: "Everyday data, less friction.",
    summary: "An offline-first calorie tracker with charts, modular features, and an AI assistant that can work across multiple providers.",
    detail: "Thermidor keeps the daily task approachable while leaving room for a richer provider layer: local use, installable PWA behavior, charts, and a modular AI workflow are all named in the repository documentation.",
    facts: ["Offline-first", "Multi-provider AI", "Charts", "Installable PWA"],
  },
  anafora: {
    eyebrow: "Public · local AI document tool",
    title: "From rough notes to form.",
    summary: "A focused path from unstructured notes to a formal document, using local AI with Ollama/Krikri and no server by default.",
    detail: "Anafora explores the quieter side of AI tooling: keep source material close, make the transformation legible, and let a useful document emerge without making the workflow feel heavy.",
    facts: ["Ollama / Krikri", "No server", "Local data", "Document flow"],
  },
};

const capabilities = [
  { icon: Layers3, index: "01", title: "Shape the system", text: "Structure complex ideas into interfaces people can enter without a manual.", detail: "Product thinking · UX / UI · Responsive web" },
  { icon: Orbit, index: "02", title: "Keep it close", text: "Design for local data, resilient states, and the moments when a network disappears.", detail: "PWA · IndexedDB · Offline-first" },
  { icon: Sparkles, index: "03", title: "Give AI a place", text: "Use AI as a material in the workflow — orchestrated, visible, and grounded in purpose.", detail: "Local AI · RAG · Provider systems" },
];

const methodSteps = [
  { number: "01", title: "Listen for the signal", text: "Find the human need beneath the requested feature." },
  { number: "02", title: "Build the shape", text: "Make the system legible before making it impressive." },
  { number: "03", title: "Let it breathe", text: "Polish motion, hierarchy, and detail until the work feels inevitable." },
];

function AFMark({ compact = false }: { compact?: boolean }) {
  return (
    <span className={`af-mark ${compact ? "af-mark--compact" : ""}`} aria-hidden="true">
      <svg viewBox="0 0 72 42" role="presentation">
        <path className="af-mark__flight" d="M3 30C18 18 22 6 29 5c7-1 8 10 16 12 8 2 12-4 24-8-7 7-11 14-22 17-14 4-24-2-44 4Z" />
        <path className="af-mark__wing" d="M29 5c3 9 4 17 1 25M38 13c-3 7-4 13-3 18M47 17c-3 5-4 9-4 14" />
        <path className="af-mark__letter" d="M9 32 15 15l7 17m-10-8h8M52 31V16c0-4 4-5 8-3 5 3 2 8-4 9 6 0 8 4 5 8-3 3-7 2-9 1" />
      </svg>
    </span>
  );
}

function Reveal({ children, className = "", delay = 0, y = 28 }: { children: ReactNode; className?: string; delay?: number; y?: number }) {
  const reduced = useReducedMotion();
  return (
    <motion.div
      className={className}
      initial={reduced ? false : { opacity: 0, y }}
      whileInView={reduced ? undefined : { opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.16 }}
      transition={reduced ? { duration: 0 } : { duration: 0.68, delay, ease }}
    >
      {children}
    </motion.div>
  );
}

function SectionKicker({ index, children }: { index: string; children: ReactNode }) {
  return <div className="section-kicker"><span>{index}</span><i />{children}</div>;
}

function ProjectCard({ repo, index, onOpen }: { repo: GitHubRepository; index: number; onOpen: (repo: GitHubRepository) => void }) {
  const story = projectStories[repo.name.toLowerCase()];
  const reduced = useReducedMotion();
  return (
    <motion.article className={`project-card ${repo.name.toLowerCase() === "axon" ? "project-card--axon" : ""}`} initial={reduced ? false : { opacity: 0, y: 28 }} whileInView={reduced ? undefined : { opacity: 1, y: 0 }} viewport={{ once: true, amount: 0.15 }} transition={reduced ? { duration: 0 } : { duration: 0.65, delay: index * 0.07, ease }} whileHover={reduced ? undefined : { y: -9 }}>
      <div className="project-card__top"><span>0{index + 1}</span><span className="project-card__status"><b />{story?.eyebrow ?? (repo.private ? "Private build" : "Public project")}</span></div>
      <button type="button" className="project-card__body" onClick={() => onOpen(repo)} aria-label={`Read more about ${repo.name}`}>
        <span className="project-card__name">{repo.name}</span>
        <span className="project-card__summary">{story?.summary ?? repo.description ?? "A work in progress shaped through code, curiosity, and iteration."}</span>
        <span className="project-card__open">Open study <ArrowUpRight size={15} /></span>
      </button>
      <div className="project-card__bottom"><span>{repo.language ?? "Mixed stack"}</span><span>{repo.private ? "Private" : "Public"}</span><span>{repo.stars} stars</span></div>
    </motion.article>
  );
}

function ProjectDialog({ repo, onClose }: { repo: GitHubRepository | null; onClose: () => void }) {
  const reduced = useReducedMotion();
  if (!repo) return null;
  const story = projectStories[repo.name.toLowerCase()];
  return (
    <AnimatePresence>
      <motion.div className="project-dialog__backdrop" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={onClose}>
        <motion.section className="project-dialog" role="dialog" aria-modal="true" aria-labelledby="project-dialog-title" initial={reduced ? false : { opacity: 0, y: 24, scale: .97 }} animate={{ opacity: 1, y: 0, scale: 1 }} exit={reduced ? undefined : { opacity: 0, y: 16, scale: .98 }} transition={{ duration: .42, ease }} onClick={(event) => event.stopPropagation()}>
          <div className="project-dialog__header"><span>{story?.eyebrow ?? (repo.private ? "Private build" : "Public project")}</span><button type="button" onClick={onClose} aria-label="Close project study"><X size={18} /></button></div>
          <div className="project-dialog__grid"><div><p className="project-dialog__number">Project study / {repo.name}</p><h2 id="project-dialog-title">{story?.title ?? repo.name}</h2><p className="project-dialog__summary">{story?.summary ?? repo.description}</p></div><div className="project-dialog__detail"><p>{story?.detail ?? "This repository is part of the current GitHub snapshot."}</p><div className="project-dialog__facts">{(story?.facts ?? [repo.language ?? "Mixed stack", repo.private ? "Private repository" : "Public repository"]).map((fact) => <span key={fact}><Check size={13} />{fact}</span>)}</div></div></div>
          <div className="project-dialog__footer"><span>{repo.private ? "The source is private" : "Source available on GitHub"}</span><a href={repo.html_url} target="_blank" rel="noreferrer">Open repository <ExternalLink size={14} /></a></div>
        </motion.section>
      </motion.div>
    </AnimatePresence>
  );
}

function NavigationGuide({ onClose, onStart }: { onClose: () => void; onStart: () => void }) {
  const reduced = useReducedMotion();
  return (
    <AnimatePresence>
      <motion.div className="guide-backdrop" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={onClose}>
        <motion.aside className="guide-card" role="dialog" aria-modal="true" aria-labelledby="guide-title" initial={reduced ? false : { opacity: 0, y: 18, scale: .98 }} animate={{ opacity: 1, y: 0, scale: 1 }} exit={{ opacity: 0, y: 12, scale: .98 }} transition={{ duration: .38, ease }} onClick={(event) => event.stopPropagation()}>
          <div className="guide-card__top"><span>How to move</span><button type="button" onClick={onClose} aria-label="Close navigation guide"><X size={18} /></button></div>
          <h2 id="guide-title">Take the long way.</h2><p>The page is a vertical study in useful software. Scroll naturally, use the index, or open a project study when something catches your eye.</p>
          <div className="guide-card__rows"><div><MousePointer2 size={18} /><span><strong>Scroll</strong><small>Let the sections reveal themselves</small></span></div><div><Command size={18} /><span><strong>Command / Ctrl + K</strong><small>Open the quick chapter index</small></span></div><div><PanelTop size={18} /><span><strong>Project cards</strong><small>Open a focused study without leaving the page</small></span></div></div>
          <button className="button button--dark" type="button" onClick={onStart}>Start the story <ArrowDown size={16} /></button>
        </motion.aside>
      </motion.div>
    </AnimatePresence>
  );
}

export default function Home() {
  const heroRef = useRef<HTMLElement>(null);
  const [activeChapter, setActiveChapter] = useState("home");
  const [menuOpen, setMenuOpen] = useState(false);
  const [guideOpen, setGuideOpen] = useState(false);
  const [commandOpen, setCommandOpen] = useState(false);
  const [selectedProject, setSelectedProject] = useState<GitHubRepository | null>(null);
  const [filter, setFilter] = useState<RepositoryFilter>("all");
  const [darkMode, setDarkMode] = useState(false);
  const [copied, setCopied] = useState(false);
  const [pointer, setPointer] = useState({ x: 0, y: 0 });
  const reduced = useReducedMotion();
  const { scrollYProgress } = useScroll();
  const { scrollYProgress: heroProgress } = useScroll({ target: heroRef, offset: ["start start", "end start"] });
  const heroY = useTransform(heroProgress, [0, 1], [0, 115]);
  const heroScale = useTransform(heroProgress, [0, 1], [1, .91]);

  useEffect(() => {
    const stored = window.localStorage.getItem("angelos-portfolio-theme");
    setDarkMode(stored === "dark");
    const observer = new IntersectionObserver((entries) => {
      const visible = entries.filter((entry) => entry.isIntersecting).sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];
      if (visible) setActiveChapter(visible.target.id);
    }, { rootMargin: "-25% 0px -55% 0px", threshold: [0.08, 0.24, 0.55] });
    chapters.forEach(({ id }) => { const element = document.getElementById(id); if (element) observer.observe(element); });
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    window.localStorage.setItem("angelos-portfolio-theme", darkMode ? "dark" : "light");
  }, [darkMode]);

  useEffect(() => {
    const onKeyDown = (event: KeyboardEvent) => {
      if ((event.metaKey || event.ctrlKey) && event.key.toLowerCase() === "k") { event.preventDefault(); setCommandOpen((value) => !value); }
      if (event.key === "Escape") { setCommandOpen(false); setGuideOpen(false); setMenuOpen(false); setSelectedProject(null); }
    };
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, []);

  const visibleRepos = useMemo(() => repositories.filter((repo) => {
    if (filter === "public") return !repo.private;
    if (filter === "private") return Boolean(repo.private);
    if (filter === "TypeScript") return repo.language === "TypeScript";
    return true;
  }), [filter]);

  const libraryRepos = visibleRepos.filter((repo) => !curatedNames.includes(repo.name.toLowerCase())).slice(0, 10);
  const activeIndex = Math.max(0, chapters.findIndex((chapter) => chapter.id === activeChapter));

  const scrollToChapter = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: reduced ? "auto" : "smooth", block: "start" });
    setMenuOpen(false); setCommandOpen(false);
  };

  const copyHandle = async () => {
    try { await navigator.clipboard.writeText(handleUrl); setCopied(true); window.setTimeout(() => setCopied(false), 1800); } catch { setCopied(false); }
  };

  const handlePointerMove = (event: ReactPointerEvent<HTMLElement>) => {
    if (reduced || window.innerWidth < 900) return;
    const rect = event.currentTarget.getBoundingClientRect();
    setPointer({ x: ((event.clientX - rect.left) / rect.width - .5) * 24, y: ((event.clientY - rect.top) / rect.height - .5) * 18 });
  };

  return (
    <main className={`site-shell ${darkMode ? "theme-dark" : "theme-light"}`} onPointerMove={handlePointerMove} onPointerLeave={() => setPointer({ x: 0, y: 0 })}>
      <div className="grain" aria-hidden="true" />
      <motion.div className="scroll-progress" style={{ scaleX: scrollYProgress, transformOrigin: "0% 50%" }} aria-hidden="true" />
      <header className="site-nav">
        <a className="brand-lockup" href="#home" onClick={(event) => { event.preventDefault(); scrollToChapter("home"); }} aria-label={`${profileName} home`}><AFMark compact /><span><strong>Angelos</strong><small>Frantzeskakis / AF</small></span></a>
        <div className="nav-center"><span>Independent digital craft</span><i /></div>
        <nav className={`nav-links ${menuOpen ? "is-open" : ""}`} aria-label="Primary navigation">{chapters.slice(1, 5).map((chapter) => <button type="button" key={chapter.id} className={activeChapter === chapter.id ? "is-active" : ""} onClick={() => scrollToChapter(chapter.id)}>{chapter.label}</button>)}</nav>
        <div className="nav-actions"><button type="button" className="theme-toggle" onClick={() => setDarkMode((value) => !value)} aria-label={darkMode ? "Switch to light mode" : "Switch to dark mode"}>{darkMode ? <Sun size={15} /> : <Moon size={15} />}<span>{darkMode ? "Light" : "Dark"}</span></button><a href={profileUrl} target="_blank" rel="noreferrer" className="nav-github"><Github size={15} /><span>GitHub</span><ArrowUpRight size={12} /></a><button type="button" className="command-trigger" onClick={() => setCommandOpen(true)} aria-label="Open quick navigation"><Command size={14} /></button><button type="button" className="menu-toggle" onClick={() => setMenuOpen((value) => !value)} aria-label={menuOpen ? "Close menu" : "Open menu"} aria-expanded={menuOpen}>{menuOpen ? <X size={19} /> : <Menu size={19} />}</button></div>
      </header>

      <aside className="chapter-index" aria-label="Page chapters"><div className="chapter-index__rail"><span style={{ height: `${((activeIndex + 1) / chapters.length) * 100}%` }} /></div>{chapters.map((chapter, index) => <button type="button" key={chapter.id} className={activeChapter === chapter.id ? "is-active" : ""} onClick={() => scrollToChapter(chapter.id)}><span>0{index + 1}</span><small>{chapter.label}</small></button>)}</aside>

      <section id="home" ref={heroRef} className="hero-section page-section"><div className="hero-section__grid" aria-hidden="true" /><div className="section-wrap hero-layout"><div className="hero-copy"><Reveal><div className="eyebrow"><span className="live-dot" />{profileName} / ideas in motion</div></Reveal><Reveal delay={.08}><h1>Make the complex<br /><em>feel alive.</em></h1></Reveal><Reveal delay={.16}><p className="hero-lead">I build useful digital experiences around offline-first products, local AI, and interfaces that give ambitious ideas a clearer way to move.</p></Reveal><Reveal delay={.22} className="hero-actions"><button type="button" className="button button--dark" onClick={() => scrollToChapter("work")}>Explore the work <ArrowRight size={16} /></button><button type="button" className="text-link" onClick={() => setGuideOpen(true)}>How this moves <MousePointer2 size={15} /></button></Reveal><div className="hero-signature"><span>Now exploring</span><strong>private AI systems · resilient products</strong></div></div><motion.div className="hero-art" style={reduced ? undefined : { x: pointer.x * 0.45, y: heroY, scale: heroScale }}><motion.div className="hero-art__orb" animate={reduced ? undefined : { rotate: 360 }} transition={reduced ? undefined : { duration: 38, repeat: Infinity, ease: "linear" }} /><div className="hero-art__rings" aria-hidden="true" /><motion.img src="/manus-storage/pegasus_4e36f0f3.png" alt="Watercolor Pegasus facing right" animate={reduced ? undefined : { y: [0, -12, 0], rotate: [-1, 1, -1] }} transition={reduced ? undefined : { duration: 7, repeat: Infinity, ease: "easeInOut" }} /><div className="hero-art__top">Signature study <span>01 / flight path</span></div><div className="hero-art__bottom"><span>Built for</span><strong>motion, meaning<br />and memorable detail.</strong></div><motion.div className="hero-art__mark" style={reduced ? undefined : { x: pointer.x * 0.7, y: pointer.y * 0.7 }}><AFMark /></motion.div></motion.div></div><div className="hero-footer"><span>Scroll to enter the work</span><span className="hero-footer__line" /><span>AF / 2026</span></div></section>

      <section id="signal" className="page-section signal-section"><div className="section-wrap signal-layout"><div className="section-copy"><SectionKicker index="01">The signal</SectionKicker><Reveal><h2>A quieter kind<br />of <em>ambition.</em></h2></Reveal><Reveal delay={.08}><p>My GitHub profile is intentionally simple: no inflated biography, no performance theatre. The repositories carry the signal — from local-first training tools to AI systems and document workflows that stay close to the person using them.</p></Reveal><div className="profile-stats"><div><strong>{github.profile.public_repos}</strong><span>public repos</span></div><div><strong>{github.profile.following}</strong><span>following</span></div><div><strong>{repositories.length}</strong><span>owner repos synced</span></div></div></div><div className="capability-stack">{capabilities.map(({ icon: Icon, index, title, text, detail }, itemIndex) => <Reveal key={title} delay={itemIndex * .1} className="capability-row"><span className="capability-row__number">{index}</span><Icon size={29} strokeWidth={1.25} className="capability-row__icon" /><div><h3>{title}</h3><p>{text}</p><span>{detail}</span></div><ArrowUpRight size={17} className="capability-row__arrow" /></Reveal>)}</div></div></section>

      <section id="work" className="page-section work-section"><div className="section-wrap"><div className="section-heading"><div><SectionKicker index="02">Selected work</SectionKicker><Reveal><h2>Projects with<br /><em>a point of view.</em></h2></Reveal></div><Reveal delay={.12} className="section-heading__aside"><p>A live selection from the current GitHub snapshot. Open a study to see the idea, the stated stack, and the boundary between what is public and what is still private.</p><button type="button" className="text-link" onClick={() => scrollToChapter("axon")}>Enter the systems room <ChevronRight size={15} /></button></Reveal></div><div className="project-grid">{curatedRepos.map((repo, index) => <ProjectCard key={repo.name} repo={repo} index={index} onOpen={setSelectedProject} />)}</div></div></section>

      <section id="axon" className="page-section axon-section"><div className="axon-section__backdrop" aria-hidden="true"><div className="axon-section__grid" /><div className="axon-section__orbit axon-section__orbit--one" /><div className="axon-section__orbit axon-section__orbit--two" /></div><div className="section-wrap axon-layout"><div className="axon-visual"><span className="axon-visual__code">AXON / SYSTEMS ROOM / PRIVATE CONCEPT</span><div className="axon-visual__letters">AX<span>•</span></div><span className="axon-visual__coordinate">Local-first intelligence<br />multi-provider routing</span></div><div className="axon-copy"><SectionKicker index="03">AXON OS</SectionKicker><Reveal><h2>Where the threads<br /><em>converge.</em></h2></Reveal><Reveal delay={.1}><p>{projectStories.axon.detail}</p></Reveal><div className="axon-facts">{projectStories.axon.facts.map((fact) => <span key={fact}><i />{fact}</span>)}</div><div className="private-label"><span />Private repository · concept shown with care</div>{axonRepo && <a className="button button--outline" href={axonRepo.html_url} target="_blank" rel="noreferrer">View source boundary <ExternalLink size={14} /></a>}</div></div></section>

      <section id="method" className="page-section method-section"><div className="section-wrap method-layout"><div className="method-quote"><SectionKicker index="04">The method</SectionKicker><Reveal><p>Good digital work should feel like an open door: <em>clear enough to enter, considered enough to stay.</em></p></Reveal><span className="method-quote__note">A working principle for systems, interfaces, and the space between them.</span></div><div className="method-steps">{methodSteps.map(({ number, title, text }, index) => <Reveal key={number} delay={index * .09} className="method-step"><span>{number}</span><div><h3>{title}</h3><p>{text}</p></div><Check size={17} /></Reveal>)}</div></div></section>

      <section id="library" className="page-section library-section"><div className="section-wrap"><div className="section-heading"><div><SectionKicker index="05">Repository library</SectionKicker><Reveal><h2>Follow<br /><em>the trail.</em></h2></Reveal></div><Reveal delay={.1} className="section-heading__aside"><p>Filter the current owner snapshot by access and stack. Facts are sourced from GitHub; private work is labeled, not dressed up as a public case study.</p></Reveal></div><div className="library-toolbar"><div className="filter-group" role="group" aria-label="Repository filters">{(["all", "public", "private", "TypeScript"] as RepositoryFilter[]).map((option) => <button type="button" key={option} className={filter === option ? "is-active" : ""} onClick={() => setFilter(option)}>{option === "all" ? "All" : option}</button>)}</div><span>{visibleRepos.length} visible / {repositories.length} synced</span></div><div className="library-grid">{libraryRepos.map((repo, index) => <ProjectCard key={repo.name} repo={repo} index={index} onOpen={setSelectedProject} />)}{libraryRepos.length === 0 && <div className="empty-state">No repository matches this filter. <button type="button" onClick={() => setFilter("all")}>Reset view <ArrowRight size={14} /></button></div>}</div></div></section>

      <section id="about" className="page-section about-section"><div className="section-wrap about-layout"><div className="about-portrait"><div className="about-portrait__line" /><img src={github.profile.avatar_url} alt={`GitHub avatar for ${profileHandle}`} /><span>GitHub profile / {profileHandle}</span><b>AF / 01</b></div><div className="about-copy"><SectionKicker index="06">The person behind the work</SectionKicker><Reveal><h2>Angelos<br /><em>Frantzeskakis.</em></h2></Reveal><Reveal delay={.1}><p>I’m building a practice around useful software: products that respect attention, make complexity legible, and leave a little room for wonder. The public profile stays quiet; the repositories show how I think.</p></Reveal><div className="about-actions"><a className="button button--dark" href={profileUrl} target="_blank" rel="noreferrer"><Github size={16} /> Open GitHub <ArrowUpRight size={15} /></a><button type="button" className="button button--ghost" onClick={copyHandle}>{copied ? <Check size={15} /> : <Clipboard size={15} />}{copied ? "Copied" : "Copy handle"}</button><span>{publicRepos.length} public repositories</span></div></div></div></section>

      <section id="contact" className="page-section contact-section"><div className="section-wrap contact-layout"><div className="contact-top"><SectionKicker index="07">Start a conversation</SectionKicker><span>Have a good problem?</span></div><Reveal><h2>Let’s make<br /><em>something memorable.</em></h2></Reveal><a href={profileUrl} target="_blank" rel="noreferrer" className="contact-link"><span>Open the GitHub profile</span><ArrowUpRight size={23} /></a><div className="contact-footer"><span>Available for thoughtful collaborations</span><a href={profileUrl} target="_blank" rel="noreferrer">{handleUrl}</a></div></div></section>

      <footer className="site-footer"><span>© 2026 {profileName}</span><span>AF / vertical study in motion</span><button type="button" onClick={() => scrollToChapter("home")}>Back to top <ArrowUpRight size={13} /></button></footer>

      <AnimatePresence>{(commandOpen || menuOpen) && <motion.div className="command-backdrop" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={() => { setCommandOpen(false); setMenuOpen(false); }}><motion.div className="command-menu" role="dialog" aria-modal="true" aria-label="Quick chapter navigation" initial={{ opacity: 0, y: 13, scale: .98 }} animate={{ opacity: 1, y: 0, scale: 1 }} exit={{ opacity: 0, y: 10, scale: .98 }} transition={{ duration: .25, ease }} onClick={(event) => event.stopPropagation()}><div className="command-menu__top"><span><Search size={14} /> Quick navigation</span><kbd>ESC</kbd></div><div className="command-menu__items">{chapters.map((chapter, index) => <button type="button" key={chapter.id} onClick={() => scrollToChapter(chapter.id)} className={activeChapter === chapter.id ? "is-active" : ""}><span>0{index + 1}</span>{chapter.label}<ArrowRight size={14} /></button>)}</div></motion.div></motion.div>}</AnimatePresence>
      {guideOpen && <NavigationGuide onClose={() => setGuideOpen(false)} onStart={() => { setGuideOpen(false); scrollToChapter("signal"); }} />}
      {selectedProject && <ProjectDialog repo={selectedProject} onClose={() => setSelectedProject(null)} />}
    </main>
  );
}
