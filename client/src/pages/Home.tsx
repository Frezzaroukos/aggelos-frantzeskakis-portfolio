import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import {
  ArrowLeft,
  ArrowRight,
  ArrowUpRight,
  Check,
  Code2,
  ExternalLink,
  Github,
  Globe2,
  Layers3,
  Menu,
  Moon,
  Sun,
  X,
  Zap,
} from "lucide-react";
import { useEffect, useMemo, useRef, useState, type ReactNode, type WheelEvent, type KeyboardEvent } from "react";
import { getGitHubData, type GitHubRepository } from "@/data/loader";

/**
 * Pegasus Portfolio — Horizontal Ethereal Motion.
 * Desktop is a left-to-right editorial gallery. Narrow screens fall back to a
 * readable vertical flow. Theme tokens are controlled by the local wrapper.
 */

const github = getGitHubData();
const withoutDeletedRepo = (repo: GitHubRepository) => !repo.name.toLowerCase().includes("morfos") && !repo.fork;
const portfolioRepos = github.repositories.filter(withoutDeletedRepo);
const curatedNames = ["axon", "anabasis", "thermidor", "anafora"];
const curatedRepos = curatedNames
  .map((name) => portfolioRepos.find((repo) => repo.name.toLowerCase() === name))
  .filter((repo): repo is GitHubRepository => Boolean(repo));
const libraryRepos = portfolioRepos.filter((repo) => !curatedNames.includes(repo.name.toLowerCase()));
const publicRepos = portfolioRepos.filter((repo) => !repo.private);
const panelIds = ["top", "capabilities", "work", "library", "approach", "about", "contact"];

const capabilityItems = [
  { index: "01", icon: Layers3, title: "Product systems", text: "Interfaces that feel considered, legible, and ready for real use — from first click to daily habit.", detail: "Product thinking · UX/UI · Responsive web" },
  { index: "02", icon: Code2, title: "Offline-first craft", text: "Reliable experiences that keep working when the network does not. Local data, strict TypeScript, calm states.", detail: "PWA · IndexedDB · TypeScript" },
  { index: "03", icon: Zap, title: "AI-native tools", text: "Focused automation and intelligent workflows that make complex work feel lighter, not noisier.", detail: "Local AI · Automation · Orchestration" },
];

const processItems = [
  { number: "01", label: "Clarify", text: "Find the essential problem beneath the brief." },
  { number: "02", label: "Shape", text: "Turn structure into an interface people can trust." },
  { number: "03", label: "Ship", text: "Polish the details, then make it feel alive." },
];

const easeOut = [0.22, 1, 0.36, 1] as const;

