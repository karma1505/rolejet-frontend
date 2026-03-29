import Navbar from './components/layout/Navbar';
import Footer from './components/layout/Footer';
import Hero from './components/landing/Hero';
import TrustSection from './components/landing/TrustSection';
import FeatureTabs from './components/landing/FeatureTabs';
import FAQ from './components/landing/FAQ';

export default function Home() {
  return (
    <div className="min-h-screen flex flex-col w-full overflow-x-hidden">
      <Navbar />
      <main className="flex-1 flex flex-col items-center w-full pt-16">
        <Hero />
        <TrustSection />
        <FeatureTabs />
        <FAQ />
      </main>
      <Footer />
    </div>
  );
}
