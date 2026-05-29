import React from 'react';
import { useAppStore } from '../store';
import { motion } from 'motion/react';

export default function Podcast() {
  const { podcasts } = useAppStore();

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="max-w-[1140px] mx-auto px-4 md:px-6 py-12 md:py-20 pb-20">
      <motion.div 
        initial={{ opacity: 0, y: 15 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="mb-10"
      >
        <p className="text-[0.65rem] font-bold tracking-[0.2em] uppercase text-gold-primary mb-[0.4rem]">Audiobooks &amp; Teachings</p>
        <h1 className="font-serif text-[2.5rem] font-medium leading-[1.12] text-fg-primary">Podcast</h1>
        <p className="text-fg-secondary mt-[0.4rem] text-[0.95rem]">Listen to audio teachings and audiobooks by Michael Yaw Tano.</p>
      </motion.div>

      {podcasts.length > 0 ? (
        <motion.div 
          initial="hidden"
          animate="show"
          variants={{
            hidden: { opacity: 0 },
            show: { opacity: 1, transition: { staggerChildren: 0.15 } }
          }}
          className="flex flex-col gap-[1.5rem]"
        >
          {podcasts.map((p, i) => (
            <motion.div 
              variants={{ hidden: { opacity: 0, y: 20 }, show: { opacity: 1, y: 0 } }}
              key={p.id} 
              className="bg-bg-tertiary border border-fg-primary/10 rounded-[6px] p-6 transition-all duration-300 hover:shadow-[0_8px_28px_rgba(212,175,55,0.1)] hover:border-gold-primary/25 relative overflow-hidden group"
            >
              <div className="absolute top-0 right-0 w-[150px] h-[150px] bg-[radial-gradient(ellipse_at_top_right,rgba(212,175,55,0.08)_0%,transparent_70%)] pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              <div className="text-[0.63rem] font-bold tracking-[0.2em] uppercase text-gold-primary mb-[0.3rem]">Episode {i + 1}</div>
              <div className="font-serif text-[1.35rem] font-medium text-fg-primary mb-[0.4rem]">{p.title}</div>
              {p.description && <div className="text-[0.88rem] text-fg-secondary mb-[0.9rem] leading-[1.6]">{p.description}</div>}
              {p.audioUrl ? (
                <audio controls preload="none" className="w-full h-[38px] rounded-[3px] accent-accent-primary">
                  <source src={p.audioUrl} />
                  Your browser does not support audio.
                </audio>
              ) : (
                <span className="text-[0.82rem] text-fg-muted italic">Audio coming soon</span>
              )}
            </motion.div>
          ))}
        </motion.div>
      ) : (
        <div className="text-center py-16 px-8 text-fg-muted">
          <svg width="34" height="34" viewBox="0 0 34 34" fill="none" stroke="currentColor" strokeWidth="1.5" className="mx-auto mb-3"><rect x="12" y="4" width="10" height="16" rx="5"/><path d="M6 17a11 11 0 0 0 22 0M17 31v-4"/></svg>
          <p className="italic">No episodes yet.</p>
        </div>
      )}
    </motion.div>
  );
}
