'use client';
import { UploadCloud, FileText } from 'lucide-react';
import { useState } from 'react';

export default function AnalyserForm({ onAnalyze }: { onAnalyze?: () => void }) {
  const [jd, setJd] = useState('');
  const [file, setFile] = useState<File | null>(null);

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 w-full max-w-6xl">
      {/* Job Description Input */}
      <div className="flex flex-col h-full">
        <label className="font-mono-data text-xs uppercase tracking-wider text-text-tertiary mb-3">Target Job Description</label>
        <textarea 
          value={jd}
          onChange={(e) => setJd(e.target.value)}
          className="flex-1 min-h-[400px] w-full bg-surface border border-border rounded-md p-5 text-sm font-sans text-text-primary focus:outline-none focus:border-primary/50 focus:ring-1 focus:ring-primary/50 transition-colors resize-y placeholder:text-text-tertiary"
          placeholder="Paste the target job description here. Sentry will forensically analyze it for required ownership signals, technical keywords, and seniority indicators."
        />
      </div>

      {/* Resume Upload & Submit */}
      <div className="flex flex-col h-full">
         <label className="font-mono-data text-xs uppercase tracking-wider text-text-tertiary mb-3">Your Resume (PDF)</label>
         
         <label className={`flex-1 min-h-[250px] w-full bg-surface border-2 border-dashed rounded-md flex flex-col items-center justify-center p-6 cursor-pointer group transition-all duration-200 ${file ? 'border-primary/50 bg-primary/5' : 'border-border hover:border-text-secondary'}`}>
           <input 
             type="file" 
             accept="application/pdf" 
             className="hidden" 
             onChange={(e) => setFile(e.target.files?.[0] || null)}
           />
           {file ? (
             <>
               <FileText className="w-12 h-12 text-primary mb-4" />
               <p className="text-sm font-medium text-text-primary">{file.name}</p>
               <p className="text-xs text-text-secondary mt-2">{(file.size / 1024 / 1024).toFixed(2)} MB</p>
               <p className="text-xs text-primary mt-4 opacity-0 group-hover:opacity-100 transition-opacity">Click to replace file</p>
             </>
           ) : (
             <>
               <UploadCloud className="w-12 h-12 text-text-tertiary group-hover:text-primary transition-colors mb-4" />
               <p className="text-sm font-medium text-text-primary">Click to upload or drag & drop</p>
               <p className="text-xs text-text-secondary mt-2">PDF formats only (max 5MB)</p>
             </>
           )}
         </label>

         <div className="mt-8 shrink-0">
           <button 
             onClick={onAnalyze}
             disabled={!jd || !file}
             className="w-full h-14 bg-primary text-white font-medium rounded hover:bg-primary/90 transition-colors flex items-center justify-center active:scale-[0.98] disabled:opacity-50 disabled:cursor-not-allowed disabled:active:scale-100"
           >
             Run Forensic Analysis
           </button>
           <p className="text-xs text-center text-text-tertiary mt-4 font-mono-data">Analysis consumes 1 Sentry Credit</p>
         </div>
      </div>
    </div>
  );
}
