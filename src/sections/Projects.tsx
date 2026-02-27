import { useEffect, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ExternalLink, Github, TrendingUp, Share2, ArrowRight } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

interface ProjectStats {
  [key: string]: string | number;
}

interface Project {
  id: number;
  title: string;
  category: string;
  description: string;
  tech: string[];
  icon: React.ElementType;
  stats: ProjectStats;
  link: string;
  github: string;
  year: string;
  number: string;
}

const projects: Project[] = [
  {
    id: 1,
    title: 'EquiGroww',
    category: 'Stock Trading Platform',
    description:
      'MERN-based trading app with user authentication, Razorpay payment integration, and stock buy/sell features. Secure login with JWT and email-based OTP.',
    tech: ['React.js', 'Redux Toolkit', 'Node.js', 'MongoDB', 'Razorpay'],
    icon: TrendingUp,
    stats: { features: '10+', stack: 'MERN' },
    link: 'https://vishalkumar1007.github.io/Groww',
    github: 'https://github.com/vishalkumar1007',
    year: '2024',
    number: '01',
  },
  {
    id: 2,
    title: 'Learn',
    category: 'My Learning Hub',
    description:
      'A personal learning dashboard built with React, Vite, and Node.js. Features JWT authentication, QR code sharing, and a curated list of resources for web development.',
    tech: ['React.js', 'Vite', 'Node.js', 'MongoDB'],
    icon: Share2,
    stats: { Interesting: 'Visual Draw', stack: 'MERN' },
    link: 'https://vishalkumar1007.github.io/learn',
    github: 'https://github.com/vishalkumar1007/learn',
    year: '2026',
    number: '02',
  },
];

// ─── Section ─────────────────────────────────────────────────────────────────
const Projects = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const navigate = useNavigate();

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo('.proj-header-line', { scaleX: 0 }, {
        scaleX: 1, duration: 1, ease: 'expo.out',
        scrollTrigger: { trigger: sectionRef.current, start: 'top 75%' },
      });
      gsap.fromTo('.proj-main-title', { y: 60, opacity: 0 }, {
        y: 0, opacity: 1, duration: 1, ease: 'power4.out',
        scrollTrigger: { trigger: sectionRef.current, start: 'top 70%' },
      });
      gsap.fromTo('.proj-card', { y: 80, opacity: 0 }, {
        y: 0, opacity: 1, duration: 0.9, stagger: 0.15, ease: 'power3.out',
        scrollTrigger: { trigger: '.proj-grid', start: 'top 80%' },
      });
      gsap.fromTo('.proj-gate', { y: 60, opacity: 0 }, {
        y: 0, opacity: 1, duration: 1, ease: 'power3.out',
        scrollTrigger: { trigger: '.proj-gate', start: 'top 88%' },
      });
    }, sectionRef);
    return () => ctx.revert();
  }, []);

  return (
    <section
      id="projects"
      ref={sectionRef}
      className="relative py-28 lg:py-36 bg-[#080808] overflow-hidden"
    >
      {/* Noise */}
      <div
        className="absolute inset-0 opacity-[0.025] pointer-events-none"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 512 512' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)'/%3E%3C/svg%3E")`,
          backgroundSize: '200px',
        }}
      />
      {/* Glow */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[400px] bg-red-700/10 blur-[120px] rounded-full pointer-events-none" />

      <div className="w-full px-6 lg:px-16 max-w-7xl mx-auto relative">

        {/* Header */}
        <div className="mb-20 overflow-hidden">
          <div className="flex items-center gap-4 mb-6">
            <span className="proj-header-line block h-px bg-red-500 origin-left" style={{ width: '48px' }} />
            <span className="text-xs font-semibold tracking-[0.25em] uppercase text-red-500 font-mono">
              Selected Work
            </span>
            <span className="text-xs text-white/20 font-mono ml-auto hidden sm:block">
              2 of 10+ projects
            </span>
          </div>
          <div className="proj-main-title">
            <h2
              className="text-[clamp(3rem,9vw,7.5rem)] font-black leading-[0.88] tracking-tight text-white"
              style={{ fontFamily: "'Bebas Neue', 'Oswald', Impact, sans-serif" }}
            >
              MY{' '}
              <span style={{ WebkitTextStroke: '2px #ef4444', color: 'transparent' }}>
                PROJECTS
              </span>
            </h2>
            <p className="mt-5 text-white/40 text-base max-w-xl leading-relaxed">
              Full-stack applications and web platforms — built to solve real problems
              with clean code and sharp interfaces.
            </p>
          </div>
        </div>

        {/* 2 Cards */}
        <div className="proj-grid grid md:grid-cols-2 gap-4 lg:gap-5 mb-5">
          {projects.map((project) => (
            <ProjectCard key={project.id} project={project} />
          ))}
        </div>

        {/* Gate */}
        <ProjectsGate onNavigate={() => navigate('/projects')} />
      </div>
    </section>
  );
};

