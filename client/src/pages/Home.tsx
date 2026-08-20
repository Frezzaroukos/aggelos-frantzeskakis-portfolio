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
  Linkedin,
  Layers3,
  Mail,
  Menu,
  Send,
  Sparkles,
  X,
  Zap,
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
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
const instagramHandle = "@aggelosfrantzeskakiss";
const instagramUrl = "https://www.instagram.com/aggelosfrantzeskakiss?igsh=c2Zldmh3ZW1zNXEy&utm_source=qr";
const linkedinUrl = import.meta.env.VITE_LINKEDIN_URL || "https://www.linkedin.com/";
const FORMSPREE_ENDPOINT = import.meta.env.VITE_FORMSPREE_ENDPOINT || "";

// The gallery shows only work that can be shown: a live demo, a public repository, or a system in daily use.
// Everything else (learning exercises, config repos, unfinished or client-confidential work) stays off the page.
const curatedNames = ["axon-booking", "axon", "anabasis", "anafora", "thermidor"];

// Client platform: private source, public live demo. Not a GitHub repository, so it is declared here.
const bookingProject: GitHubRepository = {
  name: "axon-booking",
  description: null,
  html_url: "https://axonos.dev/book/block-barbers",
  homepage: "https://axonos.dev/book/block-barbers",
  language: "TypeScript",
  stars: 0,
  forks: 0,
  private: true,
};

const repositories = [bookingProject, ...github.repositories];
const allGalleryRepos = curatedNames
  .map((name) => repositories.find((r) => r.name.toLowerCase() === name))
  .filter(Boolean) as GitHubRepository[];

// Filter buckets, keyed by project. Kept out of the copy layer so both languages share them.
const projectTags: Record<string, readonly string[]> = {
  "axon-booking": ["client"],
  axon: ["ai"],
  anabasis: ["offline"],
  anafora: ["ai", "offline"],
  thermidor: ["ai", "offline"],
};

type ProjectStory = {
  kicker: string;
  title: string;
  summary: string;
  detail: string;
  facts: string[];
  badge: string;
  linkLabel: string;
  sourceNote: string;
};

