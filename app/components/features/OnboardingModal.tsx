'use client';
import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FileText, Target, Sparkles, X } from 'lucide-react';

export default function OnboardingModal() {
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    const hasSeenOnboarding = localStorage.getItem('rj_builder_onboarding_v1');
    if (!hasSeenOnboarding) {
      setIsOpen(true);
    }
  }, []);

  const handleClose = () => {
    localStorage.setItem('rj_builder_onboarding_v1', 'true');
    setIsOpen(false);
  };

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 z-[100] flex items-center justify-center p-4 md:p-6 bg-black/60 backdrop-blur-sm"
      >
        <motion.div
          initial={{ opacity: 0, scale: 0.9, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.9, y: 20 }}
          transition={{ type: "spring", damping: 25, stiffness: 300 }}
          className="relative w-full max-w-2xl bg-surface border border-border rounded-3xl overflow-hidden shadow-2xl"
        >
          {/* Header/Banner */}
          <div className="h-32 bg-gradient-to-br from-primary/10 to-accent/5 flex items-center justify-center relative border-b border-border/50">
            <div className="absolute top-4 right-4">
              <button
                onClick={handleClose}
                className="p-2 rounded-full hover:bg-surface transition-colors border border-transparent hover:border-border"
              >
                <X className="w-5 h-5 text-text-tertiary" />
              </button>
            </div>
            <div className="w-16 h-16 rounded-2xl bg-surface flex items-center justify-center shadow-lg border border-border">
              <FileText className="w-8 h-8 text-primary" />
            </div>
          </div>

          <div className="p-8 md:p-10 space-y-8">
            <div className="text-center space-y-2">
              <h2 className="text-2xl md:text-3xl font-mono-display font-bold tracking-tight text-text-primary">
                The Master Resume Strategy
              </h2>
              <p className="text-text-secondary font-sans">
                Stop tweaking the same 2-page PDF. It's time for forensic career synthesis.
              </p>
            </div>

            <div className="grid gap-6">
              <div className="flex items-start gap-4 p-4 rounded-2xl bg-surface-hover/50 border border-border/50 group hover:border-primary/30 transition-colors">
                <div className="w-10 h-10 rounded-xl bg-surface flex items-center justify-center shrink-0 border border-border shadow-sm group-hover:shadow-primary/10">
                  <FileText className="w-5 h-5 text-text-primary" />
                </div>
                <div>
                  <h4 className="font-bold text-sm text-text-primary">1. Upload Master Profile</h4>
                  <p className="text-xs text-text-secondary mt-1 leading-relaxed">
                    Provide your comprehensive archive. Every project, every skill, every certification. No length limits.
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-4 p-4 rounded-2xl bg-surface-hover/50 border border-border/50 group hover:border-primary/30 transition-colors">
                <div className="w-10 h-10 rounded-xl bg-surface flex items-center justify-center shrink-0 border border-border shadow-sm group-hover:shadow-primary/10">
                  <Target className="w-5 h-5 text-text-primary" />
                </div>
                <div>
                  <h4 className="font-bold text-sm text-text-primary">2. Define Your Objective</h4>
                  <p className="text-xs text-text-secondary mt-1 leading-relaxed">
                    Paste the JD and specify your goal. RoleJet will filter and reframe your experience to match the exact signal required.
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-4 p-4 rounded-2xl bg-surface-hover/50 border border-border/50 group hover:border-primary/30 transition-colors">
                <div className="w-10 h-10 rounded-xl bg-surface flex items-center justify-center shrink-0 border border-border shadow-sm group-hover:shadow-primary/10">
                  <Sparkles className="w-5 h-5 text-text-primary" />
                </div>
                <div>
                  <h4 className="font-bold text-sm text-text-primary">3. Execute Synthesis</h4>
                  <p className="text-xs text-text-secondary mt-1 leading-relaxed">
                    Our AI generates a high-performance, conversion-first resume that emphasizes architectural impact over generic bullets.
                  </p>
                </div>
              </div>
            </div>

            <div className="pt-4">
              <button
                onClick={handleClose}
                className="w-full h-14 bg-primary text-black font-bold rounded-2xl hover:bg-primary/90 transition-all shadow-lg shadow-primary/20 active:scale-[0.98]"
              >
                Enter the Builder
              </button>
              <p className="text-[10px] text-center text-text-tertiary mt-4 uppercase tracking-[0.2em] font-mono-data">
                Security Policy: AES-256 Multi-layer Protection Active
              </p>
            </div>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}
