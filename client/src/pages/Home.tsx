import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import {
  ArrowDown,
  ArrowUpRight,
  Check,
  ChevronRight,
  Clipboard,
  Code2,
  Download,
  ExternalLink,
  Github,
  Instagram,
  Layers3,
  Mail,
  Menu,
  Send,
  Sparkles,
  X,
  Zap,
} from "lucide-react";
import { useCallback, useEffect, useState, type FormEvent, type ReactNode } from "react";
import { toast } from "sonner";
import { getGitHubData, type GitHubRepository } from "@/data/loader";

/**
 * Aggelos Frantzeskakis / AF — vertical top-to-bottom portfolio.
 * Designed for reliable, clean reading and navigation across all devices.
 */

const github = getGitHubData();
const profileHandle = github.profile.login;
const profileUrl = github.profile.html_url;
const email = "aggelosf2016@gmail.com";
const instagramUrl = "https://www.instagram.com/aggelosfrantzeskakiss?igsh=c2Zldmh3ZW1zNXEy&utm_source=qr";
const instagramHandle = "@aggelosfrantzeskakiss";
const cvUrl = "/manus-storage/Aggelos-Frantzeskakis-CV_3f144ec3.pdf";
const FORMSPREE_ENDPOINT = (import.meta.env.VITE_FORMSPREE_ENDPOINT as string | undefined)?.trim();
const assetUrls = {
  pegasus: "/manus-storage/pegasus_cleaned_541401ab.png",
  mark: "/manus-storage/af-brand-mark_0341fe3d.png",
};

const repositories = github.repositories.filter((repo) => !repo.name.toLowerCase().includes("morfos") && !repo.fork);
const curatedNames = ["axon", "anabasis", "thermidor", "anafora"];
const curatedRepos = curatedNames.map((name) => repositories.find((repo) => repo.name.toLowerCase() === name)).filter((repo): repo is GitHubRepository => Boolean(repo));
const remainingRepos = repositories.filter((repo) => !curatedNames.includes(repo.name.toLowerCase()));
const allGalleryRepos = [...curatedRepos, ...remainingRepos];
const ease = [0.22, 1, 0.36, 1] as const;

const chapters = [
  { id: "home", label: "Arrival" },
  { id: "work", label: "Work" },
  { id: "skills", label: "Skills" },
  { id: "stack", label: "Stack" },
  { id: "about", label: "Profile" },
  { id: "contact", label: "Contact" },
];

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
  return <motion.div className={className} initial={reduced ? false : { opacity: 0, y: 20 }} whileInView={reduced ? undefined : { opacity: 1, y: 0 }} viewport={{ once: true, amount: 0.15 }} transition={reduced ? { duration: 0 } : { duration: .58, delay, ease }}>{children}</motion.div>;
}

function SectionLabel({ index, children }: { index: string; children: ReactNode }) {
  return <div className="section-label"><span>{index}</span><i />{children}</div>;
}

function BrandMark() {
  return <img className="brand-mark" src={assetUrls.mark} alt="AF brand mark" onError={(event) => { event.currentTarget.style.display = "none"; }} />;
}

function CinematicLoader({ onComplete }: { onComplete: () => void }) {
  const [progress, setProgress] = useState(6);
  const reduced = useReducedMotion();
  useEffect(() => {
    let cancelled = false;
    let completionTimer: number | undefined;
    const startedAt = performance.now();
    const preload = new Image();
    preload.src = assetUrls.pegasus;
    const imageReady = new Promise<void>((resolve) => {
      preload.onload = () => resolve();
      preload.onerror = () => resolve();
    });
    const fontsReady = document.fonts?.ready ?? Promise.resolve();
    const progressTimer = window.setInterval(() => {
      if (!cancelled) setProgress((value) => Math.min(92, value + 2.5));
    }, 45);
    const finish = async () => {
      await Promise.race([Promise.all([imageReady, fontsReady]), new Promise((resolve) => window.setTimeout(resolve, 1800))]);
      const wait = Math.max(0, 760 - (performance.now() - startedAt));
      window.setTimeout(() => {
        if (cancelled) return;
        setProgress(100);
        completionTimer = window.setTimeout(onComplete, reduced ? 80 : 620);
      }, wait);
    };
    void finish();
    return () => {
      cancelled = true;
      window.clearInterval(progressTimer);
      if (completionTimer) window.clearTimeout(completionTimer);
    };
  }, [onComplete, reduced]);

  return <motion.div className="loading-screen" initial={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: reduced ? .1 : .5, ease }} aria-label="Loading Aggelos portfolio" role="status">
    <div className="loading-screen__top"><span>AF / digital craft</span><span>Portfolio / 2026</span></div>
    <div className="loading-screen__center"><div className="loading-screen__mark"><BrandMark /></div><p className="loading-screen__name">Aggelos</p><p className="loading-screen__sub">Frantzeskakis / ideas in motion</p><div className="loading-screen__progress"><span style={{ width: `${progress}%` }} /></div><p className="loading-screen__percent">{Math.round(progress)}%</p></div>
    <div className="loading-screen__flight" aria-hidden="true"><img src={assetUrls.pegasus} alt="" onError={(event) => { event.currentTarget.style.display = "none"; }} /></div>
    <div className="loading-screen__bottom"><span>Loading a useful space</span><span>Scroll when ready ↓</span></div>
  </motion.div>;
}

