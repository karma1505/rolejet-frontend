'use client';
import Navbar from '../components/layout/Navbar';
import Footer from '../components/layout/Footer';
import StatsCard from '../components/dashboard/StatsCard';
import ApplicationChart from '../components/dashboard/ApplicationChart';
import { motion, AnimatePresence } from 'framer-motion';
import { useState } from 'react';
import {
   Briefcase,
   Search,
   Plus,
   Calendar,
   Clock,
   ExternalLink,
   ArrowRight,
   CheckCircle2,
   X,
   Filter,
   Sparkles
} from 'lucide-react';
import Link from 'next/link';

export default function ApplicationTrackerPage() {
   const [searchQuery, setSearchQuery] = useState('');
   const [activeFilter, setActiveFilter] = useState('All');
   const [isModalOpen, setIsModalOpen] = useState(false);

   // New Application Modal State
   const [newCompany, setNewCompany] = useState('');
   const [newRole, setNewRole] = useState('');
   const [newStatus, setNewStatus] = useState('Applied');
   const [newMatch, setNewMatch] = useState('85');

   const [apps, setApps] = useState([
      { id: 1, company: 'Google', role: 'Staff Software Engineer', status: 'Interview', date: '2h ago', match: 94 },
      { id: 2, company: 'Razorpay', role: 'Senior Product Engineer', status: 'Applied', date: '1d ago', match: 89 },
      { id: 3, company: 'Swiggy', role: 'Staff Engineer (R&D)', status: 'Applied', date: '3d ago', match: 72 },
      { id: 4, company: 'Oracle', role: 'Principal DevRel', status: 'Rejected', date: '1w ago', match: 45 },
      { id: 5, company: 'Stripe', role: 'Backend Tech Lead', status: 'Interview', date: '2d ago', match: 96 },
      { id: 6, company: 'Uber', role: 'Senior Distributed Systems Dev', status: 'Offer', date: '4d ago', match: 88 },
   ]);

   const chartData = [
      { label: 'Applied', value: 26, color: '#424874' },
      { label: 'Interview', value: 7, color: '#FFB800' },
      { label: 'Offer', value: 2, color: '#22C55E' },
      { label: 'Rejected', value: 10, color: '#EF4444' }
   ];

   const filteredApps = apps.filter(app => {
      const matchesSearch = app.company.toLowerCase().includes(searchQuery.toLowerCase()) ||
         app.role.toLowerCase().includes(searchQuery.toLowerCase());
      const matchesFilter = activeFilter === 'All' || app.status.toLowerCase() === activeFilter.toLowerCase();
      return matchesSearch && matchesFilter;
   });

   const handleAddApplication = (e: React.FormEvent) => {
      e.preventDefault();
      if (!newCompany || !newRole) return;
      const newApp = {
         id: Date.now(),
         company: newCompany,
         role: newRole,
         status: newStatus,
         date: 'Just now',
         match: parseInt(newMatch) || 80
      };
      setApps([newApp, ...apps]);
      setNewCompany('');
      setNewRole('');
      setIsModalOpen(false);
   };

   return (
      <div className="min-h-screen flex flex-col w-full bg-background overflow-x-hidden">
         <Navbar />

         <main className="flex-1 w-full max-w-7xl mx-auto px-4 sm:px-6 pt-28 md:pt-32 pb-20 space-y-8">
            {/* Header Section */}
            <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6 pb-6 border-b border-border">
               <div>
                  <h1 className="text-3xl md:text-4xl font-sans font-bold tracking-tight text-[#1a1a1a]">
                     Application Intelligence
                  </h1>
                  <p className="text-sm md:text-base text-text-secondary font-sans mt-1 max-w-2xl leading-relaxed">
                     Precision pipeline analytics. Monitor high-conviction opportunities, match scores, and interview conversion velocity.
                  </p>
               </div>

               <div className="flex items-center gap-3 shrink-0">
                  <button
                     onClick={() => setIsModalOpen(true)}
                     className="h-11 px-5 bg-[#424874] text-[#F4EEFF] hover:bg-[#383C66] transition-all active:scale-[0.98] shadow-md flex items-center justify-center gap-2 rounded-xl font-sans font-bold text-xs tracking-wider uppercase cursor-pointer"
                  >
                     <Plus className="w-4 h-4 shrink-0 text-[#A6B1E1]" />
                     Manually Log Application
                  </button>
               </div>
            </div>

            {/* Metrics Overview Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
               <StatsCard
                  label="Total Applied"
                  value={45}
                  trend="+12%"
                  trendType="positive"
                  color="primary"
               />
               <StatsCard
                  label="Active Pipeline"
                  value={15}
                  trend="+4"
                  trendType="neutral"
                  color="emerald-500"
               />
               <StatsCard
                  label="Interviews"
                  value={5}
                  trend="2 Urgent"
                  trendType="positive"
                  color="emerald-500"
               />
               <StatsCard
                  label="Offers Secured"
                  value={2}
                  trend="95% CTC"
                  trendType="positive"
                  color="success"
               />
            </div>

            {/* Main Content Grid */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 items-stretch">
               {/* Left Column: 3 Equal (1/3 height) Cards */}
               <div className="lg:col-span-1 flex flex-col gap-4 h-full">
                  {/* Card 1: Velocity Chart */}
                  <div className="flex-1 min-h-0">
                     <ApplicationChart data={chartData} title="Application Velocity" />
                  </div>

                  {/* Card 2: Upcoming Interview */}
                  <div className="flex-1 min-h-0 bg-surface border border-border rounded-2xl p-5 shadow-sm backdrop-blur-md flex flex-col justify-between">
                     <div className="flex items-center justify-between mb-2">
                        <h3 className="text-base font-sans font-bold text-[#1a1a1a] tracking-tight flex items-center gap-2">
                           <Calendar className="w-4 h-4 text-amber-500" /> Next Interview
                        </h3>
                        <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-amber-500/10 text-amber-600 border border-amber-500/20 uppercase">
                           Tomorrow
                        </span>
                     </div>
                     <div className="p-3 rounded-xl bg-background/60 border border-border space-y-1.5 flex-1 flex flex-col justify-center">
                        <div className="flex items-center justify-between">
                           <span className="text-sm font-bold text-text-primary">Google</span>
                           <span className="text-xs font-mono font-medium text-text-secondary">10:00 AM EST</span>
                        </div>
                        <p className="text-xs text-text-secondary font-medium">Round 3: System Design & Architecture</p>
                        <div className="pt-2 flex items-center justify-between text-xs border-t border-border/50 mt-1">
                           <span className="text-text-tertiary flex items-center gap-1">
                              <Clock className="w-3.5 h-3.5" /> 45 min session
                           </span>
                           <span className="text-[#424874] font-bold hover:underline cursor-pointer">Prep Insights →</span>
                        </div>
                     </div>
                  </div>

                  {/* Card 3: Pending Action Items */}
                  <div className="flex-1 min-h-0 bg-surface border border-border rounded-2xl p-5 shadow-sm backdrop-blur-md flex flex-col justify-between">
                     <div className="flex items-center justify-between mb-2">
                        <h3 className="text-base font-sans font-bold text-[#1a1a1a] tracking-tight flex items-center gap-2">
                           <CheckCircle2 className="w-4 h-4 text-emerald-500" /> Action Items
                        </h3>
                        <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-emerald-500/10 text-emerald-600 border border-emerald-500/20 uppercase">
                           2 Pending
                        </span>
                     </div>

                     <div className="space-y-2.5 flex-1 flex flex-col justify-center">
                        <div className="p-2.5 rounded-xl bg-background/60 border border-border/70 flex items-start gap-2.5">
                           <input type="checkbox" className="mt-0.5 rounded border-border text-[#424874] focus:ring-0 cursor-pointer" />
                           <div className="text-xs">
                              <p className="font-bold text-text-primary">Follow up on Razorpay Referral</p>
                              <p className="text-text-secondary mt-0.5">Send message to Senior DevRel contact</p>
                           </div>
                        </div>

                        <div className="p-2.5 rounded-xl bg-background/60 border border-border/70 flex items-start gap-2.5">
                           <input type="checkbox" className="mt-0.5 rounded border-border text-[#424874] focus:ring-0 cursor-pointer" />
                           <div className="text-xs">
                              <p className="font-bold text-text-primary">Tailor Resume for Swiggy R&D</p>
                              <p className="text-text-secondary mt-0.5">Highlight Golang & Distributed Caching</p>
                           </div>
                        </div>
                     </div>
                  </div>
               </div>

               {/* Right Column: Applications Table & Search/Filter Bar */}
               <div className="lg:col-span-2 space-y-6">
                  <div className="bg-surface border border-border rounded-2xl p-6 shadow-sm backdrop-blur-md">
                     {/* Search and Filters */}
                     <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-4 mb-6 pb-5 border-b border-border">
                        <div>
                           <h3 className="text-lg font-sans font-bold text-[#1a1a1a] tracking-tight">Active Applications</h3>
                           <p className="text-xs text-text-secondary mt-0.5">Showing {filteredApps.length} of {apps.length} applications</p>
                        </div>

                        {/* Search Input */}
                        <div className="relative flex-1 max-w-xs">
                           <Search className="w-4 h-4 text-text-tertiary absolute left-3.5 top-1/2 -translate-y-1/2" />
                           <input
                              type="text"
                              value={searchQuery}
                              onChange={(e) => setSearchQuery(e.target.value)}
                              placeholder="Search company or role..."
                              className="w-full pl-9 pr-4 py-2 bg-background border border-border rounded-xl text-xs text-text-primary focus:outline-none focus:border-[#424874] transition-all"
                           />
                        </div>
                     </div>

                     {/* Filter Tabs */}
                     <div className="flex flex-wrap items-center gap-2 mb-6">
                        {['All', 'Applied', 'Interview', 'Offer', 'Rejected'].map((tab) => (
                           <button
                              key={tab}
                              onClick={() => setActiveFilter(tab)}
                              className={`px-3.5 py-1.5 rounded-full text-xs font-semibold transition-all cursor-pointer ${activeFilter === tab
                                 ? 'bg-[#424874] text-[#F4EEFF] shadow-xs'
                                 : 'bg-background hover:bg-border/40 text-text-secondary border border-border'
                                 }`}
                           >
                              {tab}
                           </button>
                        ))}
                     </div>

                     {/* Applications List */}
                     <div className="space-y-3.5">
                        {filteredApps.length > 0 ? (
                           filteredApps.map((app) => {
                              const getStatusStyle = (status: string) => {
                                 switch (status) {
                                    case 'Interview': return 'bg-amber-500/10 text-amber-600 border-amber-500/20';
                                    case 'Offer': return 'bg-emerald-500/10 text-emerald-600 border-emerald-500/20';
                                    case 'Rejected': return 'bg-rose-500/10 text-rose-500 border-rose-500/20';
                                    default: return 'bg-purple-500/10 text-purple-600 border-purple-500/20';
                                 }
                              };

                              return (
                                 <motion.div
                                    key={app.id}
                                    initial={{ opacity: 0, y: 8 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    className="flex flex-col sm:flex-row sm:items-center justify-between p-4 rounded-xl bg-background/50 hover:bg-background border border-border hover:border-[#424874]/30 transition-all group gap-4"
                                 >
                                    <div className="flex items-center gap-3.5 min-w-0">
                                       <div className="w-11 h-11 shrink-0 rounded-xl bg-[#424874]/10 border border-[#424874]/20 flex items-center justify-center text-[#424874] font-bold text-base shadow-xs">
                                          {app.company[0]}
                                       </div>
                                       <div className="min-w-0">
                                          <h4 className="text-sm font-bold text-text-primary truncate group-hover:text-[#424874] transition-colors">{app.company}</h4>
                                          <p className="text-xs text-text-secondary truncate mt-0.5">{app.role}</p>
                                       </div>
                                    </div>

                                    <div className="flex items-center justify-between sm:justify-end gap-6 pt-3 sm:pt-0 border-t sm:border-t-0 border-border/50">
                                       <div className="flex flex-col items-start sm:items-end">
                                          <span className="text-[10px] uppercase font-semibold text-text-tertiary">Match Score</span>
                                          <div className="flex items-center gap-2 mt-1">
                                             <div className="w-16 h-1.5 rounded-full bg-border overflow-hidden">
                                                <div
                                                   className={`h-full ${app.match >= 85 ? 'bg-emerald-500' : app.match >= 70 ? 'bg-amber-500' : 'bg-rose-400'}`}
                                                   style={{ width: `${app.match}%` }}
                                                />
                                             </div>
                                             <span className="text-xs font-bold font-mono text-text-primary">{app.match}%</span>
                                          </div>
                                       </div>

                                       <div className="flex flex-col items-end min-w-[90px]">
                                          <span className={`text-[10px] font-bold px-2.5 py-0.5 rounded-full border ${getStatusStyle(app.status)}`}>
                                             {app.status}
                                          </span>
                                          <span className="text-[10px] text-text-tertiary mt-1">{app.date}</span>
                                       </div>

                                       <button className="w-8 h-8 shrink-0 rounded-lg border border-border flex items-center justify-center hover:bg-[#424874]/10 hover:border-[#424874]/30 transition-all text-text-tertiary hover:text-text-primary cursor-pointer">
                                          <ExternalLink className="w-3.5 h-3.5" />
                                       </button>
                                    </div>
                                 </motion.div>
                              );
                           })
                        ) : (
                           <div className="text-center py-12 border border-dashed border-border rounded-xl">
                              <p className="text-sm font-semibold text-text-primary">No applications found</p>
                              <p className="text-xs text-text-secondary mt-1">Try adjusting your search query or filter criteria.</p>
                           </div>
                        )}
                     </div>
                  </div>
               </div>
            </div>
         </main>

         {/* Log Application Modal */}
         <AnimatePresence>
            {isModalOpen && (
               <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-xs animate-in fade-in duration-200">
                  <motion.div
                     initial={{ opacity: 0, scale: 0.95 }}
                     animate={{ opacity: 1, scale: 1 }}
                     exit={{ opacity: 0, scale: 0.95 }}
                     className="w-full max-w-md bg-surface border border-border rounded-2xl p-6 shadow-2xl space-y-6"
                  >
                     <div className="flex items-center justify-between border-b border-border pb-4">
                        <h3 className="text-lg font-bold text-[#1a1a1a] flex items-center gap-2">
                           Manually Log New Application
                        </h3>
                        <button
                           onClick={() => setIsModalOpen(false)}
                           className="p-1 rounded-lg text-text-tertiary hover:text-text-primary hover:bg-background cursor-pointer"
                        >
                           <X className="w-5 h-5" />
                        </button>
                     </div>

                     <form onSubmit={handleAddApplication} className="space-y-4">
                        <div>
                           <label className="text-xs font-semibold text-text-primary uppercase tracking-wider block mb-1">
                              Company Name
                           </label>
                           <input
                              type="text"
                              required
                              value={newCompany}
                              onChange={(e) => setNewCompany(e.target.value)}
                              placeholder="e.g. OpenAI, Stripe, Google"
                              className="w-full px-3.5 py-2.5 bg-background border border-border rounded-xl text-sm text-text-primary focus:outline-none focus:border-[#424874]"
                           />
                        </div>

                        <div>
                           <label className="text-xs font-semibold text-text-primary uppercase tracking-wider block mb-1">
                              Role Title
                           </label>
                           <input
                              type="text"
                              required
                              value={newRole}
                              onChange={(e) => setNewRole(e.target.value)}
                              placeholder="e.g. Senior Software Engineer"
                              className="w-full px-3.5 py-2.5 bg-background border border-border rounded-xl text-sm text-text-primary focus:outline-none focus:border-[#424874]"
                           />
                        </div>

                        <div className="grid grid-cols-2 gap-4">
                           <div>
                              <label className="text-xs font-semibold text-text-primary uppercase tracking-wider block mb-1">
                                 Status
                              </label>
                              <select
                                 value={newStatus}
                                 onChange={(e) => setNewStatus(e.target.value)}
                                 className="w-full px-3 py-2.5 bg-background border border-border rounded-xl text-sm text-text-primary focus:outline-none focus:border-[#424874]"
                              >
                                 <option value="Applied">Applied</option>
                                 <option value="Interview">Interview</option>
                                 <option value="Offer">Offer</option>
                                 <option value="Rejected">Rejected</option>
                              </select>
                           </div>
                        </div>

                        <div className="pt-4 flex items-center justify-end gap-3 border-t border-border">
                           <button
                              type="button"
                              onClick={() => setIsModalOpen(false)}
                              className="px-4 py-2 rounded-xl text-xs font-bold text-text-secondary hover:bg-background cursor-pointer"
                           >
                              Cancel
                           </button>
                           <button
                              type="submit"
                              className="px-5 py-2.5 rounded-xl bg-[#424874] text-[#F4EEFF] hover:bg-[#383C66] font-bold text-xs uppercase tracking-wider shadow-sm cursor-pointer"
                           >
                              Add Application
                           </button>
                        </div>
                     </form>
                  </motion.div>
               </div>
            )}
         </AnimatePresence>

         <Footer />
      </div>
   );
}


