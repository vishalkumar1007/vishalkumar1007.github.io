import { useEffect, useRef } from 'react';
import { Routes, Route, useLocation } from 'react-router-dom';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Navigation from './sections/Navigation';
import Hero from './sections/Hero';
import About from './sections/About';
import Experience from './sections/Experience';
import Education from './sections/Education';
import Projects from './sections/Projects';
import Services from './sections/Services';
import Achievements from './sections/Achievements';
import Contact from './sections/Contact';
import Footer from './sections/Footer';
import FullStackProjects from './pages/FullStackProjects';
import './App.css';

gsap.registerPlugin(ScrollTrigger);

function HomePage() {
  const mainRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Initialize scroll-triggered animations
    const ctx = gsap.context(() => {
      // Reveal animations for sections
      gsap.utils.toArray<HTMLElement>('.reveal-section').forEach((section) => {
        gsap.fromTo(
          section,
          { opacity: 0.9, y: 30 },
          {
            opacity: 1,
            y: 0,
            duration: 0.8,
            ease: 'power3.out',
            scrollTrigger: {
              trigger: section,
              start: 'top 85%',
              toggleActions: 'play none none none',
            },
          }
        );
      });

      // Parallax effect for floating elements
      gsap.utils.toArray<HTMLElement>('.parallax-element').forEach((el) => {
        const speed = el.dataset.speed || '0.5';
        gsap.to(el, {
          y: `${parseFloat(speed) * -100}`,
          ease: 'none',
          scrollTrigger: {
            trigger: el,
            start: 'top bottom',
            end: 'bottom top',
            scrub: true,
          },
        });
      });
    }, mainRef);

    return () => ctx.revert();
  }, []);

  return (
    <div ref={mainRef} className="relative min-h-screen bg-black text-white overflow-x-hidden">
      <Navigation />
      <main>
        <Hero />
        <About />
        <Experience />
        <Education />
        <Projects />
        <Services />
        <Achievements />
        <Contact />
      </main>
      <Footer />
    </div>
  );
}

function App() {
  const location = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [location.pathname]);

  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/projects" element={<FullStackProjects />} />
    </Routes>
  );
}

export default App;