const stories: Record<Language, Record<string, ProjectStory>> = {
  en: {
    "axon-booking": {
      kicker: "Client platform / live demo",
      title: "Booking platform",
      summary: "A complete booking system for appointment businesses: public booking page, admin panel with five views, multiple staff members, email confirmations and a waitlist.",
      detail: "Built once as a real product, then configured per business — services, hours, staff, palette. The owner gets an admin panel that works from a phone; the customer books in under a minute without creating an account. The link opens a working demo you can click through.",
      facts: ["Multiple staff", "Email confirmations", "Waitlist", "Phone-friendly admin"],
      badge: "Live",
      linkLabel: "Open the live demo",
      sourceNote: "Client source stays private",
    },
    axon: {
      kicker: "The system I build with",
      title: "AXON",
      summary: "A local-first AI system: multi-provider routing, RAG, cost control, and a cockpit for running long jobs across local and hosted models.",
      detail: "AXON is the workshop, not the product. It sends each job to whichever model is cheapest or most private for that job, keeps context on my own machine, and is the reason one person can deliver work that normally needs a team.",
      facts: ["TypeScript", "Local AI / RAG", "Multi-provider routing", "Runs on my own hardware"],
      badge: "Private",
      linkLabel: "Open on GitHub",
      sourceNote: "Private source",
    },
    anabasis: {
      kicker: "Public repository / live",
      title: "Anabasis",
      summary: "Weighted calisthenics and skill-progression tracker. Offline-first PWA, strict TypeScript, bilingual, running entirely on the device.",
      detail: "Built for training that happens in a gym with no signal. Everything is stored locally in IndexedDB and works with the phone in airplane mode, then stays in sync when it reconnects.",
      facts: ["TypeScript", "PWA", "Offline-first", "Bilingual"],
      badge: "Live",
      linkLabel: "Open anabasis.axonos.dev",
      sourceNote: "Source on GitHub",
    },
    anafora: {
      kicker: "Public repository / local AI",
      title: "Anafora",
      summary: "Rough notes into a finished document. Runs local AI through Ollama with no server, so the text never leaves the device.",
      detail: "Written in Greek, for Greek paperwork. Useful exactly where cloud AI is not an option: lawyers, accountants, anyone handling documents that cannot be uploaded anywhere.",
      facts: ["TypeScript", "Local LLM / Ollama", "Greek-first", "No backend"],
      badge: "Public",
      linkLabel: "Open on GitHub",
      sourceNote: "Source on GitHub",
    },
    thermidor: {
      kicker: "Public repository / AI tracker",
      title: "Thermidor",
      summary: "AI-assisted calorie tracker. Offline-first PWA with opt-in modules, charts, and a multi-provider AI chat proxy.",
      detail: "Everything past the basics is opt-in, so the app stays small for people who only want to log meals. The AI layer talks to several providers behind one interface and can be switched off entirely.",
      facts: ["TypeScript", "PWA", "IndexedDB", "Multi-provider AI"],
      badge: "Public",
      linkLabel: "Open on GitHub",
      sourceNote: "Source on GitHub",
    },
  },
  el: {
    "axon-booking": {
      kicker: "Πλατφόρμα πελάτη / live demo",
      title: "Πλατφόρμα κρατήσεων",
      summary: "Ολοκληρωμένο σύστημα κρατήσεων για επιχειρήσεις με ραντεβού: δημόσια σελίδα κράτησης, admin panel με πέντε προβολές, πολλαπλοί συνεργάτες, email επιβεβαίωσης και λίστα αναμονής.",
      detail: "Χτίστηκε μία φορά ως πραγματικό προϊόν και μετά ρυθμίζεται ανά επιχείρηση — υπηρεσίες, ωράριο, προσωπικό, χρώματα. Ο ιδιοκτήτης παίρνει admin panel που δουλεύει από κινητό· ο πελάτης κλείνει ραντεβού σε λιγότερο από ένα λεπτό, χωρίς λογαριασμό. Ο σύνδεσμος ανοίγει demo που μπορείς να δοκιμάσεις.",
      facts: ["Πολλοί συνεργάτες", "Email επιβεβαίωσης", "Λίστα αναμονής", "Admin από κινητό"],
      badge: "Live",
      linkLabel: "Άνοιξε το live demo",
      sourceNote: "Ο κώδικας του πελάτη μένει ιδιωτικός",
    },
    axon: {
      kicker: "Το σύστημα με το οποίο χτίζω",
      title: "AXON",
      summary: "Local-first AI σύστημα: multi-provider routing, RAG, έλεγχος κόστους και cockpit για μεγάλες εργασίες σε τοπικά και cloud μοντέλα.",
      detail: "Το AXON είναι το εργαστήριο, όχι το προϊόν. Στέλνει κάθε εργασία στο μοντέλο που είναι φθηνότερο ή πιο ιδιωτικό γι' αυτήν, κρατάει το context στο δικό μου μηχάνημα, και είναι ο λόγος που ένας άνθρωπος παραδίδει δουλειά που κανονικά θέλει ομάδα.",
      facts: ["TypeScript", "Τοπικό AI / RAG", "Multi-provider routing", "Τρέχει στο δικό μου hardware"],
      badge: "Ιδιωτικό",
      linkLabel: "Άνοιγμα στο GitHub",
      sourceNote: "Ιδιωτικός κώδικας",
    },
    anabasis: {
      kicker: "Δημόσιο repository / live",
      title: "Anabasis",
      summary: "Tracker για weighted calisthenics και εξέλιξη σε skills. Offline-first PWA, strict TypeScript, δίγλωσσο, τρέχει εξ ολοκλήρου στη συσκευή.",
      detail: "Φτιαγμένο για προπόνηση σε γυμναστήριο χωρίς σήμα. Όλα αποθηκεύονται τοπικά σε IndexedDB και δουλεύουν με το κινητό σε λειτουργία πτήσης, και συγχρονίζονται όταν επανέλθει το δίκτυο.",
      facts: ["TypeScript", "PWA", "Offline-first", "Δίγλωσσο"],
      badge: "Live",
      linkLabel: "Άνοιξε το anabasis.axonos.dev",
      sourceNote: "Ο κώδικας είναι στο GitHub",
    },
    anafora: {
      kicker: "Δημόσιο repository / τοπικό AI",
      title: "Anafora",
      summary: "Πρόχειρες σημειώσεις σε επίσημο έγγραφο. Τρέχει τοπικό AI μέσω Ollama χωρίς server, οπότε το κείμενο δεν φεύγει ποτέ από τη συσκευή.",
      detail: "Γραμμένο στα ελληνικά, για ελληνικά χαρτιά. Χρήσιμο ακριβώς εκεί που το cloud AI δεν είναι επιλογή: δικηγόροι, λογιστές, όποιος χειρίζεται έγγραφα που δεν ανεβαίνουν πουθενά.",
      facts: ["TypeScript", "Τοπικό LLM / Ollama", "Ελληνικά πρώτα", "Χωρίς backend"],
      badge: "Δημόσιο",
      linkLabel: "Άνοιγμα στο GitHub",
      sourceNote: "Ο κώδικας είναι στο GitHub",
    },
    thermidor: {
      kicker: "Δημόσιο repository / AI tracker",
      title: "Thermidor",
      summary: "Καταγραφή θερμίδων με βοήθεια AI. Offline-first PWA με προαιρετικά modules, γραφήματα και multi-provider AI chat proxy.",
      detail: "Ό,τι είναι πέρα από τα βασικά ενεργοποιείται προαιρετικά, ώστε η εφαρμογή να μένει μικρή για όποιον θέλει απλώς να καταγράφει γεύματα. Το AI επίπεδο μιλάει σε πολλούς providers πίσω από ένα interface και μπορεί να απενεργοποιηθεί εντελώς.",
      facts: ["TypeScript", "PWA", "IndexedDB", "Multi-provider AI"],
      badge: "Δημόσιο",
      linkLabel: "Άνοιγμα στο GitHub",
      sourceNote: "Ο κώδικας είναι στο GitHub",
    },
  },
};

