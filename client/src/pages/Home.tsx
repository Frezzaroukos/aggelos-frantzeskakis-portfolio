import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import {
  ArrowDown,
  ArrowLeft,
  ArrowRight,
  ArrowUpRight,
  Check,
  ChevronRight,
  Clipboard,
  Code2,
  ExternalLink,
  Github,
  Instagram,
  Layers3,
  Mail,
  Menu,
  Moon,
  MousePointer2,
  Send,
  Sparkles,
  Sun,
  X,
  Zap,
} from "lucide-react";
import { useEffect, useMemo, useRef, useState, type FormEvent, type ReactNode } from "react";
import { getGitHubData, type GitHubRepository } from "@/data/loader";

/**
 * Aggelos Frantzeskakis / AF — horizontal cinematic portfolio.
 * The desktop experience behaves as a left-to-right gallery; narrow screens
 * intentionally fall back to vertical flow for touch comfort and readability.
 */

const github = getGitHubData();
const profileHandle = github.profile.login;
const profileUrl = github.profile.html_url;
const email = "aggelosf2016@gmail.com";
const instagramUrl = "https://www.instagram.com/aggelosfrantzeskakiss?igsh=c2Zldmh3ZW1zNXEy&utm_source=qr";
const instagramHandle = "@aggelosfrantzeskakiss";
const assetUrls = {
  pegasus: "/manus-storage/pegasus_cleaned_541401ab.png",
  mark: "/manus-storage/af-brand-mark_0341fe3d.png",
};

const repositories = github.repositories.filter((repo) => !repo.name.toLowerCase().includes("morfos") && !repo.fork);
const curatedNames = ["axon", "anabasis", "thermidor", "anafora"];
const curatedRepos = curatedNames.map((name) => repositories.find((repo) => repo.name.toLowerCase() === name)).filter((repo): repo is GitHubRepository => Boolean(repo));
const remainingRepos = repositories.filter((repo) => !curatedNames.includes(repo.name.toLowerCase()));
const allGalleryRepos = [...curatedRepos, ...remainingRepos];
const accent = "#D4AF37";
const ease = [0.22, 1, 0.36, 1] as const;

const chapters = [
  { id: "home", label: "Arrival" },
  { id: "work", label: "Work" },
  { id: "skills", label: "Skills" },
  { id: "stack", label: "Stack" },
  { id: "about", label: "Profile" },
  { id: "contact", label: "Contact" },
];

type Filter = "all" | "public" | "private" | "TypeScript";

type Story = { kicker: string; title: string; summary: string; detail: string; facts: string[] };
const stories: Record<string, Story> = {
  axon: {
    kicker: "Private concept / systems room",
    title: "A cockpit for intelligence.",
    summary: "AXON OSS is described as a local-first AI Operating System with multi-provider routing, RAG, cost optimization, and a 25-panel cockpit.",
    detail: "The portfolio keeps this project honest: the repository is private, so the presentation shows the stated direction rather than pretending to reveal a public case study.",
    facts: ["Local-first AI", "Multi-provider router", "RAG", "25-panel cockpit"],
  },
  anabasis: {
    kicker: "Public / offline-first PWA",
    title: "Progress as a living map.",
    summary: "A weighted calisthenics and skill-progression tracker built around prerequisites, milestones, bilingual use, and installable PWA behavior.",
    detail: "The current repository description grounds this study in TypeScript and an offline-first product idea. Its public homepage is anabasis.axonos.dev.",
    facts: ["TypeScript", "Offline-first", "Bilingual", "PWA"],
  },
  thermidor: {
    kicker: "Public / AI-augmented PWA",
    title: "Everyday data, less friction.",
    summary: "An AI-augmented calorie tracker with offline-first behavior, modular opt-in features, charts, and multi-provider AI chat.",
    detail: "Thermidor is presented as a practical experiment in making a daily tool approachable while keeping room for optional intelligence and resilient use.",
    facts: ["TypeScript", "Offline-first", "Charts", "Multi-provider AI"],
  },
  anafora: {
    kicker: "Public / local AI document flow",
    title: "From rough notes to form.",
    summary: "A focused route from unstructured notes to a formal document, using local AI through Ollama/Krikri with no server by default.",
    detail: "Anafora explores a quiet AI workflow: keep the source material close, make the transformation understandable, and let a useful document emerge without unnecessary infrastructure.",
    facts: ["TypeScript", "Ollama / Krikri", "Local data", "No server"],
  },
};

