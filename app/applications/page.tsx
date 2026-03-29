'use client';
import Navbar from '../components/layout/Navbar';
import Footer from '../components/layout/Footer';
import StatsCard from '../components/dashboard/StatsCard';
import ApplicationChart from '../components/dashboard/ApplicationChart';
import { motion } from 'framer-motion';
import { useState } from 'react';
import { 
  Briefcase, 
  Send, 
  UserCheck, 
  Trophy, 
  ArrowRight,
  ExternalLink,
  Plus
} from 'lucide-react';
import Link from 'next/link';

export default function ApplicationTrackerPage() {
  const [apps, setApps] = useState([
    { company: 'Google', role: 'Staff Software Engineer', status: 'Interview', date: '2h ago', match: 94 },
    { company: 'Razorpay', role: 'Senior Product Engineer', status: 'Applied', date: '1d ago', match: 89 },
    { company: 'Swiggy', role: 'Staff Engineer (R&D)', status: 'Screening', date: '3d ago', match: 72 },
    { company: 'Oracle', role: 'Principal DevRel', status: 'Rejected', date: '1w ago', match: 45 },
  ]);

  const chartData = [
    { label: 'Applied', value: 24, color: '#BEF264' },
    { label: 'Screening', value: 8, color: '#10B981' },
    { label: 'Interview', value: 5, color: '#FFB800' },
    { label: 'Offer', value: 2, color: '#22C55E' },
    { label: 'Rejected', value: 12, color: '#EF4444' }
  ];

  return (
    <div className="min-h-screen flex flex-col w-full bg-background overflow-x-hidden">
      <Navbar />
      
      <main className="flex-1 w-full max-w-7xl mx-auto px-6 py-12 lg:py-16">
        <header className="flex flex-col md:flex-row justify-between items-start md:items-end gap-6 mb-12">
          <div className="space-y-2">
            <motion.h1 
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              className="text-3xl md:text-5xl font-mono-display font-bold text-text-primary tracking-tighter"
            >
              Control <span className="text-text-primary">Center.</span>
            </motion.h1>
            <motion.p 
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.1 }}
              className="text-text-secondary font-sans tracking-tight"
            >
              Tracking {apps.length + 41} active applications across 12 high-intent pipelines.
            </motion.p>
          </div>
          
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.2 }}
          >
            <button 
              className="h-12 px-6 bg-primary text-black hover:bg-primary/90 transition-all active:scale-[0.98] shadow-lg shadow-primary/20"
            >
              <Plus className="w-4 h-4" />
              New Application
            </button>
          </motion.div>
        </header>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
           <StatsCard 
              label="Total Applied" 
              value={45} 
              trend="+12%" 
              trendType="positive" 
              icon={Briefcase} 
              color="primary"
           />
           <StatsCard 
              label="Active Pipeline" 
              value={15} 
              trend="+4" 
              trendType="neutral" 
              icon={Send} 
              color="emerald-500"
           />
           <StatsCard 
              label="Interviews" 
              value={5} 
              trend="2 Urgent" 
              trendType="positive" 
              icon={UserCheck} 
              color="emerald-500"
           />
           <StatsCard 
              label="Offers Secured" 
              value={2} 
              trend="95% CTC" 
              trendType="positive" 
              icon={Trophy} 
              color="success"
           />
        </div>

        {/* Main Dashboard Content */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-12">
           {/* Chart Column */}
           <div className="lg:col-span-1">
              <ApplicationChart data={chartData} title="Application Velocity" />
           </div>

           {/* Applications List */}
           <div className="lg:col-span-2">
              <div className="bg-surface border border-border rounded-2xl p-8 backdrop-blur-md h-full">
                 <div className="flex items-center justify-between mb-8">
                    <h3 className="text-xs font-mono-data text-text-tertiary uppercase tracking-[0.2em]">Recent Strategic Applications</h3>
                    <Link 
                      href="#"
                      className="text-[10px] font-mono-data text-text-primary hover:underline flex items-center gap-1 uppercase tracking-widest"
                    >
                       View All <ArrowRight className="w-3 h-3" />
                    </Link>
                 </div>

                 <div className="space-y-4">
                    {apps.map((app, i) => (
                       <motion.div 
                          initial={{ opacity: 0, y: 10 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ delay: 0.3 + (i * 0.1) }}
                          key={i} 
                          className="flex items-center justify-between p-4 rounded-xl hover:bg-surface/50 border border-transparent hover:border-border/50 transition-all group"
                       >
                          <div className="flex items-center gap-4">
                             <div className="w-10 h-10 rounded-lg bg-background flex items-center justify-center border border-border group-hover:border-primary/30 transition-colors">
                                <span className="text-xs font-mono-data font-bold text-text-primary">{app.company[0]}</span>
                             </div>
                             <div>
                                <h4 className="text-sm font-semibold text-text-primary">{app.company}</h4>
                                <p className="text-xs text-text-secondary">{app.role}</p>
                             </div>
                          </div>
                          
                          <div className="hidden md:flex flex-col items-center">
                             <p className="text-[10px] text-text-tertiary uppercase tracking-widest font-mono-data mb-1">Match Score</p>
                             <div className="flex items-center gap-2">
                                <div className="w-24 h-1 rounded-full bg-border overflow-hidden">
                                   <div className={`h-full bg-primary`} style={{ width: `${app.match}%` }}></div>
                                </div>
                                <span className="text-[10px] font-mono-data text-text-primary">{app.match}%</span>
                             </div>
                          </div>

                          <div className="flex items-center gap-6">
                             <div className="text-right hidden sm:block">
                                <p className={`text-[10px] font-mono-data uppercase tracking-widest ${
                                   app.status === 'Interview' ? 'text-text-primary' : 
                                   app.status === 'Rejected' ? 'text-danger' : 
                                   app.status === 'Offer' ? 'text-success' : 'text-text-primary'
                                }`}>{app.status}</p>
                                <p className="text-[10px] text-text-tertiary">{app.date}</p>
                             </div>
                             <button className="w-8 h-8 rounded-full border border-border flex items-center justify-center hover:bg-primary/10 hover:border-primary/30 transition-all">
                                <ExternalLink className="w-3.5 h-3.5 text-text-tertiary hover:text-text-primary" />
                             </button>
                          </div>
                       </motion.div>
                    ))}
                 </div>
              </div>
           </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}

