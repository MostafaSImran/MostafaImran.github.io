import { useEffect, useState } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import useLenis from '../hooks/useLenis';
import { siteConfig } from '../config';
import { useContent } from '../i18n/LanguageContext';
import { inquiryUi } from '../i18n/inquiry';

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
import ProofStrip from '../sections/ProofStrip';
import Projects from '../sections/Projects';
import PlanYourProject from '../sections/PlanYourProject';
import Credentials from '../sections/Credentials';
import Research from '../sections/Research';
import Publications from '../sections/Publications';
import Footer from '../sections/Footer';
import FloatingActions from '../sections/FloatingActions';
import InquiryModal from '../components/InquiryModal';

gsap.registerPlugin(ScrollTrigger);

/** Toast shown when the visitor returns from the form backend after sending an inquiry. */
const InquirySentToast = () => {
  const { lang } = useContent();
  const [show, setShow] = useState(false);

  useEffect(() => {
    if (new URLSearchParams(window.location.search).get('inquiry') === 'sent') {
      setShow(true);
      // Clean the URL so a refresh does not show the toast again
      window.history.replaceState({}, '', window.location.pathname);
    }
  }, []);

  useEffect(() => {
    if (!show) return;
    const t = setTimeout(() => setShow(false), 9000);
    return () => clearTimeout(t);
  }, [show]);

  if (!show) return null;

  return (
    <div className="fixed bottom-6 left-1/2 -translate-x-1/2 z-[70] max-w-md w-[calc(100%-2rem)] bg-kaleo-charcoal text-kaleo-cream font-body text-sm rounded-2xl px-6 py-4 shadow-2xl">
      ✓ {inquiryUi.sentToast[lang]}
    </div>
  );
};

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

      {/* Proof Strip — animated trust counters */}
      <ProofStrip />

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

      {/* Selected Projects */}
      <div id="projects">
        <Projects />
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

      {/* Thank-you toast after returning from the form backend */}
      <InquirySentToast />
    </div>
  );
}
