import { AnimatePresence, motion, useScroll, useSpring, useTransform } from "framer-motion";
import {
  ArrowDownRight,
  ArrowUpRight,
  Check,
  Code2,
  ExternalLink,
  Github,
  Globe2,
  Layers3,
  Menu,
  X,
  Zap,
} from "lucide-react";
import { useMemo, useState, type ReactNode } from "react";
import { getGitHubData, type GitHubRepository } from "@/data/loader";

/**
 * Pegasus Portfolio — Ethereal Motion direction.
 * This page uses generous white space, an editorial asymmetry, charcoal copy,
 * a restrained gold accent, the Pegasus as a signature visual, and purposeful motion.
 */

const github = getGitHubData();
const publicRepos = github.repositories.filter((repo) => !repo.private && !repo.fork);
const featuredNames = ["anabasis", "thermidor", "anafora", "Frezzaroukos"];
const featuredRepos = featuredNames
  .map((name) => publicRepos.find((repo) => repo.name === name))
  .filter((repo): repo is GitHubRepository => Boolean(repo));
const languageFilters = ["All", "TypeScript", "HTML", "Other"];

const capabilityItems = [
  {
    index: "01",
    icon: Layers3,
    title: "Product systems",
    text: "Interfaces that feel considered, legible, and ready for real use — from first click to daily habit.",
    detail: "Product thinking · UX/UI · Responsive web",
  },
  {
    index: "02",
    icon: Code2,
    title: "Offline-first craft",
    text: "Reliable experiences that keep working when the network does not. Local data, strict TypeScript, calm states.",
    detail: "PWA · IndexedDB · TypeScript",
  },
  {
    index: "03",
    icon: Zap,
    title: "AI-native tools",
    text: "Focused automation and intelligent workflows that make complex work feel lighter, not noisier.",
    detail: "Local AI · Automation · Orchestration",
  },
];

const processItems = [
  { number: "01", label: "Clarify", text: "Find the essential problem beneath the brief." },
  { number: "02", label: "Shape", text: "Turn structure into an interface people can trust." },
  { number: "03", label: "Ship", text: "Polish the details, then make it feel alive." },
];

const easeOut = [0.22, 1, 0.36, 1] as const;

function Reveal({ children, className = "", delay = 0 }: { children: ReactNode; className?: string; delay?: number }) {
  return (
    <motion.div
      className={className}
      initial={{ opacity: 0, y: 28 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.16 }}
      transition={{ duration: 0.72, delay, ease: easeOut }}
    >
      {children}
    </motion.div>
  );
}

function SectionLabel({ children, number }: { children: ReactNode; number: string }) {
  return (
    <div className="section-label">
      <span>{number}</span>
      <span>{children}</span>
    </div>
  );
}

function RepoCard({ repo, index, featured = false }: { repo: GitHubRepository; index: number; featured?: boolean }) {
  const topics = repo.topics?.slice(0, 3) ?? [];
  const accent = repo.language === "TypeScript" ? "#d4a54a" : repo.language === "HTML" ? "#8ca58d" : "#a9a4b8";

  return (
    <motion.article
      layout
      initial={{ opacity: 0, y: 22 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -14 }}
      transition={{ duration: 0.42, delay: index * 0.045, ease: easeOut }}
      className={`repo-card ${featured ? "repo-card--featured" : ""}`}
    >
      <div className="repo-card__topline">
        <span className="repo-card__number">0{index + 1}</span>
        <span className="repo-card__language">
          <i style={{ backgroundColor: accent }} />
          {repo.language ?? "Open source"}
        </span>
      </div>
      <div className="repo-card__body">
        <div className="repo-card__heading">
          <h3>{repo.name}</h3>
          <a href={repo.html_url} target="_blank" rel="noreferrer" aria-label={`Open ${repo.name} on GitHub`}>
            <ArrowUpRight size={18} strokeWidth={1.6} />
          </a>
        </div>
        <p>{repo.description || "A work in progress shaped through code, curiosity, and iteration."}</p>
        <div className="repo-card__meta">
          <span>{repo.stars} stars</span>
          <span>{repo.forks} forks</span>
          {repo.homepage && (
            <a href={repo.homepage} target="_blank" rel="noreferrer" className="repo-card__live">
              Live <ExternalLink size={12} />
            </a>
          )}
        </div>
      </div>
      <div className="repo-card__tags">
        {(topics.length ? topics : [repo.language ?? "Build", "Explore"]).map((topic) => (
          <span key={topic}>{topic}</span>
        ))}
      </div>
    </motion.article>
  );
}

