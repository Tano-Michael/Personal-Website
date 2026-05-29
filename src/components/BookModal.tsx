import React, { useState, useRef } from 'react';
import { useAppStore } from '../store';
import { Book } from '../types';

interface BookModalProps {
  book?: Book;
  onClose: () => void;
}

export default function BookModal({ book, onClose }: BookModalProps) {
  const { updateData, books } = useAppStore();
  const [title, setTitle] = useState(book?.title || '');
  const [description, setDescription] = useState(book?.description || '');
  const [coverUrl, setCoverUrl] = useState(book?.coverUrl || '');
  
  const [file, setFile] = useState<File | null>(null);
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState('');
  
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!title) {
      setError('Title is required.');
      return;
    }
    
    let downloadUrl = book?.downloadUrl || '';
    
    if (file) {
      setUploading(true);
      setError('');
      try {
        const formData = new FormData();
        formData.append('file', file);
        
        const res = await fetch('/api/upload', {
          method: 'POST',
          body: formData,
        });
        
        if (!res.ok) {
          throw new Error('Upload failed');
        }
        
        const data = await res.json();
        downloadUrl = data.url;
      } catch (err) {
        setError('File upload failed. Please try again.');
        setUploading(false);
        return;
      }
    } else if (!downloadUrl) {
      setError('Please select a file to upload.');
      return;
    }

    const newBook: Book = {
      id: book?.id || Math.random().toString(36).substr(2, 9),
      title,
      description,
      coverUrl,
      downloadUrl,
      date: book?.date || new Date().toISOString()
    };

    if (book) {
      updateData('books', books.map(b => b.id === book.id ? newBook : b));
    } else {
      updateData('books', [newBook, ...books]);
    }
    
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-hero-bg/60 backdrop-blur-sm z-[200] flex items-center justify-center p-6" onClick={(e) => { if(e.target === e.currentTarget) onClose(); }}>
      <div className="bg-bg-primary rounded-[8px] p-5 md:p-9 w-full max-w-[580px] max-h-[90vh] flex flex-col shadow-[0_24px_60px_rgba(6,14,28,0.35)]">
        <h2 className="font-serif text-[1.6rem] font-medium mb-[1.6rem] text-fg-primary shrink-0">
          {book ? 'Edit Book' : 'Add Book'}
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

          <div className="mb-4">
            <label className="block text-[0.67rem] font-bold tracking-[0.1em] uppercase text-fg-secondary mb-[0.38rem]">Cover Image *</label>
            <div 
              className="border-2 border-dashed border-fg-primary/20 rounded-[6px] p-6 text-center cursor-pointer transition-all bg-bg-secondary hover:border-accent-primary hover:bg-accent-primary/5 relative"
              onClick={() => {
                const el = document.getElementById('cover-file-input');
                if (el) el.click();
              }}
            >
              <input 
                id="cover-file-input"
                type="file" 
                accept="image/*"
                className="hidden"
                onClick={(e) => e.stopPropagation()}
                onChange={async (e) => {
                  if (e.target.files && e.target.files.length > 0) {
                    const imgFile = e.target.files[0];
                    setUploading(true);
                    setError('');
                    
                    try {
                      const formData = new FormData();
                      formData.append('file', imgFile);
                      const res = await fetch('/api/upload', {
                        method: 'POST',
                        body: formData,
                      });
                      if (!res.ok) throw new Error('Upload failed');
                      const data = await res.json();
                      setCoverUrl(data.url);
                    } catch (err) {
                      setError('Image upload failed.');
                    } finally {
                      setUploading(false);
                    }
                  }
                }}
              />
              <div className="text-fg-muted mb-2 flex justify-center">
                 <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="3" width="18" height="18" rx="2" ry="2"/><circle cx="8.5" cy="8.5" r="1.5"/><polyline points="21 15 16 10 5 21"/></svg>
              </div>
              <p className="text-[0.82rem] text-fg-secondary m-0 font-medium">Click to select cover image</p>
              {coverUrl && (
                <div className="mt-4 flex justify-center">
                  <img src={coverUrl} alt="Cover preview" className="h-[80px] object-cover rounded shadow-sm" />
                </div>
              )}
            </div>
          </div>

          <div className="mb-6">
            <label className="block text-[0.67rem] font-bold tracking-[0.1em] uppercase text-fg-secondary mb-[0.38rem]">Book File (PDF, EPUB, etc) *</label>
            <div 
              className="border-2 border-dashed border-fg-primary/20 rounded-[6px] p-6 text-center cursor-pointer transition-all bg-bg-secondary hover:border-accent-primary hover:bg-accent-primary/5 relative"
              onClick={() => fileInputRef.current?.click()}
            >
              <input 
                type="file" 
                ref={fileInputRef}
                className="hidden"
                onChange={e => {
                  if (e.target.files && e.target.files.length > 0) {
                    setFile(e.target.files[0]);
                  }
                }}
              />
              <div className="text-fg-muted mb-2 flex justify-center">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><polyline points="17 8 12 3 7 8"/><line x1="12" y1="3" x2="12" y2="15"/></svg>
              </div>
              <p className="text-[0.82rem] text-fg-secondary m-0 font-medium">Click to select a file or drag and drop</p>
              {file ? (
                <div className="text-[0.8rem] text-accent-primary font-bold mt-2 break-all">{file.name}</div>
              ) : book?.downloadUrl ? (
                <div className="text-[0.72rem] text-fg-muted mt-2">Current file: {book.downloadUrl.split('/').pop()}</div>
              ) : null}
            </div>
          </div>
          
          <div className="flex justify-end gap-3 mt-8 shrink-0">
            <button 
              type="button" 
              onClick={onClose}
              disabled={uploading}
              className="inline-flex items-center gap-[7px] rounded-[3px] font-sans font-bold tracking-[0.1em] uppercase transition-all cursor-pointer bg-transparent text-fg-primary border-[1.5px] border-fg-primary text-[0.7rem] py-[0.65rem] px-[1.6rem] hover:bg-fg-primary hover:text-bg-primary disabled:opacity-50"
            >
              Cancel
            </button>
            <button 
              type="submit"
              disabled={uploading}
              className="inline-flex items-center gap-[7px] rounded-[3px] font-sans font-bold tracking-[0.1em] uppercase transition-all cursor-pointer border-none bg-accent-primary text-bg-primary text-[0.7rem] py-[0.68rem] px-[1.7rem] shadow-[0_2px_12px_rgba(11,45,110,0.25)] hover:bg-accent-hover hover:shadow-[0_4px_18px_rgba(11,45,110,0.35)] disabled:opacity-50"
            >
              {uploading ? 'Uploading...' : 'Save Book'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
