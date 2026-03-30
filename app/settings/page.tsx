'use client';

import { motion } from 'framer-motion';
import { useState } from 'react';
import Navbar from '../components/layout/Navbar';
import Footer from '../components/layout/Footer';
import { useUser } from '../components/providers/UserProvider';

const sectionVariants = {
  hidden: { opacity: 0, y: 16 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.45, delay: i * 0.08, ease: [0.2, 0.65, 0.3, 0.9] as const },
  }),
};

function SectionCard({ children, index }: { children: React.ReactNode; index: number }) {
  return (
    <motion.div
      custom={index}
      initial="hidden"
      animate="visible"
      variants={sectionVariants}
      className="rounded-2xl border border-border bg-background p-6 shadow-sm"
    >
      {children}
    </motion.div>
  );
}

function SectionTitle({ children }: { children: React.ReactNode }) {
  return (
    <h2 className="text-xs font-mono-display font-bold uppercase tracking-widest text-text-tertiary mb-5">
      {children}
    </h2>
  );
}

export default function SettingsPage() {
  const { user, signOut } = useUser();
  const [deleteConfirm, setDeleteConfirm] = useState(false);

  if (!user) return null;

  return (
    <div className="min-h-screen flex flex-col w-full bg-background overflow-x-hidden">
      <Navbar />

      <main className="flex-1 w-full px-6 pt-28 pb-20 relative">
        {/* Ambient glow */}
        <div
          className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[400px] blur-[120px] rounded-full -z-10 pointer-events-none opacity-30"
          style={{ background: 'radial-gradient(circle, #BEF264 0%, transparent 70%)' }}
        />

        <div className="max-w-2xl mx-auto w-full flex flex-col gap-6">

          {/* Page header */}
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
            className="mb-2"
          >
            <h1 className="text-3xl font-mono-display font-bold tracking-tight text-text-primary">Settings</h1>
            <p className="text-sm text-text-secondary font-sans mt-1">Manage your account and preferences.</p>
          </motion.div>

          {/* ── Profile ───────────────────────────────── */}
          <SectionCard index={0}>
            <SectionTitle>Profile</SectionTitle>
            <div className="flex items-center gap-4">
              {user.avatar_url ? (
                <img
                  src={user.avatar_url}
                  alt={user.full_name ?? user.email}
                  referrerPolicy="no-referrer"
                  className="w-16 h-16 rounded-full object-cover ring-2 ring-border"
                />
              ) : (
                <div className="w-16 h-16 rounded-full bg-primary/20 border border-primary/30 flex items-center justify-center text-xl font-bold text-primary font-mono-display">
                  {(user.full_name ?? user.email)[0].toUpperCase()}
                </div>
              )}
              <div>
                <p className="text-base font-semibold font-sans text-text-primary">{user.full_name ?? '—'}</p>
                <p className="text-sm text-text-secondary font-sans">{user.email}</p>
                <span className="mt-1.5 inline-flex items-center gap-1.5 px-2 py-0.5 rounded-full bg-surface border border-border text-[10px] font-sans text-text-tertiary">
                  <svg className="w-3 h-3" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4" />
                    <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853" />
                    <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05" />
                    <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335" />
                  </svg>
                  Connected with Google
                </span>
              </div>
            </div>
            <p className="mt-4 text-xs text-text-tertiary font-sans leading-relaxed">
              Profile information is pulled from your Google account. To update your name or photo, edit your Google profile directly.
            </p>
          </SectionCard>

          {/* ── RJ Credits ────────────────────────────── */}
          <SectionCard index={1}>
            <SectionTitle>RJ Credits</SectionTitle>
            <div className="flex items-center gap-2 mb-3">
              <span className="text-4xl font-mono-display font-bold text-text-primary">0</span>
              <span className="text-4xl font-mono-display font-bold text-text-tertiary">/</span>
              <span className="text-4xl font-mono-display font-bold text-text-tertiary">100</span>
              <span className="text-sm font-mono-display text-text-tertiary ml-1">credits</span>
            </div>
            <p className="text-xs text-text-secondary font-sans mb-3">Resets on the 1st of every month</p>
            <div className="h-2 rounded-full bg-surface border border-border overflow-hidden mb-4">
              <div className="h-full w-0 bg-primary rounded-full transition-all duration-700" />
            </div>
            <div className="grid grid-cols-3 gap-3">
              {[
                { label: 'Resume Rewrites', cost: '5 credits' },
                { label: 'Cover Letters', cost: '3 credits' },
                { label: 'Job Analysis', cost: '1 credit' },
              ].map(item => (
                <div key={item.label} className="rounded-xl bg-surface border border-border p-3">
                  <p className="text-[10px] font-mono-data uppercase tracking-wider text-text-tertiary">{item.label}</p>
                  <p className="text-sm font-mono-display font-semibold text-text-primary mt-1">{item.cost}</p>
                </div>
              ))}
            </div>
          </SectionCard>

          {/* ── Account ───────────────────────────────── */}
          <SectionCard index={2}>
            <SectionTitle>Account</SectionTitle>
            <div className="space-y-1">
              <div className="flex items-center justify-between py-3 border-b border-border">
                <div>
                  <p className="text-sm font-sans font-medium text-text-primary">Member since</p>
                  <p className="text-xs text-text-tertiary font-sans mt-0.5">
                    {new Date(user.created_at).toLocaleDateString('en-US', { month: 'long', year: 'numeric' })}
                    <span className="mx-1.5 opacity-40">·</span>
                    {Math.max(0, Math.floor((new Date().getTime() - new Date(user.created_at).getTime()) / (1000 * 60 * 60 * 24)))} days
                  </p>
                </div>
              </div>
              <div className="flex items-center justify-between py-3">
                <div>
                  <p className="text-sm font-sans font-medium text-text-primary">Plan</p>
                  <p className="text-xs text-text-tertiary font-sans mt-0.5">Free tier</p>
                </div>
                <button className="h-7 px-3 text-xs font-sans font-medium bg-primary text-black rounded-full hover:bg-primary/90 transition-colors">
                  Upgrade
                </button>
              </div>
            </div>
          </SectionCard>

          {/* ── Delete Account ────────────────────────── */}
          <SectionCard index={3}>
            <SectionTitle>Delete Account</SectionTitle>
            <div className="flex items-start justify-between gap-4">
              <p className="text-sm text-text-secondary font-sans leading-relaxed">
                Permanently removes your account and all associated data. This cannot be undone.
              </p>
              {!deleteConfirm ? (
                <button
                  onClick={() => setDeleteConfirm(true)}
                  className="shrink-0 h-8 px-4 text-xs font-sans font-medium border border-danger/40 text-danger rounded-lg hover:bg-danger/10 transition-colors"
                >
                  Delete
                </button>
              ) : (
                <div className="flex items-center gap-2 shrink-0">
                  <button
                    onClick={() => setDeleteConfirm(false)}
                    className="h-8 px-3 text-xs font-sans text-text-secondary border border-border rounded-lg hover:bg-surface transition-colors"
                  >
                    Cancel
                  </button>
                  <button
                    onClick={() => { signOut(); /* TODO: call delete API */ }}
                    className="h-8 px-3 text-xs font-sans font-semibold bg-danger text-white rounded-lg hover:bg-danger/90 transition-colors"
                  >
                    Confirm
                  </button>
                </div>
              )}
            </div>
          </SectionCard>

        </div>
      </main>

      <Footer />
    </div>
  );
}