export default function Home() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [activeFilter, setActiveFilter] = useState("All");
  const { scrollYProgress } = useScroll();
  const smoothProgress = useSpring(scrollYProgress, { stiffness: 120, damping: 28, mass: 0.22 });
  const heroY = useTransform(smoothProgress, [0, 0.42], [0, 110]);
  const heroRotate = useTransform(smoothProgress, [0, 0.45], [0, 3]);
  const heroOpacity = useTransform(smoothProgress, [0, 0.28], [1, 0.32]);

  const filteredRepos = useMemo(() => {
    if (activeFilter === "All") return publicRepos;
    if (activeFilter === "Other") return publicRepos.filter((repo) => !["TypeScript", "HTML"].includes(repo.language ?? ""));
    return publicRepos.filter((repo) => repo.language === activeFilter);
  }, [activeFilter]);

  const scrollTo = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
    setMenuOpen(false);
  };

  return (
    <main className="site-shell">
      <motion.div className="scroll-progress" style={{ scaleX: smoothProgress }} aria-hidden="true" />
      <div className="grain" aria-hidden="true" />

      <header className="site-nav">
        <a className="brand-mark" href="#top" aria-label="Pegasus home">
          <span className="brand-mark__glyph">P</span>
          <span className="brand-mark__word">Pegasus<span>.</span></span>
        </a>
        <nav className={`nav-links ${menuOpen ? "is-open" : ""}`} aria-label="Primary navigation">
          <button onClick={() => scrollTo("work")} type="button">Selected work</button>
          <button onClick={() => scrollTo("capabilities")} type="button">Capabilities</button>
          <button onClick={() => scrollTo("about")} type="button">About</button>
          <button onClick={() => scrollTo("contact")} type="button">Contact</button>
        </nav>
        <a className="nav-github" href={github.profile.html_url} target="_blank" rel="noreferrer">
          <Github size={16} />
          <span>GitHub</span>
          <ArrowUpRight size={14} />
        </a>
        <button className="menu-toggle" type="button" onClick={() => setMenuOpen((open) => !open)} aria-label={menuOpen ? "Close menu" : "Open menu"} aria-expanded={menuOpen}>
          {menuOpen ? <X size={21} /> : <Menu size={21} />}
        </button>
      </header>

      <section id="top" className="hero-section">
        <div className="hero-section__eyebrow"><span className="status-dot" />Independent builder · product-minded by default</div>
        <div className="hero-layout">
          <div className="hero-copy">
            <Reveal>
              <h1>I build digital <em>systems</em> with clarity.</h1>
            </Reveal>
            <Reveal delay={0.1}>
              <p className="hero-copy__lead">A portfolio by <strong>Frezzaroukos</strong> — shipping offline-first products, local AI tools, and thoughtful web experiences.</p>
            </Reveal>
            <Reveal delay={0.18} className="hero-copy__actions">
              <button className="button button--dark" type="button" onClick={() => scrollTo("work")}>Explore the work <ArrowDownRight size={16} /></button>
              <a className="text-link" href={github.profile.html_url} target="_blank" rel="noreferrer">View GitHub profile <ArrowUpRight size={15} /></a>
            </Reveal>
          </div>
          <motion.div className="hero-visual" style={{ y: heroY, rotate: heroRotate, opacity: heroOpacity }}>
            <div className="hero-visual__halo" aria-hidden="true" />
            <div className="hero-visual__caption"><span>Signature study</span><span>01 / Pegasus</span></div>
            <img src="/manus-storage/pegasus_4e36f0f3.png" alt="Watercolor Pegasus facing right" />
            <div className="hero-visual__note"><span>Designed for</span><strong>motion, meaning<br />and memorable detail.</strong></div>
          </motion.div>
        </div>
        <div className="hero-footnote"><span>Scroll to explore</span><span className="hero-footnote__line" /><span>2026</span></div>
      </section>

      <section className="signal-strip" aria-label="Portfolio signals">
        <div><strong>{publicRepos.length}</strong><span>public repositories</span></div>
        <div><strong>TS</strong><span>primary language</span></div>
        <div><strong>AI</strong><span>systems & automation</span></div>
        <div><strong>PWA</strong><span>offline-first mindset</span></div>
      </section>

      <section id="capabilities" className="section-block capabilities-section">
        <div className="section-intro">
          <SectionLabel number="01">What I bring</SectionLabel>
          <Reveal><h2>Useful by nature.<br /><em>Distinct by design.</em></h2></Reveal>
          <Reveal delay={0.08}><p>I care about the quiet decisions that make a product feel trustworthy: clear hierarchy, resilient states, and motion that earns its place.</p></Reveal>
        </div>
        <div className="capability-list">
          {capabilityItems.map(({ index, icon: Icon, title, text, detail }, itemIndex) => (
            <Reveal key={title} delay={itemIndex * 0.08} className="capability-item">
              <span className="capability-item__index">{index}</span>
              <Icon className="capability-item__icon" size={27} strokeWidth={1.35} />
              <div><h3>{title}</h3><p>{text}</p><span>{detail}</span></div>
              <ArrowUpRight className="capability-item__arrow" size={19} strokeWidth={1.5} />
            </Reveal>
          ))}
        </div>
      </section>

      <section id="work" className="section-block work-section">
        <div className="work-heading">
          <div><SectionLabel number="02">Selected work</SectionLabel><Reveal><h2>Built in public.<br /><em>Shaped by use.</em></h2></Reveal></div>
          <Reveal delay={0.12} className="work-heading__aside"><p>Real repositories from my GitHub profile — a living record of experiments, products, and the systems behind them.</p><a className="text-link" href={`${github.profile.html_url}?tab=repositories`} target="_blank" rel="noreferrer">See all on GitHub <ArrowUpRight size={15} /></a></Reveal>
        </div>
        <div className="featured-grid">
          {featuredRepos.map((repo, index) => <RepoCard key={repo.name} repo={repo} index={index} featured />)}
        </div>
      </section>

      <section className="manifesto-section">
        <div className="manifesto-section__mark">“</div>
        <Reveal><p>Good digital work should feel like an open door: <em>clear enough to enter, considered enough to stay.</em></p></Reveal>
        <span className="manifesto-section__credit">A working principle, not a slogan.</span>
      </section>

      <section className="section-block library-section">
        <div className="library-heading"><div><SectionLabel number="03">Repository library</SectionLabel><Reveal><h2>The lab<br /><em>is open.</em></h2></Reveal></div><Reveal delay={0.1}><p>{publicRepos.length} public builds, with the newest work at the top. Filter by language and follow the thread.</p></Reveal></div>
        <div className="filter-row" role="tablist" aria-label="Filter repositories by language">
          {languageFilters.map((filter) => <button key={filter} type="button" role="tab" aria-selected={activeFilter === filter} className={activeFilter === filter ? "is-active" : ""} onClick={() => setActiveFilter(filter)}>{filter}</button>)}
        </div>
        <motion.div layout className="repo-library">
          <AnimatePresence mode="popLayout" initial={false}>
            {filteredRepos.map((repo, index) => <RepoCard key={repo.name} repo={repo} index={index} />)}
          </AnimatePresence>
        </motion.div>
      </section>

      <section className="section-block process-section">
        <div className="process-heading"><SectionLabel number="04">How I work</SectionLabel><Reveal><h2>From a loose idea<br /><em>to a living thing.</em></h2></Reveal></div>
        <div className="process-list">
          {processItems.map(({ number, label, text }, index) => <Reveal key={number} delay={index * 0.08} className="process-item"><span>{number}</span><div><h3>{label}</h3><p>{text}</p></div><Check size={18} strokeWidth={1.7} /></Reveal>)}
        </div>
      </section>

      <section id="about" className="about-section">
        <div className="about-section__portrait"><img src={github.profile.avatar_url} alt="GitHub avatar of Frezzaroukos" /><span>GitHub<br />profile</span></div>
        <div className="about-section__copy"><SectionLabel number="05">The person behind the work</SectionLabel><Reveal><h2>Hi, I’m<br /><em>Frezzaroukos.</em></h2></Reveal><Reveal delay={0.08}><p>I’m building a practice around useful software: products that respect attention, make complexity legible, and keep a little room for wonder.</p></Reveal><Reveal delay={0.15}><div className="about-links"><a className="button button--outline" href={github.profile.html_url} target="_blank" rel="noreferrer"><Github size={16} /> Open GitHub <ArrowUpRight size={15} /></a><span><Globe2 size={15} /> Public work, updated regularly</span></div></Reveal></div>
      </section>

      <section id="contact" className="contact-section">
        <div className="contact-section__top"><SectionLabel number="06">Start a conversation</SectionLabel><span>Have a good problem?</span></div>
        <Reveal><h2>Let’s make<br /><em>something clear.</em></h2></Reveal>
        <a className="contact-cta" href={github.profile.html_url} target="_blank" rel="noreferrer"><span>Open the GitHub profile</span><ArrowUpRight size={22} /></a>
        <div className="contact-section__footer"><span>Available for thoughtful collaborations</span><a href={github.profile.html_url} target="_blank" rel="noreferrer">github.com/{github.profile.login}</a></div>
      </section>

      <footer className="site-footer"><span>© 2026 Pegasus / Frezzaroukos</span><span>Crafted with precision, animated with purpose.</span><a href="#top">Back to top ↑</a></footer>
    </main>
  );
}

export { publicRepos };
