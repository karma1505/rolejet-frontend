'use client';

import { motion } from 'framer-motion';
import { useUser } from '../providers/UserProvider';

export default function AuthGuard({ children }: { children: React.ReactNode }) {
  const { user, isLoading } = useUser();

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background">
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}
          className="w-6 h-6 rounded-full border-2 border-primary border-t-transparent"
        />
      </div>
    );
  }

  if (!user) {
    return (
      <div className="relative min-h-screen flex items-center justify-center bg-background overflow-hidden">

        {/* Ambient background glows — mirrors the Hero */}
        <div className="absolute inset-0 z-0 pointer-events-none">
          <div
            className="absolute inset-0 opacity-20"
            style={{ background: 'radial-gradient(circle at 50% 0%, #BEF264 0%, transparent 70%)' }}
          />
          <motion.div
            animate={{ scale: [1, 1.15, 1], opacity: [0.12, 0.22, 0.12] }}
            transition={{ duration: 10, repeat: Infinity, ease: 'easeInOut' }}
            className="absolute top-[15%] left-[5%] w-[500px] h-[500px] rounded-full blur-[120px]"
            style={{ background: 'radial-gradient(circle, #10B981 0%, transparent 70%)' }}
          />
          <motion.div
            animate={{ scale: [1.2, 1, 1.2], opacity: [0.08, 0.18, 0.08] }}
            transition={{ duration: 14, repeat: Infinity, ease: 'easeInOut', delay: 3 }}
            className="absolute bottom-[10%] right-[5%] w-[600px] h-[600px] rounded-full blur-[140px]"
            style={{ background: 'radial-gradient(circle, #BEF264 0%, transparent 70%)' }}
          />
        </div>

        {/* Subtle grid overlay */}
        <div
          className="absolute inset-0 z-0 opacity-[0.03]"
          style={{
            backgroundImage: 'linear-gradient(#09090b 1px, transparent 1px), linear-gradient(90deg, #09090b 1px, transparent 1px)',
            backgroundSize: '48px 48px',
          }}
        />

        {/* Card */}
        <motion.div
          initial={{ opacity: 0, y: 24, filter: 'blur(8px)' }}
          animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
          transition={{ duration: 0.6, ease: [0.2, 0.65, 0.3, 0.9] }}
          className="relative z-10 flex flex-col items-center text-center max-w-md w-full mx-6 p-10 rounded-2xl border border-border bg-background/80 backdrop-blur-xl shadow-2xl"
        >
          {/* Glow ring behind lock */}
          <div className="relative mb-8">
            <div className="absolute inset-0 rounded-full blur-2xl bg-primary/20 scale-150" />
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ delay: 0.2, duration: 0.5, ease: 'backOut' }}
              className="relative w-16 h-16 rounded-2xl bg-surface border border-border flex items-center justify-center"
            >
              <svg
                className="w-7 h-7 text-text-primary"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={1.5}
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M16.5 10.5V6.75a4.5 4.5 0 1 0-9 0v3.75m-.75 11.25h10.5a2.25 2.25 0 0 0 2.25-2.25v-6.75a2.25 2.25 0 0 0-2.25-2.25H6.75a2.25 2.25 0 0 0-2.25 2.25v6.75a2.25 2.25 0 0 0 2.25 2.25z"
                />
              </svg>
            </motion.div>
          </div>

          {/* Label pill */}
          <motion.div
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.4 }}
            className="mb-4 inline-flex items-center gap-1.5 px-3 py-1 rounded-full border border-primary/30 bg-primary/10 text-primary text-xs font-mono-display font-semibold tracking-widest uppercase"
          >
            <span className="w-1.5 h-1.5 rounded-full bg-primary animate-pulse" />
            Access Restricted
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.35, duration: 0.4 }}
            className="text-2xl font-mono-display font-bold tracking-tight text-text-primary mb-3"
          >
            Sign in to continue
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4, duration: 0.4 }}
            className="text-sm text-text-secondary font-sans leading-relaxed mb-8"
          >
            This tool is only available to authenticated users. The Google sign-in prompt should appear automatically — just follow it to get instant access.
          </motion.p>

          {/* Divider with label */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5, duration: 0.4 }}
            className="w-full flex items-center gap-4 text-xs text-text-tertiary font-sans"
          >
            <div className="flex-1 h-px bg-border" />
            <span>No account needed</span>
            <div className="flex-1 h-px bg-border" />
          </motion.div>

          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.55, duration: 0.4 }}
            className="mt-6 text-xs text-text-tertiary font-sans"
          >
            Just your Google account.
          </motion.p>
        </motion.div>
      </div>
    );
  }

  return <>{children}</>;
}