// ─── Card ─────────────────────────────────────────────────────────────────────
const ProjectCard = ({ project }: { project: Project }) => {
  const Icon = project.icon;
  const cardRef = useRef<HTMLDivElement>(null);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const card = cardRef.current;
    if (!card) return;
    const rect = card.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width - 0.5) * 6;
    const y = ((e.clientY - rect.top) / rect.height - 0.5) * -6;
    card.style.transform = `perspective(800px) rotateY(${x}deg) rotateX(${y}deg) translateZ(4px)`;
  };
  const handleMouseLeave = () => {
    if (cardRef.current)
      cardRef.current.style.transform = 'perspective(800px) rotateY(0deg) rotateX(0deg) translateZ(0px)';
  };

  return (
    <div
      ref={cardRef}
      className="proj-card group relative flex flex-col rounded-2xl overflow-hidden border border-white/[0.07] bg-gradient-to-br from-white/[0.04] to-white/[0.01] hover:border-red-500/40"
      style={{ transition: 'transform 0.2s ease, border-color 0.3s ease' }}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
    >
      <div className="flex items-center justify-between px-6 pt-5 pb-4 border-b border-white/[0.06]">
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 rounded-lg bg-red-500/10 border border-red-500/20 flex items-center justify-center group-hover:bg-red-500/20 transition-colors">
            <Icon className="w-4 h-4 text-red-400" />
          </div>
          <span className="text-[11px] font-semibold tracking-[0.18em] uppercase text-white/40 font-mono">
            {project.category}
          </span>
        </div>
        <span
          className="text-4xl font-black text-white/[0.04] leading-none select-none group-hover:text-red-500/10 transition-colors"
          style={{ fontFamily: "'Bebas Neue', Impact, sans-serif" }}
        >
          {project.number}
        </span>
      </div>

      <div className="flex flex-col flex-1 p-6 gap-5">
        <h3
          className="text-2xl font-black text-white group-hover:text-red-400 transition-colors duration-300 leading-tight"
          style={{  }}
        >
          {project.title}
        </h3>
        <p className="text-white/50 text-sm leading-relaxed flex-1">{project.description}</p>

        <div className="flex gap-5">
          {Object.entries(project.stats).map(([key, value]) => (
            <div key={key} className="flex flex-col gap-0.5">
              <span className="text-xl font-black text-red-400 leading-none" style={{ fontFamily: "'Bebas Neue', Impact, sans-serif" }}>{value}</span>
              <span className="text-[10px] tracking-widest uppercase text-white/30 font-mono">{key}</span>
            </div>
          ))}
          <div className="ml-auto flex flex-col gap-0.5 items-end">
            <span className="text-xl font-black text-white/20 leading-none" style={{ fontFamily: "'Bebas Neue', Impact, sans-serif" }}>{project.year}</span>
            <span className="text-[10px] tracking-widest uppercase text-white/20 font-mono">year</span>
          </div>
        </div>

        <div className="flex flex-wrap gap-1.5">
          {project.tech.map((tech, i) => (
            <span key={i} className="px-2.5 py-1 text-[10px] font-mono tracking-wide bg-white/[0.04] border border-white/[0.08] rounded-md text-white/50 group-hover:border-white/[0.14] transition-colors">
              {tech}
            </span>
          ))}
        </div>

        <div className="flex gap-2.5 mt-1">
          <a
            href={project.link}
            target="_blank"
            rel="noopener noreferrer"
            className="flex-1 flex items-center justify-center gap-2 px-4 py-2.5 bg-red-600 text-white text-sm font-bold rounded-xl hover:bg-red-500 active:scale-95 transition-all duration-200"
            style={{ boxShadow: '0 0 24px rgba(239,68,68,0.25)' }}
          >
            <ExternalLink className="w-3.5 h-3.5" />
            Live Demo
          </a>
          <a
            href={project.github}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center justify-center gap-2 px-4 py-2.5 bg-white/[0.04] border border-white/[0.12] text-white/70 text-sm font-semibold rounded-xl hover:bg-white/[0.08] hover:text-white hover:border-white/25 active:scale-95 transition-all duration-200"
          >
            <Github className="w-3.5 h-3.5" />
            Code
          </a>
        </div>
      </div>

      <div className="absolute bottom-0 left-0 right-0 h-[2px] bg-gradient-to-r from-red-600 via-red-400 to-transparent scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left" />
      <div className="absolute top-0 right-0 w-40 h-40 bg-red-500/5 rounded-bl-full opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />
    </div>
  );
};

