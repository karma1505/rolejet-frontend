'use client';
import { UploadCloud, FileText, Target, Sparkles } from 'lucide-react';
import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

export default function BuilderForm() {
  const [jd, setJd] = useState('');
  const [goal, setGoal] = useState('');
  const [file, setFile] = useState<File | null>(null);
  const [isAnalyzing, setIsAnalyzing] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsAnalyzing(true);
    // Simulation of analysis
    setTimeout(() => setIsAnalyzing(false), 3000);
  };

  return (
    <div className="w-full max-w-6xl mx-auto space-y-8">
      {/* Master Resume Concept Tutorial Overlay */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 2, duration: 0.8 }}
        className="w-full bg-primary/5 border border-primary/20 rounded-2xl p-6 flex items-start gap-4 relative overflow-hidden group"
      >
        <div className="w-10 h-10 rounded-xl bg-primary/20 flex items-center justify-center shrink-0">
          <Sparkles className="w-5 h-5 text-primary" />
        </div>
        <div>
          <h4 className="font-mono-data text-xs uppercase tracking-widest text-primary mb-1">Master Resume Strategy</h4>
          <p className="text-sm text-text-secondary leading-relaxed max-w-3xl">
            Upload your <span className="text-text-primary font-medium">Master Resume</span> containing every project, skill, and certification you've ever earned. Sentry's AI will forensically filter and reframe only the relevant entries that align with the specific job description and your target goal.
          </p>
        </div>
        <div className="absolute right-0 top-0 w-32 h-full bg-gradient-to-l from-primary/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none"></div>
      </motion.div>

      <form onSubmit={handleSubmit} className="space-y-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Left Column: Master Resume Upload */}
          <div className="flex flex-col h-full order-2 lg:order-1">
            <label className="font-mono-data text-xs uppercase tracking-widest text-text-tertiary mb-3 flex items-center gap-2">
              <FileText className="w-3 h-3 text-success" />
              Master Resume (All Skills)
            </label>

            <label className={`flex-1 min-h-[448px] w-full bg-surface border-2 border-dashed rounded-xl flex flex-col items-center justify-center p-8 cursor-pointer group transition-all duration-300 backdrop-blur-sm ${file ? 'border-primary/50 bg-primary/5 shadow-inner shadow-primary/10' : 'border-border hover:border-text-secondary hover:bg-surface-hover'}`}>
              <input
                type="file"
                accept="application/pdf"
                className="hidden"
                onChange={(e) => setFile(e.target.files?.[0] || null)}
              />
              <AnimatePresence mode="wait">
                {file ? (
                  <motion.div
                    key="file-active"
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    className="flex flex-col items-center text-center"
                  >
                    <div className="w-20 h-20 rounded-2xl bg-primary/20 flex items-center justify-center mb-6 ring-1 ring-primary/30">
                      <FileText className="w-10 h-10 text-primary" />
                    </div>
                    <p className="text-base font-semibold text-text-primary truncate max-w-[200px]">{file.name}</p>
                    <p className="text-xs text-text-secondary mt-2 tracking-wide font-mono-data">{(file.size / 1024 / 1024).toFixed(2)} MB • MASTER ARCHIVE</p>
                    <p className="text-xs text-primary mt-8 font-medium px-4 py-2 bg-primary/10 rounded-full opacity-0 group-hover:opacity-100 transition-opacity uppercase tracking-tighter">Click to replace archive</p>
                  </motion.div>
                ) : (
                  <motion.div
                    key="file-empty"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="flex flex-col items-center text-center"
                  >
                    <div className="w-16 h-16 rounded-full bg-surface/80 border border-border flex items-center justify-center mb-6 group-hover:scale-110 group-hover:bg-primary/10 group-hover:border-primary/30 transition-all duration-500">
                      <UploadCloud className="w-8 h-8 text-text-tertiary group-hover:text-primary transition-colors" />
                    </div>
                    <p className="text-sm font-medium text-text-primary group-hover:text-primary transition-colors">Upload Master Resume</p>
                    <p className="text-xs text-text-secondary mt-3 max-w-[180px] leading-relaxed">PDF format. This should be your most comprehensive record.</p>
                  </motion.div>
                )}
              </AnimatePresence>
            </label>
          </div>

          {/* Right Column: JD & Goal */}
          <div className="space-y-8 flex flex-col order-1 lg:order-2">
            <div className="flex-1 flex flex-col">
              <label className="font-mono-data text-xs uppercase tracking-widest text-text-tertiary mb-3 flex items-center gap-2">
                <Target className="w-3 h-3 text-primary" />
                Target Job Description
              </label>
              <textarea
                value={jd}
                onChange={(e) => setJd(e.target.value)}
                className="flex-1 min-h-[300px] w-full bg-surface border border-border rounded-xl p-5 text-sm font-sans text-text-primary focus:outline-none focus:border-primary/50 focus:ring-1 focus:ring-primary/50 transition-all resize-none placeholder:text-text-tertiary/50 backdrop-blur-sm"
                placeholder="Paste the target job description here..."
              />
            </div>

            <div className="flex flex-col">
              <label className="font-mono-data text-xs uppercase tracking-widest text-text-tertiary mb-3 flex items-center gap-2">
                <Sparkles className="w-3 h-3 text-warning" />
                Specify Your Target Goal
              </label>
              <textarea
                value={goal}
                onChange={(e) => setGoal(e.target.value)}
                className="h-32 w-full bg-surface border border-border rounded-xl p-5 text-sm font-sans text-text-primary focus:outline-none focus:border-primary/50 focus:ring-1 focus:ring-primary/50 transition-all resize-none placeholder:text-text-tertiary/50 backdrop-blur-sm"
                placeholder="Ex. 'Reframe my experience to focus on B2B SaaS growth' or 'Pivot from Java to Rust role'"
              />
            </div>
          </div>
        </div>

        {/* Submit Section */}
        <div className="relative pt-4">
          <button
            type="submit"
            disabled={!jd || !file || !goal || isAnalyzing}
            className={`w-full h-16 rounded-xl font-mono-data text-sm tracking-widest uppercase transition-all duration-300 flex items-center justify-center gap-3 overflow-hidden relative group ${isAnalyzing ? 'bg-primary/20 text-primary cursor-wait' : 'bg-primary text-white hover:bg-primary/90 hover:shadow-lg hover:shadow-primary/30 active:scale-[0.98] disabled:opacity-30 disabled:grayscale disabled:cursor-not-allowed'}`}
          >
            {isAnalyzing ? (
              <>
                <div className="w-5 h-5 border-2 border-primary/30 border-t-primary rounded-full animate-spin"></div>
                Generating Forensic Strategy...
              </>
            ) : (
              <>
                <Sparkles className="w-4 h-4 group-hover:animate-pulse" />
                Build Rewritten Resume
              </>
            )}

            {/* Hover Shine Effect */}
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent -translate-x-full group-hover:animate-[shimmer_2s_infinite] pointer-events-none"></div>
          </button>
          <div className="flex items-center justify-center gap-6 mt-6">
            <p className="text-[10px] text-text-tertiary uppercase tracking-normal flex items-center gap-1.5 font-mono-data">
              <span className="w-1 h-1 rounded-full bg-success"></span> Analysis consumes 1 Sentry Credit
            </p>
            <p className="text-[10px] text-text-tertiary uppercase tracking-normal flex items-center gap-1.5 font-mono-data">
              <span className="w-1 h-1 rounded-full bg-primary"></span> Approx 45s processing time
            </p>
          </div>
        </div>
      </form>
    </div>
  );
}