function Reveal({ children, className = "", delay = 0 }: { children: ReactNode; className?: string; delay?: number }) {
  const reducedMotion = useReducedMotion();
  return (
    <motion.div
      className={className}
      initial={reducedMotion ? false : { opacity: 0, y: 22 }}
      whileInView={reducedMotion ? undefined : { opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={reducedMotion ? { duration: 0 } : { duration: 0.62, delay, ease: easeOut }}
    >
      {children}
    </motion.div>
  );
}

function SectionLabel({ children, number }: { children: ReactNode; number: string }) {
  return <div className="section-label"><span>{number}</span><span>{children}</span></div>;
}

function RepoCard({ repo, index, featured = false }: { repo: GitHubRepository; index: number; featured?: boolean }) {
  const reducedMotion = useReducedMotion();
  const topics = repo.topics?.slice(0, 3) ?? [];
  const accent = repo.name.toLowerCase() === "axon" ? "var(--accent)" : repo.language === "TypeScript" ? "var(--ink)" : "var(--muted-ink)";
  return (
    <motion.article layout className={`repo-card ${featured ? "repo-card--featured" : ""}`} initial={reducedMotion ? false : { opacity: 0, x: 24 }} whileInView={reducedMotion ? undefined : { opacity: 1, x: 0 }} viewport={{ once: true, amount: 0.16 }} transition={reducedMotion ? { duration: 0 } : { duration: 0.55, delay: index * 0.05, ease: easeOut }}>
      <div className="repo-card__topline"><span>0{index + 1}</span><span className="repo-card__status"><i style={{ backgroundColor: accent }} />{repo.private ? "Private build" : repo.language ?? "Repository"}</span></div>
      <div className="repo-card__body">
        <div className="repo-card__heading"><h3>{repo.name}</h3><a href={repo.html_url} target="_blank" rel="noreferrer" aria-label={`Open ${repo.name} on GitHub`}><ArrowUpRight size={18} strokeWidth={1.5} /></a></div>
        <p>{repo.description || "A work in progress shaped through code, curiosity, and iteration."}</p>
        <div className="repo-card__meta"><span>{repo.private ? "Private repo" : `${repo.stars} stars`}</span><span>{repo.private ? "Build in progress" : `${repo.forks} forks`}</span>{repo.homepage && <a href={repo.homepage} target="_blank" rel="noreferrer" className="repo-card__live">Live <ExternalLink size={12} /></a>}</div>
      </div>
      <div className="repo-card__tags">{(topics.length ? topics : [repo.language ?? "Build", repo.private ? "In progress" : "Explore"]).map((topic) => <span key={topic}>{topic}</span>)}</div>
    </motion.article>
  );
}

export default function Home() {
  const viewportRef = useRef<HTMLDivElement>(null);
  const [activePanel, setActivePanel] = useState(0);
  const [darkMode, setDarkMode] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [isDesktop, setIsDesktop] = useState(false);
  const reducedMotion = useReducedMotion();
  const targetScrollRef = useRef(0);
  const scrollFrameRef = useRef<number | null>(null);
  const [transitionDirection, setTransitionDirection] = useState(1);

  useEffect(() => {
    const storedTheme = window.localStorage.getItem("pegasus-theme");
    setDarkMode(storedTheme === "dark");
    const updateViewport = () => setIsDesktop(window.innerWidth > 900);
    updateViewport();
    window.addEventListener("resize", updateViewport);
    return () => window.removeEventListener("resize", updateViewport);
  }, []);

  useEffect(() => {
    window.localStorage.setItem("pegasus-theme", darkMode ? "dark" : "light");
  }, [darkMode]);

  useEffect(() => {
    const viewport = viewportRef.current;
    if (!viewport) return;
    targetScrollRef.current = viewport.scrollLeft;
    const handleScroll = () => {
      if (window.innerWidth <= 900) return;
      const next = Math.max(0, Math.min(panelIds.length - 1, Math.round(viewport.scrollLeft / Math.max(viewport.clientWidth, 1))));
      if (next !== activePanel) {
        setTransitionDirection(next > activePanel ? 1 : -1);
        setActivePanel(next);
      }
    };
    viewport.addEventListener("scroll", handleScroll, { passive: true });
    return () => viewport.removeEventListener("scroll", handleScroll);
  }, [activePanel]);

  const animateHorizontalScroll = (target: number, duration = 720) => {
    const viewport = viewportRef.current;
    if (!viewport) return;
    const maxScroll = Math.max(0, viewport.scrollWidth - viewport.clientWidth);
    const nextTarget = Math.max(0, Math.min(maxScroll, target));
    targetScrollRef.current = nextTarget;
    if (scrollFrameRef.current !== null) cancelAnimationFrame(scrollFrameRef.current);
    if (reducedMotion) {
      viewport.scrollLeft = nextTarget;
      return;
    }
    const start = viewport.scrollLeft;
    const distance = nextTarget - start;
    const startedAt = performance.now();
    const tick = (now: number) => {
      const progress = Math.min(1, (now - startedAt) / duration);
      const eased = 1 - Math.pow(1 - progress, 4);
      viewport.scrollLeft = start + distance * eased;
      if (progress < 1) {
        scrollFrameRef.current = requestAnimationFrame(tick);
      } else {
        scrollFrameRef.current = null;
        viewport.scrollLeft = nextTarget;
      }
    };
    scrollFrameRef.current = requestAnimationFrame(tick);
  };

  const scrollToPanel = (index: number) => {
    const boundedIndex = Math.max(0, Math.min(panelIds.length - 1, index));
    const element = document.getElementById(panelIds[boundedIndex]);
    setTransitionDirection(boundedIndex >= activePanel ? 1 : -1);
    if (isDesktop && viewportRef.current) {
      animateHorizontalScroll(boundedIndex * viewportRef.current.clientWidth, 820);
    } else {
      element?.scrollIntoView({ behavior: reducedMotion ? "auto" : "smooth", block: "start" });
    }
    setActivePanel(boundedIndex);
    setMenuOpen(false);
  };

  const handleWheel = (event: WheelEvent<HTMLDivElement>) => {
    if (!isDesktop || !viewportRef.current || Math.abs(event.deltaY) <= Math.abs(event.deltaX)) return;
    event.preventDefault();
    const viewport = viewportRef.current;
    const currentTarget = Math.abs(targetScrollRef.current - viewport.scrollLeft) > 3 ? targetScrollRef.current : viewport.scrollLeft;
    animateHorizontalScroll(currentTarget + event.deltaY * 1.15, 520);
  };

  const handleKeyDown = (event: KeyboardEvent<HTMLDivElement>) => {
    if (!["ArrowRight", "ArrowLeft", "PageDown", "PageUp", "Home", "End"].includes(event.key)) return;
    event.preventDefault();
    if (event.key === "Home") return scrollToPanel(0);
    if (event.key === "End") return scrollToPanel(panelIds.length - 1);
    if (["ArrowRight", "PageDown"].includes(event.key)) return scrollToPanel(activePanel + 1);
    return scrollToPanel(activePanel - 1);
  };

  const libraryHighlights = useMemo(() => libraryRepos.slice(0, 6), []);
  const progress = ((activePanel + 1) / panelIds.length) * 100;

  return (
    <main className={`site-shell ${darkMode ? "theme-dark" : "theme-light"}`}>
      <div className="grain" aria-hidden="true" />
      <header className="site-nav">
        <a className="brand-mark" href="#top" onClick={(event) => { event.preventDefault(); scrollToPanel(0); }} aria-label="Pegasus home"><span className="brand-mark__glyph" aria-hidden="true"><svg viewBox="0 0 36 30" role="presentation"><path d="M4 23c6.5-1.1 8.5-6 11.4-12.1 1.8-3.7 5.2-5.5 8.8-4.3 3.1 1 4.7 3.4 7.8 2.5-2.4 2.4-2.9 5.2-1.3 8.2-3.8-2.1-6-2.8-8.7-1.4-3.6 1.9-6.5 5.6-11.1 6.8-2.4.7-4.9.4-6.9.3Z" fill="none" stroke="currentColor" strokeWidth="1.35" strokeLinejoin="round"/><path d="M16 10.8 13.5 4M22.1 8.2 24.6 2.5M18.5 17.5c2 .2 3.6 1.4 4.6 3.1" fill="none" stroke="currentColor" strokeWidth="1.15" strokeLinecap="round"/></svg></span><span className="brand-mark__word">Pegasus<span>.</span></span></a>
        <nav className={`nav-links ${menuOpen ? "is-open" : ""}`} aria-label="Primary navigation">
          <button type="button" onClick={() => scrollToPanel(2)}>Selected work</button><button type="button" onClick={() => scrollToPanel(1)}>Capabilities</button><button type="button" onClick={() => scrollToPanel(5)}>About</button><button type="button" onClick={() => scrollToPanel(6)}>Contact</button>
        </nav>
        <div className="nav-actions">
          <button className="theme-toggle" type="button" onClick={() => setDarkMode((value) => !value)} aria-label={darkMode ? "Switch to light mode" : "Switch to dark mode"}>{darkMode ? <Sun size={15} /> : <Moon size={15} />}<span>{darkMode ? "Light" : "Dark"}</span></button>
          <a className="nav-github" href={github.profile.html_url} target="_blank" rel="noreferrer"><Github size={16} /><span>GitHub</span><ArrowUpRight size={14} /></a>
        </div>
        <button className="menu-toggle" type="button" onClick={() => setMenuOpen((open) => !open)} aria-label={menuOpen ? "Close menu" : "Open menu"} aria-expanded={menuOpen}>{menuOpen ? <X size={21} /> : <Menu size={21} />}</button>
      </header>

      <AnimatePresence initial={false} mode="sync">
        {!reducedMotion && (
          <motion.div
            key={activePanel}
            className="panel-transition"
            initial={{ opacity: 0, x: transitionDirection > 0 ? "-100%" : "100%" }}
            animate={{ opacity: [0, 0.24, 0], x: "0%" }}
            transition={{ duration: 0.86, times: [0, 0.18, 1], ease: easeOut }}
            aria-hidden="true"
          />
        )}
      </AnimatePresence>

      <div className="horizontal-viewport" ref={viewportRef} onWheel={handleWheel} onKeyDown={handleKeyDown} tabIndex={0} aria-label="Horizontal portfolio gallery">
        <div className="horizontal-track">
          <section id="top" className="h-panel h-panel--hero"><div className="panel-inner hero-layout"><div className="hero-copy"><div className="hero-section__eyebrow"><span className="status-dot" />Independent builder · systems in motion</div><Reveal><h1>I make digital systems where <em>clarity</em> takes flight.</h1></Reveal><Reveal delay={0.1}><p className="hero-copy__lead">A portfolio by <strong>Frezzaroukos</strong> — shaping offline-first products, local AI tools, and thoughtful web experiences that move with purpose.</p></Reveal><Reveal delay={0.16} className="hero-copy__actions"><button className="button button--dark" type="button" onClick={() => scrollToPanel(2)}>Explore the work <ArrowRight size={16} /></button><a className="text-link" href={github.profile.html_url} target="_blank" rel="noreferrer">View GitHub profile <ArrowUpRight size={15} /></a></Reveal></div><motion.div className="hero-visual" animate={reducedMotion ? undefined : { y: [0, -10, 0], rotate: [-1, 1, -1] }} transition={reducedMotion ? undefined : { duration: 7, repeat: Infinity, ease: "easeInOut" }}><div className="hero-visual__halo" aria-hidden="true" /><div className="hero-visual__caption"><span>Signature study</span><span>01 / Pegasus</span></div><img src="/manus-storage/pegasus_4e36f0f3.png" alt="Watercolor Pegasus facing right" /><div className="hero-visual__note"><span>Designed for</span><strong>motion, meaning<br />and memorable detail.</strong></div></motion.div></div><div className="panel-footnote"><span>Editorial gallery flight · scroll right</span><span className="panel-footnote__line" /><span>2026</span></div></section>

          <section id="capabilities" className="h-panel"><div className="panel-inner split-panel"><div className="section-intro"><SectionLabel number="01">What I bring</SectionLabel><Reveal><h2>Useful by nature.<br /><em>Distinct by design.</em></h2></Reveal><Reveal delay={0.08}><p>I care about the quiet decisions that make a product feel trustworthy: clear hierarchy, resilient states, and motion that earns its place.</p></Reveal></div><div className="capability-list">{capabilityItems.map(({ index, icon: Icon, title, text, detail }, itemIndex) => <Reveal key={title} delay={itemIndex * 0.08} className="capability-item"><span className="capability-item__index">{index}</span><Icon className="capability-item__icon" size={27} strokeWidth={1.35} /><div><h3>{title}</h3><p>{text}</p><span>{detail}</span></div><ArrowUpRight className="capability-item__arrow" size={19} strokeWidth={1.5} /></Reveal>)}</div></div></section>

          <section id="work" className="h-panel"><div className="panel-inner work-panel"><div className="work-heading"><div><SectionLabel number="02">Selected work</SectionLabel><Reveal><h2>Built in public.<br /><em>Shaped by use.</em></h2></Reveal></div><Reveal delay={0.12} className="work-heading__aside"><p>Real repositories from my GitHub profile — a living record of experiments, products, and the systems behind them.</p><a className="text-link" href={`${github.profile.html_url}?tab=repositories`} target="_blank" rel="noreferrer">See all on GitHub <ArrowUpRight size={15} /></a></Reveal></div><div className="featured-grid">{curatedRepos.map((repo, index) => <RepoCard key={repo.name} repo={repo} index={index} featured />)}</div></div></section>

          <section id="library" className="h-panel"><div className="panel-inner library-panel"><div className="library-heading"><div><SectionLabel number="03">Repository library</SectionLabel><Reveal><h2>The lab<br /><em>is open.</em></h2></Reveal></div><Reveal delay={0.1}><p>{publicRepos.length} public projects plus private systems in progress. AXON OS is included as the central AI systems build.</p></Reveal></div><div className="repo-library">{libraryHighlights.map((repo, index) => <RepoCard key={repo.name} repo={repo} index={index} />)}</div></div></section>

          <section id="approach" className="h-panel"><div className="panel-inner approach-panel"><div className="manifesto-section__mark">“</div><SectionLabel number="04">A working principle</SectionLabel><Reveal><p>Good digital work should feel like an open door: <em>clear enough to enter, considered enough to stay.</em></p></Reveal><span className="manifesto-section__credit">A horizontal study in clarity, motion, and meaning.</span><div className="process-list">{processItems.map(({ number, label, text }, index) => <Reveal key={number} delay={index * 0.08} className="process-item"><span>{number}</span><div><h3>{label}</h3><p>{text}</p></div><Check size={18} strokeWidth={1.7} /></Reveal>)}</div></div></section>

          <section id="about" className="h-panel"><div className="panel-inner about-panel"><div className="about-section__portrait"><img src={github.profile.avatar_url} alt="GitHub avatar of Frezzaroukos" /><span>GitHub<br />profile</span></div><div className="about-section__copy"><SectionLabel number="05">The person behind the work</SectionLabel><Reveal><h2>Hi, I’m<br /><em>Frezzaroukos.</em></h2></Reveal><Reveal delay={0.08}><p>I’m building a practice around useful software: products that respect attention, make complexity legible, and keep a little room for wonder.</p></Reveal><Reveal delay={0.15}><div className="about-links"><a className="button button--outline" href={github.profile.html_url} target="_blank" rel="noreferrer"><Github size={16} /> Open GitHub <ArrowUpRight size={15} /></a><span><Globe2 size={15} /> {github.profile.public_repos} public repositories</span></div></Reveal></div></div></section>

          <section id="contact" className="h-panel"><div className="panel-inner contact-panel"><div className="contact-section__top"><SectionLabel number="06">Start a conversation</SectionLabel><span>Have a good problem?</span></div><Reveal><h2>Let’s make<br /><em>something clear.</em></h2></Reveal><a className="contact-cta" href={github.profile.html_url} target="_blank" rel="noreferrer"><span>Open the GitHub profile</span><ArrowUpRight size={22} /></a><div className="contact-section__footer"><span>Available for thoughtful collaborations</span><a href={github.profile.html_url} target="_blank" rel="noreferrer">github.com/{github.profile.login}</a></div></div></section>
        </div>
      </div>

      <div className="gallery-controls" aria-label="Gallery controls"><button type="button" onClick={() => scrollToPanel(activePanel - 1)} disabled={activePanel === 0} aria-label="Previous panel"><ArrowLeft size={16} /></button><div className="gallery-progress"><span style={{ width: `${progress}%` }} /></div><span className="gallery-count">0{activePanel + 1} / 0{panelIds.length}</span><button type="button" onClick={() => scrollToPanel(activePanel + 1)} disabled={activePanel === panelIds.length - 1} aria-label="Next panel"><ArrowRight size={16} /></button></div>
      <footer className="site-footer"><span>© 2026 Pegasus / Frezzaroukos</span><span>Horizontal by design.</span><a href="#top" onClick={(event) => { event.preventDefault(); scrollToPanel(0); }}>Back to start ↑</a></footer>
    </main>
  );
}

export { portfolioRepos };
