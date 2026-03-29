'use client';
import Navbar from '../components/layout/Navbar';
import Footer from '../components/layout/Footer';
import BuilderForm from '../components/features/BuilderForm';
import { motion } from 'framer-motion';

export default function ResumeBuilderPage() {
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
        ease: [0.2, 0.65, 0.3, 0.9] as any
      }
    },
  };

  return (
    <div className="min-h-screen flex flex-col w-full bg-background overflow-x-hidden">
      <Navbar />

      <main className="flex-1 flex flex-col items-center w-full px-6 py-16 lg:py-24 relative">
        {/* Background Decorative Glow */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-6xl aspect-square bg-primary/10 blur-[120px] rounded-full -z-10 pointer-events-none opacity-50"></div>

        <div className="max-w-7xl w-full mx-auto flex flex-col items-center">
          {/* Header Section */}
          <div className="text-center mb-16 space-y-4 max-w-3xl">
            <motion.h1
              initial="hidden"
              animate="visible"
              variants={containerVariants}
              className="text-4xl md:text-6xl font-mono-display font-bold tracking-tighter text-text-primary leading-[1.2]"
            >
              {"Targeted Resume".split("").map((char, index) => (
                <motion.span key={`l1-${index}`} variants={letterVariants} className="inline-block">
                  {char === " " ? "\u00A0" : char}
                </motion.span>
              ))}
              <br className="hidden md:block" />
              <span className="inline-block">
                {"Rewriting.".split("").map((char, index) => (
                  <motion.span
                    key={`l2-${index}`}
                    variants={letterVariants}
                    className="inline-block text-transparent bg-clip-text bg-gradient-to-r from-primary to-blue-500 bg-fixed"
                  >
                    {char === " " ? "\u00A0" : char}
                  </motion.span>
                ))}
              </span>
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 1.5 }}
              className="text-lg text-text-secondary font-sans leading-relaxed tracking-tight"
            >
              Upload your master archive. Paste the JD. Sentry filters your skills <br className="hidden md:block" />
              to build the perfect conversion-first resume for this specific role.
            </motion.p>
          </div>

          {/* Form Section */}
          <motion.div
            initial={{ opacity: 0, scale: 0.98 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="w-full"
          >
            <BuilderForm />
          </motion.div>

          {/* Bottom Trust/Info Indicator */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1, duration: 1 }}
            className="mt-20 pt-12 border-t border-border/50 w-full max-w-5xl flex flex-col md:flex-row items-center justify-between gap-8 opacity-40 select-none grayscale"
          >
            <div className="flex flex-col items-center md:items-start gap-1">
              <p className="text-[10px] font-mono-data uppercase tracking-widest text-text-primary">Encryption Status</p>
              <p className="text-[10px] text-text-secondary">AES-256 Bit Multi-layered Security Active</p>
            </div>
            <div className="flex flex-col items-center md:items-start gap-1">
              <p className="text-[10px] font-mono-data uppercase tracking-widest text-text-primary">AI Engine</p>
              <p className="text-[10px] text-text-secondary">Next-gen LMM Forensic Pattern Matching</p>
            </div>
            <div className="flex flex-col items-center md:items-start gap-1">
              <p className="text-[10px] font-mono-data uppercase tracking-widest text-text-primary">Data Policy</p>
              <p className="text-[10px] text-text-secondary">Zero-retention Analysis (Standard)</p>
            </div>
          </motion.div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
