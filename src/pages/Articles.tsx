import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useAppStore } from '../store';
import { fmtDate, readMin } from '../utils';
import { motion } from 'motion/react';

export default function Articles() {
  const { articles } = useAppStore();
  const navigate = useNavigate();

  if (!articles.length) {
    return (
      <div className="max-w-[740px] mx-auto px-4 md:px-6 py-12 md:py-20 pb-20">
        <div className="mb-10">
          <p className="text-[0.65rem] font-bold tracking-[0.2em] uppercase text-gold-primary mb-[0.4rem]">Writing</p>
          <h1 className="font-serif text-[2.5rem] font-medium leading-[1.12] text-fg-primary">Articles</h1>
        </div>
        <div className="text-center py-16 px-8 text-fg-muted">
          <svg width="34" height="34" viewBox="0 0 34 34" fill="none" stroke="currentColor" strokeWidth="1.5" className="mx-auto mb-3"><rect x="4" y="4" width="26" height="28" rx="2"/><path d="M4 8h26M11 4v28"/></svg>
          <p className="italic">No articles yet.</p>
        </div>
      </div>
    );
  }

  const [featured, ...rest] = articles;

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="max-w-[740px] mx-auto px-4 md:px-6 py-12 md:py-20 pb-20">
      <motion.div 
        initial={{ opacity: 0, y: 15 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="mb-10"
      >
        <p className="text-[0.65rem] font-bold tracking-[0.2em] uppercase text-gold-primary mb-[0.4rem]">Writing</p>
        <h1 className="font-serif text-[2.5rem] font-medium leading-[1.12] text-fg-primary">Articles</h1>
      </motion.div>

      <motion.div 
        initial={{ opacity: 0, y: 15 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.1 }}
        className="cursor-pointer py-11 relative pl-7 mb-2 border-b-2 border-fg-primary/10 group hover:bg-gradient-to-r hover:from-bg-tertiary hover:to-transparent rounded-[8px] transition-all duration-300"
        onClick={() => navigate(`/articles/${featured.id}`)}
      >
        <div className="absolute left-0 top-11 bottom-11 w-[3px] bg-gradient-to-b from-gold-primary to-gold-hover rounded-[2px]" />
        <div className="text-[0.62rem] font-bold tracking-[0.2em] uppercase text-gold-primary mb-[0.6rem]">Latest Article</div>
        <h2 className="font-serif text-[clamp(1.9rem,4vw,2.75rem)] font-semibold text-fg-primary leading-[1.12] mb-[0.75rem] tracking-[-0.015em] transition-colors group-hover:text-accent-primary">
          {featured.title}
        </h2>
        {featured.excerpt && (
          <p className="font-serif text-[1.1rem] italic text-fg-secondary leading-[1.65] mb-[0.9rem]">
            {featured.excerpt}
          </p>
        )}
        <div className="text-[0.66rem] font-bold tracking-[0.1em] uppercase text-fg-muted">
          {fmtDate(featured.date)} &middot; {readMin(featured.content)} min read
        </div>
        <span className="inline-flex items-center gap-[6px] text-[0.68rem] font-bold tracking-[0.1em] uppercase text-accent-primary mt-[0.85rem] group-hover:[&>svg]:translate-x-[5px]">
          Read Article
          <svg width="13" height="13" viewBox="0 0 13 13" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" className="transition-transform duration-300"><path d="M2 6.5h9M7 2l4.5 4.5L7 11"/></svg>
        </span>
      </motion.div>

      {rest.length > 0 && (
        <motion.div 
          initial="hidden"
          animate="show"
          variants={{
            hidden: { opacity: 0 },
            show: { opacity: 1, transition: { staggerChildren: 0.1, delayChildren: 0.2 } }
          }}
          className="flex flex-col mt-2"
        >
          {rest.map((a, i) => (
            <motion.div 
              variants={{ hidden: { opacity: 0, y: 15 }, show: { opacity: 1, y: 0 } }}
              key={a.id} 
              onClick={() => navigate(`/articles/${a.id}`)}
              className="py-[1.6rem] border-b border-fg-primary/10 cursor-pointer grid grid-cols-[2.75rem_1fr] gap-x-[1.25rem] items-start rounded-[4px] transition-all duration-300 m-0 hover:bg-gradient-to-r hover:from-bg-tertiary hover:to-transparent md:hover:-mx-6 md:hover:px-6 group relative"
            >
              <div className="absolute left-0 top-0 bottom-0 w-[2px] bg-gold-primary opacity-0 group-hover:opacity-100 transition-opacity" />
              <div className="font-serif text-[1.6rem] font-light text-fg-primary/15 leading-none pt-[0.35rem] text-right select-none tracking-[-0.02em]">
                {String(i + 2).padStart(2, '0')}
              </div>
              <div>
                <div className="text-[0.64rem] font-bold tracking-[0.1em] uppercase text-fg-muted mb-[0.3rem]">
                  {fmtDate(a.date)} &middot; {readMin(a.content)} min read
                </div>
                <h2 className="font-serif text-[1.3rem] font-medium text-fg-primary mb-[0.3rem] leading-[1.25] transition-colors group-hover:text-accent-primary">
                  {a.title}
                </h2>
                {a.excerpt && <p className="text-[0.87rem] text-fg-secondary leading-[1.6] line-clamp-2">{a.excerpt}</p>}
                <span className="inline-flex items-center gap-[5px] text-[0.65rem] font-bold tracking-[0.1em] uppercase text-accent-primary mt-[0.5rem] group-hover:[&>svg]:translate-x-[4px]">
                  Read Article 
                  <svg width="13" height="13" viewBox="0 0 13 13" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" className="transition-transform duration-300"><path d="M2 6.5h9M7 2l4.5 4.5L7 11"/></svg>
                </span>
              </div>
            </motion.div>
          ))}
        </motion.div>
      )}
    </motion.div>
  );
}
