'use client';
import { UploadCloud, FileText, Target, Sparkles, X, Eye, RefreshCw, CheckCircle2, Download, Copy, FileCode } from 'lucide-react';
import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

export default function BuilderForm() {
  const [jd, setJd] = useState('');
  const [goal, setGoal] = useState('');
  const [file, setFile] = useState<File | null>(null);
  const [fileUrl, setFileUrl] = useState<string | null>(null);
  const [isDragging, setIsDragging] = useState(false);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [result, setResult] = useState<any>(null);
  const [error, setError] = useState<string | null>(null);
  const [copied, setCopied] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (!file) {
      setFileUrl(null);
      return;
    }
    const url = URL.createObjectURL(file);
    setFileUrl(url);
    return () => {
      URL.revokeObjectURL(url);
    };
  }, [file]);

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (!isDragging) setIsDragging(true);
  };

  const handleDragLeave = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);
    
    if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
      const droppedFile = e.dataTransfer.files[0];
      const ext = droppedFile.name.toLowerCase();
      if (ext.endsWith('.pdf') || ext.endsWith('.docx') || ext.endsWith('.doc') || droppedFile.type.includes('pdf') || droppedFile.type.includes('word')) {
        setFile(droppedFile);
      }
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!file || !jd || !goal) return;

    setIsAnalyzing(true);
    setError(null);
    setResult(null);

    try {
      const formData = new FormData();
      formData.append('resume', file);
      formData.append('jd', jd);
      formData.append('goal', goal);

      const response = await fetch('http://localhost:8000/resume/rewrite', {
        method: 'POST',
        body: formData,
      });

      if (!response.ok) {
        const errData = await response.json().catch(() => ({}));
        throw new Error(errData.detail || 'Failed to generate tailored resume');
      }

      const data = await response.json();
      setResult(data.tailored_resume || data);
    } catch (err: any) {
      console.error('Rewrite submission error:', err);
      setError(err.message || 'Error communicating with server. Please check backend.');
    } finally {
      setIsAnalyzing(false);
    }
  };

  const isPdf = file ? (file.type === 'application/pdf' || file.name.toLowerCase().endsWith('.pdf')) : false;

  return (
    <div className="w-full max-w-6xl mx-auto space-y-8">
      <form onSubmit={handleSubmit} className="space-y-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Left Column: Master Resume Upload */}
          <div className="flex flex-col h-full order-2 lg:order-1">
            <div className="font-sans text-xs uppercase tracking-widest text-text-secondary mb-3 flex items-center justify-between">
              <span>Master Resume (All Skills)</span>
              {file && (
                <button
                  type="button"
                  onClick={() => setFile(null)}
                  className="text-xs font-semibold text-red-500 bg-red-500/10 border border-red-500/30 px-3 py-1 rounded-full flex items-center gap-1.5 shadow-sm cursor-pointer font-sans normal-case active:scale-95 transition-transform"
                >
                  <X className="w-3.5 h-3.5 text-red-500 shrink-0" />
                  <span className="text-red-500 font-semibold">Remove file</span>
                </button>
              )}
            </div>

            <div
              onDragOver={handleDragOver}
              onDragLeave={handleDragLeave}
              onDrop={handleDrop}
              onClick={() => !file && fileInputRef.current?.click()}
              className={`flex-1 min-h-[448px] w-full bg-surface border-2 rounded-xl flex flex-col transition-all duration-300 backdrop-blur-sm relative overflow-hidden ${
                isDragging
                  ? 'border-primary bg-primary/10 scale-[1.01] ring-4 ring-primary/20 shadow-2xl p-4 sm:p-6 items-center justify-center border-dashed cursor-pointer'
                  : file
                  ? 'border-solid border-primary/40 shadow-lg p-0 cursor-default'
                  : 'border-dashed border-border hover:border-text-secondary hover:bg-surface-hover p-4 sm:p-6 items-center justify-center cursor-pointer'
              }`}
            >
              <input
                ref={fileInputRef}
                type="file"
                accept=".pdf,.docx,.doc,application/pdf,application/vnd.openxmlformats-officedocument.wordprocessingml.document,application/msword"
                className="hidden"
                onChange={(e) => setFile(e.target.files?.[0] || null)}
              />

              {/* Active Dragging Overlay */}
              {isDragging && (
                <div className="absolute inset-0 bg-background/90 backdrop-blur-sm border-2 border-primary border-dashed rounded-xl flex flex-col items-center justify-center z-30 pointer-events-none animate-in fade-in-50 duration-150">
                  <div className="w-16 h-16 rounded-full bg-primary text-black flex items-center justify-center mb-3 shadow-lg animate-bounce">
                    <UploadCloud className="w-8 h-8" />
                  </div>
                  <p className="text-sm font-bold text-text-primary font-sans">Drop your master resume here</p>
                  <p className="text-xs text-text-secondary mt-1 font-sans">PDF or Word format supported</p>
                </div>
              )}
              <AnimatePresence mode="wait">
                {file ? (
                  <motion.div
                    key="file-active"
                    initial={{ opacity: 0, scale: 0.98 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.98 }}
                    className="w-full h-full absolute inset-0 flex flex-col rounded-xl overflow-hidden z-10"
                  >
                    {isPdf && fileUrl ? (
                      /* PDF Previewer */
                      <div className="relative w-full h-full flex-1 flex flex-col rounded-xl overflow-hidden bg-surface">
                        {/* Overlay Top Bar */}
                        <div className="shrink-0 bg-background/95 backdrop-blur-md p-3.5 border-b border-border flex items-center justify-between z-20 shadow-sm">
                          <div className="flex items-center gap-2.5 min-w-0">
                            <div className="p-1.5 rounded-md bg-primary/10 border border-primary/20 text-primary">
                              <FileText className="w-4 h-4 shrink-0" />
                            </div>
                            <span className="text-xs font-semibold text-text-primary truncate max-w-[160px] sm:max-w-[240px]">
                              {file.name}
                            </span>
                          </div>
                          <div className="flex items-center gap-2">
                            <span className="text-[10px] font-mono font-medium px-2.5 py-1 rounded-full bg-primary/15 text-text-primary border border-primary/20">
                              {(file.size / 1024 / 1024).toFixed(2)} MB • PDF
                            </span>
                          </div>
                        </div>

                        {/* Full Size Scrollable PDF iframe */}
                        <div className="w-full flex-1 relative bg-surface overflow-hidden">
                          <iframe
                            src={`${fileUrl}#view=FitH&toolbar=0`}
                            className="w-full h-full border-none pointer-events-auto"
                            title="Resume PDF Preview"
                          />
                        </div>
                      </div>
                    ) : (
                      /* DOCX Preview Card */
                      <div className="w-full h-full flex-1 rounded-xl bg-background/95 border border-border p-6 flex flex-col items-center justify-start text-center relative overflow-y-auto custom-scrollbar">
                        {/* Top Bar for DOCX */}
                        <div className="w-full flex items-center justify-between pb-4 mb-4 border-b border-border">
                          <span className="text-xs font-semibold text-text-primary flex items-center gap-1.5 truncate max-w-[200px]">
                            <FileText className="w-4 h-4 text-primary shrink-0" /> {file.name}
                          </span>
                        </div>

                        <div className="my-auto py-6 flex flex-col items-center">
                          <div className="w-20 h-20 rounded-2xl bg-primary/20 border border-primary/30 flex items-center justify-center mb-5 text-text-primary shadow-md">
                            <FileText className="w-10 h-10" />
                          </div>
                          <span className="inline-block px-3.5 py-1 rounded-full text-[11px] font-bold tracking-wider uppercase bg-primary/15 text-text-primary border border-primary/30 mb-3">
                            Word Document (.docx)
                          </span>
                          <p className="text-base font-semibold text-text-primary truncate max-w-[320px] mb-1">
                            {file.name}
                          </p>
                          <p className="text-xs text-text-secondary">
                            {(file.size / 1024 / 1024).toFixed(2)} MB • Ready for Master Archive Parsing
                          </p>

                          {/* Page Lines Skeleton Simulation */}
                          <div className="w-full max-w-sm mt-8 space-y-3 opacity-40">
                            <div className="h-2.5 bg-text-secondary/30 rounded w-3/4 mx-auto" />
                            <div className="h-2 bg-text-secondary/20 rounded w-full" />
                            <div className="h-2 bg-text-secondary/20 rounded w-5/6 mx-auto" />
                            <div className="h-2 bg-text-secondary/20 rounded w-2/3 mx-auto" />
                            <div className="h-2 bg-text-secondary/20 rounded w-4/5 mx-auto" />
                            <div className="h-2 bg-text-secondary/20 rounded w-1/2 mx-auto" />
                          </div>
                        </div>
                      </div>
                    )}
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
                      <UploadCloud className="w-8 h-8 text-text-tertiary group-hover:text-text-primary transition-colors" />
                    </div>
                    <p className="text-sm font-medium text-text-primary group-hover:text-text-primary transition-colors">Upload Master Resume</p>
                    <p className="text-xs text-text-secondary mt-3 max-w-[200px] leading-relaxed">PDF or Word (.pdf, .docx) format. Comprehensive record.</p>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </div>

          {/* Right Column: JD & Goal */}
          <div className="space-y-8 flex flex-col order-1 lg:order-2">
            <div className="flex-1 flex flex-col">
              <label className="font-sans text-xs uppercase tracking-widest text-text-secondary mb-3 flex items-center gap-2">
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
              <label className="font-sans text-xs uppercase tracking-widest text-text-secondary mb-3 flex items-center gap-2">
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
            className={`w-full max-w-md mx-auto h-12 rounded-xl font-sans font-bold text-sm tracking-widest uppercase transition-all duration-300 flex items-center justify-center gap-3 overflow-hidden relative group ${
              isAnalyzing
                ? 'bg-[#424874]/40 text-[#F4EEFF] cursor-wait'
                : 'bg-[#424874] text-[#F4EEFF] hover:bg-[#383C66] hover:shadow-lg shadow-md active:scale-[0.98] disabled:opacity-40 disabled:cursor-not-allowed'
            }`}
          >
            {isAnalyzing ? (
              <>
                <div className="w-4 h-4 border-2 border-[#A6B1E1]/30 border-t-[#F4EEFF] rounded-full animate-spin"></div>
                Good Things Come To Those Who Wait
              </>
            ) : (
              "Build Rewritten Resume"
            )}
          </button>
          <div className="flex flex-wrap items-center justify-center gap-4 sm:gap-6 mt-6">
            <p className="text-[10px] sm:text-xs text-text-secondary uppercase tracking-wider flex items-center gap-1.5 font-sans text-center">
              <span className="w-1.5 h-1.5 rounded-full bg-primary shrink-0"></span> Analysis consumes 1 RJ Credit
            </p>
            <p className="text-[10px] sm:text-xs text-text-secondary uppercase tracking-wider flex items-center gap-1.5 font-sans text-center">
              <span className="w-1.5 h-1.5 rounded-full bg-primary shrink-0"></span> Approx 45s processing time
            </p>
          </div>
        </div>
      </form>

      {/* Error Banner */}
      {error && (
        <div className="p-4 rounded-xl bg-red-500/10 border border-red-500/30 text-red-400 text-sm font-sans flex items-center justify-between">
          <span>{error}</span>
          <button onClick={() => setError(null)} className="text-red-400 hover:text-red-200 cursor-pointer">
            <X className="w-4 h-4" />
          </button>
        </div>
      )}

      {/* Tailored Result Preview Modal */}
      <AnimatePresence>
        {result && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-in fade-in duration-200">
            <motion.div
              initial={{ opacity: 0, scale: 0.96 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.96 }}
              className="w-full max-w-4xl bg-surface border border-border rounded-2xl p-6 sm:p-8 shadow-2xl space-y-6 max-h-[85vh] flex flex-col"
            >
              {/* Top Header */}
              <div className="flex items-center justify-between pb-4 border-b border-border">
                <div className="flex items-center gap-3">
                  <div className="p-2 rounded-xl bg-[#424874]/15 border border-[#424874]/30 text-[#424874]">
                    <Sparkles className="w-5 h-5" />
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-[#1a1a1a]">Tailored Master Resume Ready</h3>
                    <p className="text-xs text-text-secondary">Optimized for ATS keyword density and target role alignment</p>
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  <button
                    onClick={() => setResult(null)}
                    className="p-1.5 rounded-lg text-text-tertiary hover:text-text-primary hover:bg-background cursor-pointer"
                  >
                    <X className="w-5 h-5" />
                  </button>
                </div>
              </div>

              {/* Key Improvements List */}
              {result.key_improvements && result.key_improvements.length > 0 && (
                <div className="p-4 rounded-xl bg-background/70 border border-border space-y-2 shrink-0">
                  <span className="text-xs font-bold text-text-primary uppercase tracking-wider block">Key AI Optimizations Made:</span>
                  <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs text-text-secondary">
                    {result.key_improvements.map((item: string, idx: number) => (
                      <li key={idx} className="flex items-start gap-2">
                        <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500 shrink-0 mt-0.5" />
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              {/* Tailored Resume Markdown / Content Scroll View */}
              <div className="flex-1 overflow-y-auto p-5 rounded-xl bg-background border border-border font-sans text-xs sm:text-sm text-text-primary whitespace-pre-wrap leading-relaxed custom-scrollbar">
                {typeof result === 'string'
                  ? result
                  : result.tailored_markdown || (
                      <div className="space-y-4">
                        {result.executive_summary && (
                          <div>
                            <h4 className="font-bold text-text-primary uppercase text-xs mb-1">Executive Summary</h4>
                            <p className="text-text-secondary">{result.executive_summary}</p>
                          </div>
                        )}
                        {result.skills && (
                          <div>
                            <h4 className="font-bold text-text-primary uppercase text-xs mb-1">Skills</h4>
                            <p className="text-text-secondary">{Array.isArray(result.skills) ? result.skills.join(', ') : JSON.stringify(result.skills)}</p>
                          </div>
                        )}
                        {result.work_experience && (
                          <div>
                            <h4 className="font-bold text-text-primary uppercase text-xs mb-1">Experience</h4>
                            {result.work_experience.map((w: any, i: number) => (
                              <div key={i} className="mb-2">
                                <p className="font-semibold text-text-primary">{w.role} - {w.company} <span className="text-text-tertiary font-normal">({w.dates})</span></p>
                                <ul className="list-disc list-inside text-text-secondary">
                                  {w.bullets?.map((b: string, bi: number) => <li key={bi}>{b}</li>)}
                                </ul>
                              </div>
                            ))}
                          </div>
                        )}
                      </div>
                    )}
              </div>

              {/* Action Buttons */}
              <div className="flex flex-wrap items-center justify-between gap-4 pt-4 border-t border-border">
                <span className="text-xs text-text-tertiary">1 RJ Credit deducted • Saved to your profile</span>
                <div className="flex items-center gap-3">
                  <button
                    onClick={() => {
                      const content = typeof result === 'string' ? result : result.tailored_markdown || JSON.stringify(result, null, 2);
                      navigator.clipboard.writeText(content);
                      setCopied(true);
                      setTimeout(() => setCopied(false), 2000);
                    }}
                    className="px-4 py-2 rounded-xl bg-background hover:bg-border/40 text-text-primary border border-border text-xs font-semibold flex items-center gap-1.5 transition-all cursor-pointer"
                  >
                    <Copy className="w-3.5 h-3.5" />
                    {copied ? 'Copied!' : 'Copy Text'}
                  </button>

                  <button
                    onClick={async () => {
                      try {
                        const res = await fetch('http://localhost:8000/resume/export-docx', {
                          method: 'POST',
                          headers: { 'Content-Type': 'application/json' },
                          body: JSON.stringify({
                            markdown_content: result,
                            filename: `Tailored_Resume_${file?.name?.replace(/\.[^/.]+$/, '') || 'Resume'}.docx`
                          }),
                        });
                        const blob = await res.blob();
                        const url = URL.createObjectURL(blob);
                        const a = document.createElement('a');
                        a.href = url;
                        a.download = `Tailored_Resume_${file?.name?.replace(/\.[^/.]+$/, '') || 'Resume'}.docx`;
                        a.click();
                        URL.revokeObjectURL(url);
                      } catch (e) {
                        console.error('Docx download error:', e);
                      }
                    }}
                    className="px-5 py-2 rounded-xl bg-[#424874] text-[#F4EEFF] hover:bg-[#383C66] text-xs font-bold uppercase tracking-wider flex items-center gap-2 shadow-sm cursor-pointer"
                  >
                    <Download className="w-3.5 h-3.5 text-[#A6B1E1]" />
                    Download Word (.docx)
                  </button>
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}
