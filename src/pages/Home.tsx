import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAppStore } from '../store';
import { fmtDate, readMin } from '../utils';
import { motion } from 'motion/react';

export default function Home() {
  const { hero, books, articles, podcasts } = useAppStore();
  const navigate = useNavigate();

  const featuredBooks = books.slice(0, 3);
  const featuredArts = articles.slice(0, 3);
  const featuredPods = podcasts.slice(0, 2);
  const hasAny = featuredBooks.length > 0 || featuredArts.length > 0 || featuredPods.length > 0;

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
      <section className="min-h-[92vh] flex flex-col items-center justify-center text-center py-12 px-4 md:py-20 md:px-8 relative overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_70%_60%_at_50%_60%,rgba(212,175,55,.08)_0%,transparent_65%)] pointer-events-none" />
        <div className="absolute bottom-0 left-0 right-0 h-[120px] bg-gradient-to-b from-transparent to-bg-primary pointer-events-none" />
        
        <motion.div 
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          className="text-gold-primary opacity-85 mb-8 relative z-10"
        >
          <svg width="54" height="54" viewBox="0 0 48 48" fill="none"><rect x="21" y="4" width="6" height="40" rx="3" fill="currentColor"/><rect x="6" y="17" width="36" height="6" rx="3" fill="currentColor"/></svg>
        </motion.div>
        
        <motion.p 
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.1, ease: "easeOut" }}
          className="font-serif text-[0.95rem] font-normal tracking-[0.35em] uppercase text-gold-hover mb-3 opacity-90 relative z-10"
        >
          {hero.subtitle}
        </motion.p>
        
        <motion.h1 
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.7, delay: 0.2, ease: "easeOut" }}
          className="font-serif text-[clamp(2.5rem,8vw,6rem)] font-semibold leading-none mb-5 text-fg-primary tracking-[-0.02em] relative z-10"
        >
          {hero.title}
        </motion.h1>
        
        <motion.p 
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.7, delay: 0.3, ease: "easeOut" }}
          className="font-serif text-[1.3rem] italic text-fg-secondary max-w-[460px] mb-12 leading-relaxed relative z-10"
        >
          {hero.tagline}
        </motion.p>
        
        <motion.div 
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.4, ease: "easeOut" }}
          className="flex gap-4 flex-wrap justify-center relative z-10"
        >
          <button 
            onClick={() => navigate('/articles')}
            className="inline-flex items-center gap-[7px] rounded-[3px] font-sans font-bold tracking-[0.1em] uppercase transition-all cursor-pointer border-none bg-accent-primary text-bg-primary text-[0.7rem] py-[0.68rem] px-[1.7rem] shadow-[0_2px_12px_rgba(212,175,55,0.15)] hover:bg-accent-hover hover:shadow-[0_4px_18px_rgba(184,136,14,0.30)]"
          >
            Read Articles
          </button>
          <button 
            onClick={() => navigate('/books')}
            className="inline-flex items-center gap-[7px] rounded-[3px] font-sans font-bold tracking-[0.1em] uppercase transition-all cursor-pointer bg-transparent text-fg-primary border-[1.5px] border-fg-primary/60 text-[0.7rem] py-[0.65rem] px-[1.6rem] hover:bg-bg-tertiary hover:border-fg-primary"
          >
            Download Books
          </button>
        </motion.div>
      </section>

      {featuredBooks.length > 0 && (
        <section className="bg-bg-secondary/30 border-y border-fg-primary/10">
          <div className="max-w-[1140px] mx-auto px-4 md:px-6 py-12 md:py-20">
            <div className="flex justify-between items-end flex-wrap gap-4 mb-9">
              <div>
                <p className="text-[0.65rem] font-bold tracking-[0.2em] uppercase text-gold-primary mb-[0.4rem]">Free Resources</p>
                <h2 className="font-serif text-[2.5rem] font-medium leading-[1.12] text-fg-primary">Books</h2>
              </div>
              <button 
                onClick={() => navigate('/books')}
                className="bg-transparent text-fg-primary border-[1.5px] border-fg-primary text-[0.7rem] py-[0.65rem] px-[1.6rem] font-bold tracking-[0.1em] uppercase rounded-[3px] hover:bg-fg-primary hover:text-bg-primary transition-colors cursor-pointer"
              >
                View All
              </button>
            </div>
            <motion.div 
              initial="hidden"
              whileInView="show"
              viewport={{ once: true, margin: "-50px" }}
              variants={{
                hidden: { opacity: 0 },
                show: { opacity: 1, transition: { staggerChildren: 0.15 } }
              }}
              className="grid grid-cols-[repeat(auto-fill,minmax(210px,1fr))] gap-8"
            >
              {featuredBooks.map(b => (
                <motion.div 
                  variants={{ hidden: { y: 20, opacity: 0 }, show: { y: 0, opacity: 1 } }}
                  key={b.id} 
                  className="bg-bg-tertiary border border-fg-primary/10 rounded-[6px] overflow-hidden transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_16px_40px_rgba(184,136,14,0.12)] hover:border-gold-primary/25"
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
                      <a href={b.downloadUrl} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-[6px] text-[0.67rem] font-bold tracking-[0.1em] uppercase text-white bg-accent-primary py-[7px] px-[14px] rounded-[3px] transition-all shadow-[0_2px_8px_rgba(212,175,55,0.2)] hover:bg-accent-hover hover:shadow-[0_4px_14px_rgba(212,175,55,0.3)]">
                        <svg width="13" height="13" viewBox="0 0 13 13" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"><path d="M6.5 2v7M3 7l3.5 3.5L10 7M2 11h9"/></svg>
                        Free Download
                      </a>
                    )}
                  </div>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </section>
      )}

      {featuredArts.length > 0 && (
        <div className="max-w-[1140px] mx-auto px-4 md:px-6 py-12 md:py-20">
          <div className="flex justify-between items-end flex-wrap gap-4 mb-8">
            <div>
              <p className="text-[0.65rem] font-bold tracking-[0.2em] uppercase text-gold-primary mb-[0.4rem]">From the Blog</p>
              <h2 className="font-serif text-[2.5rem] font-medium leading-[1.12] text-fg-primary">Articles</h2>
            </div>
            <button 
              onClick={() => navigate('/articles')}
              className="bg-transparent text-fg-primary border-[1.5px] border-fg-primary text-[0.7rem] py-[0.65rem] px-[1.6rem] font-bold tracking-[0.1em] uppercase rounded-[3px] hover:bg-fg-primary hover:text-bg-primary transition-colors cursor-pointer"
            >
              All Articles
            </button>
          </div>
          <motion.div 
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, margin: "-50px" }}
            variants={{
              hidden: { opacity: 0 },
              show: { opacity: 1, transition: { staggerChildren: 0.1 } }
            }}
            className="flex flex-col"
          >
            {featuredArts.map((a, i) => (
              <motion.div 
                variants={{ hidden: { y: 15, opacity: 0 }, show: { y: 0, opacity: 1 } }}
                key={a.id} 
                onClick={() => navigate(`/articles/${a.id}`)}
                className="py-[1.6rem] border-b border-fg-primary/10 cursor-pointer grid grid-cols-[2.75rem_1fr] gap-x-[1.25rem] items-start rounded-[4px] transition-all duration-300 m-0 hover:bg-gradient-to-r hover:from-bg-tertiary hover:to-bg-primary md:hover:-mx-6 md:hover:px-6 group hover:border-transparent relative"
              >
                <div className="absolute left-0 top-0 bottom-0 w-[2px] bg-gold-primary opacity-0 group-hover:opacity-100 transition-opacity" />
                <div className="font-serif text-[1.6rem] font-light text-fg-primary/15 leading-none pt-[0.35rem] text-right select-none tracking-[-0.02em]">
                  {String(i + 1).padStart(2, '0')}
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
        </div>
      )}

      {featuredPods.length > 0 && (
        <section className="bg-bg-secondary/30 border-y border-fg-primary/10">
          <div className="max-w-[1140px] mx-auto px-4 md:px-6 py-12 md:py-20">
            <div className="flex justify-between items-end flex-wrap gap-4 mb-8">
              <div>
                <p className="text-[0.65rem] font-bold tracking-[0.2em] uppercase text-gold-primary mb-[0.4rem]">Listen &amp; Learn</p>
                <h2 className="font-serif text-[2.5rem] font-medium leading-[1.12] text-fg-primary">Podcast</h2>
              </div>
              <button 
                 onClick={() => navigate('/podcast')}
                 className="bg-transparent text-fg-primary border-[1.5px] border-fg-primary text-[0.7rem] py-[0.65rem] px-[1.6rem] font-bold tracking-[0.1em] uppercase rounded-[3px] hover:bg-fg-primary hover:text-bg-primary transition-colors cursor-pointer"
              >
                All Episodes
              </button>
            </div>
            <motion.div 
              initial="hidden"
              whileInView="show"
              viewport={{ once: true, margin: "-50px" }}
              variants={{
                hidden: { opacity: 0 },
                show: { opacity: 1, transition: { staggerChildren: 0.15 } }
              }}
              className="flex flex-col gap-[1.5rem]"
            >
              {featuredPods.map((p, i) => (
                <motion.div 
                  variants={{ hidden: { y: 20, opacity: 0 }, show: { y: 0, opacity: 1 } }}
                  key={p.id} 
                  className="bg-bg-tertiary border border-fg-primary/10 rounded-[6px] p-6 transition-all duration-300 hover:shadow-[0_8px_28px_rgba(184,136,14,0.1)] hover:border-gold-primary/25 relative overflow-hidden group"
                >
                  <div className="absolute top-0 right-0 w-[150px] h-[150px] bg-[radial-gradient(ellipse_at_top_right,rgba(184,136,14,0.08)_0%,transparent_70%)] pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
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
          </div>
        </section>
      )}
      
      {!hasAny && (
        <div className="max-w-[1140px] mx-auto px-4 md:px-6 py-12 md:py-20 text-center pb-20">
          <div className="font-serif text-[1.15rem] text-fg-muted italic">
            Welcome. Content is coming soon.
          </div>
        </div>
      )}
    </motion.div>
  );
}
