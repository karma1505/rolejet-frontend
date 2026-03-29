'use client';
import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronDown, Plus, Minus } from 'lucide-react';
import Link from 'next/link';

const faqs = [
  {
    question: "How does RoleJet's AI differ from standard keyword matchers?",
    answer: "Unlike legacy systems, RoleJet uses deep-pattern analysis to understand engineering intent and technical ownership. We call this a 'High-Signal' approach—it catches the subtle signals of architectural competence that standard ATS filters miss.",
    blogLink: "/blog/forensic-ai-hiring",
    blogTitle: "High-Signal Analysis in Technical Hiring"
  },
  {
    question: "Can RoleJet help me optimize my resume for AI-driven hiring systems?",
    answer: "Absolutely. We treat resumes as high-fidelity datasets, optimizing them for both Large Multimodal Models (LMMs) and human hiring managers to ensure your technical competence is never gated by faulty filters.",
    blogLink: "/blog/resumes-as-code",
    blogTitle: "Precision Engineering: Optimizing for the LMM Age"
  },
  {
    question: "Does RoleJet provide support for the later stages of the interview process?",
    answer: "Yes, we help you bridge the gap between technical competence and architectural leadership during conversational interviews, preparing you for high-stakes technical leadership discussions.",
    blogLink: "/blog/golden-bridge-interview",
    blogTitle: "The Golden Bridge: Navigating the Final Interview"
  },
  {
    question: "Is RoleJet designed only for technical roles?",
    answer: "To win a technical war, you need a technical edge. While RoleJet works for any high-stakes career, our core engine is optimized for the complex nuances of Computer Science, Engineering, and Tech Leadership roles.",
    blogLink: "/blog",
    blogTitle: "Explore our insights"
  }
];

export default function FAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  return (
    <section className="w-full py-24 px-6 max-w-4xl mx-auto" id="faq">
      <div className="text-center mb-16 space-y-4">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-3xl md:text-5xl font-mono-display font-bold tracking-tight"
        >
          Frequently Asked Questions
        </motion.h2>
        <p className="text-text-secondary font-sans text-lg">
          Clarifying the mechanics of your next career move.
        </p>
      </div>

      <div className="space-y-4">
        {faqs.map((faq, idx) => (
          <motion.div
            key={idx}
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: idx * 0.1 }}
            className={`group border border-border rounded-2xl overflow-hidden transition-all duration-300 ${openIndex === idx ? 'bg-surface/50 shadow-lg' : 'bg-transparent hover:bg-surface/30'
              }`}
          >
            <button
              onClick={() => setOpenIndex(openIndex === idx ? null : idx)}
              className="w-full px-6 py-5 flex items-center justify-between text-left"
            >
              <span className="font-sans font-semibold text-text-primary text-lg pr-8">
                {faq.question}
              </span>
              <div className={`p-1 rounded-full border border-border group-hover:border-primary/50 transition-colors ${openIndex === idx ? 'bg-primary border-primary' : ''
                }`}>
                {openIndex === idx ? (
                  <Minus className="w-4 h-4 text-black" />
                ) : (
                  <Plus className="w-4 h-4 text-text-secondary group-hover:text-text-primary" />
                )}
              </div>
            </button>

            <AnimatePresence>
              {openIndex === idx && (
                <motion.div
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: "auto", opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: 0.3, ease: "easeInOut" }}
                >
                  <div className="px-6 pb-6 pt-2 space-y-4">
                    <p className="text-text-secondary leading-relaxed font-sans">
                      {faq.answer}
                    </p>
                    <div className="pt-2">
                      <Link
                        href={faq.blogLink}
                        className="inline-flex items-center gap-2 text-sm font-sans font-medium text-info hover:underline group/link"
                      >
                        Read more: {faq.blogTitle}
                        <motion.span
                          animate={{ x: [0, 4, 0] }}
                          transition={{ duration: 1.5, repeat: Infinity }}
                        >
                          →
                        </motion.span>
                      </Link>
                    </div>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