const skillGroups = [
  { id: "systems", label: "Systems", icon: Layers3, title: "Make complexity feel enterable.", text: "I shape product systems, information hierarchies, and responsive flows so useful tools remain legible as they grow.", tags: ["Product thinking", "UX / UI", "Architecture", "Responsive web"] },
  { id: "resilient", label: "Resilient", icon: Zap, title: "Keep the work close.", text: "I care about local-first behavior, graceful states, and experiences that keep their dignity when the network disappears.", tags: ["PWA", "Offline-first", "IndexedDB", "Local data"] },
  { id: "intelligence", label: "Intelligence", icon: Sparkles, title: "Give AI a useful place.", text: "I explore local AI, RAG, provider routing, and human-readable orchestration without hiding the system behind magic.", tags: ["Local AI", "RAG", "Provider systems", "AI workflows"] },
];

const stackGroups = [
  { label: "Languages", items: ["TypeScript", "Python", "JavaScript", "HTML", "Shell"] },
  { label: "Product patterns", items: ["PWA", "Offline-first", "Local-first", "Bilingual UX", "Responsive UI"] },
  { label: "AI direction", items: ["Ollama", "Krikri", "RAG", "Multi-provider routing", "Cost-aware systems"] },
];

function Reveal({ children, className = "", delay = 0 }: { children: ReactNode; className?: string; delay?: number }) {
  const reduced = useReducedMotion();
  return <motion.div className={className} initial={reduced ? false : { opacity: 0, y: 22 }} whileInView={reduced ? undefined : { opacity: 1, y: 0 }} viewport={{ once: true, amount: 0.2 }} transition={reduced ? { duration: 0 } : { duration: .62, delay, ease }}>{children}</motion.div>;
}

function SectionLabel({ index, children }: { index: string; children: ReactNode }) {
  return <div className="section-label"><span>{index}</span><i />{children}</div>;
}

function BrandMark({ compact = false }: { compact?: boolean }) {
  if (compact) return <span className="brand-mini-mark" aria-label="AF brand mark">AF</span>;
  return <img className="brand-mark" src={assetUrls.mark} alt="AF brand mark" />;
}

function ProjectCard({ repo, index, onOpen }: { repo: GitHubRepository; index: number; onOpen: (repo: GitHubRepository) => void }) {
  const story = stories[repo.name.toLowerCase()];
  const reduced = useReducedMotion();
  return <motion.article className={`project-card ${repo.private ? "is-private" : ""}`} initial={reduced ? false : { opacity: 0, y: 20 }} whileInView={reduced ? undefined : { opacity: 1, y: 0 }} viewport={{ once: true, amount: .16 }} transition={reduced ? { duration: 0 } : { duration: .55, delay: index * .05, ease }} whileHover={reduced ? undefined : { y: -8 }}>
    <div className="project-card__top"><span>0{String(index + 1).padStart(1, "0")}</span><span className="project-status"><b />{repo.private ? "Private" : "Public"}</span></div>
    <button type="button" className="project-card__body" onClick={() => onOpen(repo)} aria-label={`Open details for ${repo.name}`}>
      <span className="project-card__name">{repo.name}</span>
      <span className="project-card__description">{story?.summary ?? repo.description ?? "A repository shaped through curiosity and iteration."}</span>
      <span className="project-card__open">Open details <ArrowUpRight size={15} /></span>
    </button>
    <div className="project-card__footer"><span>{repo.language ?? "Mixed"}</span><span>{repo.stars} stars</span><span>{repo.forks} forks</span></div>
  </motion.article>;
}

