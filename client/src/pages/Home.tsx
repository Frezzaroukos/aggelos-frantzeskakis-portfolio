import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import {
  ArrowDown,
  ArrowUp,
  ArrowUpRight,
  Moon,
  Sun,
  Check,
  ChevronRight,
  Clipboard,
  Code2,
  Download,
  ExternalLink,
  FileText,
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
import CvPreviewModal from "@/components/CvPreviewModal";
import { getGitHubData, type GitHubRepository } from "@/data/loader";
import { ui, type Language } from "@/lib/uiCopy";
import { useTheme } from "@/contexts/ThemeContext";

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
const cvUrl = "/assets/Aggelos-Frantzeskakis-CV.pdf";
const FORMSPREE_ENDPOINT = (import.meta.env.VITE_FORMSPREE_ENDPOINT as string | undefined)?.trim();
const assetUrls = {
  pegasus: "/assets/pegasus.webp",
  mark: "/assets/af-brand-mark.webp",
};

const repositories = github.repositories.filter((repo) => !repo.name.toLowerCase().includes("morfos") && !repo.fork);
const curatedNames = ["axon", "anabasis", "thermidor", "anafora"];
const curatedRepos = curatedNames.map((name) => repositories.find((repo) => repo.name.toLowerCase() === name)).filter((repo): repo is GitHubRepository => Boolean(repo));
const remainingRepos = repositories.filter((repo) => !curatedNames.includes(repo.name.toLowerCase()));
const allGalleryRepos = [...curatedRepos, ...remainingRepos];
const ease = [0.22, 1, 0.36, 1] as const;

const chapters = [
  { id: "home" },
  { id: "work" },
  { id: "skills" },
  { id: "stack" },
  { id: "about" },
  { id: "contact" },
] as const;

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
const skillTools = [
  { icon: Code2, items: ["TypeScript", "Python", "JavaScript", "HTML"] },
  { icon: Layers3, items: ["React", "PWA", "Offline-first", "Responsive UI"] },
  { icon: Sparkles, items: ["Ollama", "Krikri", "RAG", "Local AI"] },
  { icon: Github, items: ["GitHub", "Git", "Shell", "CLI workflows"] },
];

function Reveal({ children, className = "", delay = 0 }: { children: ReactNode; className?: string; delay?: number }) {
  const reduced = useReducedMotion();
  return <motion.div className={className} initial={reduced ? false : { opacity: 0, y: 20 }} whileInView={reduced ? undefined : { opacity: 1, y: 0 }} viewport={{ once: true, amount: 0.15 }} transition={reduced ? { duration: 0 } : { duration: .58, delay, ease }}>{children}</motion.div>;
}

function SectionLabel({ index, children }: { index: string; children: ReactNode }) {
  return <div className="section-label"><span>{index}</span><i />{children}</div>;
}


function CinematicLoader({ onComplete, language }: { onComplete: () => void; language: Language }) {
  const [progress, setProgress] = useState(6);
  const t = ui[language].loader;
  const reduced = useReducedMotion();
  useEffect(() => {
    let cancelled = false;
    let completionTimer: number | undefined;
    let finishTimer: number | undefined;
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
      finishTimer = window.setTimeout(() => {
        if (cancelled) return;
        window.clearInterval(progressTimer);
        setProgress(100);
        completionTimer = window.setTimeout(onComplete, reduced ? 80 : 620);
      }, wait);
    };
    void finish();
    return () => {
      cancelled = true;
      window.clearInterval(progressTimer);
      if (finishTimer) window.clearTimeout(finishTimer);
      if (completionTimer) window.clearTimeout(completionTimer);
    };
  }, [onComplete, reduced]);

  return <motion.div className="loading-screen" initial={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: reduced ? .1 : .5, ease }} aria-label={t.aria} role="status">
    <div className="loading-screen__grid" aria-hidden="true" />
    <div className="loading-screen__top"><span>{t.topLeft}</span><span>{t.topRight}</span></div>
    <div className="loading-screen__signal" aria-hidden="true"><span>FLIGHT PATH / 01</span><i /><span>{progress < 82 ? t.signalCalibrating : t.signalOpening}</span></div>
    <motion.div className="loading-screen__stage" aria-hidden="true" animate={reduced ? undefined : { y: [0, -8, 0], rotate: [-1, 0, 1] }} transition={reduced ? undefined : { duration: 6, repeat: Infinity, ease: "easeInOut" }}>
      <span className="loading-screen__orbit loading-screen__orbit--outer" />
      <span className="loading-screen__orbit loading-screen__orbit--inner" />
      <span className="loading-screen__orbit loading-screen__orbit--trace" />
      <motion.img className="loading-screen__pegasus" src={assetUrls.pegasus} alt="" initial={reduced ? false : { opacity: 0, scale: .92, x: 26 }} animate={{ opacity: .86, scale: 1, x: 0 }} transition={{ duration: reduced ? .1 : 1.2, delay: reduced ? 0 : .18, ease }} onError={(event) => { event.currentTarget.style.display = "none"; }} />
    </motion.div>
    <div className="loading-screen__center"><div className="loading-screen__monogram" aria-hidden="true"><span>A</span><span>F</span></div><p className="loading-screen__name">Aggelos</p><p className="loading-screen__sub">Frantzeskakis / ideas in motion</p><div className="loading-screen__progress"><span style={{ width: `${progress}%` }} /></div><div className="loading-screen__status"><span>{progress < 82 ? t.calibrating : t.opening}</span><strong>{Math.round(progress)}%</strong></div></div>
    <div className="loading-screen__bottom"><span>{t.bottomLeft}</span><span>{t.bottomRight}</span></div>
  </motion.div>;
}

