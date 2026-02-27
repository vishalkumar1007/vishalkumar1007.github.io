import { useEffect, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { gsap } from 'gsap';
import {
  ArrowLeft, ExternalLink, Github,
  TrendingUp, Link2, Newspaper,
  Search, BookOpen, Share2, Sparkles, ArrowUpRight,
} from 'lucide-react';

interface ProjectItem {
  id: number;
  title: string;
  subtitle: string;
  description: string;
  icon: React.ElementType;
  tech: string[];
  liveLink: string;
  githubLink: string;
  year: string;
  accent: string;        // tailwind color name for dynamic classes
  accentHex: string;     // raw hex for inline styles
  glowHex: string;       // glow rgba
  featured?: boolean;
}

const projects: ProjectItem[] = [
  {
    id: 1,
    title: 'EquiGroww',
    subtitle: 'Stock Trading Platform',
    description: 'Full MERN trading app with real-time data, portfolio management, Razorpay payments, and JWT + OTP auth.',
    icon: TrendingUp,
    tech: ['React.js', 'Redux', 'Node.js', 'MongoDB', 'Razorpay'],
    liveLink: 'https://vishalkumar1007.github.io/Groww',
    githubLink: 'https://github.com/vishalkumar1007/Groww',
    year: '2024',
    accent: 'emerald',
    accentHex: '#10b981',
    glowHex: 'rgba(16,185,129,0.18)',
    featured: true,
  },
  {
    id: 2,
    title: 'Share Multiverse',
    subtitle: 'Content Sharing Platform',
    description: 'Share text & images via unique codes or QR. Login history, auto-login, secure token auth on a SQL backend.',
    icon: Share2,
    tech: ['React.js', 'Vite', 'Node.js', 'SQL', 'QR Code'],
    liveLink: 'https://vishalkumar1007.github.io/share',
    githubLink: 'https://github.com/vishalkumar1007/share',
    year: '2024',
    accent: 'cyan',
    accentHex: '#06b6d4',
    glowHex: 'rgba(6,182,212,0.18)',
  },
  {
    id: 3,
    title: 'Learn Hub',
    subtitle: 'Personal Learning Dashboard',
    description: 'Curated learning dashboard with JWT auth, visual drawing tools, and structured web dev resource library.',
    icon: BookOpen,
    tech: ['React.js', 'Vite', 'Node.js', 'MongoDB'],
    liveLink: 'https://vishalkumar1007.github.io/learn',
    githubLink: 'https://github.com/vishalkumar1007/learn',
    year: '2026',
    accent: 'violet',
    accentHex: '#8b5cf6',
    glowHex: 'rgba(139,92,246,0.18)',
  },
  {
    id: 4,
    title: 'URL Shortener',
    subtitle: 'Link Management Tool',
    description: 'Powerful shortening service with analytics, custom aliases, and QR code generation built on Express + MongoDB.',
    icon: Link2,
    tech: ['React.js', 'Node.js', 'MongoDB', 'Express.js'],
    liveLink: 'https://vishalkumar1007.github.io/url-shortener',
    githubLink: 'https://github.com/vishalkumar1007/url-shortener',
    year: '2024',
    accent: 'orange',
    accentHex: '#f97316',
    glowHex: 'rgba(249,115,22,0.18)',
  },
  {
    id: 5,
    title: 'News App',
    subtitle: 'Real-Time Aggregator',
    description: 'Live news aggregator with category filters, search, and fully responsive design powered by News API.',
    icon: Newspaper,
    tech: ['React.js', 'News API', 'Tailwind CSS'],
    liveLink: 'https://vishalkumar1007.github.io/News_api/',
    githubLink: 'https://github.com/vishalkumar1007/News_api',
    year: '2023',
    accent: 'pink',
    accentHex: '#ec4899',
    glowHex: 'rgba(236,72,153,0.18)',
  },
  {
    id: 6,
    title: 'GitHub Finder',
    subtitle: 'Profile Explorer',
    description: 'Search GitHub profiles, view detailed stats, repos, and contribution data all via GitHub API.',
    icon: Search,
    tech: ['React.js', 'GitHub API', 'CSS3'],
    liveLink: 'https://vishalkumar1007.github.io/GithubUserFind',
    githubLink: 'https://github.com/vishalkumar1007/GithubUserFind',
    year: '2023',
    accent: 'sky',
    accentHex: '#38bdf8',
    glowHex: 'rgba(56,189,248,0.18)',
  },
];

const stats = [
  { value: '10+', label: 'Projects Built' },
  { value: '15+', label: 'Technologies' },
  { value: '44+', label: 'GitHub Repos' },
  { value: '2+', label: 'Years Coding' },
];

// ─── Main Page ────────────────────────────────────────────────────────────────
const FullStackProjects = () => {
  const pageRef = useRef<HTMLDivElement>(null);
  const heroScanRef = useRef<HTMLDivElement | null>(null);
  const navigate = useNavigate();

  useEffect(() => {
    // Hero scan line
    if (heroScanRef.current) {
      gsap.fromTo(
        heroScanRef.current,
        { top: '-2px', opacity: 0 },
        { top: '102%', opacity: 1, duration: 3, ease: 'none', repeat: -1, repeatDelay: 0.8 }
      );
    }

    const ctx = gsap.context(() => {
      gsap.fromTo('.fsp-nav', { y: -30, opacity: 0 }, { y: 0, opacity: 1, duration: 0.6, ease: 'power3.out' });
      gsap.fromTo('.fsp-hero-box', { y: 40, opacity: 0 }, { y: 0, opacity: 1, duration: 0.9, delay: 0.25, ease: 'power3.out' });
      gsap.fromTo('.fsp-card', { y: 60, opacity: 0, scale: 0.97 }, {
        y: 0, opacity: 1, scale: 1, duration: 0.65, stagger: 0.09, delay: 0.7,
        ease: 'power3.out',
      });
    }, pageRef);
    return () => ctx.revert();
  }, []);

  return (
    <div
      ref={pageRef}
      className="min-h-screen text-white overflow-x-hidden"
      style={{
        background: 'linear-gradient(160deg, #0d0d0d 0%, #0a0a12 50%, #0d0008 100%)',
        fontFamily: "'DM Sans', sans-serif",
      }}
    >
      {/* Ambient mesh blobs */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden z-0">
        <div style={{ position: 'absolute', top: '-10%', left: '-5%', width: '600px', height: '600px', borderRadius: '50%', background: 'radial-gradient(circle, rgba(239,68,68,0.06) 0%, transparent 70%)', filter: 'blur(40px)' }} />
        <div style={{ position: 'absolute', top: '30%', right: '-10%', width: '500px', height: '500px', borderRadius: '50%', background: 'radial-gradient(circle, rgba(139,92,246,0.06) 0%, transparent 70%)', filter: 'blur(40px)' }} />
        <div style={{ position: 'absolute', bottom: '10%', left: '20%', width: '400px', height: '400px', borderRadius: '50%', background: 'radial-gradient(circle, rgba(6,182,212,0.05) 0%, transparent 70%)', filter: 'blur(50px)' }} />
      </div>

      {/* Subtle grid */}
      <div
        className="fixed inset-0 pointer-events-none z-0"
        style={{
          backgroundImage: 'linear-gradient(rgba(255,255,255,0.025) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.025) 1px, transparent 1px)',
          backgroundSize: '60px 60px',
          maskImage: 'radial-gradient(ellipse 80% 80% at 50% 50%, black 20%, transparent 100%)',
        }}
      />

      <div className="relative z-10">
        {/* ── Nav ── */}
        <nav className="fsp-nav sticky top-0 z-50 backdrop-blur-2xl border-b border-white/[0.07]"
          style={{ background: 'rgba(10,10,10,0.8)' }}>
          <div className="max-w-7xl mx-auto px-6 lg:px-12 h-14 flex items-center justify-between">
            <button
              onClick={() => navigate('/')}
              className="group flex items-center gap-2.5 text-white/50 hover:text-white transition-colors"
            >
              <div className="w-8 h-8 rounded-xl border border-white/10 flex items-center justify-center group-hover:border-red-500/60 group-hover:bg-red-500/10 transition-all duration-300">
                <ArrowLeft className="w-3.5 h-3.5 group-hover:-translate-x-0.5 transition-transform" />
              </div>
              <span className="text-xs font-mono tracking-[0.2em] uppercase hidden sm:block">Portfolio</span>
            </button>

            <div className="flex items-center gap-2">
              <Sparkles className="w-3.5 h-3.5 text-red-500" />
              <span className="text-sm font-black tracking-widest" style={{ fontFamily: "'Bebas Neue', Impact, sans-serif", letterSpacing: '0.15em' }}>
                VISHAL<span className="text-red-500">.</span>DEV
              </span>
            </div>

            <a
              href="https://github.com/vishalkumar1007"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 px-4 py-1.5 rounded-xl border border-white/10 text-white/50 text-xs font-mono hover:border-white/25 hover:text-white transition-all duration-300"
            >
              <Github className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">GitHub</span>
            </a>
          </div>
        </nav>

        {/* ── Hero ── */}
        <section className="relative pt-8 pb-8 lg:pt-10 lg:pb-8">
          <div className="max-w-7xl mx-auto px-6 lg:px-12">
            <HeroBox scanRef={heroScanRef} />
          </div>
        </section>

        {/* ── Cards Grid ── */}
        <section className="pb-24">
          <div className="max-w-7xl mx-auto px-6 lg:px-12">
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
              {projects.map((p) => (
                <ProjectCard key={p.id} project={p} />
              ))}
            </div>
          </div>
        </section>

        {/* ── GitHub CTA ── */}
        <section className="pb-24">
          <div className="max-w-7xl mx-auto px-6 lg:px-12">
            <div
              className="relative rounded-3xl overflow-hidden p-10 lg:p-16 text-center"
              style={{
                background: 'linear-gradient(135deg, rgba(239,68,68,0.08) 0%, rgba(249,115,22,0.05) 50%, rgba(10,10,10,0.9) 100%)',
                border: '1px solid rgba(239,68,68,0.2)',
                boxShadow: '0 0 80px rgba(239,68,68,0.08), inset 0 0 60px rgba(239,68,68,0.02)',
              }}
            >
              {/* Corner brackets */}
              {[
                'top-4 left-4 border-t border-l',
                'top-4 right-4 border-t border-r',
                'bottom-4 left-4 border-b border-l',
                'bottom-4 right-4 border-b border-r',
              ].map((cls, i) => (
                <div key={i} className={`absolute w-6 h-6 ${cls} border-red-500/40`} />
              ))}

              <p className="text-[10px] font-mono tracking-[0.3em] uppercase text-red-400/60 mb-4">More on GitHub</p>
              <h2
                className="text-[clamp(2rem,6vw,4.5rem)] font-black text-white mb-3"
                style={{ fontFamily: "'Bebas Neue', Impact, sans-serif", letterSpacing: '0.04em' }}
              >
                44+ REPOSITORIES
              </h2>
              <p className="text-white/35 text-sm mb-8 max-w-sm mx-auto">
                Experiments, mini tools, and more full-stack projects waiting to be explored.
              </p>
              <a
                href="https://github.com/vishalkumar1007?tab=repositories"
                target="_blank"
                rel="noopener noreferrer"
                className="group inline-flex items-center gap-3 px-8 py-4 rounded-2xl font-bold text-sm text-white transition-all duration-300 hover:scale-[1.02] active:scale-95"
                style={{
                  background: 'linear-gradient(135deg, #dc2626 0%, #b91c1c 100%)',
                  boxShadow: '0 0 30px rgba(239,68,68,0.35)',
                }}
              >
                <Github className="w-5 h-5" />
                Browse All Repos
                <ArrowUpRight className="w-4 h-4 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
              </a>
            </div>
          </div>
        </section>

        {/* ── Footer ── */}
        <footer className="border-t border-white/[0.06] py-6">
          <div className="max-w-7xl mx-auto px-6 lg:px-12 flex flex-col sm:flex-row items-center justify-between gap-2">
            <span className="text-[10px] font-mono text-white/20 tracking-widest uppercase">
              Vishal Kumar © {new Date().getFullYear()}
            </span>
            <span className="text-[10px] font-mono text-white/15">React · TypeScript · Tailwind · GSAP</span>
          </div>
        </footer>
      </div>
    </div>
  );
};

// ─── Hero Box (Gate-style) ────────────────────────────────────────────────────
const techTags = ['React.js', 'Node.js', 'MongoDB', 'Express.js', 'SQL', 'Redux', 'Vite', 'REST API', 'JWT', 'Tailwind'];

const HeroBox = ({ scanRef }: { scanRef: React.MutableRefObject<HTMLDivElement | null> }) => {
  const [hovered, setHovered] = useState(false);
  const boxRef = useRef<HTMLDivElement>(null);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const el = boxRef.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width - 0.5) * 8;
    const y = ((e.clientY - rect.top) / rect.height - 0.5) * -5;
    gsap.to(el, { rotateY: x, rotateX: y, duration: 0.3, ease: 'power2.out' });
  };

  const handleMouseLeave = () => {
    if (boxRef.current) gsap.to(boxRef.current, { rotateY: 0, rotateX: 0, duration: 0.6, ease: 'power3.out' });
    setHovered(false);
  };

  return (
    <div
      ref={boxRef}
      className="fsp-hero-box relative w-full rounded-2xl overflow-hidden select-none"
      style={{
        transformStyle: 'preserve-3d',
        border: `1px solid ${hovered ? 'rgba(239,68,68,0.45)' : 'rgba(255,255,255,0.08)'}`,
        background: hovered
          ? 'linear-gradient(135deg, rgba(239,68,68,0.07) 0%, rgba(10,10,10,0.97) 55%)'
          : 'linear-gradient(135deg, rgba(255,255,255,0.03) 0%, rgba(8,8,8,0.98) 100%)',
        boxShadow: hovered ? '0 0 90px rgba(239,68,68,0.12), inset 0 0 50px rgba(239,68,68,0.03)' : 'none',
        transition: 'border-color 0.4s ease, background 0.4s ease, box-shadow 0.4s ease',
      }}
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
          className={`absolute w-6 h-6 ${cls} pointer-events-none transition-colors duration-300`}
          style={{ borderColor: hovered ? 'rgba(239,68,68,0.6)' : 'rgba(255,255,255,0.12)' }}
        />
      ))}

      {/* Dot grid */}
      <div
        className="absolute inset-0 pointer-events-none transition-opacity duration-400"
        style={{
          backgroundImage: 'radial-gradient(circle, rgba(255,255,255,0.055) 1px, transparent 1px)',
          backgroundSize: '28px 28px',
          opacity: hovered ? 0.7 : 0.2,
        }}
      />

      {/* Content */}
      <div className="relative z-10 flex flex-col lg:flex-row items-center lg:items-stretch gap-0">

        {/* Left — ghost number + label */}
        <div className="flex flex-col items-center lg:items-start justify-center px-10 py-10 lg:py-12 lg:border-r shrink-0"
          style={{ borderColor: hovered ? 'rgba(239,68,68,0.15)' : 'rgba(255,255,255,0.06)', transition: 'border-color 0.4s' }}>
          <span
            className="font-black leading-none transition-all duration-400"
            style={{
              fontFamily: "'Bebas Neue', Impact, sans-serif",
              fontSize: 'clamp(5rem, 12vw, 9rem)',
              WebkitTextStroke: hovered ? '2px rgba(239,68,68,0.35)' : '1.5px rgba(255,255,255,0.07)',
              color: 'transparent',
            }}
          >
            {projects.length}
          </span>
          <span
            className="text-[10px] font-mono tracking-[0.3em] uppercase -mt-2 transition-colors duration-300"
            style={{ color: hovered ? 'rgba(239,68,68,0.6)' : 'rgba(255,255,255,0.2)' }}
          >
            projects total
          </span>
        </div>

        {/* Center — title + desc + tags */}
        <div className="flex flex-col justify-center gap-5 px-8 lg:px-12 py-10 lg:py-12 flex-1">
          <div>
            <div className="flex items-center gap-3 mb-3">
              <span className="h-px w-8 bg-red-500" />
              <span className="text-[10px] font-mono tracking-[0.3em] uppercase text-red-500">Full Stack Archive</span>
            </div>
            <h1
              className="font-black leading-[0.88] mb-3"
              style={{
                fontFamily: "'Bebas Neue', 'Oswald', Impact, sans-serif",
                fontSize: 'clamp(2.4rem, 7vw, 5.5rem)',
                color: hovered ? '#ffffff' : 'rgba(255,255,255,0.9)',
                transition: 'color 0.3s',
              }}
            >
              ALL MY{' '}
              <span style={{ WebkitTextStroke: '2px #ef4444', color: 'transparent' }}>
                PROJECTS
              </span>
            </h1>
            <p className="text-white/40 text-sm leading-relaxed max-w-md">
              Every app I've built — trading platforms, content tools, API integrations.
              Full-stack, real-world, production-ready.
            </p>
          </div>

          {/* Tech tags */}
          <div className="flex flex-wrap gap-2">
            {techTags.map((tag, i) => (
              <span
                key={i}
                className="px-3 py-1 text-[10px] font-mono rounded-full border transition-all duration-300"
                style={{
                  borderColor: hovered ? 'rgba(239,68,68,0.3)' : 'rgba(255,255,255,0.08)',
                  color: hovered ? 'rgba(239,68,68,0.7)' : 'rgba(255,255,255,0.25)',
                  background: hovered ? 'rgba(239,68,68,0.06)' : 'rgba(255,255,255,0.02)',
                  transitionDelay: `${i * 25}ms`,
                }}
              >
                {tag}
              </span>
            ))}
          </div>
        </div>

        {/* Right — stats */}
        <div className="flex flex-row lg:flex-col items-center justify-center gap-6 lg:gap-0 lg:divide-y px-10 py-8 lg:py-12 shrink-0 lg:border-l"
          style={{ borderColor: hovered ? 'rgba(239,68,68,0.15)' : 'rgba(255,255,255,0.06)', transition: 'border-color 0.4s', backgroundColor: hovered ? 'rgba(255,255,255,0.05)' : 'transparent' }}>
          {stats.map((s) => (
            <div key={s.label} className="flex flex-col items-center gap-0.5 lg:py-5 first:pt-0 last:pb-0">
              <span
                className="font-black leading-none transition-colors duration-300"
                style={{
                  fontFamily: "'Bebas Neue', Impact, sans-serif",
                  fontSize: 'clamp(1.8rem, 4vw, 2.8rem)',
                  color: hovered ? '#ef4444' : 'rgba(255,255,255,0.7)',
                }}
              >
                {s.value}
              </span>
              <span className="text-[9px] font-mono tracking-[0.2em] uppercase text-white/25 text-center">{s.label}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Bottom pulse line */}
      <div
        className="absolute bottom-0 left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-red-500 to-transparent transition-opacity duration-500"
        style={{ opacity: hovered ? 1 : 0 }}
      />
    </div>
  );
};

