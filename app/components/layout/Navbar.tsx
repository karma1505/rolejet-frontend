'use client';

import Link from 'next/link';
import { useEffect, useRef, useState } from 'react';
import { useUser } from '../providers/UserProvider';
import GoogleSignInButton from '../auth/GoogleSignInButton';

export default function Navbar() {
  const { user, signOut, isLoading } = useUser();
  const [open, setOpen] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  // Close dropdown on outside click
  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) {
        setOpen(false);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <nav className="w-full border-b border-border bg-background/60 backdrop-blur-md fixed top-0 z-[100]">
      <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between w-full">

        {/* Logo */}
        <Link href="/" className="flex items-center gap-2 group">
          <img
            src="/rolejet.svg"
            alt="RoleJet"
            className="w-8 h-8 rounded-md group-hover:opacity-90 transition-opacity"
          />
          <span className="font-mono-display font-semibold tracking-tight text-lg text-text-primary">RoleJet</span>
        </Link>

        {/* Center nav links */}
        <div className="hidden md:flex items-center gap-8 absolute left-1/2 -translate-x-1/2">
          <Link href="/resumebuilder" className="text-sm font-sans font-medium text-text-secondary hover:text-text-primary transition-colors">
            Resume Builder
          </Link>
          <Link href="/applications" className="text-sm font-sans font-medium text-text-secondary hover:text-text-primary transition-colors">
            Job Application Tracker
          </Link>
          <Link href="/extension" className="text-sm font-sans font-medium text-text-secondary hover:text-text-primary transition-colors">
            Extension
          </Link>
          <Link href="/blog" className="text-sm font-sans font-medium text-text-secondary hover:text-text-primary transition-colors">
            Blog
          </Link>
        </div>

        {/* Right side */}
        <div className="flex items-center gap-5">
          {user ? (
            <div className="relative" ref={dropdownRef}>
              {/* Avatar trigger */}
              <button
                onClick={() => setOpen(prev => !prev)}
                className="flex items-center gap-1.5 rounded-full focus:outline-none group"
                aria-label="Open profile menu"
              >
                {user.avatar_url ? (
                  <img
                    src={user.avatar_url}
                    alt={user.full_name ?? user.email}
                    referrerPolicy="no-referrer"
                    className="w-8 h-8 rounded-full object-cover ring-2 ring-border group-hover:ring-primary/40 transition-all"
                  />
                ) : (
                  <div className="w-8 h-8 rounded-full bg-primary/20 border border-primary/30 flex items-center justify-center text-xs font-semibold text-primary font-mono-display">
                    {(user.full_name ?? user.email)[0].toUpperCase()}
                  </div>
                )}
                <svg
                  className="w-4 h-4 text-text-tertiary transition-colors duration-200 group-hover:text-text-secondary"
                  fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}
                >
                  {open ? (
                    <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                  ) : (
                    <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5M3.75 17.25h16.5" />
                  )}
                </svg>
              </button>

              {/* Dropdown */}
              {open && (
                <div className="absolute right-0 top-12 w-64 rounded-2xl border border-border bg-background/95 backdrop-blur-xl shadow-2xl overflow-hidden z-50">

                  {/* User info */}
                  <div className="px-4 py-4 border-b border-border">
                    <div className="flex items-center gap-3">
                      {user.avatar_url ? (
                        <img
                          src={user.avatar_url}
                          alt={user.full_name ?? user.email}
                          referrerPolicy="no-referrer"
                          className="w-10 h-10 rounded-full object-cover ring-2 ring-border"
                        />
                      ) : (
                        <div className="w-10 h-10 rounded-full bg-primary/20 border border-primary/30 flex items-center justify-center text-sm font-semibold text-primary">
                          {(user.full_name ?? user.email)[0].toUpperCase()}
                        </div>
                      )}
                      <div className="flex-1 min-w-0">
                        <p className="text-sm font-semibold text-text-primary font-sans truncate">{user.full_name ?? 'User'}</p>
                        <p className="text-xs text-text-tertiary font-sans truncate">{user.email}</p>
                      </div>
                    </div>
                  </div>

                  {/* RJ Credits */}
                  <div className="px-4 py-3 border-b border-border">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <span className="text-xs font-mono-display text-text-secondary">RJ</span>
                        <span className="text-xs font-mono-display text-text-secondary">Credits</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <span className="text-xs font-mono-display text-text-secondary">0</span>
                        <span className="text-xs font-mono-display text-text-secondary">credits</span>
                      </div>
                    </div>
                    <div className="mt-2 h-1.5 rounded-full bg-surface overflow-hidden">
                      <div className="h-full w-0 bg-primary rounded-full transition-all duration-500" />
                    </div>
                    <p className="mt-1.5 text-[10px] text-text-tertiary font-sans">Credits reset monthly</p>
                  </div>

                  {/* Menu items */}
                  <div className="p-2">
                    <Link
                      href="/settings"
                      onClick={() => setOpen(false)}
                      className="flex items-center gap-2.5 px-3 py-2 rounded-lg text-sm font-sans text-text-secondary hover:text-text-primary hover:bg-surface transition-colors"
                    >
                      <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M9.594 3.94c.09-.542.56-.94 1.11-.94h2.593c.55 0 1.02.398 1.11.94l.213 1.281c.063.374.313.686.645.87.074.04.147.083.22.127.325.196.72.257 1.075.124l1.217-.456a1.125 1.125 0 0 1 1.37.49l1.296 2.247a1.125 1.125 0 0 1-.26 1.431l-1.003.827c-.293.241-.438.613-.43.992a7.723 7.723 0 0 1 0 .255c-.008.378.137.75.43.991l1.004.827c.424.35.534.955.26 1.43l-1.298 2.247a1.125 1.125 0 0 1-1.369.491l-1.217-.456c-.355-.133-.75-.072-1.076.124a6.47 6.47 0 0 1-.22.128c-.331.183-.581.495-.644.869l-.213 1.281c-.09.543-.56.94-1.11.94h-2.594c-.55 0-1.019-.398-1.11-.94l-.213-1.281c-.062-.374-.312-.686-.644-.87a6.52 6.52 0 0 1-.22-.127c-.325-.196-.72-.257-1.076-.124l-1.217.456a1.125 1.125 0 0 1-1.369-.49l-1.297-2.247a1.125 1.125 0 0 1 .26-1.431l1.004-.827c.292-.24.437-.613.43-.991a6.932 6.932 0 0 1 0-.255c.007-.38-.138-.751-.43-.992l-1.004-.827a1.125 1.125 0 0 1-.26-1.43l1.297-2.247a1.125 1.125 0 0 1 1.37-.491l1.216.456c.356.133.751.072 1.076-.124.072-.044.146-.086.22-.128.332-.183.582-.495.644-.869l.214-1.28Z" />
                        <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z" />
                      </svg>
                      Settings
                    </Link>
                  </div>

                  {/* Sign Out */}
                  <div className="p-2 pt-0">
                    <button
                      onClick={() => { signOut(); setOpen(false); }}
                      className="w-full flex items-center gap-2.5 px-3 py-2 rounded-lg text-sm font-sans text-danger hover:bg-danger/10 transition-colors"
                    >
                      <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 9V5.25A2.25 2.25 0 0 0 13.5 3h-6a2.25 2.25 0 0 0-2.25 2.25v13.5A2.25 2.25 0 0 0 7.5 21h6a2.25 2.25 0 0 0 2.25-2.25V15M12 9l-3 3m0 0 3 3m-3-3h12.75" />
                      </svg>
                      Sign Out
                    </button>
                  </div>

                </div>
              )}
            </div>
          ) : !isLoading ? (
            <div className="hidden sm:flex items-center gap-1 sm:gap-2">
              <GoogleSignInButton />
            </div>
          ) : null}

          {/* Mobile menu toggle */}
          <button
            className="md:hidden flex items-center justify-center p-2 rounded-md text-text-secondary hover:text-text-primary hover:bg-surface transition-colors"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            <span className="sr-only">Open main menu</span>
            {mobileMenuOpen ? (
              <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            ) : (
              <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16m-7 6h7" />
              </svg>
            )}
          </button>
        </div>

      </div>

      {/* Mobile Menu Overlay */}
      {mobileMenuOpen && (
        <div className="md:hidden absolute top-16 left-0 w-full bg-background border-b border-border shadow-xl z-50 animate-in slide-in-from-top-2 duration-200">
          <div className="flex flex-col px-6 py-6 space-y-6">
            <Link href="/resumebuilder" onClick={() => setMobileMenuOpen(false)} className="text-lg font-sans font-medium text-text-primary">
              Resume Builder
            </Link>
            <Link href="/applications" onClick={() => setMobileMenuOpen(false)} className="text-lg font-sans font-medium text-text-primary">
              Job Application Tracker
            </Link>
            <Link href="/extension" onClick={() => setMobileMenuOpen(false)} className="text-lg font-sans font-medium text-text-primary">
              Extension
            </Link>
            <Link href="/blog" onClick={() => setMobileMenuOpen(false)} className="text-lg font-sans font-medium text-text-primary">
              Blog
            </Link>
            {!user && !isLoading && (
              <div className="pt-2 border-t border-border">
                <GoogleSignInButton />
              </div>
            )}
          </div>
        </div>
      )}
    </nav>
  );
}