const skillGroups = [
  { id: "systems", label: "Systems & Architecture", icon: Code2 },
  { id: "resilient", label: "Resilient Products", icon: Sparkles },
  { id: "intelligence", label: "Local Intelligence", icon: Zap },
] as const;

const skillTools = [
  { icon: Code2, items: ["TypeScript", "Python", "JavaScript", "HTML"] },
  { icon: Sparkles, items: ["React", "PWA", "Styling / CSS3", "Responsive Web"] },
  { icon: Layers3, items: ["Ollama", "RAG", "Local LLM", "Multi-provider routing"] },
  { icon: Github, items: ["GitHub", "Git", "Vite", "CLI workflows"] },
];

const stackGroups = [
  { category: "Languages", items: ["TypeScript", "Python", "JavaScript", "HTML"] },
  { category: "Product patterns", items: ["PWA", "Offline-first", "Local-first", "Bilingual UI", "Responsive"] },
  { category: "AI direction", items: ["Ollama", "RAG", "RPID", "Multi-provider routing", "Local system syntax"] },
];

const chapters = [
  { id: "home", label: "Arrival" },
  { id: "work", label: "Work" },
  { id: "skills", label: "Skills" },
  { id: "stack", label: "Stack" },
  { id: "about", label: "Profile" },
  { id: "contact", label: "Contact" },
] as const;

function useReducedMotion() {
  const [reduced, setReduced] = useState(false);
  useEffect(() => {
    const query = window.matchMedia("(prefers-reduced-motion: reduce)");
    setReduced(query.matches);
    const handler = (e: MediaQueryListEvent) => setReduced(e.matches);
    query.addEventListener("change", handler);
    return () => query.removeEventListener("change", handler);
  }, []);
  return reduced;
}

function SectionLabel({ index, children }: { index: string; children: ReactNode }) {
  return <div className="section-label"><span>{index}</span><span className="section-label__rule" /><strong>{children}</strong></div>;
}

function Reveal({ children, className = "", delay = 0 }: { children: ReactNode; className?: string; delay?: number }) {
  const reduced = useReducedMotion();
  return <motion.div className={className} initial={reduced ? false : { opacity: 0, y: 18 }} whileInView={reduced ? undefined : { opacity: 1, y: 0 }} viewport={{ once: true, amount: .2 }} transition={reduced ? { duration: 0 } : { duration: .6, delay, ease: [0.22, 1, 0.36, 1] }}>{children}</motion.div>;
}

function CustomCursor() {
  const [position, setPosition] = useState({ x: -100, y: -100 });
  const [isPointer, setIsPointer] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const reduced = useReducedMotion();

  useEffect(() => {
    if (reduced || window.matchMedia("(hover: none)").matches) return;
    const handleMouseMove = (e: MouseEvent) => {
      setPosition({ x: e.clientX, y: e.clientY });
      setIsVisible(true);
      const target = e.target as HTMLElement | null;
      if (target) {
        const clickable = target.closest("button, a, input, textarea, [role='button']");
        setIsPointer(Boolean(clickable));
      }
    };
    const handleMouseLeave = () => setIsVisible(false);
    window.addEventListener("mousemove", handleMouseMove, { passive: true });
    document.addEventListener("mouseleave", handleMouseLeave);
    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      document.removeEventListener("mouseleave", handleMouseLeave);
    };
  }, [reduced]);

  if (reduced || !isVisible) return null;
  return <div className={`cinematic-cursor ${isPointer ? "is-pointer" : ""}`} style={{ transform: `translate3d(${position.x}px, ${position.y}px, 0)` }} aria-hidden="true"><div className="cinematic-cursor__dot" /><div className="cinematic-cursor__ring" /></div>;
}