function ProjectCard({ repo, index, onOpen }: { repo: GitHubRepository; index: number; onOpen: (repo: GitHubRepository) => void }) {
  const story = stories[repo.name.toLowerCase()];
  const reduced = useReducedMotion();
  return <motion.article className={`project-card ${repo.private ? "is-private" : ""}`} initial={reduced ? false : { opacity: 0, y: 16 }} whileInView={reduced ? undefined : { opacity: 1, y: 0 }} viewport={{ once: true, amount: .15 }} transition={reduced ? { duration: 0 } : { duration: .5, delay: index * .04, ease }} whileHover={reduced ? undefined : { y: -6 }}>
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
  return <AnimatePresence><motion.div className="modal-backdrop" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={onClose}><motion.section className="project-dialog" role="dialog" aria-modal="true" aria-labelledby="project-title" initial={reduced ? false : { opacity: 0, y: 20, scale: .98 }} animate={{ opacity: 1, y: 0, scale: 1 }} exit={{ opacity: 0, y: 12, scale: .98 }} transition={{ duration: .34, ease }} onClick={(event) => event.stopPropagation()}>
    <div className="dialog-head"><span>{story?.kicker ?? (repo.private ? "Private build" : "Public project")}</span><button type="button" onClick={onClose} aria-label="Close details"><X size={18} /></button></div>
    <div className="dialog-grid"><div><p className="dialog-code">Project study / {repo.name}</p><h2 id="project-title">{story?.title ?? repo.name}</h2><p className="dialog-summary">{story?.summary ?? repo.description}</p></div><div className="dialog-detail"><p>{story?.detail ?? "This study is generated from the current GitHub snapshot."}</p><div className="fact-list">{(story?.facts ?? [repo.language ?? "Mixed stack", repo.private ? "Private repository" : "Public repository"]).map((fact) => <span key={fact}><Check size={13} />{fact}</span>)}</div></div></div>
    <div className="dialog-foot"><span>{repo.private ? "Source boundary: private" : "Source available on GitHub"}</span><a href={repo.html_url} target="_blank" rel="noreferrer">Open repository <ExternalLink size={14} /></a></div>
  </motion.section></motion.div></AnimatePresence>;
}

function ContactForm() {
  const [status, setStatus] = useState<"idle" | "sending" | "success" | "error">("idle");
  const submit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const form = event.currentTarget;
    const data = new FormData(form);
    const subject = String(data.get("subject") || "Portfolio collaboration");
    const message = String(data.get("message") || "");
    setStatus("sending");
    if (!FORMSPREE_ENDPOINT) {
      window.location.href = `mailto:${email}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(message)}`;
      setStatus("success");
      return;
    }
    try {
      const response = await fetch(FORMSPREE_ENDPOINT, { method: "POST", body: data, headers: { Accept: "application/json" } });
      if (!response.ok) throw new Error("Formspree request failed");
      form.reset();
      setStatus("success");
    } catch {
      setStatus("error");
    }
  };
  const notice = status === "sending" ? "Sending securely…" : status === "success" ? (FORMSPREE_ENDPOINT ? "Message sent. I’ll get back to you soon." : "Your email client should open now.") : status === "error" ? "Something went wrong. Please email me directly." : FORMSPREE_ENDPOINT ? "Secure Formspree delivery is active." : "Email fallback is active until a Formspree endpoint is added.";
  return <form className="contact-form" onSubmit={submit}><label><span>Your name</span><input name="name" required placeholder="Name" /></label><label><span>Subject</span><input name="subject" required placeholder="A good problem" /></label><label className="contact-form__wide"><span>Message</span><textarea name="message" required rows={4} placeholder="Tell me what you are shaping..." /></label><div className="contact-form__submit"><span className={status === "error" ? "is-error" : status === "success" ? "is-success" : ""}>{notice}</span><button className="button button--dark" type="submit" disabled={status === "sending"}>{status === "sending" ? "Sending…" : "Compose email"} <Send size={15} /></button></div></form>;
}