function ProjectDialog({ repo, onClose }: { repo: GitHubRepository | null; onClose: () => void }) {
  const reduced = useReducedMotion();
  if (!repo) return null;
  const story = stories[repo.name.toLowerCase()];
  return <AnimatePresence><motion.div className="modal-backdrop" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={onClose}><motion.section className="project-dialog" role="dialog" aria-modal="true" aria-labelledby="project-title" initial={reduced ? false : { opacity: 0, y: 20, scale: .98 }} animate={{ opacity: 1, y: 0, scale: 1 }} exit={{ opacity: 0, y: 12, scale: .98 }} transition={{ duration: .36, ease }} onClick={(event) => event.stopPropagation()}>
    <div className="dialog-head"><span>{story?.kicker ?? (repo.private ? "Private build" : "Public project")}</span><button type="button" onClick={onClose} aria-label="Close details"><X size={18} /></button></div>
    <div className="dialog-grid"><div><p className="dialog-code">Project study / {repo.name}</p><h2 id="project-title">{story?.title ?? repo.name}</h2><p className="dialog-summary">{story?.summary ?? repo.description}</p></div><div className="dialog-detail"><p>{story?.detail ?? "This study is generated from the current GitHub snapshot."}</p><div className="fact-list">{(story?.facts ?? [repo.language ?? "Mixed stack", repo.private ? "Private repository" : "Public repository"]).map((fact) => <span key={fact}><Check size={13} />{fact}</span>)}</div></div></div>
    <div className="dialog-foot"><span>{repo.private ? "Source boundary: private" : "Source available on GitHub"}</span><a href={repo.html_url} target="_blank" rel="noreferrer">Open repository <ExternalLink size={14} /></a></div>
  </motion.section></motion.div></AnimatePresence>;
}

function ContactForm() {
  const [status, setStatus] = useState<"idle" | "sent">("idle");
  const submit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    const subject = String(data.get("subject") || "Portfolio collaboration");
    const message = String(data.get("message") || "");
    window.location.href = `mailto:${email}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(message)}`;
    setStatus("sent");
  };
  return <form className="contact-form" onSubmit={submit}><label><span>Your name</span><input name="name" required placeholder="Name" /></label><label><span>Subject</span><input name="subject" required placeholder="A good problem" /></label><label className="contact-form__wide"><span>Message</span><textarea name="message" required rows={4} placeholder="Tell me what you are shaping..." /></label><div className="contact-form__submit"><span>{status === "sent" ? "Your mail client should open now." : "This opens your email client — no data is stored here."}</span><button className="button button--dark" type="submit">Compose email <Send size={15} /></button></div></form>;
}