function ProjectCard({ repo, index, onOpen, language }: { repo: GitHubRepository; index: number; onOpen: (repo: GitHubRepository) => void; language: Language }) {
  const t = ui[language].project;
  const story = stories[language][repo.name.toLowerCase()];
  const reduced = useReducedMotion();
  const revealFrom = index % 2 === 0 ? 28 : 42;
  const revealTilt = index % 2 === 0 ? -.7 : .7;
  return <motion.article className={`project-card project-card--${index + 1} ${repo.private ? "is-private" : ""}`} initial={reduced ? false : { opacity: 0, y: revealFrom, rotate: revealTilt, filter: "blur(6px)" }} whileInView={reduced ? undefined : { opacity: 1, y: 0, rotate: 0, filter: "blur(0px)" }} viewport={{ once: true, amount: .28, margin: "0px 0px -8%" }} transition={reduced ? { duration: 0 } : { duration: .72, delay: (index % 4) * .08, ease: [0.22, 1, 0.36, 1] }} whileHover={reduced ? undefined : { y: -8, rotate: 0 }} whileTap={reduced ? undefined : { scale: .995 }}>
    <div className="project-card__top"><span>0{String(index + 1).padStart(1, "0")}</span><span className="project-status"><b />{story?.badge ?? (repo.private ? t.private : t.public)}</span></div>
      <button type="button" className="project-card__body" onClick={() => onOpen(repo)} aria-label={`${t.openProjectPrefix} ${repo.name}`}>
      <span className="project-card__name">{story?.title ?? repo.name}</span>
      <span className="project-card__description">{story?.summary ?? repo.description ?? t.fallback}</span>
      <span className="project-card__open">{t.openDetails} <ArrowUpRight size={15} /></span>
    </button>
    <div className="project-card__footer">{(story?.facts ?? [repo.language ?? t.mixed]).slice(0, 3).map((fact) => <span key={fact}>{fact}</span>)}</div>
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
  const story = stories[language][repo.name.toLowerCase()];
  return <AnimatePresence><motion.div className="modal-backdrop" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={onClose}><motion.section className="project-dialog" role="dialog" aria-modal="true" aria-labelledby="project-title" initial={reduced ? false : { opacity: 0, y: 20, scale: .98 }} animate={{ opacity: 1, y: 0, scale: 1 }} exit={{ opacity: 0, y: 12, scale: .98 }} transition={{ duration: .34, ease: [0.22, 1, 0.36, 1] }} onClick={(event) => event.stopPropagation()}>
    <div className="dialog-head"><span>{story?.kicker ?? (repo.private ? t.privateKicker : t.publicKicker)}</span><button type="button" autoFocus onClick={onClose} aria-label={t.closeDetails}><X size={18} /></button></div>
    <div className="dialog-grid"><div><p className="dialog-code">{t.studyLabel} / {repo.name}</p><h2 id="project-title">{story?.title ?? repo.name}</h2><p className="dialog-summary">{story?.summary ?? repo.description}</p></div><div className="dialog-detail"><p>{story?.detail ?? t.detailFallback}</p><div className="fact-list">{(story?.facts ?? [repo.language ?? t.mixed, repo.private ? t.private : t.public]).map((fact) => <span key={fact}><Check size={13} />{fact}</span>)}</div></div></div>
    <div className="dialog-foot"><span>{story?.sourceNote ?? (repo.private ? t.privateSource : t.sourceGithub)}</span><a href={repo.homepage || repo.html_url} target="_blank" rel="noreferrer">{story?.linkLabel ?? t.openDetails} <ExternalLink size={14} /></a></div>
  </motion.section></motion.div></AnimatePresence>;
}

