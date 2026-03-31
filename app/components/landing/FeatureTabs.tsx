'use client';
import { useState } from 'react';
import { motion } from 'framer-motion';

export default function FeatureTabs() {
  const [activeTab, setActiveTab] = useState(0);

  const features = [
    {
      title: "Resume Builder",
      id: "builder",
      description: "Precision-Engineered Resumes. Optimized for high-signal matching.",
      longDesc: "Our AI identifies the exact gaps in your technical profile compared to target JDs, performantly synthesizing bullets for maximum architectural impact.",
      color: "from-amber-500 to-orange-500"
    },
    {
      title: "Job Application Tracker",
      id: "tracker",
      description: "A Unified Persistence Layer for your applications.",
      longDesc: "No more fragmented spreadsheets. Track every stage of your technical search with automated status hooks and strategic follow-up reminders.",
      color: "from-emerald-500 to-teal-500"
    },
    {
      title: "Extension",
      id: "extension",
      description: "Browser-level application injection and optimization.",
      longDesc: "RoleJet Copilot lives in your browser, performantly auto-filling fields and suggesting optimized content based on the Job Description's engineering requirements.",
      color: "from-lime-400 to-emerald-500"
    }
  ];

  return (
    <section className="w-full py-16 md:py-24 px-6 max-w-7xl mx-auto" id="how-it-works">
      <div className="text-center mb-10 md:mb-16 space-y-4">
        <motion.h2
          initial={{ opacity: 0, scale: 0.95, y: 20 }}
          whileInView={{ opacity: 1, scale: 1, y: 0 }}
          viewport={{ once: false, margin: "-100px" }}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          className="text-3xl md:text-5xl font-mono-display font-bold tracking-tight"
        >
          One platform. <br /><span className="text-text-primary">Every high-stakes</span> move.
        </motion.h2>
        <motion.p
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: false, margin: "-100px" }}
          transition={{ duration: 0.6, delay: 0.2, ease: "easeOut" }}
          className="text-text-secondary max-w-2xl mx-auto font-sans text-lg"
        >
          Replace fragmented spreadsheets and endless tabs with a sophisticated career intelligence engine. Total focus on your next destination.
        </motion.p>
      </div>

      <motion.div
        initial={{ opacity: 0, y: 40, scale: 0.98 }}
        whileInView={{ opacity: 1, y: 0, scale: 1 }}
        viewport={{ once: false, margin: "-100px" }}
        transition={{ duration: 0.8, delay: 0.3, ease: [0.22, 1, 0.36, 1] }}
        className="bg-surface/50 border border-border rounded-3xl p-2 md:p-6 shadow-xl"
      >
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: false }}
          transition={{ duration: 0.5, delay: 0.5 }}
          className="flex flex-col sm:flex-row flex-wrap justify-center items-center gap-2 mb-8 w-full"
        >
          {features.map((feature, idx) => (
            <button
              key={idx}
              onClick={() => setActiveTab(idx)}
              className={`w-full sm:w-auto px-6 py-3 rounded-full text-center text-sm font-medium transition-all duration-300 ${activeTab === idx
                ? 'bg-primary text-black shadow-lg shadow-primary/20 scale-100 sm:scale-105'
                : 'bg-surface hover:bg-surface-hover text-text-secondary border border-border'
                }`}
            >
              {feature.title}
            </button>
          ))}
        </motion.div>

        <div className="grid md:grid-cols-2 gap-8 md:gap-12 items-center p-4 md:p-8 animate-in fade-in duration-500">
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
      </motion.div>
    </section>
  );
}