function ProjectCard({ repo, index, onOpen, language }: { repo: GitHubRepository; index: number; onOpen: (repo: GitHubRepository) => void; language: Language }) {
  const t = ui[language].project;
  const story = stories[repo.name.toLowerCase()];
  const reduced = useReducedMotion();
  return <motion.article className={`project-card ${repo.private ? "is-private" : ""}`} initial={reduced ? false : { opacity: 0, y: 16 }} whileInView={reduced ? undefined : { opacity: 1, y: 0 }} viewport={{ once: true, amount: .15 }} transition={reduced ? { duration: 0 } : { duration: .5, delay: index * .04, ease }} whileHover={reduced ? undefined : { y: -6 }}>
    <div className="project-card__top"><span>0{String(index + 1).padStart(1, "0")}</span><span className="project-status"><b />{repo.private ? t.private : t.public}</span></div>
      <button type="button" className="project-card__body" onClick={() => onOpen(repo)} aria-label={`${t.openProjectPrefix} ${repo.name}`}>
      <span className="project-card__name">{repo.name}</span>
      <span className="project-card__description">{story?.summary ?? repo.description ?? t.fallback}</span>
      <span className="project-card__open">{t.openDetails} <ArrowUpRight size={15} /></span>
    </button>
    <div className="project-card__footer"><span>{repo.language ?? t.mixed}</span><span>{repo.stars} {t.stars}</span><span>{repo.forks} {t.forks}</span></div>
  </motion.article>;
}

function ProjectDialog({ repo, onClose, language }: { repo: GitHubRepository | null; onClose: () => void; language: Language }) {
  const t = ui[language].project;
  const reduced = useReducedMotion();
  useEffect(() => {
    if (!repo) return;
    const handleKeyDown = (event: KeyboardEvent) => { if (event.key === "Escape") onClose(); };
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", handleKeyDown);
    return () => { document.body.style.overflow = previousOverflow; window.removeEventListener("keydown", handleKeyDown); };
  }, [repo, onClose]);
  if (!repo) return null;
  const story = stories[repo.name.toLowerCase()];
  return <AnimatePresence><motion.div className="modal-backdrop" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={onClose}><motion.section className="project-dialog" role="dialog" aria-modal="true" aria-labelledby="project-title" initial={reduced ? false : { opacity: 0, y: 20, scale: .98 }} animate={{ opacity: 1, y: 0, scale: 1 }} exit={{ opacity: 0, y: 12, scale: .98 }} transition={{ duration: .34, ease }} onClick={(event) => event.stopPropagation()}>
    <div className="dialog-head"><span>{story?.kicker ?? (repo.private ? t.privateKicker : t.publicKicker)}</span><button type="button" autoFocus onClick={onClose} aria-label={t.closeDetails}><X size={18} /></button></div>
    <div className="dialog-grid"><div><p className="dialog-code">{t.studyLabel} / {repo.name}</p><h2 id="project-title">{story?.title ?? repo.name}</h2><p className="dialog-summary">{story?.summary ?? repo.description}</p></div><div className="dialog-detail"><p>{story?.detail ?? t.detailFallback}</p><div className="fact-list">{(story?.facts ?? [repo.language ?? t.mixed, repo.private ? t.private : t.public]).map((fact) => <span key={fact}><Check size={13} />{fact}</span>)}</div></div></div>
    <div className="dialog-foot"><span>{repo.private ? t.privateSource : t.sourceGithub}</span><a href={repo.html_url} target="_blank" rel="noreferrer">{t.openDetails} <ExternalLink size={14} /></a></div>
  </motion.section></motion.div></AnimatePresence>;
}

