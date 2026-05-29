import React from 'react';
import { useAppStore } from '../store';
import { motion } from 'motion/react';

export default function Books() {
  const { books } = useAppStore();

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="max-w-[1140px] mx-auto px-4 md:px-6 py-12 md:py-20 pb-20">
      <motion.div 
        initial={{ opacity: 0, y: 15 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="mb-10"
      >
        <p className="text-[0.65rem] font-bold tracking-[0.2em] uppercase text-gold-primary mb-[0.4rem]">Free Resources</p>
        <h1 className="font-serif text-[2.5rem] font-medium leading-[1.12] text-fg-primary">Books</h1>
        <p className="text-fg-secondary mt-[0.4rem] text-[0.95rem]">All books are available to download freely. Share and be blessed.</p>
      </motion.div>

      {books.length > 0 ? (
        <motion.div 
          initial="hidden"
          animate="show"
          variants={{
            hidden: { opacity: 0 },
            show: { opacity: 1, transition: { staggerChildren: 0.1 } }
          }}
          className="grid grid-cols-[repeat(auto-fill,minmax(210px,1fr))] gap-8"
        >
          {books.map(b => (
            <motion.div 
              variants={{ hidden: { opacity: 0, y: 20 }, show: { opacity: 1, y: 0 } }}
              key={b.id} 
              className="bg-bg-tertiary border border-fg-primary/10 rounded-[6px] overflow-hidden transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_16px_40px_rgba(212,175,55,0.12)] hover:border-gold-primary/25"
            >
              <div className="w-full aspect-[3/4] bg-gradient-to-br from-bg-secondary to-bg-tertiary flex items-center justify-center overflow-hidden relative">
                {b.coverUrl ? (
                  <img src={b.coverUrl} alt={b.title} loading="lazy" className="w-full h-full object-cover" />
                ) : (
                  <div className="flex flex-col items-center gap-[10px] text-fg-muted">
                    <svg width="34" height="34" viewBox="0 0 34 34" fill="none" stroke="currentColor" strokeWidth="1.5"><rect x="4" y="4" width="26" height="28" rx="2"/><path d="M4 8h26M11 4v28"/></svg>
                    <span className="text-[0.62rem] tracking-[0.15em] uppercase text-fg-muted">Book</span>
                  </div>
                )}
              </div>
              <div className="p-[1.2rem_1.2rem_1.4rem]">
                <div className="font-serif text-[1.1rem] font-semibold mb-[0.45rem] text-fg-primary leading-[1.3]">{b.title}</div>
                {b.description && <div className="text-[0.82rem] text-fg-secondary mb-[0.9rem] leading-[1.55] line-clamp-3">{b.description}</div>}
                {b.downloadUrl && (
                  <a href={b.downloadUrl} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-[6px] text-[0.67rem] font-bold tracking-[0.1em] uppercase text-white bg-accent-primary py-[7px] px-[14px] rounded-[3px] transition-all shadow-[0_2px_8px_rgba(212,175,55,0.15)] hover:bg-accent-hover hover:shadow-[0_4px_14px_rgba(184,136,14,0.3)]">
                    <svg width="13" height="13" viewBox="0 0 13 13" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"><path d="M6.5 2v7M3 7l3.5 3.5L10 7M2 11h9"/></svg>
                    Free Download
                  </a>
                )}
              </div>
            </motion.div>
          ))}
        </motion.div>
      ) : (
        <div className="text-center py-16 px-8 text-fg-muted">
          <svg width="34" height="34" viewBox="0 0 34 34" fill="none" stroke="currentColor" strokeWidth="1.5" className="mx-auto mb-3"><rect x="4" y="4" width="26" height="28" rx="2"/><path d="M4 8h26M11 4v28"/></svg>
          <p className="italic">No books yet.</p>
        </div>
      )}
    </motion.div>
  );
}
