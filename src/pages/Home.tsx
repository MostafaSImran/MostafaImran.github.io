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
import PhdPitch from '../sections/PhdPitch';
import Services from '../sections/Services';
import ZigZagGrid from '../sections/ZigZagGrid';
import ScaniaFeature from '../sections/ScaniaFeature';
import ProductFeature from '../sections/ProductFeature';
import SoundPod from '../sections/SoundPod';
import Credentials from '../sections/Credentials';
import Research from '../sections/Research';
import Publications from '../sections/Publications';
import Footer from '../sections/Footer';

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

      {/* Prospective Ph.D. Candidate Pitch */}
      <PhdPitch />

      {/* Services Section */}
      <div id="services">
        <Services />
      </div>

      {/* Zig-Zag Grid Section */}
      <ZigZagGrid />

      {/* Scania Feature Section */}
      <div id="products">
        <ScaniaFeature />
      </div>

      {/* EcoNest Product Feature Section */}
      <ProductFeature />

      {/* Sound Pod Section */}
      <SoundPod />

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
    </div>
  );
}
