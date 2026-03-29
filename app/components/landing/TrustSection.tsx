'use client';
import { motion } from 'framer-motion';

export default function TrustSection() {
  const logos = [
    { name: "TCS", src: "/logos/tcs_logo.svg" },
    { name: "JPMC", src: "/logos/jpmc_logo.svg" },
    { name: "Oracle", src: "/logos/oracle_logo.svg" },
    { name: "Razorpay", src: "/logos/razorpay_logo.svg" },
    { name: "Swiggy", src: "/logos/swiggy_logo.svg" },
    { name: "Wipro", src: "/logos/wipro_logo.svg" }
  ];

  const containerVariants = {
    hidden: { opacity: 1 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.5,
        delayChildren: 0.5,
      }
    }
  } as const;

  const logoVariants = {
    hidden: { scale: 0, opacity: 0 },
    visible: {
      scale: 1,
      opacity: 1,
      transition: {
        type: "spring",
        stiffness: 80,
        damping: 15,
        mass: 1
      }
    }
  } as const;

  return (
    <section className="w-full py-20 bg-surface/30">
      <div className="max-w-7xl mx-auto px-6">
        <p className="text-center text-[10px] font-mono-data tracking-[0.45em] text-text-tertiary uppercase mb-10">
          Accelerating Success at Top-Tier Teams
        </p>
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          className="flex items-center justify-center gap-8 md:gap-16 overflow-x-auto no-scrollbar"
        >
          {logos.map((logo) => (
            <motion.div
              key={logo.name}
              variants={logoVariants}
              className="flex-shrink-0 group relative"
            >
              <img
                src={logo.src}
                alt={logo.name}
                className="h-5 md:h-6 w-auto object-contain brightness-0 opacity-30 group-hover:brightness-100 group-hover:opacity-100 transition-all duration-500"
              />
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
