import React, { useState } from 'react';
import { useAppStore } from '../store';
import { Podcast } from '../types';

interface PodcastModalProps {
  podcast?: Podcast;
  onClose: () => void;
}

export default function PodcastModal({ podcast, onClose }: PodcastModalProps) {
  const { updateData, podcasts } = useAppStore();
  const [title, setTitle] = useState(podcast?.title || '');
  const [description, setDescription] = useState(podcast?.description || '');
  const [audioUrl, setAudioUrl] = useState(podcast?.audioUrl || '');
  const [error, setError] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title) {
      setError('Title is required.');
      return;
    }

    const newPodcast: Podcast = {
      id: podcast?.id || Math.random().toString(36).substr(2, 9),
      title,
      description,
      audioUrl,
      date: podcast?.date || new Date().toISOString()
    };

    if (podcast) {
      updateData('podcasts', podcasts.map(p => p.id === podcast.id ? newPodcast : p));
    } else {
      updateData('podcasts', [newPodcast, ...podcasts]);
    }
    
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-hero-bg/60 backdrop-blur-sm z-[200] flex items-center justify-center p-6" onClick={(e) => { if(e.target === e.currentTarget) onClose(); }}>
      <div className="bg-bg-primary rounded-[8px] p-5 md:p-9 w-full max-w-[580px] max-h-[90vh] flex flex-col shadow-[0_24px_60px_rgba(6,14,28,0.35)]">
        <h2 className="font-serif text-[1.6rem] font-medium mb-[1.6rem] text-fg-primary shrink-0">
          {podcast ? 'Edit Episode' : 'Add Episode'}
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
            <label className="block text-[0.67rem] font-bold tracking-[0.1em] uppercase text-fg-secondary mb-[0.38rem]">Description</label>
            <textarea 
              value={description} 
              onChange={e => setDescription(e.target.value)}
              className="w-full min-h-[90px] p-[0.58rem_0.8rem] border-[1.5px] border-fg-primary/10 rounded-[3px] bg-bg-tertiary font-sans text-[0.92rem] text-fg-primary outline-none focus:border-accent-primary focus:shadow-[0_0_0_3px_rgba(212,175,55,0.08)] transition-all resize-y"
            />
          </div>

          <div className="mb-6">
            <label className="block text-[0.67rem] font-bold tracking-[0.1em] uppercase text-fg-secondary mb-[0.38rem]">Audio URL</label>
            <input 
              type="url" 
              value={audioUrl} 
              onChange={e => setAudioUrl(e.target.value)}
              className="w-full p-[0.58rem_0.8rem] border-[1.5px] border-fg-primary/10 rounded-[3px] bg-bg-tertiary font-sans text-[0.92rem] text-fg-primary outline-none focus:border-accent-primary focus:shadow-[0_0_0_3px_rgba(11,45,110,0.08)] transition-all"
            />
            <small className="block text-[0.71rem] text-fg-muted mt-[0.3rem]">Direct link to MP3, or a Google Drive / Dropbox shared audio link.</small>
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
              Save Episode
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
