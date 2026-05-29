import React from 'react';
import { useAppStore } from '../store';

export default function About() {
  const { about } = useAppStore();
  const paragraphs = about.split('\n\n').filter(Boolean);

  return (
    <div className="max-w-[740px] mx-auto px-4 md:px-6 py-12 md:py-20 pb-20">
      <div className="mb-10 text-center flex flex-col items-center">
        <div className="relative mb-8 w-48 h-48 group">
          <div className="absolute inset-0 bg-accent-primary/20 rounded-full blur-xl group-hover:bg-accent-primary/40 transition-all duration-500" />
          <div className="absolute inset-[-4px] bg-gradient-to-br from-gold-primary via-gold-hover to-accent-primary rounded-full opacity-60 group-hover:opacity-100 transition-all duration-500" />
          <img 
            src="/author.jpg" 
            alt="Michael Yaw Tano" 
            onError={(e) => {
              e.currentTarget.src = "https://ui-avatars.com/api/?name=Michael+Yaw+Tano&background=101a26&color=d4af37&size=256";
            }}
            className="relative w-full h-full object-cover rounded-full border-4 border-bg-primary z-10" 
          />
        </div>
        <p className="text-[0.65rem] font-bold tracking-[0.2em] uppercase text-gold-primary mb-[0.4rem]">The Ministry</p>
        <h1 className="font-serif text-[2.5rem] font-medium leading-[1.12] text-fg-primary">About Michael Yaw Tano</h1>
      </div>
      <div className="font-serif text-[1.2rem] leading-[1.9] text-fg-primary">
        {paragraphs.map((p, idx) => (
          <p key={idx} className="mb-[1.4em]">{p}</p>
        ))}
      </div>
    </div>
  );
}
