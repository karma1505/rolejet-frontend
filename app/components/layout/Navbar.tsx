import Link from 'next/link';

export default function Navbar() {
  return (
    <nav className="w-full border-b border-border bg-background/60 backdrop-blur-md fixed top-0 z-[100]">
      <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between w-full">
        <Link href="/" className="flex items-center gap-2 group">
          <img
            src="/rolejet.svg"
            alt="RoleJet"
            className="w-8 h-8 rounded-md group-hover:opacity-90 transition-opacity"
          />
          <span className="font-mono-display font-semibold tracking-tight text-lg text-text-primary">RoleJet</span>
        </Link>

        <div className="hidden md:flex items-center gap-8 absolute left-1/2 -translate-x-1/2">
          <Link href="/resumebuilder" className="text-sm font-mono-data font-medium text-text-secondary hover:text-text-primary transition-colors">
            Resume Builder
          </Link>
          <Link href="/applications" className="text-sm font-mono-data font-medium text-text-secondary hover:text-text-primary transition-colors">
            Job Application Tracker
          </Link>
          <Link href="/extension" className="text-sm font-mono-data font-medium text-text-secondary hover:text-text-primary transition-colors">
            Extension
          </Link>
          <Link href="/blog" className="text-sm font-mono-data font-medium text-text-secondary hover:text-text-primary transition-colors">
            Blog
          </Link>
        </div>

        <div className="flex items-center gap-5">
          <Link href="/login" className="text-sm font-mono-data font-medium text-text-secondary hover:text-text-primary transition-colors group">
            Sign In
          </Link>
          <Link href="/signup" className="h-9 px-4 inline-flex items-center justify-center text-sm font-mono-data font-medium bg-primary text-black rounded-full hover:bg-primary/90 transition-colors">
            Get Started
          </Link>
        </div>
      </div>
    </nav>
  );
}
