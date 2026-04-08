"use client";

import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Download, Zap, FileText, CheckCircle2, GripVertical, Check, Star } from 'lucide-react';
import Navbar from '../components/layout/Navbar';
import Footer from '../components/layout/Footer';

export default function ExtensionLandingPage() {
  const [browserInfo, setBrowserInfo] = useState({ name: 'Chrome', icon: 'chrome' });
  const [isAdded, setIsAdded] = useState(false);

  // Autofill Demo State
  const [demoState, setDemoState] = useState<'idle' | 'filling' | 'done'>('idle');

  // Resume Drag Drop Demo State
  const [draggedItem, setDraggedItem] = useState<string | null>(null);
  const [droppedItems, setDroppedItems] = useState<string[]>([]);

  useEffect(() => {
    const detectBrowser = async () => {
      const ua = navigator.userAgent;

      // Check for Brave
      if ((navigator as any).brave && await (navigator as any).brave.isBrave()) {
        setBrowserInfo({ name: 'Brave', icon: 'brave' });
      } else if (ua.match(/edg/i)) {
        setBrowserInfo({ name: 'Edge', icon: 'edge' });
      } else if (ua.match(/firefox|fxios/i)) {
        setBrowserInfo({ name: 'Firefox', icon: 'firefox' });
      } else if (ua.match(/safari/i) && !ua.match(/chrome/i)) {
        setBrowserInfo({ name: 'Safari', icon: 'safari' });
      } else {
        setBrowserInfo({ name: 'Chrome', icon: 'chrome' });
      }
    };

    detectBrowser();
  }, []);

  const handleInstall = () => {
    setIsAdded(true);
    setTimeout(() => setIsAdded(false), 3000);
  };

  const runAutofillDemo = () => {
    setDemoState('filling');
    setTimeout(() => setDemoState('done'), 1500);
    setTimeout(() => setDemoState('idle'), 5000);
  };

  const handleDragStart = (e: React.DragEvent, item: string) => {
    setDraggedItem(item);
    e.dataTransfer.setData('text/plain', item);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    const data = e.dataTransfer.getData('text/plain');
    if (data && !droppedItems.includes(data)) setDroppedItems((prev) => [...prev, data]);
    setDraggedItem(null);
  };

  const handleDragOver = (e: React.DragEvent) => e.preventDefault();

  const containerVariants = {
    hidden: { opacity: 1 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.06, delayChildren: 0.3 },
    },
  };

  const letterVariants = {
    hidden: { opacity: 0, y: 10, filter: "blur(4px)", scale: 0.9 },
    visible: {
      opacity: 1, y: 0, filter: "blur(0px)", scale: 1,
      transition: { duration: 0.5, ease: [0.2, 0.65, 0.3, 0.9] as any }
    },
  };

  return (
    <div className="min-h-screen flex flex-col w-full bg-background overflow-x-hidden">
      <Navbar />

      <main className="flex-1 flex flex-col items-center w-full px-6 py-16 lg:py-24 relative pt-16 md:pt-24 lg:pt-32">
        {/* Background Decorative Glow */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-6xl aspect-square bg-primary/10 blur-[120px] rounded-full -z-10 pointer-events-none opacity-50"></div>

        <div className="max-w-7xl w-full mx-auto flex flex-col items-center">

          {/* Header Section */}
          <div className="text-center mb-16 space-y-4 max-w-3xl flex flex-col items-center">

            <motion.h1
              initial="hidden"
              animate="visible"
              variants={containerVariants}
              className="text-4xl md:text-6xl font-mono-display font-bold tracking-tighter text-text-primary leading-[1.2]"
            >
              {"Apply at lightning speed.".split("").map((char, index) => (
                <motion.span key={`l1-${index}`} variants={letterVariants} className="inline-block">
                  {char === " " ? "\u00A0" : char}
                </motion.span>
              ))}
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 1.5 }}
              className="text-lg text-text-secondary font-sans leading-relaxed tracking-tight"
            >
              RoleJet brings your tailored resumes directly to the <br className="hidden md:block" /> application page. Autofill forms in one click.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, scale: 0.98 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8, delay: 0.3 }}
              className="pt-4"
            >
              <button
                onClick={handleInstall}
                className={`h-12 px-6 transition-all active:scale-[0.98] shadow-lg flex items-center justify-center gap-2 rounded-xl font-sans font-bold text-sm tracking-widest uppercase ${isAdded
                  ? 'bg-success text-black shadow-success/20'
                  : 'bg-primary text-black hover:bg-primary/90 shadow-primary/20'
                  }`}
              >
                {isAdded ? (
                  <>
                    <Check className="w-4 h-4 shrink-0" /> Installed for {browserInfo.name}
                  </>
                ) : (
                  <>
                    <Download className="w-4 h-4 shrink-0" /> Add to {browserInfo.name}
                  </>
                )}
              </button>
            </motion.div>
          </div>

          {/* DEMO SECTION: AUTOFILL */}
          <div className="w-full max-w-5xl mt-24 mb-16">
            <div className="grid md:grid-cols-2 gap-16 items-center">
              <motion.div
                initial={{ opacity: 0, x: -30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
              >
                <div className="inline-flex items-center justify-center w-10 h-10 rounded-lg bg-surface border border-border mb-6">
                  <Zap className="w-5 h-5 text-primary" />
                </div>
                <h2 className="text-3xl font-mono-display font-bold text-text-primary tracking-tighter mb-4">Magic Autofill</h2>
                <p className="text-text-secondary font-sans leading-relaxed mb-8">
                  Workday, Lever, Greenhouse. RoleJet detects form fields and injects your personal details perfectly.
                </p>

                <ul className="space-y-4">
                  {['Works on 50+ applicant platforms', '100% accurate data mapping', 'Saves 15 mins per application'].map((feat, i) => (
                    <li key={i} className="flex items-center gap-3 text-text-secondary text-sm font-sans tracking-tight">
                      <CheckCircle2 className="w-4 h-4 text-primary shrink-0" />
                      <span>{feat}</span>
                    </li>
                  ))}
                </ul>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, x: 30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
                className="relative p-6 rounded-2xl bg-surface border border-border shadow-2xl backdrop-blur-md"
              >
                <div className="flex items-center justify-between mb-6 pb-4 border-b border-border">
                  <div className="flex gap-2">
                    <div className="w-3 h-3 rounded-full bg-border" />
                    <div className="w-3 h-3 rounded-full bg-border" />
                    <div className="w-3 h-3 rounded-full bg-border" />
                  </div>
                  <div className="text-[10px] text-text-tertiary font-mono-data uppercase tracking-widest text-center truncate">company.com/apply</div>
                </div>

                <div className="space-y-4 font-sans text-sm">
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-1.5">
                      <label className="text-xs text-text-tertiary uppercase tracking-widest">First Name</label>
                      <div className={`h-10 rounded-lg border bg-background px-3 flex items-center transition-colors ${demoState === 'done' ? 'border-primary/50' : 'border-border'}`}>
                        <span className={demoState === 'done' ? 'text-text-primary' : 'text-text-tertiary'}>
                          {demoState === 'done' ? 'John' : '...'}
                        </span>
                      </div>
                    </div>
                    <div className="space-y-1.5">
                      <label className="text-xs text-text-tertiary uppercase tracking-widest">Last Name</label>
                      <div className={`h-10 rounded-lg border bg-background px-3 flex items-center transition-colors ${demoState === 'done' ? 'border-primary/50' : 'border-border'}`}>
                        <span className={demoState === 'done' ? 'text-text-primary' : 'text-text-tertiary'}>
                          {demoState === 'done' ? 'Doe' : '...'}
                        </span>
                      </div>
                    </div>
                  </div>
                  <div className="space-y-1.5">
                    <label className="text-xs text-text-tertiary uppercase tracking-widest">Email</label>
                    <div className={`h-10 rounded-lg border bg-background px-3 flex items-center transition-colors ${demoState === 'done' ? 'border-primary/50' : 'border-border'}`}>
                      <span className={demoState === 'done' ? 'text-text-primary' : 'text-text-tertiary'}>
                        {demoState === 'done' ? 'john.doe@example.com' : '...'}
                      </span>
                    </div>
                  </div>
                </div>

                <button
                  onClick={runAutofillDemo}
                  disabled={demoState !== 'idle'}
                  className="absolute -right-4 top-1/2 -translate-y-1/2 flex items-center gap-2 bg-text-primary text-background px-4 py-3 rounded-xl shadow-xl hover:scale-105 active:scale-95 disabled:opacity-50 disabled:hover:scale-100 transition-all font-mono-data text-xs uppercase tracking-widest"
                >
                  <Zap className={`w-4 h-4 ${demoState === 'filling' ? 'animate-pulse' : ''}`} />
                  <span>
                    {demoState === 'filling' ? 'Filling' : demoState === 'done' ? 'Done' : 'Autofill'}
                  </span>
                </button>
              </motion.div>
            </div>
          </div>

          <div className="w-full h-px bg-border my-16 max-w-5xl" />

          {/* DEMO SECTION: DRAG AND DROP RESUME */}
          <div className="w-full max-w-5xl mb-24">
            <div className="grid md:grid-cols-2 gap-16 items-center flex-col-reverse md:flex-row">
              <motion.div
                initial={{ opacity: 0, x: -30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
                className="flex gap-4 h-[350px]"
              >
                <div className="w-1/2 bg-surface border border-border rounded-2xl p-4 flex flex-col relative overflow-hidden">
                  <h3 className="text-xs font-mono-data text-text-tertiary uppercase tracking-[0.2em] mb-4 flex items-center gap-2 border-b border-border pb-3">
                    <FileText className="w-3 h-3" /> Ex. Sidebar
                  </h3>

                  <div className="flex-1 space-y-3 overflow-y-auto pr-1">
                    {['Frontend Engineer.pdf', 'UX Designer Resume.pdf'].map((doc, idx) => (
                      <div
                        key={idx}
                        draggable
                        onDragStart={(e) => handleDragStart(e, doc)}
                        className="group flex flex-col p-3 bg-background border border-border rounded-xl cursor-grab active:cursor-grabbing hover:border-primary/50 transition-colors"
                      >
                        <div className="flex items-center gap-2">
                          <GripVertical className="w-3 h-3 text-text-tertiary" />
                          <p className="text-xs font-sans text-text-primary truncate">{doc}</p>
                        </div>
                        <p className="text-[10px] text-text-tertiary mt-2 font-mono-data uppercase pl-5">Tailored 2h ago</p>
                      </div>
                    ))}
                  </div>
                </div>

                <div
                  className="w-1/2 border-2 border-dashed rounded-2xl flex flex-col items-center justify-center p-6 transition-colors bg-surface/50"
                  style={{
                    borderColor: draggedItem ? 'rgb(190, 242, 100)' : 'var(--border)',
                    backgroundColor: draggedItem ? 'rgba(190, 242, 100, 0.05)' : ''
                  }}
                  onDrop={handleDrop}
                  onDragOver={handleDragOver}
                >
                  {droppedItems.length > 0 ? (
                    <div className="w-full flex flex-col items-center justify-center space-y-4">
                      <div className="w-12 h-12 rounded-full border border-success/30 bg-success/10 flex items-center justify-center mb-2">
                        <CheckCircle2 className="w-6 h-6 text-success" />
                      </div>
                      {droppedItems.map((item, i) => (
                        <div key={i} className="px-3 py-2 bg-background rounded-lg text-xs font-sans text-text-secondary w-full text-center truncate border border-border">
                          {item}
                        </div>
                      ))}
                    </div>
                  ) : (
                    <>
                      <div className="w-12 h-12 rounded-full bg-border flex items-center justify-center mb-4">
                        <Download className="w-5 h-5 text-text-tertiary" />
                      </div>
                      <p className="text-center text-xs font-mono-data uppercase tracking-widest text-text-primary mb-2">
                        Upload Resume
                      </p>
                    </>
                  )}
                </div>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, x: 30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
              >
                <div className="inline-flex items-center justify-center w-10 h-10 rounded-lg bg-surface border border-border mb-6">
                  <FileText className="w-5 h-5 text-primary" />
                </div>
                <h2 className="text-3xl font-mono-display font-bold text-text-primary tracking-tighter mb-4">Drag, Drop, Apply.</h2>
                <p className="text-text-secondary font-sans leading-relaxed mb-8">
                  Access every resume you've built straight from your browser sidebar. No more hunting through your downloads folder.
                </p>

                <ul className="space-y-4">
                  {['Instant access to role-specific resumes', 'Drag and drop directly into forms', 'Always synced with dashboard'].map((feat, i) => (
                    <li key={i} className="flex items-center gap-3 text-text-secondary text-sm font-sans tracking-tight">
                      <CheckCircle2 className="w-4 h-4 text-primary shrink-0" />
                      <span>{feat}</span>
                    </li>
                  ))}
                </ul>
              </motion.div>
            </div>
          </div>

          {/* Bottom Trust/Info Indicator */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1, duration: 1 }}
            className="mt-12 pt-12 border-t border-border/50 w-full max-w-5xl flex flex-col md:flex-row items-center justify-between gap-8 opacity-40 select-none grayscale"
          >
            <div className="flex flex-col items-center md:items-start gap-1">
              <p className="text-sm font-mono-data uppercase tracking-widest text-black dark:text-white">Security</p>
              <p className="text-xs text-black dark:text-white">Local Execution Engine</p>
            </div>
            <div className="flex flex-col items-center md:items-start gap-1">
              <p className="text-sm font-mono-data uppercase tracking-widest text-black dark:text-white">Compatibility</p>
              <p className="text-xs text-black dark:text-white">Chromium & WebKit</p>
            </div>
            <div className="flex flex-col items-center md:items-start gap-1">
              <p className="text-sm font-mono-data uppercase tracking-widest text-black dark:text-white">Data Policy</p>
              <p className="text-xs text-black dark:text-white">Zero-retention Analysis</p>
            </div>
          </motion.div>

        </div>
      </main>

      <Footer />
    </div>
  );
}
