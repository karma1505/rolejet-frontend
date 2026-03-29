'use client';
import { motion } from 'framer-motion';

interface ChartData {
  label: string;
  value: number;
  color: string;
}

interface ApplicationChartProps {
  data: ChartData[];
  title: string;
}

export default function ApplicationChart({ data, title }: ApplicationChartProps) {
  const total = data.reduce((acc, curr) => acc + curr.value, 0);

  return (
    <div className="bg-surface border border-border rounded-2xl p-8 backdrop-blur-md h-full flex flex-col">
      <div className="flex items-center justify-between mb-8">
        <h3 className="text-xs font-mono-data text-text-tertiary uppercase tracking-[0.2em]">{title}</h3>
      </div>

      <div className="flex-1 flex flex-col justify-center space-y-6">
        <div className="h-4 w-full bg-background border border-border rounded-full overflow-hidden flex">
          {data.map((item, idx) => (
            <motion.div
              key={idx}
              initial={{ width: 0 }}
              animate={{ width: `${(item.value / total) * 100}%` }}
              transition={{ duration: 1, delay: 0.2 + idx * 0.1 }}
              style={{ backgroundColor: item.color }}
              className="h-full first:rounded-l-full last:rounded-r-full"
              title={`${item.label}: ${item.value}`}
            />
          ))}
        </div>

        <div className="grid grid-cols-2 gap-4">
          {data.map((item, idx) => (
            <div key={idx} className="flex items-center gap-3">
              <div 
                className="w-2 h-2 rounded-full" 
                style={{ backgroundColor: item.color }}
              />
              <div className="flex flex-col">
                <span className="text-[10px] font-mono-data text-text-tertiary uppercase tracking-wider">{item.label}</span>
                <span className="text-sm font-bold text-text-primary">{item.value}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
      
      <div className="mt-8 pt-6 border-t border-border/50">
        <div className="flex items-center justify-between">
          <span className="text-[10px] font-mono-data text-text-tertiary uppercase">Pipeline Efficiency</span>
          <span className="text-xs font-bold text-success">Optimal</span>
        </div>
      </div>
    </div>
  );
}