// ─── Card ─────────────────────────────────────────────────────────────────────
const ProjectCard = ({ project }: { project: ProjectItem }) => {
  const [hovered, setHovered] = useState(true);
  const cardRef = useRef<HTMLDivElement>(null);
  const Icon = project.icon;

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const card = cardRef.current;
    if (!card) return;
    const rect = card.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width - 0.5) * 12;
    const y = ((e.clientY - rect.top) / rect.height - 0.5) * -8;
    card.style.transform = `perspective(900px) rotateY(${x}deg) rotateX(${y}deg) translateZ(6px)`;
  };

  const handleMouseLeave = () => {
    if (cardRef.current) {
      cardRef.current.style.transform = 'perspective(900px) rotateY(0) rotateX(0) translateZ(0)';
    }
    setHovered(false);
  };

  return (
    <div
      ref={cardRef}
      className="fsp-card relative flex flex-col rounded-2xl overflow-hidden cursor-default"
      style={{
        transition: 'transform 0.2s ease, box-shadow 0.35s ease, border-color 0.35s ease',
        transformStyle: 'preserve-3d',
        background: hovered
          ? `linear-gradient(145deg, ${project.glowHex} 0%, rgba(15,15,20,0.97) 60%)`
          : 'linear-gradient(145deg, rgba(255,255,255,0.04) 0%, rgba(12,12,16,0.97) 100%)',
        border: `1px solid ${hovered ? project.accentHex + '55' : 'rgba(255,255,255,0.08)'}`,
        boxShadow: hovered ? `0 20px 60px ${project.glowHex}, 0 0 0 1px ${project.accentHex}22` : '0 4px 20px rgba(0,0,0,0.3)',
      }}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      onMouseEnter={() => setHovered(true)}
    >
      {/* Featured badge */}
      {project.featured && (
        <div
          className="absolute top-4 right-4 z-10 px-2.5 py-1 rounded-full text-[9px] font-bold tracking-widest uppercase"
          style={{ background: project.accentHex + '22', color: project.accentHex, border: `1px solid ${project.accentHex}44` }}
        >
          ★ Featured
        </div>
      )}

      {/* Top color bar + icon */}
      <div
        className="relative h-[120px] flex items-center justify-center overflow-hidden"
        style={{
          background: `linear-gradient(135deg, ${project.accentHex}18 0%, ${project.accentHex}08 100%)`,
          borderBottom: `1px solid ${hovered ? project.accentHex + '30' : 'rgba(255,255,255,0.05)'}`,
          transition: 'border-color 0.35s ease',
        }}
      >
        {/* Big ghost text in bg */}
        <span
          className="absolute font-black select-none pointer-events-none"
          style={{
            fontFamily: "'Bebas Neue', Impact, sans-serif",
            fontSize: '5rem',
            color: project.accentHex,
            opacity: hovered ? 0.08 : 0.04,
            letterSpacing: '-0.02em',
            transition: 'opacity 0.35s ease',
            userSelect: 'none',
          }}
        >
          {project.id.toString().padStart(2, '0')}
        </span>

        {/* Icon circle */}
        <div
          className="relative z-10 w-14 h-14 rounded-2xl flex items-center justify-center transition-all duration-350"
          style={{
            background: hovered ? project.accentHex + '25' : 'rgba(255,255,255,0.06)',
            border: `1.5px solid ${hovered ? project.accentHex + '60' : 'rgba(255,255,255,0.1)'}`,
            boxShadow: hovered ? `0 0 30px ${project.accentHex}40` : 'none',
            transform: hovered ? 'scale(1.1) translateZ(10px)' : 'scale(1)',
          }}
        >
          <Icon
            className="w-6 h-6 transition-colors duration-350"
            style={{ color: hovered ? project.accentHex : 'rgba(255,255,255,0.5)' }}
          />
        </div>

        {/* Animated glow spot that follows hover */}
        <div
          className="absolute inset-0 pointer-events-none transition-opacity duration-350"
          style={{
            background: `radial-gradient(circle at 50% 50%, ${project.accentHex}20 0%, transparent 60%)`,
            opacity: hovered ? 1 : 0,
          }}
        />
      </div>

      {/* Content */}
      <div className="flex flex-col flex-1 p-5 gap-4">
        <div>
          <div className="flex items-start justify-between gap-2 mb-1">
            <h3
              className="text-[1.35rem] font-black leading-tight transition-colors duration-300"
              style={{
                fontFamily: "'Bebas Neue', 'Oswald', Impact, sans-serif",
                letterSpacing: '0.06em',
                color: hovered ? '#ffffff' : 'rgba(255,255,255,0.88)',
              }}
            >
              {project.title}
            </h3>
            <span
              className="text-[9px] font-mono shrink-0 mt-1 transition-colors duration-300"
              style={{ color: hovered ? project.accentHex : 'rgba(255,255,255,0.2)' }}
            >
              {project.year}
            </span>
          </div>
          <p className="text-[11px] font-mono tracking-wider mb-2 transition-colors duration-300"
            style={{ color: hovered ? project.accentHex + 'cc' : 'rgba(255,255,255,0.3)' }}>
            {project.subtitle}
          </p>
          <p className="text-xs text-white/45 leading-relaxed group-hover:text-white/60">
            {project.description}
          </p>
        </div>

        {/* Tech pills */}
        <div className="flex flex-wrap gap-1.5">
          {project.tech.map((t, i) => (
            <span
              key={i}
              className="px-2 py-0.5 text-[9px] font-mono rounded-md border transition-all duration-300"
              style={{
                borderColor: hovered ? project.accentHex + '40' : 'rgba(255,255,255,0.08)',
                color: hovered ? project.accentHex + 'cc' : 'rgba(255,255,255,0.35)',
                background: hovered ? project.accentHex + '0f' : 'rgba(255,255,255,0.03)',
                transitionDelay: `${i * 20}ms`,
              }}
            >
              {t}
            </span>
          ))}
        </div>

        {/* Action row */}
        <div className="flex gap-2.5 mt-auto">
          <a
            href={project.liveLink}
            target="_blank"
            rel="noopener noreferrer"
            className="flex-1 flex items-center justify-center gap-2 py-2.5 rounded-xl text-xs font-bold transition-all duration-300 active:scale-95"
            style={{
              background: hovered ? project.accentHex : 'rgba(255,255,255,0.06)',
              color: hovered ? '#000' : 'rgba(255,255,255,0.5)',
              border: `1px solid ${hovered ? project.accentHex : 'rgba(255,255,255,0.1)'}`,
              boxShadow: hovered ? `0 0 20px ${project.accentHex}50` : 'none',
            }}
          >
            <ExternalLink className="w-3.5 h-3.5" />
            Live Demo
          </a>
          <a
            href={project.githubLink}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl text-xs font-semibold transition-all duration-300 active:scale-95"
            style={{
              border: `1px solid ${hovered ? 'rgba(255,255,255,0.2)' : 'rgba(255,255,255,0.08)'}`,
              color: hovered ? 'rgba(255,255,255,0.8)' : 'rgba(255,255,255,0.3)',
              background: hovered ? 'rgba(255,255,255,0.07)' : 'transparent',
            }}
          >
            <Github className="w-3.5 h-3.5" />
          </a>
        </div>
      </div>

      {/* Bottom glow line */}
      <div
        className="absolute bottom-0 left-0 right-0 h-[2px] transition-all duration-500"
        style={{
          background: `linear-gradient(90deg, transparent, ${project.accentHex}, transparent)`,
          opacity: hovered ? 1 : 0,
          transform: hovered ? 'scaleX(1)' : 'scaleX(0)',
          transformOrigin: 'left',
        }}
      />
    </div>
  );
};

export default FullStackProjects;