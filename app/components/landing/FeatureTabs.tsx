'use client';
import { useState } from 'react';

export default function FeatureTabs() {
  const [activeTab, setActiveTab] = useState(0);

  const features = [
    {
      title: "Extension",
      id: "extension",
      description: "Auto-fill and optimize job applications in real-time.",
      longDesc: "Sentry Copilot lives in your browser, detecting application fields and suggesting optimized content based on the Job Description.",
      color: "from-blue-500 to-indigo-500"
    },
    {
      title: "Job Tracker",
      id: "tracker",
      description: "Manage every application in one single intelligence terminal.",
      longDesc: "No more spreadsheets. Track every stage of your job search with automated status updates and follow-up reminders.",
      color: "from-emerald-500 to-teal-500"
    },
    {
      title: "Resume Builder",
      id: "builder",
      description: "Craft high-conversion resumes that bypass ATS filters.",
      longDesc: "Our AI identifies the exact gaps in your resume compared to target JDs and helps you rewrite weak bullets for maximum impact.",
      color: "from-amber-500 to-orange-500"
    }
  ];

  return (
    <section className="w-full py-24 px-6 max-w-7xl mx-auto" id="how-it-works">
      <div className="text-center mb-16 space-y-4">
        <h2 className="text-3xl md:text-5xl font-mono-display font-bold tracking-tight">We're here for <br /><span className="text-primary italic">every step</span> of your search.</h2>
        <p className="text-text-secondary max-w-2xl mx-auto font-sans text-lg">
          Forget juggling tabs and spreadsheets. SentryAI centralizes your entire career workflow into one intelligent terminal.
        </p>
      </div>

      <div className="bg-surface/50 border border-border rounded-3xl p-2 md:p-6 shadow-xl">
        <div className="flex flex-wrap justify-center items-center gap-2 mb-8">
          {features.map((feature, idx) => (
            <button
              key={idx}
              onClick={() => setActiveTab(idx)}
              className={`px-6 py-3 rounded-full text-sm font-medium transition-all duration-300 ${activeTab === idx
                  ? 'bg-primary text-white shadow-lg shadow-primary/20 scale-105'
                  : 'bg-surface hover:bg-surface-hover text-text-secondary border border-border'
                }`}
            >
              {feature.title}
            </button>
          ))}
        </div>

        <div className="grid md:grid-cols-2 gap-12 items-center p-4 md:p-8 animate-in fade-in duration-500">
          <div className="space-y-6">
            <div className={`w-12 h-1 bg-gradient-to-r ${features[activeTab].color} rounded-full`}></div>
            <h3 className="text-3xl font-bold tracking-tight">{features[activeTab].description}</h3>
            <p className="text-text-secondary text-lg leading-relaxed">{features[activeTab].longDesc}</p>
            <button className="h-11 px-6 bg-surface border border-border rounded-full text-sm font-medium hover:bg-surface-hover transition-colors">
              Learn more about {features[activeTab].title}
            </button>
          </div>

          <div className="relative aspect-square md:aspect-video rounded-2xl bg-background border border-border overflow-hidden group shadow-2xl">
            <div className={`absolute inset-0 bg-gradient-to-br ${features[activeTab].color} opacity-5 group-hover:opacity-10 transition-opacity`}></div>
            <div className="absolute inset-0 flex items-center justify-center p-12">
              <div className="w-full h-full rounded-lg border border-border bg-surface/50 flex flex-col p-4 space-y-3 shadow-inner">
                <div className="w-1/2 h-2 bg-text-primary/10 rounded"></div>
                <div className="w-3/4 h-2 bg-text-primary/10 rounded"></div>
                <div className="w-2/3 h-2 bg-text-primary/10 rounded"></div>
                <div className="flex-1"></div>
                <div className={`w-full h-10 rounded-full bg-gradient-to-r ${features[activeTab].color} opacity-40`}></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
