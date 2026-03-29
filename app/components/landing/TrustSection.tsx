export default function TrustSection() {
  const logos = [
    { name: "TCS" },
    { name: "TechMahindra" },
    { name: "Oracle" },
    { name: "Razorpay" },
    { name: "Swiggy" },
    { name: "JPMC" },
    { name: "Wipro" }
  ];

  return (
    <section className="w-full py-12 border-y border-border bg-surface/20">
      <div className="max-w-7xl mx-auto px-6">
        <p className="text-center text-xs font-mono-data tracking-widest text-text-secondary uppercase mb-8">
          Join users currently at top-tier companies
        </p>
        <div className="flex flex-wrap justify-center items-center gap-8 md:gap-16 opacity-30 grayscale hover:grayscale-0 hover:opacity-100 transition-all duration-700">
          {logos.map((logo) => (
            <div key={logo.name} className="flex items-center gap-2 group cursor-default">
              <span className="font-bold text-lg tracking-tight font-mono-display">{logo.name}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