export default function Home() {
  const [isLoading, setIsLoading] = useState(true);
  const [activeSection, setActiveSection] = useState("home");
  const [selectedRepo, setSelectedRepo] = useState<GitHubRepository | null>(null);
  const [selectedSkill, setSelectedSkill] = useState("systems");
  const [menuOpen, setMenuOpen] = useState(false);
  const [copied, setCopied] = useState(false);
  const [isDownloadingCv, setIsDownloadingCv] = useState(false);
  const reduced = useReducedMotion();
  const completeLoading = useCallback(() => setIsLoading(false), []);

  useEffect(() => {
    const handleScroll = () => {
      const scrollPos = window.scrollY + 200;
      for (const chapter of chapters) {
        const el = document.getElementById(chapter.id);
        if (el) {
          const top = el.offsetTop;
          const height = el.offsetHeight;
          if (scrollPos >= top && scrollPos < top + height) {
            setActiveSection(chapter.id);
            break;
          }
        }
      }
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  function scrollToSection(id: string) {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: reduced ? "auto" : "smooth", block: "start" });
    }
    setMenuOpen(false);
  }

  async function copyHandle() {
    try { await navigator.clipboard.writeText(`github.com/${profileHandle}`); setCopied(true); toast.success("GitHub handle copied"); window.setTimeout(() => setCopied(false), 1800); } catch { setCopied(false); toast.error("Could not copy the GitHub handle"); }
  }

  const handleDownloadCv = useCallback(() => {
    if (isDownloadingCv) return;
    setIsDownloadingCv(true);
    toast("Preparing your CV…", { duration: reduced ? 500 : 900 });
    window.setTimeout(async () => {
      try {
        const response = await fetch(cvUrl);
        if (!response.ok) throw new Error("CV asset unavailable");
        const blob = await response.blob();
        const link = document.createElement("a");
        link.href = URL.createObjectURL(blob);
        link.download = "Aggelos-Frantzeskakis-CV.pdf";
        document.body.appendChild(link);
        link.click();
        link.remove();
        window.setTimeout(() => URL.revokeObjectURL(link.href), 1000);
      } catch {
        const link = document.createElement("a");
        link.href = cvUrl;
        link.download = "Aggelos-Frantzeskakis-CV.pdf";
        link.target = "_blank";
        document.body.appendChild(link);
        link.click();
        link.remove();
      } finally {
        setIsDownloadingCv(false);
        toast.success("CV ready to download", { duration: 1800 });
      }
    }, reduced ? 120 : 720);
  }, [isDownloadingCv, reduced]);

  const activeSkillObj = skillGroups.find((group) => group.id === selectedSkill) ?? skillGroups[0];

  return <main className="app-shell">
    <AnimatePresence>{isLoading && <CinematicLoader onComplete={completeLoading} />}</AnimatePresence>
    <div className="grain" aria-hidden="true" />
    <header className="topbar">
      <a className="brand" href="#home" onClick={(event) => { event.preventDefault(); scrollToSection("home"); }} aria-label="Aggelos Frantzeskakis home">
        <span><strong>Aggelos</strong><small>Frantzeskakis / AF</small></span>
      </a>
      <div className="topbar__motto"><span />Independent digital craft</div>
      <nav className={`desktop-nav ${menuOpen ? "is-open" : ""}`} aria-label="Primary navigation">
        {chapters.map((chapter) => <button type="button" className={activeSection === chapter.id ? "is-active" : ""} key={chapter.id} onClick={() => scrollToSection(chapter.id)}>{chapter.label}</button>)}
      </nav>
      <div className="topbar__actions">
        <a className="github-link" href={profileUrl} target="_blank" rel="noreferrer"><Github size={15} /><span>GitHub</span><ArrowUpRight size={12} /></a>
        <button type="button" className="menu-button" onClick={() => setMenuOpen((value) => !value)} aria-expanded={menuOpen} aria-label={menuOpen ? "Close navigation" : "Open navigation"}>
          {menuOpen ? <X size={18} /> : <Menu size={18} />}
        </button>
      </div>
    </header>

    {menuOpen && <div className="mobile-menu"><div className="mobile-menu__inner"><div className="mobile-menu__head"><span>Navigation</span><button type="button" onClick={() => setMenuOpen(false)} aria-label="Close menu"><X size={18} /></button></div>{chapters.map((chapter, index) => <button type="button" key={chapter.id} className={activeSection === chapter.id ? "is-active" : ""} onClick={() => scrollToSection(chapter.id)}><span>0{index + 1}</span>{chapter.label}<ChevronRight size={15} /></button>)}</div></div>}

    <div className="document-flow">
      <section id="home" className="panel panel--hero">
        <div className="panel-grid" aria-hidden="true" />
        <div className="panel-inner hero-panel">
          <div className="hero-panel__copy">
            <Reveal><div className="eyebrow"><span className="pulse" />Aggelos Frantzeskakis / ideas in motion</div></Reveal>
            <Reveal delay={.08}><h1>Make the complex<br /><em>feel alive.</em></h1></Reveal>
            <Reveal delay={.16}><p>I build useful digital experiences around offline-first products, local AI, and interfaces that give ambitious ideas a clearer way to move.</p></Reveal>
            <Reveal delay={.22} className="hero-actions">
              <button type="button" className="button button--dark" onClick={() => scrollToSection("work")}>Explore the work <ArrowDown size={16} /></button>
              <button type="button" className="text-button" onClick={() => scrollToSection("skills")}>See the skills <ChevronRight size={15} /></button>
            </Reveal>
            <div className="hero-signature"><span>Now exploring</span><strong>resilient products · local intelligence</strong></div>
          </div>
          <motion.div className="hero-visual" animate={reduced ? undefined : { y: [0, -7, 0] }} transition={reduced ? undefined : { duration: 6, repeat: Infinity, ease: "easeInOut" }}>
            <div className="hero-visual__orbit" aria-hidden="true" />
            <div className="hero-visual__trace" aria-hidden="true" />
            <img src={assetUrls.pegasus} alt="Clean watercolor Pegasus looking toward the right" onError={(event) => { event.currentTarget.style.display = "none"; event.currentTarget.parentElement?.classList.add("is-image-missing"); }} />
            <div className="hero-visual__label">Signature study <span>01 / flight path</span></div>
            <div className="hero-visual__brand"><BrandMark /></div>
          </motion.div>
        </div>
      </section>

      <section id="work" className="panel panel--work">
        <div className="panel-inner">
          <div className="panel-heading">
            <div><SectionLabel index="01">Selected work</SectionLabel><Reveal><h2>Projects with<br /><em>a point of view.</em></h2></Reveal></div>
            <Reveal delay={.1} className="panel-heading__aside"><p>A live selection from the current GitHub snapshot. Click a card for a focused study; private work stays clearly marked.</p><span>Scroll naturally to explore each chapter.</span></Reveal>
          </div>
          <div className="project-grid">{curatedRepos.map((repo, index) => <ProjectCard key={repo.name} repo={repo} index={index} onOpen={setSelectedRepo} />)}</div>
        </div>
      </section>

      <section id="skills" className="panel panel--skills">
        <div className="panel-inner">
          <div className="skills-layout">
            <div className="skills-intro">
              <SectionLabel index="02">Skills / current practice</SectionLabel>
              <Reveal><h2>Build the shape<br /><em>around the signal.</em></h2></Reveal>
              <Reveal delay={.1}><p>These are the working directions visible in the current projects. They are a base, not a final limit — you can expand them later as your practice evolves.</p></Reveal>
              <div className="skill-tabs" role="tablist" aria-label="Skill groups">
                {skillGroups.map((group) => <button type="button" role="tab" aria-selected={selectedSkill === group.id} className={selectedSkill === group.id ? "is-active" : ""} key={group.id} onClick={() => setSelectedSkill(group.id)}><group.icon size={17} />{group.label}</button>)}
              </div>
            </div>
            <AnimatePresence mode="wait">
              <motion.div className="skill-feature" key={activeSkillObj.id} initial={reduced ? false : { opacity: 0, y: 15 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }} transition={{ duration: .34, ease }}>
                <span className="skill-feature__number">{activeSkillObj.id === "systems" ? "01" : activeSkillObj.id === "resilient" ? "02" : "03"}</span>
                <activeSkillObj.icon size={41} strokeWidth={1.15} />
                <h3>{activeSkillObj.title}</h3>
                <p>{activeSkillObj.text}</p>
                <div className="skill-tags">{activeSkillObj.tags.map((tag) => <span key={tag}>{tag}</span>)}</div>
              </motion.div>
            </AnimatePresence>
          </div>
        </div>
      </section>

      <section id="stack" className="panel panel--stack">
        <div className="panel-inner">
          <div className="panel-heading">
            <div><SectionLabel index="03">Tech stack</SectionLabel><Reveal><h2>Tools for a<br /><em>living system.</em></h2></Reveal></div>
            <Reveal delay={.1} className="panel-heading__aside"><p>Based on the languages, patterns, and AI directions represented in the current GitHub snapshot. The stack is intentionally expandable.</p><span>Current evidence, future room.</span></Reveal>
          </div>
          <div className="stack-grid">
            {stackGroups.map((group, index) => <Reveal key={group.label} delay={index * .08} className="stack-card"><span className="stack-card__index">0{index + 1}</span><h3>{group.label}</h3><div>{group.items.map((item) => <span key={item}><i />{item}</span>)}</div></Reveal>)}
          </div>
          <div className="stack-note"><Code2 size={18} /><span>Stack details can grow with the portfolio — this layer is ready for deeper case studies, tools, and links.</span></div>
        </div>
      </section>

      <section id="about" className="panel panel--about">
        <div className="panel-inner about-layout">
          <div className="about-visual"><img src={github.profile.avatar_url} alt={`GitHub avatar for ${profileHandle}`} /><div className="about-visual__line" /><span>github.com/{profileHandle}</span></div>
          <div className="about-copy">
            <SectionLabel index="04">The person behind the work</SectionLabel>
            <Reveal><h2>Aggelos<br /><em>Frantzeskakis.</em></h2></Reveal>
            <Reveal delay={.1}><p>I’m building a practice around useful software: products that respect attention, make complexity legible, and leave a little room for wonder. The public GitHub profile stays quiet; the repositories show how I think.</p></Reveal>
            <div className="about-actions">
              <a className="button button--dark" href={profileUrl} target="_blank" rel="noreferrer"><Github size={16} /> Open GitHub <ArrowUpRight size={14} /></a>
              <button type="button" className="button button--outline" onClick={copyHandle}>{copied ? <Check size={15} /> : <Clipboard size={15} />}{copied ? "Copied" : "Copy handle"}</button>
              <button type="button" className={`button button--outline ${isDownloadingCv ? "is-loading" : ""}`} onClick={handleDownloadCv} disabled={isDownloadingCv} aria-busy={isDownloadingCv}>{isDownloadingCv ? <span className="button-spinner" aria-hidden="true" /> : <Download size={15} />}{isDownloadingCv ? "Preparing CV…" : "Download CV"}</button>
              <span>{github.profile.public_repos} public repositories</span>
            </div>
          </div>
        </div>
      </section>

      <section id="contact" className="panel panel--contact">
        <div className="panel-inner contact-layout">
          <div className="contact-heading"><SectionLabel index="05">Start a conversation</SectionLabel><span>Have a good problem?</span></div>
          <div className="contact-grid">
            <div>
              <Reveal><h2>Let’s make<br /><em>something memorable.</em></h2></Reveal>
              <p>Tell me what you are shaping. The form opens your email client so the conversation stays direct.</p>
              <div className="social-links">
                <a href={`mailto:${email}`}><Mail size={15} />{email}</a>
                <a href={instagramUrl} target="_blank" rel="noreferrer"><Instagram size={15} />{instagramHandle}</a>
              </div>
            </div>
            <ContactForm />
          </div>
          <div className="contact-footer">
            <span>© 2026 Aggelos Frantzeskakis</span>
            <span>AF / vertical editorial portfolio</span>
            <button type="button" onClick={() => scrollToSection("home")}>Back to top <ArrowUpRight size={13} /></button>
          </div>
        </div>
      </section>
    </div>

    {selectedRepo && <ProjectDialog repo={selectedRepo} onClose={() => setSelectedRepo(null)} />}
  </main>;
}
