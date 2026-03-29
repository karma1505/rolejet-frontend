'use client';
import Link from 'next/link';
import { motion } from 'framer-motion';

export default function Hero() {
  const line1 = "Apply Smartly,";
  const line2 = "Not Mindlessly.";

  const containerVariants = {
    hidden: { opacity: 1 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.06,
        delayChildren: 0.3,
      },
    },
  };

  const letterVariants = {
    hidden: { opacity: 0, y: 10, filter: "blur(4px)", scale: 0.9 },
    visible: {
      opacity: 1,
      y: 0,
      filter: "blur(0px)",
      scale: 1,
      transition: {
        duration: 0.5,
        ease: [0.2, 0.65, 0.3, 0.9] as any // Smooth cubic-bezier
      }
    },
  };

  return (
    <section className="relative w-full min-h-screen flex flex-col items-center justify-center text-center px-6 overflow-hidden">
      {/* Premium Unified Background Glow - Direct CSS for Reliability */}
      <div className="absolute inset-0 z-0 pointer-events-none select-none overflow-hidden">
        {/* Top center ambient glow */}
        <div
          className="absolute inset-0 transform-gpu opacity-30"
          style={{
            background: 'radial-gradient(circle at 50% 0%, #BEF264 0%, transparent 75%)',
          }}
        />

        {/* Main central glow behind text */}
        <div
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-[800px] max-w-[1400px] transform-gpu opacity-40 blur-[120px]"
          style={{
            background: 'radial-gradient(circle at 50% 50%, #BEF264 0%, transparent 70%)',
          }}
        />

        {/* Dynamic accent glow blobs */}
        <motion.div
          animate={{
            scale: [1, 1.2, 1],
            opacity: [0.15, 0.25, 0.15],
          }}
          transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
          className="absolute top-[20%] left-[10%] w-[500px] h-[500px] rounded-full blur-[100px] transform-gpu"
          style={{ background: 'radial-gradient(circle at 50% 50%, #10B981 0%, transparent 70%)' }}
        />
        <motion.div
          animate={{
            scale: [1.3, 1, 1.3],
            opacity: [0.1, 0.2, 0.1],
          }}
          transition={{ duration: 12, repeat: Infinity, ease: "easeInOut", delay: 2 }}
          className="absolute bottom-[10%] right-[5%] w-[600px] h-[600px] rounded-full blur-[120px] transform-gpu"
          style={{ background: 'radial-gradient(circle at 50% 50%, #BEF264 0%, transparent 70%)' }}
        />
      </div>
      <motion.h1
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="relative z-10 max-w-4xl font-mono-display text-5xl md:text-7xl font-bold tracking-tighter text-text-primary mb-6 leading-[1.2]"
      >
        <span className="inline-block pb-4">
          {line1.split("").map((char, index) => (
            <motion.span key={`l1-${index}`} variants={letterVariants} className="inline-block">
              {char === " " ? "\u00A0" : char}
            </motion.span>
          ))}
        </span>
        <br className="hidden md:block" />
        <span className="inline-block pb-4">
          {line2.split("").map((char, index) => (
            <motion.span
              key={`l2-${index}`}
              variants={letterVariants}
              className="inline-block text-text-primary"
            >
              {char === " " ? "\u00A0" : char}
            </motion.span>
          ))}
        </span>
      </motion.h1>

      <p className="relative z-10 max-w-2xl text-lg md:text-xl text-text-secondary font-sans leading-relaxed mb-10 animate-in fade-in slide-in-from-bottom-6 duration-700 delay-200 fill-mode-both fade-in-0 slide-in-from-bottom-[10%]">
        The Career Intelligence Engine for World-Class Talent. Execute your search with professional precision and data-driven confidence.
      </p>

      <div className="relative z-10 flex flex-col sm:flex-row items-center gap-4 animate-in fade-in slide-in-from-bottom-8 duration-700 delay-300 fill-mode-both fade-in-0 slide-in-from-bottom-[10%]">
        <Link href="/signup" className="h-12 px-8 flex items-center justify-center text-base font-medium bg-primary text-black rounded-full hover:bg-primary/90 transition-all shadow-lg shadow-primary/25 hover:shadow-primary/40 hover:-translate-y-0.5">
          Start Optimizing Now
        </Link>
        <Link href="#how-it-works" className="h-12 px-8 flex items-center justify-center text-base font-medium bg-surface border border-border text-text-primary rounded-full hover:bg-surface-hover transition-colors">
          See How It Works
        </Link>
      </div>

      <div className="relative z-10 mt-8 flex items-center gap-2 animate-in fade-in duration-1000 delay-500 fill-mode-both fade-in-0">
        <div className="flex -space-x-2">
          {[1, 2, 3, 4, 5].map((i) => (
            <div key={i} className="w-8 h-8 rounded-full border-2 border-background bg-surface flex items-center justify-center overflow-hidden">
              <div className="w-full h-full bg-gradient-to-br from-primary/20 to-primary/40"></div>
            </div>
          ))}
        </div>
        <div className="flex flex-col items-start px-2 text-left">
          <div className="flex text-warning text-[10px]">
            {"★★★★★".split("").map((s, i) => <span key={i}>{s}</span>)}
          </div>
          <p className="text-[10px] text-text-secondary font-medium tracking-tight">Join 10,000+ job seekers using RoleJet</p>
        </div>
      </div>

    </section>
  );
}
