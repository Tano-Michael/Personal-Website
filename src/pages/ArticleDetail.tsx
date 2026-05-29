import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useAppStore } from '../store';
import { fmtDate, readMin } from '../utils';
import { motion } from 'motion/react';

export default function ArticleDetail() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { articles, comments, addComment, isAuthenticated } = useAppStore();
  
  const article = articles.find(a => a.id === id);
  const articleComments = comments.filter(c => c.articleId === id);

  const [name, setName] = useState('');
  const [text, setText] = useState('');

  const [scrollProg, setScrollProg] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const el = document.getElementById('article-body');
      if (!el) return;
      const rect = el.getBoundingClientRect();
      const total = el.offsetHeight;
      const scrolled = Math.max(0, -rect.top);
      const pct = Math.min(100, Math.round((scrolled / total) * 100));
      setScrollProg(pct);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  if (!article) {
    return (
      <div className="max-w-[700px] mx-auto px-4 md:px-6 py-10 md:py-14 pb-20">
        <button className="inline-flex items-center gap-[6px] text-[0.68rem] font-bold tracking-[0.1em] uppercase text-fg-muted bg-none border-none p-0 mb-7 cursor-pointer hover:text-accent-primary transition-colors" onClick={() => navigate('/articles')}>
          <svg width="13" height="13" viewBox="0 0 13 13" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"><path d="M11 6.5H2M6 2 1.5 6.5 6 11"/></svg>
          All Articles
        </button>
        <p>Article not found.</p>
      </div>
    );
  }

  const postComment = () => {
    if (!name || !text) return;
    const newComment = {
      id: Math.random().toString(36).substring(2),
      articleId: article.id,
      name,
      text,
      date: new Date().toISOString()
    };
    addComment(newComment);
    setName('');
    setText('');
  };

  const paragraphs = article.content.split('\n\n').filter(p => p.trim());

  return (
    <motion.div initial={{ opacity: 0, y: 15 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }} transition={{ duration: 0.6 }}>
      <div className="fixed top-0 left-0 h-[3px] bg-gradient-to-r from-gold-primary to-accent-primary z-[999] pointer-events-none transition-all" style={{ width: `${scrollProg}%` }} />
      <div className="max-w-[700px] mx-auto px-4 md:px-6 py-10 md:py-14 pb-20">
        <button className="inline-flex items-center gap-[6px] text-[0.68rem] font-bold tracking-[0.1em] uppercase text-fg-muted bg-none border-none p-0 mb-7 cursor-pointer hover:text-accent-primary transition-colors" onClick={() => navigate('/articles')}>
          <svg width="13" height="13" viewBox="0 0 13 13" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"><path d="M11 6.5H2M6 2 1.5 6.5 6 11"/></svg>
          All Articles
        </button>

        <div className="mb-10 pb-8 border-b border-fg-primary/10">
          <h1 className="font-serif text-[clamp(2.1rem,5vw,3.2rem)] font-semibold leading-[1.08] mb-[1.1rem] tracking-[-0.02em]">
            {article.title}
          </h1>
          <div className="flex items-center gap-4 flex-wrap">
            <div className="text-gold-primary opacity-70 shrink-0">
               <svg width="16" height="16" viewBox="0 0 48 48" fill="none"><rect x="21" y="4" width="6" height="40" rx="3" fill="currentColor"/><rect x="6" y="17" width="36" height="6" rx="3" fill="currentColor"/></svg>
            </div>
            <div>
              <div className="font-bold text-[0.86rem] text-fg-secondary">Michael Yaw Tano</div>
              <div className="text-[0.68rem] font-bold tracking-[0.08em] uppercase text-fg-muted mt-[0.15rem]">
                {fmtDate(article.date)} &middot; {readMin(article.content)} min read
              </div>
            </div>
          </div>
        </div>

        {article.excerpt && (
          <div className="font-serif text-[1.22rem] italic text-accent-primary border-l-[3px] border-gold-primary pl-[1.35rem] py-[0.85rem] my-8 leading-[1.7] bg-gradient-to-r from-[rgba(212,175,55,0.05)] to-transparent">
            {article.excerpt}
          </div>
        )}

        <div 
          id="article-body" 
          className="font-serif text-[1.18rem] leading-[1.95] text-fg-primary prose-custom"
          dangerouslySetInnerHTML={{ 
            __html: article.content.includes('<p>') || article.content.includes('<div') || article.content.includes('<br')
              ? article.content 
              : article.content.split('\n\n').filter(p => p.trim()).map((p, idx) => 
                  `<p class="mb-[1.5em] ${idx === 0 ? "first-letter:float-left first-letter:font-serif first-letter:text-[4.5rem] first-letter:font-semibold first-letter:leading-[0.76] first-letter:mr-[0.1em] first-letter:mt-[0.08em] first-letter:text-accent-primary" : ""}">${p}</p>`
                ).join('')
          }}
        />

        <div className="text-center my-12 text-fg-muted">
          <div className="border-t border-fg-primary/10 w-[80px] mx-auto mb-5" />
          <span className="font-serif text-[0.95rem] italic tracking-[0.08em] text-gold-primary">Soli Deo Gloria</span>
        </div>

        <div className="bg-gradient-to-br from-bg-secondary to-bg-primary rounded-[6px] p-[1.6rem] flex gap-[1.25rem] items-start my-8 border border-fg-primary/10">
          <div className="w-[54px] h-[54px] rounded-full bg-accent-primary flex items-center justify-center text-white font-serif text-[1.35rem] font-semibold shrink-0 shadow-[0_2px_10px_rgba(212,175,55,0.3)]">
            MT
          </div>
          <div>
            <div className="font-bold text-[0.95rem] mb-[0.2rem] text-fg-primary">Michael Yaw Tano</div>
            <div className="text-[0.85rem] text-fg-secondary leading-[1.6]">
              Associate Pastor at Calvary Hill Chapel, Asokore Mampong. Minister, theologian, and writer — devoted to calling hearts back to Jesus Christ. Holds degrees in Divinity and Religious Studies.
            </div>
          </div>
        </div>

        <div className="mt-14 pt-10 border-t border-fg-primary/10">
          <h2 className="font-serif text-[1.6rem] font-medium mb-6">Comments{articleComments.length ? ` (${articleComments.length})` : ''}</h2>
          
          <div className="mb-8 bg-bg-secondary/40 p-6 rounded-[6px] border border-fg-primary/10 backdrop-blur-sm">
            <div className="mb-4">
              <label className="block text-[0.67rem] font-bold tracking-[0.1em] uppercase text-fg-secondary mb-[0.38rem]">Your Name</label>
              <input 
                type="text" 
                value={name} 
                onChange={e => setName(e.target.value)} 
                className="w-full p-[0.58rem_0.8rem] border-[1.5px] border-fg-primary/10 rounded-[3px] bg-bg-tertiary font-sans text-[0.92rem] text-fg-primary outline-none focus:border-accent-primary focus:shadow-[0_0_0_3px_rgba(212,175,55,0.08)] transition-all"
                placeholder="Enter your name" 
              />
            </div>
            <div className="mb-4">
              <label className="block text-[0.67rem] font-bold tracking-[0.1em] uppercase text-fg-secondary mb-[0.38rem]">Comment</label>
              <textarea 
                value={text} 
                onChange={e => setText(e.target.value)}
                className="w-full min-h-[90px] p-[0.58rem_0.8rem] border-[1.5px] border-fg-primary/10 rounded-[3px] bg-bg-tertiary font-sans text-[0.92rem] text-fg-primary outline-none focus:border-accent-primary focus:shadow-[0_0_0_3px_rgba(11,45,110,0.08)] transition-all resize-y"
                placeholder="Share your thoughts or a reflection…" 
              />
            </div>
            <button 
              onClick={postComment}
              className="inline-flex items-center gap-[7px] rounded-[3px] font-sans font-bold tracking-[0.1em] uppercase transition-all cursor-pointer border-none bg-accent-primary text-bg-primary text-[0.7rem] py-[0.68rem] px-[1.7rem] shadow-[0_2px_12px_rgba(11,45,110,0.25)] hover:bg-accent-hover hover:shadow-[0_4px_18px_rgba(11,45,110,0.35)]"
            >
              Post Comment
            </button>
          </div>

          <div>
            {articleComments.length ? (
              articleComments.map(c => (
                <div key={c.id} className="bg-bg-tertiary border border-fg-primary/10 p-[1.2rem_1.4rem] rounded-[6px] mb-[0.9rem] shadow-[0_2px_8px_rgba(0,0,0,0.3)]">
                   <div className="flex justify-between items-start">
                     <div>
                       <div className="font-bold text-[0.9rem] mb-[0.2rem] text-fg-primary">{c.name}</div>
                       <div className="text-[0.7rem] text-fg-muted mb-[0.65rem]">{fmtDate(c.date)}</div>
                     </div>
                   </div>
                   <div className="text-[0.93rem] text-fg-secondary leading-[1.65]">{c.text}</div>
                </div>
              ))
            ) : (
              <p className="text-fg-muted italic text-[0.9rem]">No comments yet. Be the first to share your thoughts.</p>
            )}
          </div>
        </div>
      </div>
    </motion.div>
  );
}
