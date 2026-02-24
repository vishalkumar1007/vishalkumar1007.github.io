import { useState, useEffect } from 'react';
import { Code2, Terminal } from 'lucide-react';

const Navigation = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('');

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);

      // Determine active section
      const sections = ['about', 'experience', 'projects', 'services', 'contact'];
      for (const section of sections) {
        const element = document.getElementById(section);
        if (element) {
          const rect = element.getBoundingClientRect();
          if (rect.top <= 100 && rect.bottom >= 100) {
            setActiveSection(section);
            break;
          }
        }
      }
      if (window.scrollY < 100) {
        setActiveSection('');
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: 'About', href: '#about' },
    { name: 'Experience', href: '#experience' },
    { name: 'Education', href: '#education' },
    { name: 'Projects', href: '#projects' },
    { name: 'Achievements', href: '#achievements' },
    { name: 'Contact', href: '#contact' },
  ];

  const scrollToSection = (href: string) => {
    const element = document.querySelector(href);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
    setIsMobileMenuOpen(false);
  };

  return (
    <>
      <nav
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
          isScrolled
            ? 'bg-black/80 backdrop-blur-xl border-b border-white/5 py-3'
            : 'bg-transparent py-5'
        }`}
      >
        <div className="w-full px-6 lg:px-12 max-w-7xl mx-auto flex items-center justify-between">
          {/* Logo */}
          <a
            href="#"
            className="flex items-center gap-3 group"
            onClick={(e) => {
              e.preventDefault();
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
          >
            {/* Logo Icon */}
            <div className="relative w-10 h-10 rounded-lg bg-gradient-to-br from-red-600 to-red-500 flex items-center justify-center group-hover:scale-110 transition-transform duration-300" style={{ boxShadow: '0 0 20px rgba(239, 68, 68, 0.3)' }}>
              <Code2 className="w-5 h-5 text-white" />
              {/* Pulse effect */}
              <div className="absolute inset-0 rounded-lg bg-red-500 animate-ping opacity-20" />
            </div>
            
            {/* Logo Text */}
            <div className="hidden sm:block">
              <div className="flex items-center gap-1">
                <Terminal className="w-3 h-3 text-red-500" />
                <span className="text-xs text-red-400 font-mono">dev://</span>
              </div>
              <span className="text-lg font-bold font-['Montserrat'] tracking-wider text-white group-hover:text-red-400 transition-colors">
                VISHAL<span className="text-red-500">.</span>DEV
              </span>
            </div>
          </a>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-1 bg-white/5 rounded-full p-1.5 border border-white/10">
            {navLinks.map((link) => {
              const isActive = activeSection === link.href.slice(1);
              return (
                <button
                  key={link.name}
                  onClick={() => scrollToSection(link.href)}
                  className={`relative px-4 py-2 text-sm font-medium rounded-full transition-all duration-300 ${
                    isActive 
                      ? 'text-white bg-red-500/20' 
                      : 'text-white/60 hover:text-white hover:bg-white/5'
                  }`}
                >
                  {link.name}
                  {isActive && (
                    <span className="absolute bottom-1 left-1/2 -translate-x-1/2 w-1 h-1 bg-red-500 rounded-full" />
                  )}
                </button>
              );
            })}
          </div>

          {/* CTA Button */}
          <div className="hidden md:flex items-center gap-4">
            {/* Status Indicator */}
            {/* <div className="flex items-center gap-2 px-3 py-1.5 bg-green-500/10 border border-green-500/30 rounded-full">
              <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
              <span className="text-xs font-medium text-green-400 ">Available</span>
            </div> */}
            <div className="flex items-center gap-2 px-3 opacity-70 py-1.5  rounded-full">
              <div className="flex items-center gap-2 px-4 py-2 bg-red-500/10 border border-red-500/30 rounded-full">
                <div className="w-2 h-2 bg-red-500 rounded-full animate-pulse" />
                <span className="text-xs font-medium text-red-400 tracking-wider uppercase">Available for Work</span>
              </div>
            </div>
            
            {/* Hire Me Button */}
            {/* <button
              onClick={() => scrollToSection('#contact')}
              className="group flex items-center gap-2 px-5 py-2.5 bg-red-600 text-white text-sm font-semibold rounded-full hover:bg-red-500 transition-all duration-300 hover:scale-105"
              style={{ boxShadow: '0 0 20px rgba(239, 68, 68, 0.3)' }}
            >
              <span>Hire Me</span>
              <svg className="w-4 h-4 group-hover:translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </svg>
            </button> */}

          </div>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden relative w-10 h-10 flex items-center justify-center rounded-lg bg-white/5 border border-white/10 hover:bg-red-500/20 hover:border-red-500/30 transition-all"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          >
            <div className="relative w-5 h-5">
              <span className={`absolute left-0 w-5 h-0.5 bg-white rounded-full transition-all duration-300 ${isMobileMenuOpen ? 'top-2 rotate-45' : 'top-1'}`} />
              <span className={`absolute left-0 top-2 w-5 h-0.5 bg-white rounded-full transition-all duration-300 ${isMobileMenuOpen ? 'opacity-0' : 'opacity-100'}`} />
              <span className={`absolute left-0 w-5 h-0.5 bg-white rounded-full transition-all duration-300 ${isMobileMenuOpen ? 'top-2 -rotate-45' : 'top-3'}`} />
            </div>
          </button>
        </div>
      </nav>

      {/* Mobile Menu */}
      <div
        className={`fixed inset-0 z-40 transition-all duration-500 md:hidden ${
          isMobileMenuOpen ? 'opacity-100 visible' : 'opacity-0 invisible pointer-events-none'
        }`}
      >
        {/* Backdrop */}
        <div 
          className="absolute inset-0 bg-black/95 backdrop-blur-xl"
          onClick={() => setIsMobileMenuOpen(false)}
        />
        
        {/* Menu Content */}
        <div className="relative h-full flex flex-col pt-24 px-8">
          {/* Status */}
          <div className="flex items-center gap-2 mb-8">
            <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
            <span className="text-sm text-green-400 font-mono">status: available_for_hire</span>
          </div>

          {/* Nav Links */}
          <div className="space-y-2">
            {navLinks.map((link, index) => {
              const isActive = activeSection === link.href.slice(1);
              return (
                <button
                  key={link.name}
                  onClick={() => scrollToSection(link.href)}
                  className={`block w-full text-left px-4 py-4 rounded-xl transition-all duration-300 ${
                    isActive 
                      ? 'bg-red-500/20 border border-red-500/30' 
                      : 'bg-white/5 border border-transparent hover:border-white/10'
                  }`}
                  style={{
                    animationDelay: `${index * 50}ms`,
                    animation: isMobileMenuOpen ? 'slideIn 0.4s ease forwards' : 'none',
                    opacity: isMobileMenuOpen ? 1 : 0,
                    transform: isMobileMenuOpen ? 'translateX(0)' : 'translateX(-20px)',
                  }}
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <span className="text-red-500 font-mono text-sm">0{index + 1}</span>
                      <span className={`text-xl font-bold font-['Montserrat'] ${isActive ? 'text-red-400' : 'text-white'}`}>
                        {link.name}
                      </span>
                    </div>
                    <svg className="w-5 h-5 text-white/30" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                  </div>
                </button>
              );
            })}
          </div>

          {/* Mobile CTA */}
          <div className="mt-auto pb-8 space-y-4">
            <button
              onClick={() => scrollToSection('#contact')}
              className="w-full py-4 bg-red-600 text-white font-semibold rounded-xl hover:bg-red-500 transition-colors"
              style={{ boxShadow: '0 0 30px rgba(239, 68, 68, 0.3)' }}
            >
              Let's Work Together
            </button>
            
            {/* Social hint */}
            <p className="text-center text-sm text-white/30 font-mono">
              // scroll down to explore
            </p>
          </div>
        </div>
      </div>

      {/* Styles for mobile menu animation */}
      <style>{`
        @keyframes slideIn {
          from {
            opacity: 0;
            transform: translateX(-20px);
          }
          to {
            opacity: 1;
            transform: translateX(0);
          }
        }
      `}</style>
    </>
  );
};

export default Navigation;
