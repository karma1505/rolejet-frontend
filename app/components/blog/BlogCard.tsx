'use client';
import { motion } from 'framer-motion';
import { ArrowUpRight, Calendar, Clock } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';

interface BlogCardProps {
  title: string;
  excerpt: string;
  category: string;
  date: string;
  readTime: string;
  image: string;
  href: string;
}

export default function BlogCard({ title, excerpt, category, date, readTime, image, href }: BlogCardProps) {
  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      className="group flex flex-col h-full bg-surface border border-border rounded-2xl overflow-hidden hover:border-primary/40 transition-all duration-500 backdrop-blur-sm shadow-lg hover:shadow-primary/5"
    >
      <Link href={href} className="relative aspect-video overflow-hidden">
        <Image 
          src={image} 
          alt={title}
          fill
          className="object-cover group-hover:scale-105 transition-transform duration-700 ease-out grayscale-[0.2] group-hover:grayscale-0"
        />
        <div className="absolute top-4 left-4">
          <span className="px-3 py-1 bg-background/80 backdrop-blur-md border border-border/50 rounded-full text-[10px] font-mono-data text-text-primary uppercase tracking-widest">
            {category}
          </span>
        </div>
      </Link>
      
      <div className="p-6 flex flex-col flex-1">
        <div className="flex items-center gap-4 mb-4 text-[10px] font-mono-data text-text-tertiary uppercase tracking-wider">
          <div className="flex items-center gap-1.5">
            <Calendar className="w-3 h-3" />
            {date}
          </div>
          <div className="flex items-center gap-1.5">
            <Clock className="w-3 h-3" />
            {readTime}
          </div>
        </div>
        
        <Link href={href} className="group-hover:text-text-primary transition-colors">
          <h3 className="text-xl font-mono-display font-bold text-text-primary mb-3 leading-tight tracking-tight">
            {title}
          </h3>
        </Link>
        
        <p className="text-sm text-text-secondary leading-relaxed mb-6 flex-1">
          {excerpt}
        </p>
        
        <Link 
          href={href} 
          className="inline-flex items-center gap-2 text-xs font-mono-data text-text-primary uppercase tracking-widest group/btn"
        >
          Read Perspective 
          <ArrowUpRight className="w-3 h-3 group-hover/btn:translate-x-0.5 group-hover/btn:-translate-y-0.5 transition-transform" />
        </Link>
      </div>
    </motion.div>
  );
}
