'use client';
import { motion } from 'framer-motion';

interface ChartData {
  label: string;
  value: number;
  color: string;
}

interface ApplicationChartProps {
  data: ChartData[];
  title?: string;
}

export default function ApplicationChart({ data, title }: ApplicationChartProps) {
  const maxValue = Math.max(...data.map(d => d.value), 1);
  
  return (
    <div className="bg-surface border border-border rounded-2xl p-8 h-full flex flex-col relative overflow-hidden">
      {title && (
        <div className="flex items-center justify-between mb-10">
          <h3 className="text-xs font-mono-data text-text-tertiary uppercase tracking-[0.2em]">{title}</h3>
          <div className="flex gap-4">
             {data.map((item, idx) => (
                <div key={idx} className="flex items-center gap-1.5">
                   <div className="w-1.5 h-1.5 rounded-full" style={{ backgroundColor: item.color }}></div>
                   <span className="text-[10px] font-mono-data text-text-secondary uppercase">{item.label}</span>
                </div>
             ))}
          </div>
        </div>
      )}

      <div className="flex-1 flex items-end justify-between gap-2 md:gap-4 px-2">
        {data.map((item, index) => (
          <div key={index} className="flex-1 flex flex-col items-center gap-4 group min-w-0">
            <div className="relative w-full flex flex-col items-center">
              {/* Value Indicator on Hover */}
              <motion.div 
                initial={{ opacity: 0, y: -4 }}
                whileHover={{ opacity: 1, y: -10 }}
                className="absolute top-0 -translate-y-full mb-2 bg-text-primary text-background text-[10px] px-2 py-0.5 rounded font-mono-data pointer-events-none z-20 whitespace-nowrap"
              >
                {item.value}
              </motion.div>
              
              {/* Bar */}
              <motion.div
                initial={{ height: 0 }}
                animate={{ height: `${(item.value / maxValue) * 200}px` }}
                transition={{ duration: 1.2, delay: index * 0.1, ease: [0.2, 0.65, 0.3, 0.9] }}
                className="w-full max-w-[40px] rounded-t-lg relative overflow-hidden group-hover:brightness-110 group-hover:shadow-[0_0_20px] transition-all duration-300 z-10"
                style={{ 
                  backgroundColor: item.color,
                  boxShadow: `0 0 10px ${item.color}20`
                }}
              >
                {/* Visual Glass Effect */}
                <div className="absolute inset-0 bg-gradient-to-b from-white/10 to-transparent"></div>
              </motion.div>
            </div>
            
            <span className="text-[10px] font-mono-data text-text-tertiary uppercase tracking-normal md:tracking-widest text-center h-4 truncate w-full">
              {item.label}
            </span>
          </div>
        ))}
      </div>
      
      {/* Chart Grid Lines */}
      <div className="absolute left-8 right-8 bottom-[72px] h-[200px] border-b border-border/30 -z-0 pointer-events-none flex flex-col justify-between">
         <div className="w-full border-t border-border/10"></div>
         <div className="w-full border-t border-border/10"></div>
         <div className="w-full border-t border-border/10"></div>
      </div>
    </div>
  );
}
