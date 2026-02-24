import { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ArrowUp, Send } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

const Footer = () => {
  const footerRef = useRef<HTMLElement>(null);
  const [email, setEmail] = useState('');
  const [isSubscribed, setIsSubscribed] = useState(false);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Logo fade in
      gsap.fromTo(
        '.footer-logo',
        { opacity: 0 },
        {
          opacity: 1,
          duration: 0.5,
          scrollTrigger: {
            trigger: footerRef.current,
            start: 'top 90%',
            toggleActions: 'play none none none',
          },
        }
      );

      // Columns staggered rise
      gsap.fromTo(
        '.footer-column',
        { y: 30, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.6,
          stagger: 0.1,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: footerRef.current,
            start: 'top 80%',
            toggleActions: 'play none none none',
          },
        }
      );

      // Divider line draw
      gsap.fromTo(
        '.footer-divider',
        { scaleX: 0 },
        {
          scaleX: 1,
          duration: 0.8,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: footerRef.current,
            start: 'top 70%',
            toggleActions: 'play none none none',
          },
        }
      );

      // Bottom bar fade
      gsap.fromTo(
        '.footer-bottom',
        { opacity: 0 },
        {
          opacity: 1,
          duration: 0.4,
          scrollTrigger: {
            trigger: footerRef.current,
            start: 'top 60%',
            toggleActions: 'play none none none',
          },
        }
      );
    }, footerRef);

    return () => ctx.revert();
  }, []);

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (email) {
      setIsSubscribed(true);
      setEmail('');
    }
  };

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const quickLinks = [
    { name: 'About', href: '#about' },
    { name: 'Experience', href: '#experience' },
    { name: 'Projects', href: '#projects' },
    { name: 'Achievements', href: '#achievements' },
    { name: 'Contact', href: '#contact' },
  ];

  return (
    <footer
      ref={footerRef}
      className="relative bg-black border-t border-white/10"
    >
      <div className="w-full px-6 lg:px-12 max-w-7xl mx-auto py-16">
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-12 lg:gap-16">
          {/* Column 1 - Logo & Tagline */}
          <div className="footer-column">
            <a
              href="#"
              className="footer-logo inline-block text-2xl font-bold tracking-wider font-['Montserrat'] mb-4 hover:text-red-500 transition-colors"
              onClick={(e) => {
                e.preventDefault();
                scrollToTop();
              }}
            >
              VISHAL<span className="text-red-500">.</span>DEV
            </a>
            <p className="text-white/60 text-sm leading-relaxed max-w-xs">
              Building scalable MERN applications and secure enterprise solutions. Let's create something amazing together.
            </p>
          </div>

          {/* Column 2 - Quick Links */}
          <div className="footer-column">
            <h3 className="text-sm font-bold uppercase tracking-wider mb-6">
              Quick Links
            </h3>
            <ul className="space-y-3">
              {quickLinks.map((link) => (
                <li key={link.name}>
                  <a
                    href={link.href}
                    className="text-white/60 hover:text-red-500 hover:translate-x-1 inline-block transition-all duration-300"
                    onClick={(e) => {
                      e.preventDefault();
                      const element = document.querySelector(link.href);
                      if (element) {
                        element.scrollIntoView({ behavior: 'smooth' });
                      }
                    }}
                  >
                    {link.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 3 - Newsletter */}
          <div className="footer-column">
            <h3 className="text-sm font-bold uppercase tracking-wider mb-6">
              Stay Updated
            </h3>
            <p className="text-white/60 text-sm mb-4">
              Subscribe to get the latest news and updates.
            </p>
            
            {!isSubscribed ? (
              <form onSubmit={handleSubscribe} className="flex gap-2">
                <div className="flex-1 relative">
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Enter your email"
                    required
                    className="w-full px-4 py-3 bg-white/5 border border-white/20 rounded-lg text-white text-sm placeholder:text-white/40 focus:outline-none focus:border-red-500 transition-colors"
                  />
                </div>
                <button
                  type="submit"
                  className="px-4 py-3 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors"
                >
                  <Send className="w-5 h-5" />
                </button>
              </form>
            ) : (
              <div className="px-4 py-3 bg-red-600/20 border border-red-500/50 rounded-lg text-red-500 text-sm">
                Thanks for subscribing!
              </div>
            )}
          </div>
        </div>

        {/* Divider */}
        <div className="footer-divider h-px bg-gradient-to-r from-transparent via-white/20 to-transparent my-12 origin-left" />

        {/* Bottom Bar */}
        <div className="footer-bottom flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-white/40 text-sm">
            © {new Date().getFullYear()} Vishal Kumar. All rights reserved.
          </p>

          {/* Back to Top */}
          <button
            onClick={scrollToTop}
            className="group flex items-center gap-2 text-white/60 hover:text-red-500 transition-colors"
          >
            <span className="text-sm">Back to Top</span>
            <div className="w-10 h-10 flex items-center justify-center rounded-full border border-white/20 group-hover:border-red-500 group-hover:bg-red-600 group-hover:text-white transition-all duration-300 group-hover:-translate-y-1">
              <ArrowUp className="w-5 h-5" />
            </div>
          </button>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
