'use client';
import Navbar from '../components/layout/Navbar';
import Footer from '../components/layout/Footer';
import BlogCard from '../components/blog/BlogCard';
import { motion } from 'framer-motion';
import { Search, Sparkles } from 'lucide-react';

export default function BlogPage() {
  const posts = [
    {
      title: "The Forensic AI Revolution in Technical Hiring",
      excerpt: "Why standard keyword matching is dead and how deep-pattern analysis is the new gold standard for catching an engineer's true intent.",
      category: "Engineering",
      date: "Mar 24, 2026",
      readTime: "6 min read",
      image: "/ai_career_blog_1_1774601860945.png",
      href: "/blog/forensic-ai-hiring"
    },
    {
      title: "Resumes as Code: Optimizing for the LMM Age",
      excerpt: "A technical guide on framing your experience for Large Multimodal Models without losing the human touch of the hiring manager.",
      category: "Strategy",
      date: "Mar 21, 2026",
      readTime: "8 min read",
      image: "/resume_optimization_blog_2_1774601879010.png",
      href: "/blog/resumes-as-code"
    },
    {
      title: "The Golden Bridge: Navigating the Final Interview",
      excerpt: "Closing the gap between engineering competence and architectural leadership during the lead-level conversational stage.",
      category: "Leadership",
      date: "Mar 18, 2026",
      readTime: "5 min read",
      image: "/interview_prep_blog_3_1774601899591.png",
      href: "/blog/golden-bridge-interview"
    }
  ];

  return (
    <div className="min-h-screen flex flex-col w-full bg-background overflow-x-hidden">
      <Navbar />

      <main className="flex-1 w-full max-w-7xl mx-auto px-6 py-16 lg:py-24">
        {/* Decorative Background Element */}
        <div className="absolute top-0 right-0 w-full max-w-4xl aspect-square bg-primary/10 blur-[120px] rounded-full -z-10 pointer-events-none"></div>

        <section className="text-center mb-20 space-y-6">

          <motion.h1
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="text-4xl md:text-6xl font-mono-display font-bold text-text-primary tracking-tighter"
          >
            Insights into the <span className="text-text-primary">Intelligent Career.</span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="max-w-2xl mx-auto text-text-secondary font-sans leading-relaxed"
          >
            Technical strategy, AI application patterns, and the future of work within high-density engineering environments.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="max-w-md mx-auto relative mt-12"
          >
            <div className="absolute inset-y-0 left-4 flex items-center pointer-events-none">
              <Search className="w-4 h-4 text-text-tertiary" />
            </div>
            <input
              type="text"
              placeholder="Search perspectives..."
              className="w-full h-14 bg-surface/50 border border-border rounded-xl pl-12 pr-6 text-sm font-sans focus:outline-none focus:border-primary/50 transition-all placeholder:text-text-tertiary/50 backdrop-blur-md"
            />
          </motion.div>
        </section>

        {/* Featured Card or Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {posts.map((post, index) => (
            <BlogCard key={index} {...post} />
          ))}
        </div>

        {/* Future Subscription Box Placeholder */}
        <motion.section
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="mt-32 p-12 rounded-3xl bg-surface/30 border border-border/50 backdrop-blur-sm text-center relative overflow-hidden group"
        >
          <div className="relative z-10">
            <h2 className="text-2xl font-mono-display font-bold text-text-primary mb-4 tracking-tight">Stay Strategically Informed.</h2>
            <p className="text-text-secondary text-sm mb-8 max-w-sm mx-auto">Zero-noise technical career updates delivered directly to your inbox.</p>
            <div className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto">
              <input
                type="email"
                placeholder="eng-dir@company.com"
                className="flex-1 h-12 bg-background border border-border rounded-xl px-4 text-xs font-mono-data focus:outline-none focus:border-primary transition-all"
              />
              <button className="h-12 px-8 bg-primary text-black hover:bg-primary/90 transition-all">
                Subscribe
              </button>
            </div>
          </div>
          <div className="absolute top-0 right-0 w-64 h-64 bg-primary/5 blur-3xl rounded-full -z-10 group-hover:bg-primary/10 transition-colors duration-1000"></div>
        </motion.section>
      </main>

      <Footer />
    </div>
  );
}
