'use client';
import { LucideIcon } from 'lucide-react';
import { motion } from 'framer-motion';

interface StatsCardProps {
  label: string;
  value: string | number;
  trend?: string;
  trendType?: 'positive' | 'negative' | 'neutral';
  icon: LucideIcon;
  color?: string;
}

export default function StatsCard({ label, value, trend, trendType = 'neutral', icon: Icon, color = 'primary' }: StatsCardProps) {
  const trendColors = {
    positive: 'text-success bg-success/10 border-success/20',
    negative: 'text-danger bg-danger/10 border-danger/20',
    neutral: 'text-text-secondary bg-surface/50 border-border'
  };

  return (
    <motion.div 
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      className="group flex flex-col h-full bg-surface border border-border rounded-2xl overflow-hidden hover:border-primary/40 transition-all duration-500 backdrop-blur-sm shadow-lg hover:shadow-primary/5"
    >
      <div className="p-6 flex justify-between items-start mb-4">
        <div className={`w-10 h-10 rounded-xl bg-${color}/10 flex items-center justify-center ring-1 ring-${color}/20 group-hover:scale-110 transition-transform duration-500`}>
          <Icon className={`w-5 h-5 text-${color}`} />
        </div>
        {trend && (
          <span className={`text-[10px] font-mono-data px-2 py-0.5 rounded-full border ${trendColors[trendType]} tracking-tight uppercase`}>
            {trend}
          </span>
        )}
      </div>
      
      <div className="space-y-1">
        <h3 className="text-sm font-sans font-medium text-text-tertiary uppercase tracking-wider">{label}</h3>
        <p className="text-3xl font-mono-display font-bold text-text-primary tracking-tighter">
          {value}
        </p>
      </div>
      
      {/* Decorative gradient light */}
      <div className={`absolute top-0 right-0 w-24 h-24 bg-${color}/5 blur-3xl -z-10 opacity-0 group-hover:opacity-100 transition-opacity`} />
    </motion.div>
  );
}
