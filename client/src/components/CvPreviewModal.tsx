import { AnimatePresence, motion } from "framer-motion";
import { Download, FileText, Mail, X } from "lucide-react";
import { useEffect } from "react";

const cvUrl = "/manus-storage/Aggelos-Frantzeskakis-CV_3f144ec3.pdf";

export default function CvPreviewModal({ open, onClose, onDownload }: { open: boolean; onClose: () => void; onDownload: () => void }) {
  useEffect(() => {
    if (!open) return;
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") onClose();
    };
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", handleKeyDown);
    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [open, onClose]);

  return <AnimatePresence>
    {open && <motion.div className="cv-modal-backdrop" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={onClose}>
      <motion.section className="cv-modal" role="dialog" aria-modal="true" aria-labelledby="cv-preview-title" initial={{ opacity: 0, y: 22, scale: .98 }} animate={{ opacity: 1, y: 0, scale: 1 }} exit={{ opacity: 0, y: 12, scale: .98 }} transition={{ duration: .34, ease: [0.22, 1, 0.36, 1] }} onClick={(event) => event.stopPropagation()}>
        <header className="cv-modal__head">
          <div><span className="dialog-code">Document preview / 01</span><h2 id="cv-preview-title">Aggelos Frantzeskakis<span>CV</span></h2></div>
          <button type="button" className="icon-button" onClick={onClose} aria-label="Close CV preview"><X size={18} /></button>
        </header>
        <div className="cv-modal__body">
          <div className="cv-paper" aria-label="Preview of the current factual CV draft">
            <div className="cv-paper__top"><span>AGGELOS FRANTZESKAKIS</span><strong>AF</strong></div>
            <p className="cv-paper__role">Independent Digital Craft / Software &amp; Product Builder</p>
            <div className="cv-paper__rule" />
            <p>I build useful digital experiences around offline-first products, local AI, resilient interfaces, and thoughtful web experiences.</p>
            <div className="cv-paper__columns">
              <div><small>SELECTED WORK</small><strong>AXON OSS</strong><span>Local-first AI operating system · multi-provider routing · RAG</span><strong>Anabasis</strong><span>Offline-first PWA · TypeScript · bilingual skill progression</span></div>
              <div><small>CAPABILITIES</small><span>Product thinking</span><span>Local AI workflows</span><span>React / TypeScript</span><span>PWA architecture</span><span>Interface systems</span></div>
            </div>
            <div className="cv-paper__footer"><span>aggelosf2016@gmail.com</span><span>github.com/Frezzaroukos</span></div>
          </div>
          <aside className="cv-modal__aside">
            <div className="cv-modal__status"><FileText size={19} /><span>Current draft</span><strong>GitHub-grounded</strong></div>
            <p>This preview is the factual draft generated from the current portfolio and GitHub snapshot. It is intentionally not presented as a final employment CV.</p>
            <blockquote>After you move the project to your desktop, replace this document with your real CV including verified education, experience, certifications, location, and role history.</blockquote>
            <a className="cv-modal__email" href="mailto:aggelosf2016@gmail.com"><Mail size={14} /> Confirm details by email</a>
          </aside>
        </div>
        <footer className="cv-modal__foot"><span>PDF · A4 · factual draft</span><div><button type="button" className="button button--outline" onClick={onClose}>Keep browsing</button><button type="button" className="button button--dark" onClick={onDownload}><Download size={15} /> Download CV</button></div></footer>
        <a className="cv-modal__source" href={cvUrl} target="_blank" rel="noreferrer">Open PDF directly</a>
      </motion.section>
    </motion.div>}
  </AnimatePresence>;
}
