import React, { useState } from 'react';
import { useAppStore } from '../store';
import { fmtDate } from '../utils';
import BookModal from '../components/BookModal';
import ArticleModal from '../components/ArticleModal';
import PodcastModal from '../components/PodcastModal';
import { Book, Article, Podcast } from '../types';

export default function Admin() {
  const { 
    user, isAdmin, login, logout, 
    books, articles, podcasts, comments, hero, about, updateData, deleteItemDb, metrics 
  } = useAppStore();
  
  const [activeTab, setActiveTab] = useState<'books' | 'articles' | 'podcasts' | 'comments' | 'settings'>('books');
  
  // Modals state
  const [showBookModal, setShowBookModal] = useState(false);
  const [editingBook, setEditingBook] = useState<Book | undefined>(undefined);
  
  const [showArticleModal, setShowArticleModal] = useState(false);
  const [editingArticle, setEditingArticle] = useState<Article | undefined>(undefined);

  const [showPodcastModal, setShowPodcastModal] = useState(false);
  const [editingPodcast, setEditingPodcast] = useState<Podcast | undefined>(undefined);

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    login();
  };

  const deleteItem = (type: string, id: string) => {
    // Instead of using window.confirm (which is blocked in iframes), we just execute it directly.
    deleteItemDb(type, id);
  };

  const openBookModal = (book?: Book) => {
    setEditingBook(book);
    setShowBookModal(true);
  };
  
  const openArticleModal = (article?: Article) => {
    setEditingArticle(article);
    setShowArticleModal(true);
  };

  const openPodcastModal = (podcast?: Podcast) => {
    setEditingPodcast(podcast);
    setShowPodcastModal(true);
  };

  if (!user) {
    return (
      <div className="max-w-[380px] mx-auto my-12 md:my-20 px-4 md:px-6 text-center pb-20">
        <div className="mb-6 text-accent-primary flex justify-center">
          <svg width="40" height="40" viewBox="0 0 48 48" fill="none"><rect x="21" y="4" width="6" height="40" rx="3" fill="currentColor"/><rect x="6" y="17" width="36" height="6" rx="3" fill="currentColor"/></svg>
        </div>
        <h1 className="font-serif text-[2rem] font-medium mb-[0.4rem]">Admin Login</h1>
        <p className="text-fg-muted mb-7 text-[0.88rem]">Sign in with your Google account</p>
        
        <form onSubmit={handleLogin}>
          <button type="submit" className="w-full inline-flex justify-center items-center gap-[7px] rounded-[3px] font-sans font-bold tracking-[0.1em] uppercase transition-all cursor-pointer border-none bg-accent-primary text-bg-primary text-[0.7rem] py-[0.68rem] px-[1.7rem] shadow-[0_2px_12px_rgba(212,175,55,0.25)] hover:bg-accent-hover hover:shadow-[0_4px_18px_rgba(212,175,55,0.35)]">
            Sign In with Google
          </button>
        </form>
      </div>
    );
  }

  if (!isAdmin) {
    return (
      <div className="max-w-[380px] mx-auto my-12 md:my-20 px-4 md:px-6 text-center pb-20">
        <h1 className="font-serif text-[2rem] font-medium mb-[0.4rem]">Access Denied</h1>
        <p className="text-fg-muted mb-7 text-[0.88rem]">Your account ({user.email}) does not have admin permissions.</p>
        <button onClick={logout} className="w-full inline-flex justify-center items-center gap-[7px] rounded-[3px] font-sans font-bold tracking-[0.1em] uppercase transition-all cursor-pointer border-none bg-accent-primary text-bg-primary text-[0.7rem] py-[0.68rem] px-[1.7rem] shadow-[0_2px_12px_rgba(212,175,55,0.25)] hover:bg-accent-hover hover:shadow-[0_4px_18px_rgba(212,175,55,0.35)]">
          Sign Out
        </button>
      </div>
    );
  }

  const tabs = [
    { id: 'books', label: 'Books' },
    { id: 'articles', label: 'Articles' },
    { id: 'podcasts', label: 'Podcast' },
    { id: 'comments', label: 'Comments' }
  ] as const;

  return (
    <div className="max-w-[980px] mx-auto px-4 md:px-6 py-10 pb-20">
      <div className="flex justify-between items-center mb-5 flex-wrap gap-3">
        <h1 className="font-serif text-[2rem] font-medium">Admin Dashboard</h1>
        <button onClick={logout} className="inline-flex items-center gap-[5px] text-[0.67rem] font-bold tracking-[0.05em] uppercase text-[#9B1C1C] bg-[#fee8ea] border border-[#fca5a5] py-[4px] px-[11px] rounded-[3px] cursor-pointer hover:bg-[#9B1C1C] hover:text-white transition-colors">
          Sign Out
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
        <div className="bg-[#eff6ff] border border-[#bfdbfe] text-[#1e40af] p-[1rem_1.2rem] rounded-[4px] text-[0.82rem] flex gap-[9px] items-start shadow-sm">
          <span className="text-[1.2rem]">💡</span>
          <div className="flex flex-col justify-center h-full">
            <span className="font-bold mb-1">Content Manager</span>
            <span>Manage your applet content here. Changes are saved instantly to Firestore.</span>
          </div>
        </div>

        <div className="bg-bg-tertiary border border-fg-primary/10 p-[1rem_1.2rem] rounded-[4px] flex items-center justify-between shadow-sm">
          <div className="flex flex-col">
            <span className="text-[0.65rem] font-bold tracking-[0.1em] uppercase text-fg-muted mb-1">Total Unique Visits</span>
            <span className="text-[1.8rem] font-serif font-bold text-fg-primary leading-tight">{metrics.uniqueVisits || 0}</span>
          </div>
          <div className="h-10 w-10 rounded-full bg-accent-primary/10 text-accent-primary flex items-center justify-center">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"></path><circle cx="9" cy="7" r="4"></circle><path d="M23 21v-2a4 4 0 0 0-3-3.87"></path><path d="M16 3.13a4 4 0 0 1 0 7.75"></path></svg>
          </div>
        </div>
      </div>

      <div className="flex border-b-2 border-fg-primary/10 mb-8 overflow-x-auto">
        {tabs.map(tab => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={`bg-none border-none py-[0.65rem] px-[1.25rem] text-[0.69rem] font-bold tracking-[0.12em] uppercase cursor-pointer border-b-2 -mb-[2px] whitespace-nowrap transition-all ${
              activeTab === tab.id 
                ? 'text-accent-primary border-accent-primary' 
                : 'text-fg-muted border-transparent hover:text-fg-primary'
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      <div>
        {activeTab === 'books' && (
          <div>
            <button 
              className="inline-flex items-center gap-[7px] rounded-[3px] font-sans font-bold tracking-[0.1em] uppercase transition-all cursor-pointer border-none bg-accent-primary text-bg-primary text-[0.7rem] py-[0.68rem] px-[1.7rem] shadow-[0_2px_12px_rgba(11,45,110,0.25)] hover:bg-accent-hover hover:shadow-[0_4px_18px_rgba(11,45,110,0.35)] mb-6"
              onClick={() => openBookModal()}
            >
              <svg width="13" height="13" viewBox="0 0 13 13" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"><path d="M6.5 2v9M2 6.5h9"/></svg>
              Add Book
            </button>
            {books.length > 0 ? (
              <div className="overflow-x-auto">
                <table className="w-full border-collapse text-[0.87rem]">
                  <thead>
                    <tr>
                      <th className="text-left text-[0.63rem] font-bold tracking-[0.12em] uppercase text-fg-muted p-[0.5rem_0.8rem] border-b-[1.5px] border-fg-primary/10">Title</th>
                      <th className="text-left text-[0.63rem] font-bold tracking-[0.12em] uppercase text-fg-muted p-[0.5rem_0.8rem] border-b-[1.5px] border-fg-primary/10">Download URL</th>
                      <th className="text-left text-[0.63rem] font-bold tracking-[0.12em] uppercase text-fg-muted p-[0.5rem_0.8rem] border-b-[1.5px] border-fg-primary/10">Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {books.map(b => (
                      <tr key={b.id} className="hover:bg-bg-secondary">
                        <td className="p-[0.75rem_0.8rem] border-b border-fg-primary/5 text-fg-secondary align-top"><strong>{b.title}</strong></td>
                        <td className="p-[0.75rem_0.8rem] border-b border-fg-primary/5 text-fg-secondary align-top text-[0.78rem] max-w-[200px] overflow-hidden text-ellipsis whitespace-nowrap">{b.downloadUrl || '—'}</td>
                        <td className="p-[0.75rem_0.8rem] border-b border-fg-primary/5 text-fg-secondary align-top whitespace-nowrap">
                          <button onClick={() => openBookModal(b)} className="inline-flex items-center gap-[5px] text-[0.67rem] font-bold tracking-[0.05em] uppercase text-fg-secondary bg-bg-secondary border border-fg-primary/10 py-[4px] px-[11px] rounded-[3px] cursor-pointer hover:bg-accent-primary hover:text-white transition-colors">
                            <svg width="12" height="12" viewBox="0 0 12 12" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M8 2l2 2-7 7H1v-2L8 2z"/></svg> Edit
                          </button>
                          <button onClick={() => deleteItem('books', b.id)} className="inline-flex items-center gap-[5px] text-[0.67rem] font-bold tracking-[0.05em] uppercase text-[#9B1C1C] bg-[#fee8ea] border border-[#fca5a5] py-[4px] px-[11px] rounded-[3px] cursor-pointer hover:bg-[#9B1C1C] hover:text-white transition-colors ml-1">
                            <svg width="12" height="12" viewBox="0 0 12 12" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M2 4h8M5 4V2h2v2M4 4l.5 6h3L8 4"/></svg> Delete
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            ) : (
              <p className="text-fg-muted italic text-[0.9rem]">No books added yet.</p>
            )}
          </div>
        )}

        {activeTab === 'articles' && (
          <div>
            <div className="flex gap-3 mb-6">
              <button 
                className="inline-flex items-center gap-[7px] rounded-[3px] font-sans font-bold tracking-[0.1em] uppercase transition-all cursor-pointer border-none bg-accent-primary text-bg-primary text-[0.7rem] py-[0.68rem] px-[1.7rem] shadow-[0_2px_12px_rgba(212,175,55,0.25)] hover:bg-accent-hover hover:shadow-[0_4px_18px_rgba(212,175,55,0.35)]"
                onClick={() => openArticleModal()}
              >
                <svg width="13" height="13" viewBox="0 0 13 13" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"><path d="M6.5 2v9M2 6.5h9"/></svg>
                Write Article
              </button>
              
              <button 
                className="inline-flex items-center gap-[7px] rounded-[3px] font-sans font-bold tracking-[0.1em] uppercase transition-all cursor-pointer bg-transparent text-fg-primary border-[1.5px] border-fg-primary/60 text-[0.7rem] py-[0.65rem] px-[1.6rem] hover:bg-bg-tertiary hover:border-fg-primary"
                onClick={async () => {
                  try {
                    const res = await fetch('https://public-api.wordpress.com/wp/v2/sites/miketano.wordpress.com/posts?per_page=100');
                    if (!res.ok) throw new Error('Failed to fetch from WordPress');
                    const wpPosts = await res.json();
                    
                    const newArticles = wpPosts.map((post: any) => {
                      // Strip basic HTML for the excerpt
                      const rawExcerpt = post.excerpt?.rendered?.replace(/<[^>]+>/g, '') || '';
                      // Convert HTML to simple markdown or plain text for the content
                      // We'll keep basic HTML for formatting if possible, or attempt basic cleanup
                      const content = post.content?.rendered || '';
                      
                      return {
                        id: String(post.id),
                        title: post.title?.rendered || 'Untitled',
                        date: new Date(post.date).toISOString().split('T')[0],
                        excerpt: rawExcerpt.substring(0, 160).trim() + '...',
                        content: content
                      };
                    });
                    
                    // Merge, avoiding duplicates by ID or title
                    const existingIds = new Set(articles.map(a => a.id));
                    const toAdd = newArticles.filter((a: any) => !existingIds.has(a.id));
                    
                    if (toAdd.length > 0) {
                      updateData('articles', [...articles, ...toAdd]);
                      alert(`Successfully imported ${toAdd.length} new articles from WordPress!`);
                    } else {
                      alert('No new articles to import. Everything is up to date.');
                    }
                  } catch (err) {
                    console.error(err);
                    alert('Could not sync with miketano.wordpress.com. Make sure the site is public and available.');
                  }
                }}
              >
                <svg width="13" height="13" viewBox="0 0 13 13" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"><path d="M6.5 1.5v3m0 4v3m-5-5h10M3.5 3.5l1.5 1.5m3-3L6.5 3.5"/></svg>
                Sync with WordPress
              </button>
            </div>
            {articles.length > 0 ? (
              <div className="overflow-x-auto">
                <table className="w-full border-collapse text-[0.87rem]">
                  <thead>
                    <tr>
                      <th className="text-left text-[0.63rem] font-bold tracking-[0.12em] uppercase text-fg-muted p-[0.5rem_0.8rem] border-b-[1.5px] border-fg-primary/10">Title</th>
                      <th className="text-left text-[0.63rem] font-bold tracking-[0.12em] uppercase text-fg-muted p-[0.5rem_0.8rem] border-b-[1.5px] border-fg-primary/10">Date</th>
                      <th className="text-left text-[0.63rem] font-bold tracking-[0.12em] uppercase text-fg-muted p-[0.5rem_0.8rem] border-b-[1.5px] border-fg-primary/10">Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {articles.map(a => (
                      <tr key={a.id} className="hover:bg-bg-secondary">
                        <td className="p-[0.75rem_0.8rem] border-b border-fg-primary/5 text-fg-secondary align-top"><strong>{a.title}</strong></td>
                        <td className="p-[0.75rem_0.8rem] border-b border-fg-primary/5 text-fg-secondary align-top whitespace-nowrap text-[0.82rem]">{fmtDate(a.date)}</td>
                        <td className="p-[0.75rem_0.8rem] border-b border-fg-primary/5 text-fg-secondary align-top whitespace-nowrap">
                          <button onClick={() => openArticleModal(a)} className="inline-flex items-center gap-[5px] text-[0.67rem] font-bold tracking-[0.05em] uppercase text-fg-secondary bg-bg-secondary border border-fg-primary/10 py-[4px] px-[11px] rounded-[3px] cursor-pointer hover:bg-accent-primary hover:text-white transition-colors">
                            <svg width="12" height="12" viewBox="0 0 12 12" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M8 2l2 2-7 7H1v-2L8 2z"/></svg> Edit
                          </button>
                          <button onClick={() => deleteItem('articles', a.id)} className="inline-flex items-center gap-[5px] text-[0.67rem] font-bold tracking-[0.05em] uppercase text-[#9B1C1C] bg-[#fee8ea] border border-[#fca5a5] py-[4px] px-[11px] rounded-[3px] cursor-pointer hover:bg-[#9B1C1C] hover:text-white transition-colors ml-1">
                            <svg width="12" height="12" viewBox="0 0 12 12" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M2 4h8M5 4V2h2v2M4 4l.5 6h3L8 4"/></svg> Delete
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            ) : (
              <p className="text-fg-muted italic text-[0.9rem]">No articles yet.</p>
            )}
          </div>
        )}

        {activeTab === 'podcasts' && (
          <div>
            <button 
              className="inline-flex items-center gap-[7px] rounded-[3px] font-sans font-bold tracking-[0.1em] uppercase transition-all cursor-pointer border-none bg-accent-primary text-bg-primary text-[0.7rem] py-[0.68rem] px-[1.7rem] shadow-[0_2px_12px_rgba(11,45,110,0.25)] hover:bg-accent-hover hover:shadow-[0_4px_18px_rgba(11,45,110,0.35)] mb-6"
              onClick={() => openPodcastModal()}
            >
              <svg width="13" height="13" viewBox="0 0 13 13" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"><path d="M6.5 2v9M2 6.5h9"/></svg>
              Add Episode
            </button>
            {podcasts.length > 0 ? (
              <div className="overflow-x-auto">
                <table className="w-full border-collapse text-[0.87rem]">
                  <thead>
                    <tr>
                      <th className="text-left text-[0.63rem] font-bold tracking-[0.12em] uppercase text-fg-muted p-[0.5rem_0.8rem] border-b-[1.5px] border-fg-primary/10">Title</th>
                      <th className="text-left text-[0.63rem] font-bold tracking-[0.12em] uppercase text-fg-muted p-[0.5rem_0.8rem] border-b-[1.5px] border-fg-primary/10">Audio URL</th>
                      <th className="text-left text-[0.63rem] font-bold tracking-[0.12em] uppercase text-fg-muted p-[0.5rem_0.8rem] border-b-[1.5px] border-fg-primary/10">Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {podcasts.map(p => (
                      <tr key={p.id} className="hover:bg-bg-secondary">
                        <td className="p-[0.75rem_0.8rem] border-b border-fg-primary/5 text-fg-secondary align-top"><strong>{p.title}</strong></td>
                        <td className="p-[0.75rem_0.8rem] border-b border-fg-primary/5 text-fg-secondary align-top text-[0.78rem] max-w-[200px] overflow-hidden text-ellipsis whitespace-nowrap">{p.audioUrl || '—'}</td>
                        <td className="p-[0.75rem_0.8rem] border-b border-fg-primary/5 text-fg-secondary align-top whitespace-nowrap">
                          <button onClick={() => openPodcastModal(p)} className="inline-flex items-center gap-[5px] text-[0.67rem] font-bold tracking-[0.05em] uppercase text-fg-secondary bg-bg-secondary border border-fg-primary/10 py-[4px] px-[11px] rounded-[3px] cursor-pointer hover:bg-accent-primary hover:text-white transition-colors">
                            <svg width="12" height="12" viewBox="0 0 12 12" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M8 2l2 2-7 7H1v-2L8 2z"/></svg> Edit
                          </button>
                          <button onClick={() => deleteItem('podcasts', p.id)} className="inline-flex items-center gap-[5px] text-[0.67rem] font-bold tracking-[0.05em] uppercase text-[#9B1C1C] bg-[#fee8ea] border border-[#fca5a5] py-[4px] px-[11px] rounded-[3px] cursor-pointer hover:bg-[#9B1C1C] hover:text-white transition-colors ml-1">
                            <svg width="12" height="12" viewBox="0 0 12 12" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M2 4h8M5 4V2h2v2M4 4l.5 6h3L8 4"/></svg> Delete
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            ) : (
              <p className="text-fg-muted italic text-[0.9rem]">No episodes yet.</p>
            )}
          </div>
        )}

        {activeTab === 'comments' && (
          <div>
            {comments.length > 0 ? (
              <div className="overflow-x-auto">
                <table className="w-full border-collapse text-[0.87rem]">
                  <thead>
                    <tr>
                      <th className="text-left text-[0.63rem] font-bold tracking-[0.12em] uppercase text-fg-muted p-[0.5rem_0.8rem] border-b-[1.5px] border-fg-primary/10">Name</th>
                      <th className="text-left text-[0.63rem] font-bold tracking-[0.12em] uppercase text-fg-muted p-[0.5rem_0.8rem] border-b-[1.5px] border-fg-primary/10">Comment</th>
                      <th className="text-left text-[0.63rem] font-bold tracking-[0.12em] uppercase text-fg-muted p-[0.5rem_0.8rem] border-b-[1.5px] border-fg-primary/10">Article</th>
                      <th className="text-left text-[0.63rem] font-bold tracking-[0.12em] uppercase text-fg-muted p-[0.5rem_0.8rem] border-b-[1.5px] border-fg-primary/10">Date</th>
                      <th className="text-left text-[0.63rem] font-bold tracking-[0.12em] uppercase text-fg-muted p-[0.5rem_0.8rem] border-b-[1.5px] border-fg-primary/10"></th>
                    </tr>
                  </thead>
                  <tbody>
                    {comments.map(c => {
                      const article = articles.find(a => a.id === c.articleId);
                      return (
                        <tr key={c.id} className="hover:bg-bg-secondary">
                          <td className="p-[0.75rem_0.8rem] border-b border-fg-primary/5 text-fg-secondary align-top"><strong>{c.name}</strong></td>
                          <td className="p-[0.75rem_0.8rem] border-b border-fg-primary/5 text-fg-secondary align-top max-w-[180px] overflow-hidden text-ellipsis whitespace-nowrap text-[0.85rem]">{c.text}</td>
                          <td className="p-[0.75rem_0.8rem] border-b border-fg-primary/5 text-fg-secondary align-top text-[0.82rem]">{article ? article.title : '—'}</td>
                          <td className="p-[0.75rem_0.8rem] border-b border-fg-primary/5 text-fg-secondary align-top whitespace-nowrap text-[0.82rem]">{fmtDate(c.date)}</td>
                          <td className="p-[0.75rem_0.8rem] border-b border-fg-primary/5 text-fg-secondary align-top">
                            <button onClick={() => deleteItem('comments', c.id)} className="inline-flex items-center gap-[5px] text-[0.67rem] font-bold tracking-[0.05em] uppercase text-[#9B1C1C] bg-[#fee8ea] border border-[#fca5a5] py-[4px] px-[11px] rounded-[3px] cursor-pointer hover:bg-[#9B1C1C] hover:text-white transition-colors">
                              <svg width="12" height="12" viewBox="0 0 12 12" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M2 4h8M5 4V2h2v2M4 4l.5 6h3L8 4"/></svg>
                            </button>
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>
            ) : (
              <p className="text-fg-muted italic text-[0.9rem]">No comments yet.</p>
            )}
          </div>
        )}
      </div>

      {showBookModal && (
        <BookModal 
          book={editingBook} 
          onClose={() => setShowBookModal(false)} 
        />
      )}
      
      {showArticleModal && (
        <ArticleModal 
          article={editingArticle} 
          onClose={() => setShowArticleModal(false)} 
        />
      )}
      
      {showPodcastModal && (
        <PodcastModal 
          podcast={editingPodcast} 
          onClose={() => setShowPodcastModal(false)} 
        />
      )}
    </div>
  );
}
