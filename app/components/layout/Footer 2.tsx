import Link from 'next/link';

export default function Footer() {
  return (
    <footer className="w-full border-t border-border bg-background mt-auto py-12">
      <div className="max-w-7xl w-full mx-auto px-6 grid grid-cols-1 md:grid-cols-4 gap-8">
        <div className="md:col-span-2 space-y-4">
          <div className="flex items-center gap-2">
            <img
              src="/rolejet.svg"
              alt="RoleJet"
              className="w-6 h-6 rounded"
            />
            <span className="font-mono-display font-semibold tracking-tight">RoleJet</span>
          </div>
          <p className="text-text-secondary text-sm max-w-xs leading-relaxed">
            The Career Intelligence Engine for World-Class Talent. Professional precision for every high-stakes move.
          </p>
        </div>

        <div className="space-y-4">
          <h4 className="font-mono-data text-sm font-semibold tracking-wider text-text-primary">PRODUCT</h4>
          <ul className="space-y-2 text-sm text-text-secondary">
            <li><Link href="#" className="hover:text-text-primary transition-colors">Resume Analyser</Link></li>
            <li><Link href="#" className="hover:text-text-primary transition-colors">Job Tracker</Link></li>
            <li><Link href="#" className="hover:text-text-primary transition-colors">Pricing</Link></li>
          </ul>
        </div>

        <div className="space-y-4">
          <h4 className="font-mono-data text-sm font-semibold tracking-wider text-text-primary">COMPANY</h4>
          <ul className="space-y-2 text-sm text-text-secondary">
            <li><Link href="#" className="hover:text-text-primary transition-colors">About Us</Link></li>
            <li><Link href="#" className="hover:text-text-primary transition-colors">Privacy Policy</Link></li>
            <li><Link href="#" className="hover:text-text-primary transition-colors">Terms of Service</Link></li>
          </ul>
        </div>
      </div>
    </footer>
  );
}
