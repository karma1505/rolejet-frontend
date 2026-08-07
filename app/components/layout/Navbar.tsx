'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useEffect, useRef, useState } from 'react';
import { useUser } from '../providers/UserProvider';
import GoogleSignInButton from '../auth/GoogleSignInButton';
import {
  Settings,
  LogOut,
  ChevronDown,
  Menu,
  X,
  Sparkles,
} from 'lucide-react';

export default function Navbar() {
  const pathname = usePathname();
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

  const navLinks = [
    { href: '/resumebuilder', label: 'Resume Builder' },
    { href: '/applications', label: 'Job Application Tracker' },
    { href: '/extension', label: 'Extension' },
    { href: '/blog', label: 'Blog' },
  ];

  return (
    <nav className="w-full border-b border-[#A6B1E1]/30 bg-gradient-to-r from-[#424874] via-[#383C66] to-[#2B2E4E] backdrop-blur-xl fixed top-0 z-[100] text-[#F4EEFF] shadow-lg shadow-[#2B2E4E]/30 transition-all duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between w-full">

        {/* Brand Logo */}
        <Link href="/" className="flex items-center gap-3 group py-1">
          <div className="relative flex items-center justify-center">
            <div className="absolute -inset-1 rounded-xl bg-gradient-to-r from-[#A6B1E1]/40 to-[#DCD6F7]/20 blur-sm opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            <img
              src="/rolejet.svg"
              alt="RoleJet"
              className="relative w-8 h-8 rounded-lg group-hover:scale-105 transition-transform duration-300 ring-1 ring-[#A6B1E1]/30 group-hover:ring-[#A6B1E1]/60"
            />
          </div>
          <div className="flex flex-col">
            <span className="font-sans font-bold tracking-tight text-lg text-[#F4EEFF] group-hover:text-white transition-colors">
              RoleJet
            </span>
          </div>
        </Link>

        {/* Desktop Navigation Links */}
        <div className="hidden md:flex items-center gap-1.5 lg:gap-2 absolute left-1/2 -translate-x-1/2 bg-[#2B2E4E]/40 p-1.5 rounded-full border border-[#A6B1E1]/20 backdrop-blur-md">
          {navLinks.map((link) => {
            const isActive = pathname === link.href;
            return (
              <Link
                key={link.href}
                href={link.href}
                className={`relative flex items-center gap-2 px-3.5 py-1.5 rounded-full text-xs font-sans font-medium transition-all duration-200 ${
                  isActive
                    ? 'bg-[#A6B1E1]/25 text-[#F4EEFF] font-semibold border border-[#A6B1E1]/40 shadow-sm shadow-[#A6B1E1]/20'
                    : 'text-[#DCD6F7] hover:text-[#F4EEFF] hover:bg-[#A6B1E1]/10'
                }`}
              >
                <span>{link.label}</span>
                {isActive && (
                  <span className="w-1.5 h-1.5 rounded-full bg-[#A6B1E1] animate-pulse" />
                )}
              </Link>
            );
          })}
        </div>

        {/* Right Action Section */}
        <div className="flex items-center gap-4">
          {user ? (
            <div className="relative" ref={dropdownRef}>
              {/* Profile Trigger Button */}
              <button
                onClick={() => setOpen(prev => !prev)}
                className="flex items-center gap-2.5 px-2.5 py-1.5 rounded-full border border-[#A6B1E1]/30 bg-[#383C66]/50 hover:bg-[#383C66] focus:outline-none transition-all duration-200 group shadow-sm hover:border-[#A6B1E1]/60"
                aria-label="Open profile menu"
              >
                {user.avatar_url ? (
                  <img
                    src={user.avatar_url}
                    alt={user.full_name ?? user.email}
                    referrerPolicy="no-referrer"
                    className="w-7 h-7 rounded-full object-cover ring-1 ring-[#A6B1E1]/50 group-hover:ring-[#F4EEFF] transition-all"
                  />
                ) : (
                  <div className="w-7 h-7 rounded-full bg-[#A6B1E1]/30 border border-[#A6B1E1]/50 flex items-center justify-center text-xs font-bold text-[#F4EEFF] font-sans">
                    {(user.full_name ?? user.email)[0].toUpperCase()}
                  </div>
                )}
                <span className="hidden lg:inline-block text-xs font-medium text-[#F4EEFF] max-w-[100px] truncate">
                  {user.full_name?.split(' ')[0] ?? 'Account'}
                </span>
                <ChevronDown
                  className={`w-3.5 h-3.5 text-[#A6B1E1] transition-transform duration-200 group-hover:text-[#F4EEFF] ${
                    open ? 'rotate-180' : ''
                  }`}
                />
              </button>

              {/* Enhanced Dropdown Menu */}
              {open && (
                <div className="absolute right-0 top-12 w-68 rounded-2xl border border-[#A6B1E1]/40 bg-[#2B2E4E]/95 backdrop-blur-2xl shadow-2xl shadow-black/40 overflow-hidden z-50 animate-in fade-in-50 zoom-in-95 duration-150 text-[#F4EEFF]">

                  {/* User Profile Header */}
                  <div className="p-4 border-b border-[#A6B1E1]/20 bg-[#383C66]/40">
                    <div className="flex items-center gap-3">
                      {user.avatar_url ? (
                        <img
                          src={user.avatar_url}
                          alt={user.full_name ?? user.email}
                          referrerPolicy="no-referrer"
                          className="w-10 h-10 rounded-full object-cover ring-2 ring-[#A6B1E1]/40"
                        />
                      ) : (
                        <div className="w-10 h-10 rounded-full bg-[#A6B1E1]/25 border border-[#A6B1E1]/40 flex items-center justify-center text-sm font-bold text-[#F4EEFF]">
                          {(user.full_name ?? user.email)[0].toUpperCase()}
                        </div>
                      )}
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-1.5">
                          <p className="text-sm font-bold text-[#F4EEFF] font-sans truncate">
                            {user.full_name ?? 'User'}
                          </p>
                          <span className="inline-flex items-center px-1.5 py-0.5 rounded-full text-[10px] font-semibold bg-[#A6B1E1]/20 text-[#DCD6F7] border border-[#A6B1E1]/30">
                            PRO
                          </span>
                        </div>
                        <p className="text-xs text-[#A6B1E1] font-sans truncate">{user.email}</p>
                      </div>
                    </div>
                  </div>

                  {/* RJ Credits Section */}
                  <div className="px-4 py-3.5 border-b border-[#A6B1E1]/20 bg-[#424874]/20">
                    <div className="flex items-center justify-between mb-1.5">
                      <div className="flex items-center gap-1.5">
                        <Sparkles className="w-3.5 h-3.5 text-[#A6B1E1]" />
                        <span className="text-xs font-semibold font-sans text-[#F4EEFF]">RJ Credits</span>
                      </div>
                      <span className="text-xs font-medium font-sans text-[#DCD6F7] px-2 py-0.5 rounded-md bg-[#A6B1E1]/15 border border-[#A6B1E1]/20">
                        0 / 10
                      </span>
                    </div>
                    <div className="h-1.5 rounded-full bg-[#383C66] overflow-hidden border border-[#A6B1E1]/20">
                      <div className="h-full w-0 bg-gradient-to-r from-[#A6B1E1] to-[#F4EEFF] rounded-full transition-all duration-500" />
                    </div>
                    <p className="mt-1.5 text-[10px] text-[#A6B1E1] font-sans">Credits auto-refresh monthly</p>
                  </div>

                  {/* Menu Items */}
                  <div className="p-2 space-y-1">
                    <Link
                      href="/settings"
                      onClick={() => setOpen(false)}
                      className="flex items-center gap-3 px-3 py-2.5 rounded-xl text-xs font-sans font-medium text-[#DCD6F7] hover:text-[#F4EEFF] hover:bg-[#A6B1E1]/15 transition-all duration-150 group"
                    >
                      <Settings className="w-4 h-4 text-[#A6B1E1] group-hover:text-[#F4EEFF] transition-colors" />
                      <span>Settings</span>
                    </Link>
                  </div>

                  {/* Sign Out Action */}
                  <div className="p-2 pt-0 border-t border-[#A6B1E1]/15">
                    <button
                      onClick={() => { signOut(); setOpen(false); }}
                      className="w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-xs font-sans font-medium text-red-300 hover:text-red-100 hover:bg-red-500/20 transition-all duration-150 group mt-1"
                    >
                      <LogOut className="w-4 h-4 text-red-400 group-hover:text-red-200 transition-colors" />
                      <span>Sign Out</span>
                    </button>
                  </div>

                </div>
              )}
            </div>
          ) : !isLoading ? (
            <div className="hidden sm:flex items-center gap-2">
              <GoogleSignInButton />
            </div>
          ) : null}

          {/* Mobile Menu Toggle Button */}
          <button
            className="md:hidden flex items-center justify-center p-2 rounded-xl border border-[#A6B1E1]/30 bg-[#383C66]/40 text-[#DCD6F7] hover:text-[#F4EEFF] hover:bg-[#383C66] transition-all"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label="Toggle Navigation Menu"
          >
            {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>

      </div>

      {/* Mobile Drawer Overlay */}
      {mobileMenuOpen && (
        <div className="md:hidden border-b border-[#A6B1E1]/30 bg-gradient-to-b from-[#383C66] via-[#2B2E4E] to-[#1F223B] backdrop-blur-2xl shadow-2xl z-50 animate-in slide-in-from-top-3 duration-200 text-[#F4EEFF]">
          <div className="flex flex-col px-5 py-6 space-y-2">
            {navLinks.map((link) => {
              const isActive = pathname === link.href;
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  onClick={() => setMobileMenuOpen(false)}
                  className={`flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-sans font-medium transition-all ${
                    isActive
                      ? 'bg-[#A6B1E1]/25 text-[#F4EEFF] font-semibold border border-[#A6B1E1]/40'
                      : 'text-[#DCD6F7] hover:text-[#F4EEFF] hover:bg-[#A6B1E1]/10'
                  }`}
                >
                  <span>{link.label}</span>
                </Link>
              );
            })}

            {!user && !isLoading && (
              <div className="pt-4 mt-2 border-t border-[#A6B1E1]/20 flex justify-center">
                <GoogleSignInButton />
              </div>
            )}
          </div>
        </div>
      )}
    </nav>
  );
}