function ContactForm({ language }: { language: Language }) {
  const [name, setName] = useState("");
  const [subject, setSubject] = useState("");
  const [message, setMessage] = useState("");
  const [touched, setTouched] = useState({ name: false, subject: false, message: false });
  const [status, setStatus] = useState<"idle" | "sending" | "success" | "error">("idle");
  const t = ui[language].form;
  const reduced = useReducedMotion();

  const nameError = touched.name && name.trim().length < 2 ? t.nameError : "";
  const subjectError = touched.subject && subject.trim().length < 3 ? t.subjectError : "";
  const messageError = touched.message && message.trim().length < 10 ? t.messageError : "";
  const hasErrors = Boolean(nameError || subjectError || messageError || !name.trim() || !subject.trim() || !message.trim());

  const submit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setTouched({ name: true, subject: true, message: true });
    if (hasErrors || status === "sending") {
      if (hasErrors) toast.error(language === "el" ? "Παρακαλώ συμπληρώστε σωστά τα πεδία της φόρμας." : "Please check the highlighted form errors.", { duration: 3200 });
      return;
    }

    const form = event.currentTarget;
    const data = new FormData(form);
    const finalName = String(data.get("name") || name).trim();
    const finalSubject = String(data.get("subject") || t.defaultSubject).trim();
    const finalMessage = String(data.get("message") || message).trim();
    data.set("email", email);
    setStatus("sending");

    const resetFields = () => {
      form.reset();
      setName("");
      setSubject("");
      setMessage("");
      setTouched({ name: false, subject: false, message: false });
    };

    const markSuccess = (description: string) => {
      resetFields();
      setStatus("success");
      toast.success(t.successToastTitle, { description, duration: 4600 });
    };

    try {
      const controller = new AbortController();
      const timeoutId = window.setTimeout(() => controller.abort(), 12000);
      let response: Response;
      try {
        response = await fetch("/api/contact", {
          method: "POST",
          headers: { "Content-Type": "application/json", Accept: "application/json" },
          body: JSON.stringify({ name: finalName, email, subject: finalSubject, message: finalMessage }),
          signal: controller.signal,
        });
      } finally {
        window.clearTimeout(timeoutId);
      }
      const result = await response.json().catch(() => ({}));
      if (!response.ok || result.success === false) throw new Error(result.error || "Server validation failed");
      markSuccess(t.successToastDescription);
    } catch (error) {
      console.warn("[Contact] Backend API submission failed; attempting configured delivery fallback.", error);
      if (FORMSPREE_ENDPOINT) {
        try {
          const directRes = await fetch(FORMSPREE_ENDPOINT, { method: "POST", body: data, headers: { Accept: "application/json" } });
          if (directRes.ok) {
            markSuccess(t.successToastDescription);
            return;
          }
        } catch (fallbackError) {
          console.warn("[Contact] Direct Formspree fallback failed.", fallbackError);
        }
      }
      window.location.href = `mailto:${email}?subject=${encodeURIComponent(finalSubject)}&body=${encodeURIComponent(finalMessage)}`;
      resetFields();
      setStatus("success");
      toast(t.emailOpened, { duration: 3600 });
    }
  };

  const notice = status === "sending" ? t.sending : status === "success" ? t.sent : status === "error" ? t.error : FORMSPREE_ENDPOINT ? t.active : t.fallback;
  const clearStatusOnEdit = () => { if (status !== "sending") setStatus("idle"); };
  return <form className={`contact-form contact-form--${status}`} onSubmit={submit} noValidate aria-busy={status === "sending"}>
    <label className={nameError ? "has-error" : ""}>
      <span>{t.name}</span>
      <input name="name" value={name} disabled={status === "sending"} onChange={(e) => { clearStatusOnEdit(); setName(e.target.value); }} onBlur={() => setTouched((s) => ({ ...s, name: true }))} placeholder={t.namePlaceholder} aria-invalid={Boolean(nameError)} autoComplete="name" />
      <AnimatePresence>{nameError && <motion.span className="form-error" initial={reduced ? false : { opacity: 0, y: -4 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -4 }} transition={{ duration: .2 }}>{nameError}</motion.span>}</AnimatePresence>
    </label>
    <label className={subjectError ? "has-error" : ""}>
      <span>{t.subject}</span>
      <input name="subject" value={subject} disabled={status === "sending"} onChange={(e) => { clearStatusOnEdit(); setSubject(e.target.value); }} onBlur={() => setTouched((s) => ({ ...s, subject: true }))} placeholder={t.subjectPlaceholder} aria-invalid={Boolean(subjectError)} />
      <AnimatePresence>{subjectError && <motion.span className="form-error" initial={reduced ? false : { opacity: 0, y: -4 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -4 }} transition={{ duration: .2 }}>{subjectError}</motion.span>}</AnimatePresence>
    </label>
    <label className={`contact-form__wide ${messageError ? "has-error" : ""}`}>
      <span>{t.message}</span>
      <textarea name="message" value={message} disabled={status === "sending"} onChange={(e) => { clearStatusOnEdit(); setMessage(e.target.value); }} onBlur={() => setTouched((s) => ({ ...s, message: true }))} rows={4} placeholder={t.messagePlaceholder} aria-invalid={Boolean(messageError)} autoComplete="off" />
      <AnimatePresence>{messageError && <motion.span className="form-error" initial={reduced ? false : { opacity: 0, y: -4 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -4 }} transition={{ duration: .2 }}>{messageError}</motion.span>}</AnimatePresence>
    </label>
    <div className="contact-form__submit">
      <AnimatePresence mode="wait" initial={false}>
        <motion.span key={status} className={`contact-form__status ${status === "error" ? "is-error" : status === "success" ? "is-success" : ""}`} role="status" aria-live="polite" initial={reduced ? false : { opacity: 0, y: 5 }} animate={{ opacity: 1, y: 0 }} exit={reduced ? undefined : { opacity: 0, y: -5 }} transition={{ duration: reduced ? 0 : .24 }}>
          {status === "sending" && <span className="contact-form__loader" aria-hidden="true"><i /></span>}
          {status === "success" && <span className="contact-form__success-mark" aria-hidden="true"><Check size={15} strokeWidth={2.4} /></span>}
          <span>{notice}</span>
        </motion.span>
      </AnimatePresence>
      <motion.button className="button button--dark" type="submit" disabled={status === "sending"} aria-busy={status === "sending"} whileTap={reduced ? undefined : { scale: .98 }}>
        <AnimatePresence mode="wait" initial={false}>
          <motion.span key={status === "sending" ? "sending" : "compose"} initial={reduced ? false : { opacity: 0, y: 4 }} animate={{ opacity: 1, y: 0 }} exit={reduced ? undefined : { opacity: 0, y: -4 }} transition={{ duration: reduced ? 0 : .18 }}>{status === "sending" ? t.sending : t.compose}</motion.span>
        </AnimatePresence>
        {status === "sending" ? <span className="button-spinner" aria-hidden="true" /> : <Send size={15} />}
      </motion.button>
    </div>
  </form>;
}

