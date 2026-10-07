import { useEffect } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import useLenis from '../hooks/useLenis';
import { siteConfig } from '../config';

// Sections
import Navbar from '../sections/Navbar';
import Hero from '../sections/Hero';
import NarrativeText from '../sections/NarrativeText';
import CardStack from '../sections/CardStack';
import BreathSection from '../sections/BreathSection';
import Services from '../sections/Services';
import ZigZagGrid from '../sections/ZigZagGrid';
import ScaniaFeature from '../sections/ScaniaFeature';
import ProductFeature from '../sections/ProductFeature';
import SoundPod from '../sections/SoundPod';
import PlanYourProject from '../sections/PlanYourProject';
import Credentials from '../sections/Credentials';
import Research from '../sections/Research';
import Publications from '../sections/Publications';
import Footer from '../sections/Footer';
import FloatingActions from '../sections/FloatingActions';
import InquiryModal from '../components/InquiryModal';

gsap.registerPlugin(ScrollTrigger);

export default function Home() {
  // Initialize Lenis smooth scrolling
  useLenis();

  useEffect(() => {
    // Set document language if configured
    if (siteConfig.language) {
      document.documentElement.lang = siteConfig.language;
    }

    // Refresh ScrollTrigger after all content is loaded
    const handleLoad = () => {
      ScrollTrigger.refresh();
    };

    window.addEventListener('load', handleLoad);

    // Also refresh after a short delay to ensure images are loaded
    const refreshTimeout = setTimeout(() => {
      ScrollTrigger.refresh();
    }, 500);

    return () => {
      window.removeEventListener('load', handleLoad);
      clearTimeout(refreshTimeout);
    };
  }, []);

  return (
    <div className="relative bg-kaleo-sand" id="top">
      {/* Sticky Navigation */}
      <Navbar />

      {/* Hero Section */}
      <Hero />

      {/* Narrative Text Section */}
      <div id="about">
        <NarrativeText />
      </div>

      {/* Card Stack Parallax Gallery */}
      <CardStack />

      {/* BREATH Video Mask Section */}
      <BreathSection />

      {/* Services Section */}
      <div id="services">
        <Services />
      </div>

      {/* Zig-Zag Grid Section */}
      <ZigZagGrid />

      {/* Scania Feature Section */}
      <ScaniaFeature />

      {/* EcoNest Product Feature Section */}
      <div id="products">
        <ProductFeature />
      </div>

      {/* Sound Pod Section */}
      <SoundPod />

      {/* Plan Your Project — client guides & structured inquiry */}
      <PlanYourProject />

      {/* Credentials Section */}
      <Credentials />

      {/* Research & Education Section */}
      <div id="research">
        <Research />
      </div>

      {/* Publications & Reports Section */}
      <div id="publications">
        <Publications />
      </div>

      {/* Footer */}
      <div id="contact">
        <Footer />
      </div>

      {/* Floating contact bar (Call / WhatsApp / Email) */}
      <FloatingActions />

      {/* Structured inquiry modal (opens from services & products) */}
      <InquiryModal />
    </div>
  );
}
