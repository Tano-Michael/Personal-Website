import React, { useState, useEffect } from 'react';
import { motion } from 'motion/react';

export default function Donate() {
  const [showNumber, setShowNumber] = useState(false);
  const [showCaptcha, setShowCaptcha] = useState(false);
  const [captchaA, setCaptchaA] = useState(0);
  const [captchaB, setCaptchaB] = useState(0);
  const [captchaInput, setCaptchaInput] = useState('');
  const [captchaError, setCaptchaError] = useState(false);

  useEffect(() => {
    if (showCaptcha && !showNumber) {
      setCaptchaA(Math.floor(Math.random() * 5) + 1);
      setCaptchaB(Math.floor(Math.random() * 5) + 1);
    }
  }, [showCaptcha, showNumber]);

  const handleVerify = (e: React.FormEvent) => {
    e.preventDefault();
    if (parseInt(captchaInput) === captchaA + captchaB) {
      setShowNumber(true);
      setCaptchaError(false);
    } else {
      setCaptchaError(true);
      setCaptchaInput('');
      setCaptchaA(Math.floor(Math.random() * 5) + 1);
      setCaptchaB(Math.floor(Math.random() * 5) + 1);
    }
  };

  return (
    <div className="max-w-[740px] mx-auto px-4 md:px-6 py-12 md:py-20 pb-20">
      <div className="mb-10 text-center flex flex-col items-center">
        <div className="relative mb-8 w-16 h-16 group flex items-center justify-center text-accent-primary">
          <div className="absolute inset-0 bg-accent-primary/20 rounded-full blur-xl group-hover:bg-accent-primary/40 transition-all duration-500" />
          <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="relative z-10 w-12 h-12">
            <path d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z"/>
          </svg>
        </div>
        
        <p className="text-[0.65rem] font-bold tracking-[0.2em] uppercase text-gold-primary mb-[0.4rem]">Partner With Us</p>
        <h1 className="font-serif text-[2.5rem] font-medium leading-[1.12] text-fg-primary">Support the Ministry</h1>
      </div>

      <motion.div 
        initial={{ opacity: 0, y: 15 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
        className="font-serif text-[1.15rem] leading-[1.8] text-fg-secondary space-y-6"
      >
        <p>
          All materials on this site—including articles, books, and podcasts—are completely free. Our desire is to share the truth of the Gospel without cost, ensuring that anyone, anywhere, can access sound biblical teaching.
        </p>

        <p>
          If you have been blessed by these resources and would like to support the ongoing work of this ministry, you can partner with us through a free-will donation. Your generous support helps cover the costs of hosting, material production, and further outreach.
        </p>
        
        <div className="my-12 p-8 border border-fg-primary/10 rounded-[8px] bg-bg-secondary/30 text-center flex flex-col items-center">
          <p className="font-sans text-[0.95rem] mb-6 text-fg-primary">
            You can support the ministry directly via Mobile Money. 
            For privacy, please click below to reveal the number.
          </p>
          
          <div className="w-full max-w-sm mb-6">
            {!showNumber ? (
              !showCaptcha ? (
                <button
                  onClick={() => setShowCaptcha(true)}
                  className="inline-flex justify-center items-center gap-[10px] w-full rounded-[3px] font-sans font-bold tracking-[0.1em] uppercase transition-all cursor-pointer border-none bg-accent-primary text-bg-primary text-[0.8rem] py-[0.9rem] px-[2.5rem] shadow-[0_2px_12px_rgba(212,175,55,0.25)] hover:bg-accent-hover hover:shadow-[0_4px_18px_rgba(212,175,55,0.35)]"
                >
                  <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" />
                    <circle cx="12" cy="12" r="3" />
                  </svg>
                  Reveal Number
                </button>
              ) : (
                <motion.form 
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  onSubmit={handleVerify} 
                  className="bg-bg-primary p-5 rounded-[4px] border border-fg-primary/10 flex flex-col gap-4 shadow-[0_2px_15px_rgba(0,0,0,0.05)] text-left"
                >
                  <p className="text-[0.85rem] font-medium text-fg-primary">
                    Please solve the math puzzle to verify you are human:
                  </p>
                  <div className="flex items-center gap-4">
                    <span className="font-mono text-[1.4rem] tracking-widest text-fg-primary">
                      {captchaA} + {captchaB} = 
                    </span>
                    <input 
                      type="number" 
                      value={captchaInput}
                      onChange={(e) => setCaptchaInput(e.target.value)}
                      className={`w-20 bg-bg-secondary border ${captchaError ? 'border-red-500' : 'border-fg-primary/20'} rounded text-center font-mono text-[1.1rem] py-2 focus:border-accent-primary outline-none transition-colors`}
                      autoFocus
                    />
                  </div>
                  {captchaError && (
                    <span className="text-[0.75rem] text-red-500 font-medium">Incorrect, please try again.</span>
                  )}
                  <button 
                    type="submit" 
                    className="w-full bg-fg-primary text-bg-primary py-[0.7rem] rounded-[3px] text-[0.8rem] font-bold uppercase tracking-[0.1em] hover:opacity-90 transition-opacity mt-2"
                  >
                    Verify
                  </button>
                </motion.form>
              )
            ) : (
              <motion.div 
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                className="bg-bg-primary p-4 rounded-[4px] border border-accent-primary/20 flex flex-col gap-1 shadow-[0_2px_15px_rgba(0,0,0,0.05)]"
              >
                <span className="text-[0.7rem] font-bold tracking-[0.1em] uppercase text-accent-primary mb-1">MTN Mobile Money</span>
                <span className="font-mono text-[1.4rem] font-medium text-fg-primary tracking-[0.05em]">054 244 3585</span>
                <span className="text-[0.85rem] text-fg-primary/70 mt-1 font-medium">Michael Yaw Tano</span>
              </motion.div>
            )}
          </div>
          
          <div className="w-full max-w-sm pt-6 border-t border-fg-primary/10 text-left">
            <p className="font-sans text-[0.85rem] font-medium text-fg-primary mb-2">
              International Supporters
            </p>
            <p className="text-[0.8rem] text-fg-secondary leading-relaxed">
              If you are outside Ghana, you can send your support directly to the Mobile Money number (once revealed) using reliable platforms such as <strong>Sendwave</strong>, <strong>WorldRemit</strong>, <strong>Remitly</strong>, or <strong>TapTap Send</strong>. Give them the number and select "Mobile Money" as the delivery method.
            </p>
          </div>
        </div>

        <p className="italic text-center text-fg-muted text-[0.95rem]">
          "Each of you should give what you have decided in your heart to give, not reluctantly or under compulsion, for God loves a cheerful giver." <br/> — 2 Corinthians 9:7
        </p>
      </motion.div>
    </div>
  );
}