function CinematicLoader({ onComplete, language }: { onComplete: () => void; language: Language }) {
  const [progress, setProgress] = useState(0);
  const [exiting, setExiting] = useState(false);
  const t = ui[language].loader;
  const reduced = useReducedMotion();

  useEffect(() => {
    let frameId = 0;
    let exitTimer = 0;
    let completeTimer = 0;
    let completed = false;
    const startedAt = window.performance.now();
    const duration = reduced ? 260 : 1700;

    const tick = (now: number) => {
      const ratio = Math.min(1, (now - startedAt) / duration);
      const eased = 1 - Math.pow(1 - ratio, 3);
      setProgress(Math.round(eased * 100));
      if (ratio >= 1) {
        if (completed) return;
        completed = true;
        completeTimer = window.setTimeout(() => {
          setExiting(true);
          exitTimer = window.setTimeout(onComplete, reduced ? 90 : 620);
        }, reduced ? 30 : 180);
        return;
      }
      frameId = window.requestAnimationFrame(tick);
    };

    frameId = window.requestAnimationFrame(tick);
    return () => {
      window.cancelAnimationFrame(frameId);
      window.clearTimeout(completeTimer);
      window.clearTimeout(exitTimer);
    };
  }, [onComplete, reduced]);

  return <motion.div className={`loading-screen ${exiting ? "is-exiting" : ""}`} role="dialog" aria-modal="true" aria-label={t.aria} initial={{ opacity: 1 }} exit={{ opacity: 0, scale: 1.02, filter: "blur(8px)" }} transition={{ duration: reduced ? .12 : .65, ease: [0.22, 1, 0.36, 1] }}>
    <div className="loading-screen__grid" aria-hidden="true" />
    <div className="loading-screen__top"><span>{t.topLeft}</span><strong>{t.topRight}</strong></div>
    <div className="loading-screen__signal" aria-hidden="true"><i /><span>{progress < 70 ? t.signalCalibrating : t.signalOpening}</span></div>
    <div className="loading-screen__stage" aria-hidden="true">
      <div className="loading-screen__orbit loading-screen__orbit--outer" />
      <div className="loading-screen__orbit loading-screen__orbit--inner" />
      <div className="loading-screen__orbit loading-screen__orbit--trace" />
      <img className="loading-screen__pegasus" src="/assets/pegasus.webp" alt="" />
    </div>
    <div className="loading-screen__center">
      <div className="loading-screen__monogram" aria-hidden="true"><span>A</span><span>F</span></div>
      <p className="loading-screen__name">Aggelos</p>
      <p className="loading-screen__sub">Frantzeskakis / digital craft</p>
      <div className="loading-screen__progress" role="progressbar" aria-valuemin={0} aria-valuemax={100} aria-valuenow={Math.round(progress)} aria-label={t.aria}><span style={{ width: `${progress}%` }} /></div>
      <div className="loading-screen__status"><span>{progress < 70 ? t.calibrating : t.opening}</span><strong>{Math.round(progress)}%</strong></div>
    </div>
    <div className="loading-screen__bottom"><span>{t.bottomLeft}</span><span>{t.bottomRight}</span></div>
  </motion.div>;
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
  const [isCvPreviewOpen, setIsCvPreviewOpen] = useState(false);
  const [isDownloadingCv, setIsDownloadingCv] = useState(false);
  const [copied, setCopied] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [selectedSkill, setSelectedSkill] = useState<string>("systems");
  const [projectFilter, setProjectFilter] = useState<"all" | "client" | "ai" | "offline">("all");

  const reduced = useReducedMotion();
  const { theme, toggleTheme } = useTheme();
  const completeLoading = useCallback(() => setIsLoading(false), []);
  const t = ui[language];

  useEffect(() => {
    window.localStorage.setItem("aggellos-portfolio-language", language);
    document.documentElement.lang = language;
  }, [language]);

  useEffect(() => {
    const handleScroll = () => {
      const st = window.scrollY;
      setShowBackToTop(st > 550);
      const sections = chapters.map((c) => document.getElementById(c.id)).filter(Boolean) as HTMLElement[];
      const current = sections.find((sec) => {
        const rect = sec.getBoundingClientRect();
        return rect.top <= 260 && rect.bottom >= 260;
      });
      if (current) setActiveSection(current.id);
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    let lastY = window.scrollY;
    const handleDirection = () => {
      const currentY = window.scrollY;
      if (Math.abs(currentY - lastY) > 6) {
        setScrollDirection(currentY > lastY ? "down" : "up");
        lastY = currentY;
      }
    };
    window.addEventListener("scroll", handleDirection, { passive: true });
    return () => window.removeEventListener("scroll", handleDirection);
  }, []);

  const assetUrls = {
    pegasus: "/assets/pegasus.webp",
    brandMark: "/assets/af-brand-mark.webp",
  };

  const cvUrl = "/assets/Aggelos-Frantzeskakis-CV.pdf";

  useEffect(() => {
    if (reduced || window.matchMedia("(hover: none)").matches) return;
    let frame = 0;
    const handlePointerMove = (e: MouseEvent) => {
      if (frame) return;
      frame = window.requestAnimationFrame(() => {
        const x = (e.clientX / window.innerWidth - 0.5) * 16;
        const y = (e.clientY / window.innerHeight - 0.5) * 16;
        document.documentElement.style.setProperty("--pointer-shift-x", `${x}px`);
        document.documentElement.style.setProperty("--pointer-shift-y", `${y}px`);
        frame = 0;
      });
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
    try { await navigator.clipboard.writeText(`github.com/${profileHandle}`); setCopied(true); toast.success(t.copySuccess); window.setTimeout(() => setCopied(false), 1800); } catch { setCopied(false); toast.error(t.copyError); }
  }

  const handleDownloadCv = useCallback(() => {
    if (isDownloadingCv) return;
    setIsDownloadingCv(true);
    toast(t.downloadStarted, { duration: reduced ? 500 : 900 });
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

  const filteredRepos = allGalleryRepos.filter((repo) => {
    if (projectFilter === "all") return true;
    return (projectTags[repo.name.toLowerCase()] ?? []).includes(projectFilter);
  });

  return <main className={`app-shell motion-${scrollDirection}`} data-active-section={activeSection}>
    <CustomCursor />
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
            <div className="hero-visual__telemetry" aria-hidden="true"><span>AXON / RETHYMNO</span><i /><span>{activeSection.toUpperCase()} / {scrollDirection.toUpperCase()}</span></div>
          </motion.div>
        </div>
      </section>

      <section id="work" className="panel panel--work">
        <div className="panel-inner">
          <div className="panel-heading">
            <div><SectionLabel index="01">{t.selectedWork}</SectionLabel><Reveal><h2>{t.workTitle}<br /><em>{t.workAccent}</em></h2></Reveal></div>
            <Reveal delay={.1} className="panel-heading__aside"><p>{t.workAside}</p><span>{t.workHint}</span></Reveal>
          </div>
          <div className="project-filters" role="tablist" aria-label="Project technology filters">
            {(["all", "client", "ai", "offline"] as const).map((filter) => <button type="button" role="tab" aria-selected={projectFilter === filter} key={filter} className={projectFilter === filter ? "is-active" : ""} onClick={() => setProjectFilter(filter)}>{t.project[(`filter${filter.charAt(0).toUpperCase() + filter.slice(1)}` as keyof typeof t.project)] as string}</button>)}
          </div>
          <AnimatePresence mode="wait" initial={false}>
            {filteredRepos.length > 0 ? (
              <motion.div key={projectFilter} className="project-grid project-grid--filtered" initial={reduced ? false : { opacity: 0, y: 14 }} animate={{ opacity: 1, y: 0 }} exit={reduced ? undefined : { opacity: 0, y: -10 }} transition={{ duration: reduced ? 0 : .38, ease: [0.22, 1, 0.36, 1] }}>
                {filteredRepos.map((repo, index) => <ProjectCard key={repo.name} repo={repo} index={index} onOpen={setSelectedRepo} language={language} />)}
              </motion.div>
            ) : (
              <motion.div key="empty-filter" className="project-empty" initial={reduced ? false : { opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={reduced ? undefined : { opacity: 0, y: -8 }} transition={{ duration: reduced ? 0 : .3 }}><p>{t.project.emptyFilter}</p><button type="button" className="button button--outline" onClick={() => setProjectFilter("all")}>{t.project.filterAll}</button></motion.div>
            )}
          </AnimatePresence>
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
              <motion.div className="skill-feature" key={activeSkillObj.id} initial={reduced ? false : { opacity: 0, y: 15 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }} transition={{ duration: .34, ease: [0.22, 1, 0.36, 1] }}>
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
              <Reveal delay={.1} className="skills-tools__aside"><p>{t.skillsToolsDescription}</p></Reveal>
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
            {stackGroups.map((group, index) => <Reveal key={group.category} delay={index * .06} className="stack-card"><span className="stack-card__index">0{index + 1}</span><h3>{group.category}</h3><ul>{group.items.map((item) => <li key={item}><Check size={13} /><span>{item}</span></li>)}</ul></Reveal>)}
          </div>
          <div className="stack-notice"><span>{t.stackNote}</span></div>
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
              <button type="button" className={`button button--outline button--cv ${isDownloadingCv ? "is-loading" : ""}`} onClick={() => setIsCvPreviewOpen(true)} disabled={isDownloadingCv} aria-haspopup="dialog" aria-busy={isDownloadingCv}><span className="cv-download-button__icon" aria-hidden="true">{isDownloadingCv ? <span className="button-spinner" /> : <Download size={15} />}</span><span>{isDownloadingCv ? t.preparingCv : t.downloadCv}</span><ArrowUpRight className="cv-download-button__arrow" size={13} aria-hidden="true" /></button>
              <span>{github.profile.public_repos} {t.publicRepositories}</span>
            </div>
          </div>
        </div>
      </section>

      <section id="contact" className="panel panel--contact">
        <div className="panel-inner">
          <div className="contact-heading"><SectionLabel index="05">{t.contactLabel}</SectionLabel><span>{t.contactPrompt}</span></div>
          <div className="contact-grid">
            <div>
              <Reveal><h2>{t.contactTitle}<br /><em>{t.contactAccent}</em></h2></Reveal>
              <p>{t.contactDescription}</p>
              <div className="social-links">
                <a href={`mailto:${email}`}><Mail size={15} />{email}</a>
                <a href={instagramUrl} target="_blank" rel="noreferrer"><Instagram size={15} />{instagramHandle}</a>
                <a className="social-link--network" href={profileUrl} target="_blank" rel="noreferrer" aria-label={`${t.github} — ${profileHandle}`}><Github size={15} /><span>{t.github}</span><ArrowUpRight size={12} /></a>
                <a className="social-link--network" href={linkedinUrl} target="_blank" rel="noreferrer" aria-label={linkedinUrl === "https://www.linkedin.com/" ? t.linkedinPending : t.linkedin}><Linkedin size={15} /><span>{t.linkedin}</span><ArrowUpRight size={12} /></a>
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
      {showBackToTop && <motion.button type="button" className="back-to-top" initial={reduced ? false : { opacity: 0, y: 12, scale: .96 }} animate={{ opacity: 1, y: 0, scale: 1 }} exit={reduced ? undefined : { opacity: 0, y: 12, scale: .96 }} transition={{ duration: .24, ease: [0.22, 1, 0.36, 1] }} onClick={() => scrollToSection("home")} aria-label={t.backToTop}><ArrowUp size={15} /><span>{t.backToTop}</span></motion.button>}
    </AnimatePresence>
  </main>;
}
