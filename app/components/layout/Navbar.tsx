import Link from 'next/link';
import ThemeToggle from './ThemeToggle';

export default function Navbar() {
  return (
    <nav className="w-full border-b border-border bg-surface/50 backdrop-blur-md sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between w-full">
        <Link href="/" className="flex items-center gap-2 group">
          <div className="w-8 h-8 bg-primary rounded-md flex items-center justify-center text-white font-mono font-bold group-hover:bg-primary/90 transition-colors">
            S
          </div>
          <span className="font-mono-display font-semibold tracking-tight text-lg text-text-primary">SentryAI</span>
        </Link>

        <div className="hidden md:flex items-center gap-8 absolute left-1/2 -translate-x-1/2">
          <Link href="/sentryextension" className="text-sm font-mono-data font-medium text-text-secondary hover:text-text-primary transition-colors">
            Extension
          </Link>
          <Link href="/applications" className="text-sm font-mono-data font-medium text-text-secondary hover:text-text-primary transition-colors">
            Job Application Tracker
          </Link>
          <Link href="/resumebuilder" className="text-sm font-mono-data font-medium text-text-secondary hover:text-text-primary transition-colors">
            Resume Builder
          </Link>
          <Link href="/blog" className="text-sm font-mono-data font-medium text-text-secondary hover:text-text-primary transition-colors">
            Blog
          </Link>
        </div>

        <div className="flex items-center gap-5">
          <ThemeToggle />
          <Link href="/login" className="text-sm font-mono-data font-medium text-text-secondary hover:text-text-primary transition-colors group">
            Sign In
          </Link>
          <Link href="/signup" className="h-9 px-4 inline-flex items-center justify-center text-sm font-mono-data font-medium bg-primary text-white rounded-full hover:bg-primary/90 transition-colors">
            Get Started
          </Link>
        </div>
      </div>
    </nav>
  );
}
