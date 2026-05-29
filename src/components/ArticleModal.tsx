import React, { useState } from 'react';
import { useAppStore } from '../store';
import { Article } from '../types';

interface ArticleModalProps {
  article?: Article;
  onClose: () => void;
}

export default function ArticleModal({ article, onClose }: ArticleModalProps) {
  const { updateData, articles } = useAppStore();
  const [title, setTitle] = useState(article?.title || '');
  const [excerpt, setExcerpt] = useState(article?.excerpt || '');
  const [content, setContent] = useState(article?.content || '');
  const [error, setError] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title || !content) {
      setError('Title and content are required.');
      return;
    }

    const newArticle: Article = {
      id: article?.id || Math.random().toString(36).substr(2, 9),
      title,
      excerpt,
      content,
      date: article?.date || new Date().toISOString()
    };

    if (article) {
      updateData('articles', articles.map(a => a.id === article.id ? newArticle : a));
    } else {
      updateData('articles', [newArticle, ...articles]);
    }
    
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-hero-bg/60 backdrop-blur-sm z-[200] flex items-center justify-center p-6" onClick={(e) => { if(e.target === e.currentTarget) onClose(); }}>
      <div className="bg-bg-primary rounded-[8px] p-5 md:p-9 w-full max-w-[720px] max-h-[90vh] flex flex-col shadow-[0_24px_60px_rgba(6,14,28,0.35)]">
        <h2 className="font-serif text-[1.6rem] font-medium mb-[1.6rem] text-fg-primary shrink-0">
          {article ? 'Edit Article' : 'Write Article'}
        </h2>
        
        {error && <div className="bg-[#fee2e2] text-[#991b1b] border border-[#fca5a5] p-[0.7rem_1.1rem] rounded-[4px] text-[0.88rem] mb-5 shrink-0">{error}</div>}
        
        <form onSubmit={handleSubmit} className="overflow-y-auto flex-grow pr-2">
          <div className="mb-4">
            <label className="block text-[0.67rem] font-bold tracking-[0.1em] uppercase text-fg-secondary mb-[0.38rem]">Title *</label>
            <input 
              type="text" 
              value={title} 
              onChange={e => setTitle(e.target.value)} 
              className="w-full p-[0.58rem_0.8rem] border-[1.5px] border-fg-primary/10 rounded-[3px] bg-bg-tertiary font-sans text-[0.92rem] text-fg-primary outline-none focus:border-accent-primary focus:shadow-[0_0_0_3px_rgba(212,175,55,0.08)] transition-all"
            />
          </div>
          
          <div className="mb-4">
            <label className="block text-[0.67rem] font-bold tracking-[0.1em] uppercase text-fg-secondary mb-[0.38rem]">Excerpt / Summary</label>
            <textarea 
              value={excerpt} 
              onChange={e => setExcerpt(e.target.value)}
              className="w-full min-h-[70px] p-[0.58rem_0.8rem] border-[1.5px] border-fg-primary/10 rounded-[3px] bg-bg-tertiary font-sans text-[0.92rem] text-fg-primary outline-none focus:border-accent-primary focus:shadow-[0_0_0_3px_rgba(212,175,55,0.08)] transition-all resize-y"
            />
          </div>

          <div className="mb-6">
            <label className="block text-[0.67rem] font-bold tracking-[0.1em] uppercase text-fg-secondary mb-[0.38rem]">Content *</label>
            <textarea 
              value={content} 
              onChange={e => setContent(e.target.value)}
              className="w-full min-h-[320px] p-[0.58rem_0.8rem] border-[1.5px] border-fg-primary/10 rounded-[3px] bg-bg-tertiary font-sans text-[0.92rem] text-fg-primary outline-none focus:border-accent-primary focus:shadow-[0_0_0_3px_rgba(11,45,110,0.08)] transition-all resize-y"
            />
            <small className="block text-[0.71rem] text-fg-muted mt-[0.3rem]">Separate paragraphs with a blank line (double Enter).</small>
          </div>
          
          <div className="flex justify-end gap-3 mt-8 shrink-0">
            <button 
              type="button" 
              onClick={onClose}
              className="inline-flex items-center gap-[7px] rounded-[3px] font-sans font-bold tracking-[0.1em] uppercase transition-all cursor-pointer bg-transparent text-fg-primary border-[1.5px] border-fg-primary text-[0.7rem] py-[0.65rem] px-[1.6rem] hover:bg-fg-primary hover:text-bg-primary"
            >
              Cancel
            </button>
            <button 
              type="submit"
              className="inline-flex items-center gap-[7px] rounded-[3px] font-sans font-bold tracking-[0.1em] uppercase transition-all cursor-pointer border-none bg-accent-primary text-bg-primary text-[0.7rem] py-[0.68rem] px-[1.7rem] shadow-[0_2px_12px_rgba(11,45,110,0.25)] hover:bg-accent-hover hover:shadow-[0_4px_18px_rgba(11,45,110,0.35)]"
            >
              Save Article
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
