import Link from 'next/link';

export default function Footer() {
  const socials = [
    { name: 'INSTAGRAM', href: 'https://instagram.com' },
    { name: 'X', href: 'https://x.com' },
    { name: 'YOUTUBE', href: 'https://youtube.com' },
  ];

  return (
    <footer className="w-full border-t border-[#A6B1E1]/40 bg-gradient-to-b from-[#424874] via-[#383C66] to-[#2B2E4E] mt-auto py-14 text-[#F4EEFF] transition-all">
      <div className="max-w-7xl w-full mx-auto px-6 grid grid-cols-1 md:grid-cols-4 gap-8">
        <div className="md:col-span-2 space-y-4">
          <div className="flex items-center gap-2">
            <img
              src="/rolejet.svg"
              alt="RoleJet"
              className="w-6 h-6 rounded"
            />
            <span className="font-sans font-semibold tracking-tight text-[#F4EEFF] text-lg">RoleJet</span>
          </div>
          <p className="text-[#DCD6F7] text-sm max-w-xs leading-relaxed">
            The Career Intelligence Engine for World-Class Talent. Professional precision for every high-stakes move.
          </p>

          {/* Social Media Pills in Vertical Format */}
          <div className="pt-2 flex flex-col items-start gap-2.5">
            {socials.map((social) => (
              <a
                key={social.name}
                href={social.href}
                target="_blank"
                rel="noopener noreferrer"
                className="px-4 py-1.5 rounded-full border border-[#A6B1E1] bg-[#424874] text-[11px] font-sans font-bold uppercase tracking-widest text-[#F4EEFF] hover:bg-[#DCD6F7] hover:text-[#424874] hover:border-[#424874] transition-all duration-200 shadow-sm"
              >
                {social.name}
              </a>
            ))}
          </div>
        </div>

        <div className="space-y-4">
          <h4 className="font-sans text-xs font-semibold tracking-widest text-[#A6B1E1] uppercase">PRODUCT</h4>
          <ul className="space-y-2.5 text-sm text-[#DCD6F7]">
            <li><Link href="#" className="hover:text-[#F4EEFF] transition-colors">Resume Analyser</Link></li>
            <li><Link href="#" className="hover:text-[#F4EEFF] transition-colors">Job Tracker</Link></li>
            <li><Link href="#" className="hover:text-[#F4EEFF] transition-colors">Pricing</Link></li>
          </ul>
        </div>

        <div className="space-y-4">
          <h4 className="font-sans text-xs font-semibold tracking-widest text-[#A6B1E1] uppercase">COMPANY</h4>
          <ul className="space-y-2.5 text-sm text-[#DCD6F7]">
            <li><a href="https://kessalor.vercel.app/about-kessalor" target="_blank" rel="noopener noreferrer" className="hover:text-[#F4EEFF] transition-colors">About Us</a></li>
            <li><Link href="#" className="hover:text-[#F4EEFF] transition-colors">Privacy Policy</Link></li>
            <li><Link href="#" className="hover:text-[#F4EEFF] transition-colors">Terms of Service</Link></li>
          </ul>
        </div>
      </div>
    </footer>
  );
}