function ContactForm({ language }: { language: Language }) {
  const [status, setStatus] = useState<"idle" | "sending" | "success" | "error">("idle");
  const t = ui[language].form;
  const submit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const form = event.currentTarget;
    const data = new FormData(form);
    const subject = String(data.get("subject") || t.defaultSubject);
    const message = String(data.get("message") || "");
    setStatus("sending");
    if (!FORMSPREE_ENDPOINT) {
      window.location.href = `mailto:${email}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(message)}`;
      setStatus("success");
      toast(t.emailOpened, { duration: 3600 });
      return;
    }
    try {
      const response = await fetch(FORMSPREE_ENDPOINT, { method: "POST", body: data, headers: { Accept: "application/json" } });
      if (!response.ok) throw new Error("Formspree request failed");
      form.reset();
      setStatus("success");
      toast.success(t.successToastTitle, { description: t.successToastDescription, duration: 4600 });
    } catch {
      setStatus("error");
      toast.error(t.error, { duration: 4200 });
    }
  };
  const notice = status === "sending" ? t.sending : status === "success" ? (FORMSPREE_ENDPOINT ? t.sent : t.emailOpened) : status === "error" ? t.error : FORMSPREE_ENDPOINT ? t.active : t.fallback;
  return <form className="contact-form" onSubmit={submit}><label><span>{t.name}</span><input name="name" required placeholder={t.namePlaceholder} /></label><label><span>{t.subject}</span><input name="subject" required placeholder={t.subjectPlaceholder} /></label><label className="contact-form__wide"><span>{t.message}</span><textarea name="message" required rows={4} placeholder={t.messagePlaceholder} /></label><div className="contact-form__submit"><span className={status === "error" ? "is-error" : status === "success" ? "is-success" : ""} role="status" aria-live="polite">{notice}</span><button className="button button--dark" type="submit" disabled={status === "sending"}>{status === "sending" ? t.sending : t.compose} <Send size={15} /></button></div></form>;
}

