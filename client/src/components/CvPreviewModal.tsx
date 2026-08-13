import { motion, AnimatePresence } from "framer-motion";
import { Download, FileText, Mail, X } from "lucide-react";
import { useEffect } from "react";
import { ui, type Language } from "@/lib/uiCopy";

const cvUrl = "/assets/Aggelos-Frantzeskakis-CV.pdf";

export default function CvPreviewModal({ open, onClose, onDownload, language }: { open: boolean; onClose: () => void; onDownload: () => void; language: Language }) {
  const t = ui[language].cv;

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
          <div><span className="dialog-code">{t.previewCode}</span><h2 id="cv-preview-title">Aggelos Frantzeskakis<span>CV</span></h2></div>
          <button type="button" autoFocus className="icon-button" onClick={onClose} aria-label={t.close}><X size={18} /></button>
        </header>
        <div className="cv-modal__body">
          <div className="cv-paper" aria-label={t.paperLabel}>
            <div className="cv-paper__top"><span>AGGELOS FRANTZESKAKIS</span><strong>AF</strong></div>
            <p className="cv-paper__role">{t.role}</p>
            <div className="cv-paper__rule" />
            <p>{t.summary}</p>
            <div className="cv-paper__columns">
              <div><small>{t.selectedWork}</small><strong>AXON OSS</strong><span>Local-first AI operating system · multi-provider routing · RAG</span><strong>Anabasis</strong><span>Offline-first PWA · TypeScript · bilingual skill progression</span></div>
              <div><small>{t.capabilities}</small><span>Product thinking</span><span>Local AI workflows</span><span>React / TypeScript</span><span>PWA architecture</span><span>Interface systems</span></div>
            </div>
            <div className="cv-paper__footer"><span>aggelosf2016@gmail.com</span><span>github.com/Frezzaroukos</span></div>
          </div>
          <aside className="cv-modal__aside">
            <div className="cv-modal__status"><FileText size={19} /><span>{t.currentDraft}</span><strong>{t.grounded}</strong></div>
            <p>{t.draftNote}</p>
            <blockquote>{t.replacementNote}</blockquote>
            <a className="cv-modal__email" href="mailto:aggelosf2016@gmail.com"><Mail size={14} /> {t.confirmDetails}</a>
          </aside>
        </div>
        <footer className="cv-modal__foot"><span>{t.format}</span><div><button type="button" className="button button--outline" onClick={onClose}>{t.keepBrowsing}</button><button type="button" className="button button--dark" onClick={onDownload}><Download size={15} /> {t.download}</button></div></footer>
        <a className="cv-modal__source" href={cvUrl} target="_blank" rel="noreferrer">{t.openDirectly}</a>
      </motion.section>
    </motion.div>}
  </AnimatePresence>;
}