// ─── Gate ─────────────────────────────────────────────────────────────────────
const ProjectsGate = ({ onNavigate }: { onNavigate: () => void }) => {
  const [hovered, setHovered] = useState(false);
  const gateRef = useRef<HTMLDivElement>(null);
  const scanRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!scanRef.current) return;
    gsap.fromTo(
      scanRef.current,
      { top: '-2px', opacity: 0 },
      { top: '102%', opacity: 1, duration: 2.4, ease: 'none', repeat: -1, repeatDelay: 0.6 }
    );
  }, []);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const gate = gateRef.current;
    if (!gate) return;
    const rect = gate.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width - 0.5) * 10;
    const y = ((e.clientY - rect.top) / rect.height - 0.5) * -5;
    gsap.to(gate, { rotateY: x, rotateX: y, duration: 0.3, ease: 'power2.out' });
  };

  const handleMouseLeave = () => {
    if (gateRef.current)
      gsap.to(gateRef.current, { rotateY: 0, rotateX: 0, duration: 0.6, ease: 'power3.out' });
    setHovered(false);
  };

  const previewProjects = ['URL Shortener', 'News App', 'GitHub Finder', 'Groww Clone', 'API Previewer'];

  return (
    <div className="proj-gate w-full">
      {/* Divider */}
      <div className="flex items-center gap-4 mb-4 px-1">
        <div className="h-px flex-1 bg-gradient-to-r from-transparent via-white/[0.08] to-transparent" />
        <span className="text-[10px] font-mono tracking-[0.3em] uppercase text-white/20">
          there's more
        </span>
        <div className="h-px flex-1 bg-gradient-to-r from-transparent via-white/[0.08] to-transparent" />
      </div>

      {/* Gate */}
      <div
        ref={gateRef}
        className="proj-gate relative w-full rounded-2xl overflow-hidden cursor-pointer select-none"
        style={{
          transformStyle: 'preserve-3d',
          border: `1px solid ${hovered ? 'rgba(239,68,68,0.45)' : 'rgba(255,255,255,0.07)'}`,
          background: hovered
            ? 'linear-gradient(135deg, rgba(239,68,68,0.07) 0%, rgba(10,10,10,0.97) 55%)'
            : 'linear-gradient(135deg, rgba(255,255,255,0.025) 0%, rgba(8,8,8,0.98) 100%)',
          boxShadow: hovered ? '0 0 90px rgba(239,68,68,0.12), inset 0 0 50px rgba(239,68,68,0.03)' : 'none',
          transition: 'border-color 0.4s ease, background 0.4s ease, box-shadow 0.4s ease',
        }}
        onClick={onNavigate}
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        onMouseEnter={() => setHovered(true)}
      >
        {/* Scan line */}
        <div
          ref={scanRef}
          className="absolute left-0 right-0 h-px pointer-events-none z-10"
          style={{ background: 'linear-gradient(90deg, transparent 0%, rgba(239,68,68,0.7) 50%, transparent 100%)' }}
        />

        {/* Corner brackets */}
        {[
          'top-3 left-3 border-t border-l',
          'top-3 right-3 border-t border-r',
          'bottom-3 left-3 border-b border-l',
          'bottom-3 right-3 border-b border-r',
        ].map((cls, i) => (
          <div
            key={i}
            className={`absolute w-5 h-5 ${cls} pointer-events-none transition-colors duration-400`}
            style={{ borderColor: hovered ? 'rgba(239,68,68,0.6)' : 'rgba(255,255,255,0.1)' }}
          />
        ))}

        {/* Dot grid */}
        <div
          className="absolute inset-0 pointer-events-none transition-opacity duration-400"
          style={{
            backgroundImage: 'radial-gradient(circle, rgba(255,255,255,0.055) 1px, transparent 1px)',
            backgroundSize: '28px 28px',
            opacity: hovered ? 0.8 : 0.25,
          }}
        />

        {/* Inner content */}
        <div className="relative z-10 flex flex-col sm:flex-row items-center gap-8 px-8 sm:px-12 py-9 sm:py-10">

          {/* Left — big ghost number */}
          <div className="flex flex-col items-center sm:items-start shrink-0">
            <span
              className="text-[6rem] sm:text-[8rem] font-black leading-none transition-all duration-400"
              style={{
                fontFamily: "'Bebas Neue', Impact, sans-serif",
                WebkitTextStroke: hovered ? '1.5px rgba(239,68,68,0.3)' : '1px rgba(255,255,255,0.06)',
                color: 'transparent',
              }}
            >
              10+
            </span>
            <span
              className="text-[10px] font-mono tracking-[0.25em] uppercase transition-colors duration-300 -mt-2"
              style={{ color: hovered ? 'rgba(239,68,68,0.55)' : 'rgba(255,255,255,0.18)' }}
            >
              projects inside
            </span>
          </div>

          {/* Center — previews + label */}
          <div className="flex flex-col gap-4 flex-1 items-center sm:items-start">
            <p
              className="text-[clamp(0.85rem,2vw,1rem)] font-black tracking-widest uppercase transition-colors duration-300"
              style={{
                fontFamily: "'Bebas Neue', 'Oswald', Impact, sans-serif",
                color: hovered ? 'rgba(255,255,255,0.85)' : 'rgba(255,255,255,0.3)',
                letterSpacing: '0.12em',
              }}
            >
              Full Stack Showcase
            </p>

            {/* Marquee-style pills */}
            <div className="flex flex-wrap gap-2">
              {previewProjects.map((name, i) => (
                <span
                  key={i}
                  className="px-3 py-1 text-[10px] font-mono rounded-full border transition-all duration-300"
                  style={{
                    borderColor: hovered ? 'rgba(239,68,68,0.35)' : 'rgba(255,255,255,0.08)',
                    color: hovered ? 'rgba(239,68,68,0.75)' : 'rgba(255,255,255,0.25)',
                    background: hovered ? 'rgba(239,68,68,0.06)' : 'rgba(255,255,255,0.02)',
                    transitionDelay: `${i * 30}ms`,
                  }}
                >
                  {name}
                </span>
              ))}
              <span
                className="px-3 py-1 text-[10px] font-mono rounded-full border transition-all duration-300"
                style={{
                  borderColor: hovered ? 'rgba(255,255,255,0.15)' : 'rgba(255,255,255,0.05)',
                  color: hovered ? 'rgba(255,255,255,0.4)' : 'rgba(255,255,255,0.15)',
                  transitionDelay: '150ms',
                }}
              >
                + more
              </span>
            </div>
          </div>

          {/* Right — animated CTA */}
          <div className="flex flex-col items-center gap-2 shrink-0">
            <div
              className="relative w-14 h-14 rounded-full border-2 flex items-center justify-center transition-all duration-300"
              style={{
                borderColor: hovered ? '#ef4444' : 'rgba(255,255,255,0.1)',
                background: hovered ? 'rgba(239,68,68,0.12)' : 'transparent',
                boxShadow: hovered ? '0 0 30px rgba(239,68,68,0.35)' : 'none',
              }}
            >
              <ArrowRight
                className="w-6 h-6 transition-all duration-300"
                style={{
                  color: hovered ? '#ef4444' : 'rgba(255,255,255,0.25)',
                  transform: hovered ? 'translateX(2px)' : 'translateX(0)',
                }}
              />
            </div>
            <span
              className="text-[9px] font-mono tracking-[0.2em] uppercase transition-colors duration-300 whitespace-nowrap"
              style={{ color: hovered ? 'rgba(239,68,68,0.6)' : 'rgba(255,255,255,0.18)' }}
            >
              View All
            </span>
          </div>
        </div>

        {/* Bottom pulse line */}
        <div
          className="absolute bottom-0 left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-red-500 to-transparent transition-opacity duration-500"
          style={{ opacity: hovered ? 1 : 0 }}
        />
      </div>
    </div>
  );
};

export default Projects;