export default function Home() {
  const galleryRef = useRef<HTMLDivElement>(null);
  const [theme, setTheme] = useState<"light" | "dark">("light");
  const [activeIndex, setActiveIndex] = useState(0);
  const [filter, setFilter] = useState<Filter>("all");
  const [selectedRepo, setSelectedRepo] = useState<GitHubRepository | null>(null);
  const [selectedSkill, setSelectedSkill] = useState("systems");
  const [menuOpen, setMenuOpen] = useState(false);
  const [copied, setCopied] = useState(false);
  const reduced = useReducedMotion();

  useEffect(() => {
    const stored = window.localStorage.getItem("aggelos-portfolio-theme");
    if (stored === "dark") setTheme("dark");
  }, []);
  useEffect(() => { window.localStorage.setItem("aggelos-portfolio-theme", theme); }, [theme]);

  useEffect(() => {
    const gallery = galleryRef.current;
    if (!gallery) return;
    let locked = false;
    const onWheel = (event: WheelEvent) => {
      if (window.innerWidth <= 760) return;
      const target = event.target as HTMLElement | null;
      if (target?.closest("textarea, input, select, [role=dialog]")) return;
      const delta = Math.abs(event.deltaY) >= Math.abs(event.deltaX) ? event.deltaY : event.deltaX;
      if (!delta) return;
      event.preventDefault();
      if (locked) return;
      locked = true;
      const current = Math.round(gallery.scrollLeft / Math.max(1, gallery.clientWidth));
      const direction = delta > 0 ? 1 : -1;
      const next = Math.max(0, Math.min(chapters.length - 1, current + direction));
      gallery.scrollTo({ left: next * gallery.clientWidth, behavior: reduced ? "auto" : "smooth" });
      window.setTimeout(() => { locked = false; }, reduced ? 0 : 420);
    };
    gallery.addEventListener("wheel", onWheel, { passive: false });
    return () => gallery.removeEventListener("wheel", onWheel);
  }, [reduced]);

  useEffect(() => {
    const gallery = galleryRef.current;
    if (!gallery) return;
    let dragging = false;
    let pointerId = -1;
    let startX = 0;
    let startScroll = 0;
    const onPointerDown = (event: PointerEvent) => {
      if (window.innerWidth <= 760 || (event.pointerType === "mouse" && event.button !== 0)) return;
      const target = event.target as HTMLElement | null;
      if (target?.closest("button, a, input, textarea, select, [role=dialog]")) return;
      dragging = true;
      pointerId = event.pointerId;
      startX = event.clientX;
      startScroll = gallery.scrollLeft;
      gallery.classList.add("is-dragging");
      gallery.setPointerCapture?.(event.pointerId);
    };
    const onPointerMove = (event: PointerEvent) => {
      if (!dragging || event.pointerId !== pointerId) return;
      event.preventDefault();
      gallery.scrollLeft = startScroll - (event.clientX - startX);
    };
    const finishDrag = (event: PointerEvent) => {
      if (!dragging || event.pointerId !== pointerId) return;
      dragging = false;
      gallery.classList.remove("is-dragging");
      gallery.releasePointerCapture?.(event.pointerId);
      const next = Math.max(0, Math.min(chapters.length - 1, Math.round(gallery.scrollLeft / Math.max(1, gallery.clientWidth))));
      gallery.scrollTo({ left: next * gallery.clientWidth, behavior: reduced ? "auto" : "smooth" });
      pointerId = -1;
    };
    gallery.addEventListener("pointerdown", onPointerDown);
    gallery.addEventListener("pointermove", onPointerMove);
    gallery.addEventListener("pointerup", finishDrag);
    gallery.addEventListener("pointercancel", finishDrag);
    return () => {
      gallery.removeEventListener("pointerdown", onPointerDown);
      gallery.removeEventListener("pointermove", onPointerMove);
      gallery.removeEventListener("pointerup", finishDrag);
      gallery.removeEventListener("pointercancel", finishDrag);
    };
  }, [reduced]);

  useEffect(() => {
    const gallery = galleryRef.current;
    if (!gallery) return;
    const onScroll = () => setActiveIndex(Math.min(chapters.length - 1, Math.max(0, Math.round(gallery.scrollLeft / Math.max(1, gallery.clientWidth)))));
    gallery.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
    return () => gallery.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") { setSelectedRepo(null); setMenuOpen(false); return; }
      const target = event.target as HTMLElement | null;
      if (target?.closest("input, textarea, select, [contenteditable=true]")) return;
      if (window.innerWidth > 760 && (event.key === "ArrowRight" || event.key === "ArrowLeft")) { event.preventDefault(); goTo(activeIndex + (event.key === "ArrowRight" ? 1 : -1)); }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [activeIndex, reduced]);

  const visibleRepos = useMemo(() => allGalleryRepos.filter((repo) => filter === "all" || filter === "public" && !repo.private || filter === "private" && repo.private || filter === "TypeScript" && repo.language === "TypeScript"), [filter]);
  const activeSkill = skillGroups.find((group) => group.id === selectedSkill) ?? skillGroups[0];

  function goTo(index: number) {
    const next = Math.max(0, Math.min(chapters.length - 1, index));
    const gallery = galleryRef.current;
    if (gallery && window.innerWidth > 760) {
      try { gallery.focus({ preventScroll: true }); } catch { gallery.focus(); }
      gallery.scrollTo({ left: next * gallery.clientWidth, behavior: reduced ? "auto" : "smooth" });
    } else {
      document.getElementById(chapters[next].id)?.scrollIntoView({ behavior: reduced ? "auto" : "smooth", block: "start" });
    }
    setActiveIndex(next);
    setMenuOpen(false);
  }

  async function copyHandle() {
    try { await navigator.clipboard.writeText(`github.com/${profileHandle}`); setCopied(true); window.setTimeout(() => setCopied(false), 1800); } catch { setCopied(false); }
  }

  return <main className={`app-shell theme-${theme}`}>
    <div className="grain" aria-hidden="true" />
    <header className="topbar"><a className="brand" href="#home" onClick={(event) => { event.preventDefault(); goTo(0); }} aria-label="Aggelos Frantzeskakis home"><span><strong>Aggelos</strong><small>Frantzeskakis / AF</small></span></a><div className="topbar__motto"><span />Independent digital craft</div><nav className={`desktop-nav ${menuOpen ? "is-open" : ""}`} aria-label="Gallery navigation">{chapters.slice(1).map((chapter, index) => <button type="button" className={activeIndex === index + 1 ? "is-active" : ""} key={chapter.id} onClick={() => goTo(index + 1)}>{chapter.label}</button>)}</nav><div className="topbar__actions"><button type="button" className="theme-button" onClick={() => setTheme((value) => value === "light" ? "dark" : "light")} aria-label="Toggle color theme">{theme === "light" ? <Moon size={15} /> : <Sun size={15} />}<span>{theme === "light" ? "Dark" : "Light"}</span></button><a className="github-link" href={profileUrl} target="_blank" rel="noreferrer"><Github size={15} /><span>GitHub</span><ArrowUpRight size={12} /></a><button type="button" className="menu-button" onClick={() => setMenuOpen((value) => !value)} aria-expanded={menuOpen} aria-label={menuOpen ? "Close navigation" : "Open navigation"}>{menuOpen ? <X size={18} /> : <Menu size={18} />}</button></div></header>

    <aside className="gallery-rail" aria-label="Gallery progress"><div className="gallery-rail__track"><span style={{ height: `${((activeIndex + 1) / chapters.length) * 100}%` }} /></div>{chapters.map((chapter, index) => <button type="button" key={chapter.id} className={activeIndex === index ? "is-active" : ""} onClick={() => goTo(index)}><span>0{index + 1}</span><small>{chapter.label}</small></button>)}</aside>
    <div className="gallery-hint"><ArrowLeft size={13} /><span>Wheel / drag / arrows</span><ArrowRight size={13} /></div>
    <div className="gallery-progress"><span style={{ width: `${((activeIndex + 1) / chapters.length) * 100}%` }} /></div>
    <div className="mobile-section-nav" aria-label="Mobile section navigation"><button type="button" onClick={() => goTo(activeIndex - 1)} disabled={activeIndex === 0} aria-label="Previous section"><ArrowLeft size={15} /></button><span aria-live="polite"><b>0{activeIndex + 1}</b> {chapters[activeIndex]?.label}</span><button type="button" onClick={() => goTo(activeIndex + 1)} disabled={activeIndex === chapters.length - 1} aria-label="Next section"><ArrowRight size={15} /></button></div>

    <div ref={galleryRef} className="gallery" tabIndex={0} aria-label="Horizontal portfolio gallery">
      <section id="home" className="panel panel--hero"><div className="panel-grid" aria-hidden="true" /><div className="panel-inner hero-panel"><div className="hero-panel__copy"><Reveal><div className="eyebrow"><span className="pulse" />Aggelos Frantzeskakis / ideas in motion</div></Reveal><Reveal delay={.08}><h1>Make the complex<br /><em>feel alive.</em></h1></Reveal><Reveal delay={.16}><p>I build useful digital experiences around offline-first products, local AI, and interfaces that give ambitious ideas a clearer way to move.</p></Reveal><Reveal delay={.22} className="hero-actions"><button type="button" className="button button--dark" onClick={() => goTo(1)}>Explore the work <ArrowRight size={16} /></button><button type="button" className="text-button" onClick={() => goTo(2)}>See the skills <ChevronRight size={15} /></button></Reveal><div className="hero-signature"><span>Now exploring</span><strong>resilient products · local intelligence</strong></div></div><motion.div className="hero-visual" animate={reduced ? undefined : { y: [0, -9, 0] }} transition={reduced ? undefined : { duration: 6, repeat: Infinity, ease: "easeInOut" }}><div className="hero-visual__orbit" aria-hidden="true" /><div className="hero-visual__trace" aria-hidden="true" /><img src={assetUrls.pegasus} alt="Clean watercolor Pegasus looking toward the right" /><div className="hero-visual__label">Signature study <span>01 / flight path</span></div><div className="hero-visual__brand"><BrandMark /></div></motion.div></div><div className="panel-footer"><span>Scroll right to enter</span><i /><span>AF / 2026</span></div></section>

      <section id="work" className="panel panel--work"><div className="panel-inner"><div className="panel-heading"><div><SectionLabel index="01">Selected work</SectionLabel><Reveal><h2>Projects with<br /><em>a point of view.</em></h2></Reveal></div><Reveal delay={.1} className="panel-heading__aside"><p>A live selection from the current GitHub snapshot. Click a card for a focused study; private work stays clearly marked.</p><span>Use the wheel, drag, or arrow keys to move between scenes.</span></Reveal></div><div className="project-grid">{curatedRepos.map((repo, index) => <ProjectCard key={repo.name} repo={repo} index={index} onOpen={setSelectedRepo} />)}</div><div className="panel-footer"><span>02 / work</span><i /><span>Open a project card</span></div></div></section>

      <section id="skills" className="panel panel--skills"><div className="panel-inner"><div className="skills-layout"><div className="skills-intro"><SectionLabel index="02">Skills / current practice</SectionLabel><Reveal><h2>Build the shape<br /><em>around the signal.</em></h2></Reveal><Reveal delay={.1}><p>These are the working directions visible in the current projects. They are a base, not a final limit — you can expand them later as your practice evolves.</p></Reveal><div className="skill-tabs" role="tablist" aria-label="Skill groups">{skillGroups.map((group) => <button type="button" role="tab" aria-selected={selectedSkill === group.id} className={selectedSkill === group.id ? "is-active" : ""} key={group.id} onClick={() => setSelectedSkill(group.id)}><group.icon size={17} />{group.label}</button>)}</div></div><AnimatePresence mode="wait"><motion.div className="skill-feature" key={activeSkill.id} initial={reduced ? false : { opacity: 0, x: 28 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -18 }} transition={{ duration: .38, ease }}><span className="skill-feature__number">{activeSkill.id === "systems" ? "01" : activeSkill.id === "resilient" ? "02" : "03"}</span><activeSkill.icon size={41} strokeWidth={1.15} /><h3>{activeSkill.title}</h3><p>{activeSkill.text}</p><div className="skill-tags">{activeSkill.tags.map((tag) => <span key={tag}>{tag}</span>)}</div></motion.div></AnimatePresence></div><div className="panel-footer"><span>03 / skills</span><i /><span>Choose a direction</span></div></div></section>

      <section id="stack" className="panel panel--stack"><div className="panel-inner"><div className="panel-heading"><div><SectionLabel index="03">Tech stack</SectionLabel><Reveal><h2>Tools for a<br /><em>living system.</em></h2></Reveal></div><Reveal delay={.1} className="panel-heading__aside"><p>Based on the languages, patterns, and AI directions represented in the current GitHub snapshot. The stack is intentionally expandable.</p><span>Current evidence, future room.</span></Reveal></div><div className="stack-grid">{stackGroups.map((group, index) => <Reveal key={group.label} delay={index * .08} className="stack-card"><span className="stack-card__index">0{index + 1}</span><h3>{group.label}</h3><div>{group.items.map((item) => <span key={item}><i />{item}</span>)}</div></Reveal>)}</div><div className="stack-note"><Code2 size={18} /><span>Stack details can grow with the portfolio — this layer is ready for deeper case studies, tools, and links.</span></div><div className="panel-footer"><span>04 / stack</span><i /><span>Built with curiosity</span></div></div></section>

      <section id="about" className="panel panel--about"><div className="panel-inner about-layout"><div className="about-visual"><img src={github.profile.avatar_url} alt={`GitHub avatar for ${profileHandle}`} /><div className="about-visual__line" /><span>github.com/{profileHandle}</span></div><div className="about-copy"><SectionLabel index="04">The person behind the work</SectionLabel><Reveal><h2>Aggelos<br /><em>Frantzeskakis.</em></h2></Reveal><Reveal delay={.1}><p>I’m building a practice around useful software: products that respect attention, make complexity legible, and leave a little room for wonder. The public GitHub profile stays quiet; the repositories show how I think.</p></Reveal><div className="about-actions"><a className="button button--dark" href={profileUrl} target="_blank" rel="noreferrer"><Github size={16} /> Open GitHub <ArrowUpRight size={14} /></a><button type="button" className="button button--ghost" onClick={copyHandle}>{copied ? <Check size={15} /> : <Clipboard size={15} />}{copied ? "Copied" : "Copy handle"}</button><span>{github.profile.public_repos} public repositories</span></div></div><div className="panel-footer"><span>05 / profile</span><i /><span>Keep moving</span></div></div></section>

      <section id="contact" className="panel panel--contact"><div className="panel-inner contact-layout"><div className="contact-heading"><SectionLabel index="05">Start a conversation</SectionLabel><span>Have a good problem?</span></div><div className="contact-grid"><div><Reveal><h2>Let’s make<br /><em>something memorable.</em></h2></Reveal><p>Tell me what you are shaping. The form opens your email client so the conversation stays direct.</p><div className="social-links"><a href={`mailto:${email}`}><Mail size={15} />{email}</a><a href={instagramUrl} target="_blank" rel="noreferrer"><Instagram size={15} />{instagramHandle}</a></div></div><ContactForm /></div><div className="contact-footer"><span>© 2026 Aggelos Frantzeskakis</span><span>AF / horizontal study in motion</span><button type="button" onClick={() => goTo(0)}>Back to start <ArrowUpRight size={13} /></button></div></div></section>
    </div>

    <footer className="mobile-footer"><span>© 2026 Aggelos Frantzeskakis</span><a href={`mailto:${email}`}>Contact</a></footer>
    {menuOpen && <div className="mobile-menu"><div className="mobile-menu__inner"><div className="mobile-menu__head"><span>Gallery index</span><button type="button" onClick={() => setMenuOpen(false)} aria-label="Close menu"><X size={18} /></button></div>{chapters.map((chapter, index) => <button type="button" key={chapter.id} className={activeIndex === index ? "is-active" : ""} onClick={() => goTo(index)}><span>0{index + 1}</span>{chapter.label}<ArrowRight size={15} /></button>)}</div></div>}
    {selectedRepo && <ProjectDialog repo={selectedRepo} onClose={() => setSelectedRepo(null)} />}
  </main>;
}