export default function Home() {
  const [isLoading, setIsLoading] = useState(true);
  const [activeSection, setActiveSection] = useState("home");
  const [language, setLanguage] = useState<Language>(() => {
    if (typeof window === "undefined") return "en";
    return window.localStorage.getItem("aggellos-portfolio-language") === "el" ? "el" : "en";
  });
  const [showBackToTop, setShowBackToTop] = useState(false);
  const [scrollDirection, setScrollDirection] = useState<"up" | "down">("down");
  const [selectedRepo, setSelectedRepo] = useState<GitHubRepository | null>(null);
  const [selectedSkill, setSelectedSkill] = useState("systems");
  const [menuOpen, setMenuOpen] = useState(false);
  const [copied, setCopied] = useState(false);
  const [isDownloadingCv, setIsDownloadingCv] = useState(false);
  const [isCvPreviewOpen, setIsCvPreviewOpen] = useState(false);
  const reduced = useReducedMotion();
  const { theme, toggleTheme } = useTheme();
  const completeLoading = useCallback(() => setIsLoading(false), []);
  const t = ui[language];

  useEffect(() => {
    window.localStorage.setItem("aggellos-portfolio-language", language);
    document.documentElement.lang = language;
  }, [language]);

  useEffect(() => {
    let frame = 0;
    let previousY = window.scrollY;
    const root = document.documentElement;
    const updateMotion = () => {
      frame = 0;
      const y = window.scrollY;
      const maxScroll = Math.max(1, document.documentElement.scrollHeight - window.innerHeight);
      const progress = Math.min(1, Math.max(0, y / maxScroll));
      const direction = y < previousY ? "up" : "down";
      const scrollPos = y + 200;
      root.style.setProperty("--scroll-progress", progress.toFixed(3));
      root.style.setProperty("--orbit-rotation", `${Math.round(progress * 126)}deg`);
      root.style.setProperty("--trace-rotation", `${-23 + (direction === "down" ? progress * 4 : -progress * 4)}deg`);
      root.style.setProperty("--hero-depth", `${Math.round(progress * -22)}px`);
      root.style.setProperty("--hero-bank", direction === "down" ? "-1.4deg" : "1.4deg");
      setScrollDirection((current) => current === direction ? current : direction);
      setShowBackToTop(y > 560);
      for (const chapter of chapters) {
        const el = document.getElementById(chapter.id);
        if (el) {
          const top = el.offsetTop;
          const height = el.offsetHeight;
          if (scrollPos >= top && scrollPos < top + height) {
            setActiveSection((current) => current === chapter.id ? current : chapter.id);
            break;
          }
        }
      }
      previousY = y;
    };
    const handleScroll = () => {
      if (!frame) frame = window.requestAnimationFrame(updateMotion);
    };
    updateMotion();
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", handleScroll);
      if (frame) window.cancelAnimationFrame(frame);
    };
  }, []);

  useEffect(() => {
    const root = document.documentElement;
    if (reduced) {
      root.style.setProperty("--pointer-shift-x", "0px");
      root.style.setProperty("--pointer-shift-y", "0px");
      return;
    }
    let frame = 0;
    let pointerX = 0;
    let pointerY = 0;
    const updatePointer = () => {
      frame = 0;
      root.style.setProperty("--pointer-shift-x", `${Math.round(pointerX * 14)}px`);
      root.style.setProperty("--pointer-shift-y", `${Math.round(pointerY * 10)}px`);
    };
    const handlePointerMove = (event: PointerEvent) => {
      pointerX = (event.clientX / window.innerWidth - .5) * 2;
      pointerY = (event.clientY / window.innerHeight - .5) * 2;
      if (!frame) frame = window.requestAnimationFrame(updatePointer);
    };
    window.addEventListener("pointermove", handlePointerMove, { passive: true });
    return () => {
      window.removeEventListener("pointermove", handlePointerMove);
      if (frame) window.cancelAnimationFrame(frame);
    };
  }, [reduced]);

  function scrollToSection(id: string) {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: reduced ? "auto" : "smooth", block: "start" });
    }
    setMenuOpen(false);
  }

  async function copyHandle() {
    try { await navigator.clipboard.writeText(`github.com/${profileHandle}`);       setCopied(true); toast.success(t.copySuccess); window.setTimeout(() => setCopied(false), 1800); } catch { setCopied(false); toast.error(t.copyError); }
  }

  const handleDownloadCv = useCallback(() => {
    if (isDownloadingCv) return;
    setIsDownloadingCv(true);
    toast(t.preparingCv, { duration: reduced ? 500 : 900 });
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
        toast.success(t.cvReady, { duration: 1800 });
      }
    }, reduced ? 120 : 720);
  }, [isDownloadingCv, reduced, t]);

  const activeSkillObj = skillGroups.find((group) => group.id === selectedSkill) ?? skillGroups[0];

  return <main className={`app-shell motion-${scrollDirection}`} data-active-section={activeSection}>
    <AnimatePresence>{isLoading && <CinematicLoader onComplete={completeLoading} language={language} />}</AnimatePresence>
    <div className="grain" aria-hidden="true" />
    <header className="topbar">
      <a className="brand" href="#home" onClick={(event) => { event.preventDefault(); scrollToSection("home"); }} aria-label={t.brandHome}>
        <span className="brand-monogram" aria-hidden="true">AF</span><span><strong>Aggelos</strong><small>Frantzeskakis / AF</small></span>
      </a>
      <div className="topbar__motto"><span />{language === "el" ? "Ανεξάρτητη ψηφιακή δημιουργία" : "Independent digital craft"}</div>
      <nav className={`desktop-nav ${menuOpen ? "is-open" : ""}`} aria-label={t.primaryNavigation}>
        {chapters.map((chapter) => <button type="button" className={activeSection === chapter.id ? "is-active" : ""} key={chapter.id} onClick={() => scrollToSection(chapter.id)}>{t.nav[chapter.id]}</button>)}
      </nav>
      <div className="topbar__actions">
        <div className="language-switch" role="group" aria-label={t.languageLabel}><button type="button" className={language === "en" ? "is-active" : ""} aria-pressed={language === "en"} onClick={() => setLanguage("en")}>EN</button><span>/</span><button type="button" className={language === "el" ? "is-active" : ""} aria-pressed={language === "el"} onClick={() => setLanguage("el")}>EL</button></div>
        <button type="button" className={`theme-toggle ${theme === "dark" ? "is-dark" : ""}`} role="switch" aria-checked={theme === "dark"} aria-label={theme === "dark" ? t.switchToLight : t.switchToDark} title={theme === "dark" ? t.switchToLight : t.switchToDark} onClick={() => toggleTheme?.()}><span className="theme-toggle__track"><span className="theme-toggle__thumb">{theme === "dark" ? <Moon size={12} /> : <Sun size={12} />}</span></span></button>
        <a className="github-link" href={profileUrl} target="_blank" rel="noreferrer"><Github size={15} /><span>{t.github}</span><ArrowUpRight size={12} /></a>
        <button type="button" className="menu-button" onClick={() => setMenuOpen((value) => !value)} aria-expanded={menuOpen} aria-label={menuOpen ? t.closeNavigation : t.openNavigation}>
          {menuOpen ? <X size={18} /> : <Menu size={18} />}
        </button>
      </div>
    </header>

    {menuOpen && <div className="mobile-menu"><div className="mobile-menu__inner"><div className="mobile-menu__head"><span>{t.navigation}</span><button type="button" onClick={() => setMenuOpen(false)} aria-label={t.closeMenu}><X size={18} /></button></div>{chapters.map((chapter, index) => <button type="button" key={chapter.id} className={activeSection === chapter.id ? "is-active" : ""} onClick={() => scrollToSection(chapter.id)}><span>0{index + 1}</span>{t.nav[chapter.id]}<ChevronRight size={15} /></button>)}</div></div>}

    <div className="document-flow" data-active-section={activeSection} data-scroll-direction={scrollDirection}>
      <section id="home" className="panel panel--hero">
        <div className="panel-grid" aria-hidden="true" />
        <div className="panel-inner hero-panel">
          <div className="hero-panel__copy">
            <Reveal><div className="eyebrow"><span className="pulse" />{t.heroEyebrow}</div></Reveal>
            <Reveal delay={.08}><h1>{t.heroTitle}<br /><em>{t.heroAccent}</em></h1></Reveal>
            <Reveal delay={.16}><p>{t.heroDescription}</p></Reveal>
            <Reveal delay={.22} className="hero-actions">
              <button type="button" className="button button--dark" onClick={() => scrollToSection("work")}>{t.exploreWork} <ArrowDown size={16} /></button>
              <button type="button" className="text-button" onClick={() => scrollToSection("skills")}>{t.seeSkills} <ChevronRight size={15} /></button>
            </Reveal>
            <div className="hero-signature"><span>{t.nowExploring}</span><strong>{t.heroSignature}</strong></div>
          </div>
          <motion.div className={`hero-visual hero-visual--${scrollDirection}`} animate={reduced ? undefined : { y: [0, -7, 0] }} transition={reduced ? undefined : { duration: 6, repeat: Infinity, ease: "easeInOut" }}>
            <div className="hero-visual__scene">
              <div className="hero-visual__orbit" aria-hidden="true" />
              <div className="hero-visual__orbit hero-visual__orbit--inner" aria-hidden="true" />
              <div className="hero-visual__trace" aria-hidden="true" />
              <div className="hero-visual__trace hero-visual__trace--fine" aria-hidden="true" />
              <img src={assetUrls.pegasus} alt={language === "el" ? "Καθαρός watercolor Πήγασος που κοιτάζει προς τα δεξιά" : "Clean watercolor Pegasus looking toward the right"} onError={(event) => { event.currentTarget.style.display = "none"; event.currentTarget.parentElement?.classList.add("is-image-missing"); }} />
            </div>
            <div className="hero-visual__label">{t.signatureStudy} <span>{t.flightPath}</span></div>
            <div className="hero-visual__telemetry" aria-hidden="true"><span>AF / FLIGHT SYSTEM</span><i /><span>{activeSection.toUpperCase()} / {scrollDirection.toUpperCase()}</span></div>
          </motion.div>
        </div>
      </section>

      <section id="work" className="panel panel--work">
        <div className="panel-inner">
          <div className="panel-heading">
            <div><SectionLabel index="01">{t.selectedWork}</SectionLabel><Reveal><h2>{t.workTitle}<br /><em>{t.workAccent}</em></h2></Reveal></div>
            <Reveal delay={.1} className="panel-heading__aside"><p>{t.workAside}</p><span>{t.workHint}</span></Reveal>
          </div>
          <div className="project-grid">{curatedRepos.map((repo, index) => <ProjectCard key={repo.name} repo={repo} index={index} onOpen={setSelectedRepo} language={language} />)}</div>
        </div>
      </section>

      <section id="skills" className="panel panel--skills">
        <div className="panel-inner">
          <div className="skills-layout">
            <div className="skills-intro">
              <SectionLabel index="02">{t.skillsLabel}</SectionLabel>
              <Reveal><h2>{t.skillsTitle}<br /><em>{t.skillsAccent}</em></h2></Reveal>
              <Reveal delay={.1}><p>{t.skillsDescription}</p></Reveal>
              <div className="skill-tabs" role="tablist" aria-label={t.skillTabsLabel}>
                {skillGroups.map((group) => <button type="button" role="tab" aria-selected={selectedSkill === group.id} className={selectedSkill === group.id ? "is-active" : ""} key={group.id} onClick={() => setSelectedSkill(group.id)}><group.icon size={17} />{t.skillTabs[group.id as keyof typeof t.skillTabs]}</button>)}</div>
              </div>
            <AnimatePresence mode="wait">
              <motion.div className="skill-feature" key={activeSkillObj.id} initial={reduced ? false : { opacity: 0, y: 15 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }} transition={{ duration: .34, ease }}>
                <span className="skill-feature__number">{activeSkillObj.id === "systems" ? "01" : activeSkillObj.id === "resilient" ? "02" : "03"}</span>
                <activeSkillObj.icon size={41} strokeWidth={1.15} />
                <h3>{t.skillContent[activeSkillObj.id as keyof typeof t.skillContent].title}</h3>
                <p>{t.skillContent[activeSkillObj.id as keyof typeof t.skillContent].text}</p>
                <div className="skill-tags">{t.skillContent[activeSkillObj.id as keyof typeof t.skillContent].tags.map((tag) => <span key={tag}>{tag}</span>)}</div>
              </motion.div>
            </AnimatePresence>
          </div>
          <div id="skills-tools" className="skills-tools">
            <div className="skills-tools__head">
              <div><SectionLabel index="02 / tools">{t.skillsToolsNote}</SectionLabel><Reveal><h3>{t.skillsToolsTitle}<br /><em>{t.skillsToolsAccent}</em></h3></Reveal></div>
              <Reveal delay={.1} className="skills-tools__aside"><p>{t.skillsToolsDescription}</p><span>Editable after git pull / local AI handoff</span></Reveal>
            </div>
            <div className="skills-tools__grid">
              {skillTools.map((tool, index) => <Reveal key={t.skillsToolGroupLabels[index]} delay={index * .06} className="skills-tool-card"><span className="skills-tool-card__index">0{index + 1}</span><tool.icon size={19} strokeWidth={1.4} /><h4>{t.skillsToolGroupLabels[index]}</h4><div>{tool.items.map((item) => <span key={item}><i />{item}</span>)}</div></Reveal>)}
            </div>
          </div>
        </div>
      </section>

      <section id="stack" className="panel panel--stack">
        <div className="panel-inner">
          <div className="panel-heading">
            <div><SectionLabel index="03">{t.stackLabel}</SectionLabel><Reveal><h2>{t.stackTitle}<br /><em>{t.stackAccent}</em></h2></Reveal></div>
            <Reveal delay={.1} className="panel-heading__aside"><p>{t.stackAside}</p><span>{t.stackEvidence}</span></Reveal>
          </div>
          <div className="stack-grid">
            {stackGroups.map((group, index) => <Reveal key={group.label} delay={index * .08} className="stack-card"><span className="stack-card__index">0{index + 1}</span><h3>{t.stackGroupLabels[index]}</h3><div>{group.items.map((item) => <span key={item}><i />{item}</span>)}</div></Reveal>)}
          </div>
          <div className="stack-note"><Code2 size={18} /><span>{t.stackNote}</span></div>
        </div>
      </section>

      <section id="about" className="panel panel--about">
        <div className="panel-inner about-layout">
          <div className="about-visual"><img src={github.profile.avatar_url} alt={language === "el" ? `GitHub avatar για το ${profileHandle}` : `GitHub avatar for ${profileHandle}`} /><div className="about-visual__line" /><span>github.com/{profileHandle}</span></div>
          <div className="about-copy">
            <SectionLabel index="04">{t.aboutLabel}</SectionLabel>
            <Reveal><h2>Aggelos<br /><em>Frantzeskakis.</em></h2></Reveal>
            <Reveal delay={.1}><p>{t.aboutDescription}</p></Reveal>
            <div className="about-actions">
              <a className="button button--dark" href={profileUrl} target="_blank" rel="noreferrer"><Github size={16} /> {t.openGithub} <ArrowUpRight size={14} /></a>
              <button type="button" className="button button--outline" onClick={copyHandle}>{copied ? <Check size={15} /> : <Clipboard size={15} />}{copied ? t.copied : t.copyHandle}</button>
              <button type="button" className={`button button--outline ${isDownloadingCv ? "is-loading" : ""}`} onClick={() => setIsCvPreviewOpen(true)} disabled={isDownloadingCv} aria-haspopup="dialog" aria-busy={isDownloadingCv}>{isDownloadingCv ? <span className="button-spinner" aria-hidden="true" /> : <FileText size={15} />}{isDownloadingCv ? t.preparingCv : t.downloadCv}</button>
              <span>{github.profile.public_repos} {t.publicRepositories}</span>
            </div>
          </div>
        </div>
      </section>

      <section id="contact" className="panel panel--contact">
        <div className="panel-inner contact-layout">
          <div className="contact-heading"><SectionLabel index="05">{t.contactLabel}</SectionLabel><span>{t.contactPrompt}</span></div>
          <div className="contact-grid">
            <div>
              <Reveal><h2>{t.contactTitle}<br /><em>{t.contactAccent}</em></h2></Reveal>
              <p>{t.contactDescription}</p>
              <div className="social-links">
                <a href={`mailto:${email}`}><Mail size={15} />{email}</a>
                <a href={instagramUrl} target="_blank" rel="noreferrer"><Instagram size={15} />{instagramHandle}</a>
              </div>
            </div>
            <ContactForm language={language} />
          </div>
          <div className="contact-footer">
            <span>© 2026 Aggelos Frantzeskakis</span>
            <span className="footer-signature"><b>AF</b><span>{t.footerNote}</span></span>
            <button type="button" onClick={() => scrollToSection("home")}>{t.backToTop} <ArrowUpRight size={13} /></button>
          </div>
        </div>
      </section>
    </div>

    {selectedRepo && <ProjectDialog repo={selectedRepo} onClose={() => setSelectedRepo(null)} language={language} />}
    <CvPreviewModal language={language} open={isCvPreviewOpen} onClose={() => setIsCvPreviewOpen(false)} onDownload={() => { setIsCvPreviewOpen(false); handleDownloadCv(); }} />
    <AnimatePresence>
      {showBackToTop && <motion.button type="button" className="back-to-top" initial={reduced ? false : { opacity: 0, y: 12, scale: .96 }} animate={{ opacity: 1, y: 0, scale: 1 }} exit={reduced ? undefined : { opacity: 0, y: 12, scale: .96 }} transition={{ duration: .24, ease }} onClick={() => scrollToSection("home")} aria-label={t.backToTop}><ArrowUp size={15} /><span>{t.backToTop}</span></motion.button>}
    </AnimatePresence>
  </main>;
}
