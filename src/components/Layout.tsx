import React, { useState } from 'react';
import { Link, Outlet, useLocation } from 'react-router-dom';
import { Menu, X } from 'lucide-react';
import { useAppStore } from '../store';

export default function Layout() {
  const [menuOpen, setMenuOpen] = useState(false);
  const { isAuthenticated } = useAppStore();
  const location = useLocation();

  const links = [
    { path: '/', label: 'Home' },
    { path: '/books', label: 'Books' },
    { path: '/articles', label: 'Articles' },
    { path: '/podcast', label: 'Podcast' },
    { path: '/about', label: 'About' },
    { path: '/donate', label: 'Support' },
  ];

  return (
    <div className="min-h-screen flex flex-col pt-16 relative bg-bg-primary text-fg-primary overflow-x-hidden">
      {/* Global Background Glow matching the homepage hero */}
      <div className="fixed inset-0 bg-[radial-gradient(ellipse_70%_60%_at_50%_10%,rgba(212,175,55,.08)_0%,transparent_75%)] pointer-events-none z-0" />
      
      <nav className="fixed top-0 left-0 right-0 h-16 z-50 bg-bg-primary/80 backdrop-blur border-b border-fg-primary/10">
        <div className="max-w-6xl mx-auto px-4 md:px-6 h-full flex items-center justify-between">
          <Link to="/" className="font-serif text-[1.3rem] font-semibold flex items-center gap-2 text-fg-primary tracking-tight">
             <svg width="20" height="20" viewBox="0 0 48 48" fill="none" className="text-accent-primary">
               <rect x="21" y="4" width="6" height="40" rx="3" fill="currentColor"/>
               <rect x="6" y="17" width="36" height="6" rx="3" fill="currentColor"/>
             </svg>
            Return To Christ
          </Link>
          
          <ul className={`md:flex items-center gap-1 absolute md:static top-16 left-0 right-0 bg-bg-primary md:bg-transparent border-b md:border-b-0 border-fg-primary/10 flex-col md:flex-row py-4 md:py-0 ${menuOpen ? 'flex' : 'hidden'}`}>
            {links.map((link) => (
              <li key={link.path} className="w-full md:w-auto text-center">
                <Link
                  to={link.path}
                  onClick={() => setMenuOpen(false)}
                  className={`block px-4 py-[0.65rem] md:py-[0.3rem] md:px-[0.9rem] text-[0.7rem] font-bold tracking-[0.13em] uppercase transition-colors hover:text-fg-primary ${
                    location.pathname === link.path ? 'text-accent-primary' : 'text-fg-muted'
                  }`}
                >
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>

          <div className="flex items-center gap-3">
            <Link 
              to="/admin" 
              className="text-[0.68rem] font-bold tracking-[0.08em] uppercase text-accent-primary border-[1.5px] border-accent-primary rounded-[3px] px-[13px] py-[5px] hover:bg-accent-primary hover:text-bg-primary transition-all"
            >
              {isAuthenticated ? 'Admin' : 'Sign In'}
            </Link>
            <button 
              className="md:hidden p-1 text-fg-secondary flex flex-col gap-1"
              onClick={() => setMenuOpen(!menuOpen)}
            >
              <span className="block w-[22px] h-[1.5px] bg-fg-secondary rounded-[2px]" />
              <span className="block w-[22px] h-[1.5px] bg-fg-secondary rounded-[2px]" />
              <span className="block w-[22px] h-[1.5px] bg-fg-secondary rounded-[2px]" />
            </button>
          </div>
        </div>
      </nav>

      <main className="flex-grow justify-start relative z-10">
        <Outlet />
      </main>

      <footer className="text-white/40 text-center py-10 md:py-12 px-4 md:px-6 text-[0.82rem] relative z-10 border-t border-fg-primary/10 mt-auto">
        <div className="font-serif text-[1.4rem] text-white/85 mb-1">Return To Christ</div>
        <p>Ministry of Michael Yaw Tano &middot; All materials are free to share for the glory of God</p>
        <p className="mt-4 flex justify-center gap-4 text-[0.8rem] opacity-70">
          <Link to="/about" className="hover:text-accent-primary transition-colors">About</Link>
          <Link to="/donate" className="hover:text-accent-primary transition-colors">Support</Link>
        </p>
        <p className="mt-4">
          <Link to="/admin" className="opacity-30 text-[0.68rem] hover:opacity-100 transition-opacity cursor-pointer">Admin</Link>
        </p>
      </footer>
    </div>
  );
}
