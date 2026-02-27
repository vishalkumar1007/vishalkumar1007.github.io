import { useEffect, useRef, useMemo, useState } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ChevronDown, Shield, Lock, ArrowRight, Terminal, Code2 } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

// Typing effect hook
const useTypingEffect = (text: string, speed: number = 50, delay: number = 0) => {
  const [displayedText, setDisplayedText] = useState('');
  const [isComplete, setIsComplete] = useState(false);

  useEffect(() => {
    let timeout: ReturnType<typeof setTimeout>;
    let currentIndex = 0;
    
    const startTyping = () => {
      if (currentIndex < text.length) {
        setDisplayedText(text.slice(0, currentIndex + 1));
        currentIndex++;
        timeout = setTimeout(startTyping, speed);
      } else {
        setIsComplete(true);
      }
    };

    const delayTimeout = setTimeout(startTyping, delay);
    
    return () => {
      clearTimeout(timeout);
      clearTimeout(delayTimeout);
    };
  }, [text, speed, delay]);

  return { displayedText, isComplete };
};

const Hero = () => {
  const heroRef = useRef<HTMLElement>(null);
  const nameRef = useRef<HTMLHeadingElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const subtitleRef = useRef<HTMLParagraphElement>(null);
  const ctaRef = useRef<HTMLButtonElement>(null);
  const terminalRef = useRef<HTMLDivElement>(null);

  // Terminal typing effects
  const { displayedText: line1, isComplete: line1Complete } = useTypingEffect(
    '$ whoami',
    80,
    800
  );
  const { displayedText: line2, isComplete: line2Complete } = useTypingEffect(
    'vishal_kumar // Full Stack Developer',
    40,
    line1Complete ? 0 : 99999
  );
  const { displayedText: line3, isComplete: line3Complete } = useTypingEffect(
    '$ cat /etc/skills.conf',
    80,
    line2Complete ? 500 : 99999
  );
  const { displayedText: line4 } = useTypingEffect(
    '[REACT.JS] [NODE.JS] [MONGODB] [EXPRESS.JS] [CI/CD]',
    30,
    line3Complete ? 0 : 99999
  );

  useEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ defaults: { ease: 'power3.out' } });

      tl.fromTo(
        '.hero-eyebrow',
        { clipPath: 'inset(0 100% 0 0)', opacity: 0 },
        { clipPath: 'inset(0 0% 0 0)', opacity: 1, duration: 0.6 },
        0.3
      )
        .fromTo(
          nameRef.current,
          { y: 50, opacity: 0, scale: 1.1 },
          { y: 0, opacity: 1, scale: 1, duration: 0.8 },
          0.5
        )
        .fromTo(
          titleRef.current?.querySelectorAll('.char') || [],
          { y: 40, rotateX: 90, opacity: 0 },
          { y: 0, rotateX: 0, opacity: 1, duration: 0.6, stagger: 0.03 },
          0.7
        )
        .fromTo(
          subtitleRef.current,
          { filter: 'blur(10px)', opacity: 0 },
          { filter: 'blur(0px)', opacity: 1, duration: 0.7 },
          1.2
        )
        .fromTo(
          ctaRef.current,
          { y: 60, scale: 0.5, opacity: 0 },
          { y: 0, scale: 1, opacity: 1, duration: 0.8, ease: 'elastic.out(1, 0.5)' },
          1.4
        )
        .fromTo(
          '.skill-badge',
          { scale: 0, opacity: 0 },
          { scale: 1, opacity: 1, duration: 0.4, stagger: 0.1, ease: 'back.out(1.7)' },
          1.0
        )
        .fromTo(
          terminalRef.current,
          { opacity: 0, y: 30, scale: 0.95 },
          { opacity: 1, y: 0, scale: 1, duration: 0.8 },
          0.6
        )
        .fromTo(
          '.stat-box',
          { y: 20, opacity: 0 },
          { y: 0, opacity: 1, duration: 0.5, stagger: 0.1 },
          1.3
        );

      // Scroll parallax
      gsap.to(nameRef.current, {
        y: -30,
        ease: 'none',
        scrollTrigger: {
          trigger: heroRef.current,
          start: 'top top',
          end: '50% top',
          scrub: true,
        },
      });

      gsap.to(titleRef.current, {
        y: -20,
        ease: 'none',
        scrollTrigger: {
          trigger: heroRef.current,
          start: 'top top',
          end: '50% top',
          scrub: true,
        },
      });

      // Floating elements
      gsap.to('.floating-shape', {
        y: -15,
        rotation: 5,
        ease: 'none',
        scrollTrigger: {
          trigger: heroRef.current,
          start: 'top top',
          end: '30% top',
          scrub: true,
        },
      });
    }, heroRef);

    return () => ctx.revert();
  }, []);

  const scrollToProjects = () => {
    const element = document.querySelector('#projects');
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  // Split title into characters
  const titleText = 'Full Stack Developer';
  const titleChars = useMemo(() => titleText.split('').map((char, i) => (
    <span key={i} className="char inline-block" style={{ display: char === ' ' ? 'inline' : 'inline-block' }}>
      {char === ' ' ? '\u00A0' : char}
    </span>
  )), []);

  const stats = [
    { value: '150+', label: 'DSA Problems Solved' },
    { value: '1+', label: 'Years Experience' },
    { value: '8.2', label: 'CGPA' },
  ];

  return (
    <section
      ref={heroRef}
      className="relative min-h-screen flex items-center overflow-hidden bg-[#0a0a0a]"
    >
      {/* Background Elements */}
      <div className="absolute inset-0 bg-gradient-to-br from-[#0a0a0a] via-[#0a0a0a] to-red-950/20" />
      
      {/* Scan Lines Effect */}
      <div 
        className="absolute inset-0 pointer-events-none opacity-[0.03]"
        style={{
          background: 'repeating-linear-gradient(0deg, transparent, transparent 2px, rgba(255, 255, 255, 0.03) 2px, rgba(255, 255, 255, 0.03) 4px)',
        }}
      />

      {/* Grid Pattern */}
      <div 
        className="absolute inset-0 opacity-[0.02]"
        style={{
          backgroundImage: `
            linear-gradient(rgba(239, 68, 68, 0.2) 1px, transparent 1px),
            linear-gradient(90deg, rgba(239, 68, 68, 0.2) 1px, transparent 1px)
          `,
          backgroundSize: '60px 60px',
        }}
      />

      {/* Floating Geometric Shapes */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div className="floating-shape absolute top-[15%] left-[8%] w-20 h-20 border border-red-500/20 rounded-full" />
        <div className="floating-shape absolute top-[25%] right-[10%] w-16 h-16 border border-white/5 rotate-45" />
        <div className="floating-shape absolute bottom-[25%] left-[5%] w-12 h-12 bg-red-500/5 rounded-lg rotate-12" />
        <div className="floating-shape absolute top-[60%] right-[8%] w-8 h-8 bg-red-500/10 rounded-full" />
        <div className="floating-shape absolute bottom-[35%] right-[20%] w-32 h-px bg-gradient-to-r from-transparent via-red-500/20 to-transparent" />
        <div className="floating-shape absolute top-[40%] left-[3%] w-px h-24 bg-gradient-to-b from-transparent via-red-500/20 to-transparent" />
      </div>

      {/* Red Accent Line */}
      <svg
        className="absolute inset-0 w-full h-full pointer-events-none opacity-40"
        viewBox="0 0 1920 1080"
        preserveAspectRatio="none"
      >
        <path
          d="M 0 800 Q 480 600 960 700 T 1920 500"
          stroke="rgba(239, 68, 68, 0.3)"
          strokeWidth="2"
          fill="none"
        />
      </svg>

      {/* Main Content */}
      <div className="relative mt-10 z-10 w-full px-6 lg:px-12 max-w-7xl mx-auto py-20 lg:py-0">
        <div className="grid lg:grid-cols-2 gap-10 lg:gap-16 items-center">
          {/* Left Content */}
          <div className="space-y-6 lg:space-y-8 text-center lg:text-left">
            {/* Status Badge - Mobile Only */}
            <div className="hero-eyebrow flex items-center justify-center gap-3 opacity-0 lg:hidden">
              <div className="flex items-center gap-2 px-4 py-2 bg-red-500/10 border border-red-500/30 rounded-full">
                <div className="w-2 h-2 bg-red-500 rounded-full animate-pulse" />
                <span className="text-xs font-medium text-red-400 tracking-wider uppercase">Available for Work</span>
              </div>
            </div>
            
            <h1
              ref={nameRef}
              className="text-5xl md:text-6xl lg:text-7xl xl:text-8xl font-bold font-['Montserrat'] leading-[0.95] opacity-0"
            >
              <span className="text-white">VISHAL</span>
              <br />
              <span className="text-gradient">KUMAR</span>
            </h1>
            
            <h2
              ref={titleRef}
              className="text-xl md:text-2xl lg:text-3xl xl:text-4xl font-bold font-['Montserrat'] text-white/90 opacity-0 flex items-center justify-center lg:justify-start gap-3"
              style={{ perspective: '1000px' }}
            >
              <Code2 className="w-6 h-6 lg:w-8 lg:h-8 text-red-500 flex-shrink-0" />
              <span>{titleChars}</span>
            </h2>
            
            <p
              ref={subtitleRef}
              className="text-base md:text-lg text-white/60 max-w-lg mx-auto lg:mx-0 leading-relaxed opacity-0"
            >
              Results-driven Full Stack Developer building scalable MERN applications 
              and secure enterprise products. Skilled in React.js, Node.js, MongoDB, 
              with expertise in GitLab CI/CD automation and cybersecurity concepts.
            </p>

            {/* Skill Badges */}
            <div className="flex flex-wrap justify-center lg:justify-start gap-3">
              <div className="skill-badge flex items-center gap-2 px-4 py-2 bg-white/5 border border-white/10 rounded-lg hover:border-red-500/50 transition-colors">
                <Terminal className="w-4 h-4 text-red-500" />
                <span className="text-sm text-white/70">MERN Stack</span>
              </div>
              <div className="skill-badge flex items-center gap-2 px-4 py-2 bg-white/5 border border-white/10 rounded-lg hover:border-red-500/50 transition-colors">
                <Lock className="w-4 h-4 text-red-400" />
                <span className="text-sm text-white/70">CI/CD</span>
              </div>
              <div className="skill-badge flex items-center gap-2 px-4 py-2 bg-white/5 border border-white/10 rounded-lg hover:border-red-500/50 transition-colors">
                <Shield className="w-4 h-4 text-red-500" />
                <span className="text-sm text-white/70">Cybersecurity</span>
              </div>
            </div>
            
            <button
              ref={ctaRef}
              onClick={scrollToProjects}
              className="group inline-flex items-center gap-3 px-8 py-4 bg-red-600 text-white font-semibold rounded-full hover:bg-red-500 transition-all duration-300 hover:scale-105 opacity-0"
              style={{
                boxShadow: '0 0 30px rgba(239, 68, 68, 0.4)',
              }}
            >
              View My Projects
              <ArrowRight className="w-5 h-5 transition-transform duration-300 group-hover:translate-x-1" />
            </button>
          </div>

          {/* Right Content - Terminal */}
          <div ref={terminalRef} className="relative opacity-0">
            {/* Glow Effect */}
            <div className="absolute -inset-4 bg-red-500/10 rounded-2xl blur-2xl" />
            
            {/* Terminal Window */}
            <div className="relative bg-[#0d0d0d] border border-white/10 rounded-xl overflow-hidden shadow-2xl">
              {/* Terminal Header */}
              <div className="flex items-center justify-between px-4 py-3 bg-[#1a1a1a] border-b border-white/10">
                <div className="flex items-center gap-3">
                  <div className="flex gap-2">
                    <div className="w-3 h-3 rounded-full bg-red-500 hover:bg-red-400 transition-colors cursor-pointer" />
                    <div className="w-3 h-3 rounded-full bg-yellow-500 hover:bg-yellow-400 transition-colors cursor-pointer" />
                    <div className="w-3 h-3 rounded-full bg-green-500 hover:bg-green-400 transition-colors cursor-pointer" />
                  </div>
                  <div className="flex items-center gap-2 ml-2">
                    <Terminal className="w-4 h-4 text-white/40" />
                    <span className="text-xs font-mono text-white/40">vishal@dev:~</span>
                  </div>
                </div>
                <div className="text-xs font-mono text-white/30">bash</div>
              </div>
              
              {/* Terminal Content */}
              <div className="p-5 lg:p-6 font-mono text-sm space-y-3 min-h-[280px] lg:min-h-[320px]">
                {/* Command 1 */}
                <div>
                  <span className="text-red-400">{line1}</span>
                  {!line1Complete && <span className="text-red-400 animate-pulse">▌</span>}
                </div>
                {line1Complete && (
                  <div className="text-green-400 pl-0">{line2}</div>
                )}
                
                {/* Command 2 */}
                {line2Complete && (
                  <div className="pt-2">
                    <span className="text-red-400">{line3}</span>
                    {!line3Complete && <span className="text-red-400 animate-pulse">▌</span>}
                  </div>
                )}
                {line3Complete && (
                  <div className="text-yellow-400/80 pl-0 text-xs">{line4}</div>
                )}

                {/* Stats Display */}
                {line3Complete && (
                  <div className="pt-4 space-y-3 animate-fadeIn">
                    <div className="text-white/30 text-xs">──────────────────────────────────</div>
                    <div className="grid grid-cols-3 gap-3">
                      {stats.map((stat, index) => (
                        <div key={index} className="stat-box text-center p-3 bg-white/5 rounded-lg border border-white/5">
                          <p className="text-xl lg:text-2xl font-bold text-red-400">{stat.value}</p>
                          <p className="text-[10px] text-white/40 mt-1 leading-tight">{stat.label}</p>
                        </div>
                      ))}
                    </div>
                    
                    {/* Tech Stack */}
                    <div className="pt-2">
                      <p className="text-white/30 text-xs mb-2">$ cat /etc/tech_stack</p>
                      <div className="flex flex-wrap gap-2">
                        {['React.js', 'Node.js', 'MongoDB', 'Express.js'].map((tech) => (
                          <span
                            key={tech}
                            className="px-2 py-1 bg-red-500/10 text-red-400 text-xs rounded border border-red-500/20"
                          >
                            {tech}
                          </span>
                        ))}
                      </div>
                    </div>

                    {/* Blinking cursor at end */}
                    <div className="pt-2">
                      <span className="text-red-400">$ </span>
                      <span className="text-white/60 animate-pulse">▌</span>
                    </div>
                  </div>
                )}
              </div>
            </div>

            {/* Floating Badge */}
            {/* <div className="absolute -top-3 -right-3 px-4 py-2 bg-transparent rounded-lg shadow-lg" style={{ boxShadow: '0 4px 20px rgba(239, 68, 68, 0.4)' }}>
              <p className="text-xs font-bold text-white">HIRE ME</p>
            </div> */}
            
          </div>
        </div>
      </div>

      {/* Scroll Indicator */}
      <div className="absolute bottom-6 lg:bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 scroll-indicator">
        <span className="text-xs text-white/40 tracking-wider">Scroll to explore</span>
        <ChevronDown className="w-5 h-5 text-red-500/50 animate-bounce" />
      </div>

      {/* Animation Styles */}
      <style>{`
        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(10px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .animate-fadeIn {
          animation: fadeIn 0.5s ease-out forwards;
        }
      `}</style>
    </section>
  );
};

export default Hero;
