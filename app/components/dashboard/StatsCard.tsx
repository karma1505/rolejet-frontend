'use client';
import { LucideIcon } from 'lucide-react';
import { motion } from 'framer-motion';

interface StatsCardProps {
  label: string;
  value: string | number;
  trend?: string;
  trendType?: 'positive' | 'negative' | 'neutral';
  icon?: LucideIcon;
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
      className="group relative flex flex-col justify-between h-full bg-surface border border-border rounded-2xl p-6 hover:border-primary/40 transition-all duration-300 backdrop-blur-sm shadow-md hover:shadow-lg"
    >
      <div className="flex items-center justify-between gap-2 mb-3">
        <h3 className="text-base font-sans font-bold text-[#1a1a1a] tracking-tight truncate">{label}</h3>
        {trend && (
          <span className={`text-[10px] font-sans px-2.5 py-0.5 rounded-full border ${trendColors[trendType]} tracking-tight uppercase shrink-0 font-medium`}>
            {trend}
          </span>
        )}
      </div>

      <div className="flex items-baseline justify-between gap-2">
        <p className="text-3xl sm:text-4xl font-sans font-bold text-text-primary tracking-tighter">
          {value}
        </p>
        {Icon && (
          <div className={`w-9 h-9 rounded-xl bg-primary/10 flex items-center justify-center border border-primary/20 shrink-0`}>
            <Icon className={`w-4 h-4 text-primary`} />
          </div>
        )}
      </div>
    </motion.div>
  );
}
